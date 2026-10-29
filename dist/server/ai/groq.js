import { schemas, validateAIResult } from "./schemas.js";

const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODELS_URL = "https://api.groq.com/openai/v1/models";
const DEFAULT_MODEL = "openai/gpt-oss-20b";
const taskConfig = {
  development_plan: { temperature: 0.2, maxTokens: 2200 },
  parent_explanation: { temperature: 0.2, maxTokens: 1800 },
  observation_structure: { temperature: 0.1, maxTokens: 1400 },
  progress_analysis: { temperature: 0.15, maxTokens: 2000 },
  plan_adjustment: { temperature: 0.15, maxTokens: 1800 },
  task_assistant: { temperature: 0.15, maxTokens: 1800 }
};

let modelCache = { model: "", checkedAt: 0, available: false };

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const cleanJSON = value => value.trim()
  .replace(/^```(?:json)?\s*/i, "")
  .replace(/\s*```$/, "");

// Groq Structured Outputs supports a JSON Schema subset. Keep the stricter
// application limits in schemas.js/runtime validation, but do not send
// unsupported collection and string length keywords to constrained decoding.
const unsupportedProviderKeywords = new Set([
  "maxLength", "minLength", "maxItems", "minItems"
]);

export const createGroqProviderSchema = value => {
  if (Array.isArray(value)) return value.map(createGroqProviderSchema);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !unsupportedProviderKeywords.has(key))
      .map(([key, item]) => [key, createGroqProviderSchema(item)])
  );
};

export class AIServiceError extends Error {
  constructor(code, status = 502) {
    super(code);
    this.code = code;
    this.status = status;
  }
}

export async function verifyModel(env, force = false) {
  if (!env.GROQ_API_KEY) return { configured: false, available: false, model: env.GROQ_MODEL || DEFAULT_MODEL };
  const model = env.GROQ_MODEL || DEFAULT_MODEL;
  if (!force && modelCache.model === model && Date.now() - modelCache.checkedAt < 300000) return modelCache;
  const response = await fetch(GROQ_MODELS_URL, {
    headers: { Authorization: `Bearer ${env.GROQ_API_KEY}`, "Content-Type": "application/json" }
  });
  if (!response.ok) {
    modelCache = { model, checkedAt: Date.now(), available: false };
    return modelCache;
  }
  const payload = await response.json();
  modelCache = {
    model,
    checkedAt: Date.now(),
    available: Array.isArray(payload.data) && payload.data.some(item => item.id === model && item.active !== false)
  };
  return modelCache;
}

export async function generateAIContent({ env, taskType, systemPrompt, userData }) {
  if (!env.GROQ_API_KEY) throw new AIServiceError("AI_NOT_CONFIGURED", 503);
  const modelStatus = await verifyModel(env);
  if (!modelStatus.available) throw new AIServiceError("MODEL_UNAVAILABLE", 503);

  const model = modelStatus.model;
  const config = taskConfig[taskType] || taskConfig.task_assistant;
  const timeoutMs = Math.min(60000, Math.max(5000, Number(env.AI_REQUEST_TIMEOUT_MS || 30000)));
  const schema = schemas[taskType];
  if (!schema) throw new AIServiceError("UNKNOWN_AI_TASK", 400);

  const supportsStrictOutput = model.startsWith("openai/gpt-oss");
  const providerSchema = createGroqProviderSchema(schema.schema);
  const baseUserMessage = `<USER_DATA>
${JSON.stringify(userData)}
</USER_DATA>
Верни только JSON по заданной схеме.`;
  const createRequestBody = useJsonObjectFallback => ({
    model,
    temperature: Number(env.GROQ_TEMPERATURE || config.temperature),
    max_completion_tokens: Math.min(Number(env.GROQ_MAX_TOKENS || config.maxTokens), config.maxTokens),
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: useJsonObjectFallback
          ? `${baseUserMessage}
<OUTPUT_SCHEMA>
${JSON.stringify(providerSchema)}
</OUTPUT_SCHEMA>`
          : baseUserMessage
      }
    ],
    response_format: supportsStrictOutput && !useJsonObjectFallback
      ? { type: "json_schema", json_schema: { name: schema.name, strict: true, schema: providerSchema } }
      : { type: "json_object" },
    ...(supportsStrictOutput ? { reasoning_effort: "low", include_reasoning: false } : {})
  });

  let useJsonObjectFallback = !supportsStrictOutput;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(GROQ_CHAT_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(createRequestBody(useJsonObjectFallback)),
        signal: controller.signal
      });

      if (!response.ok) {
        if (response.status === 400 && !useJsonObjectFallback && attempt < 2) {
          useJsonObjectFallback = true;
          continue;
        }
        if ((response.status === 429 || response.status >= 500) && attempt < 2) {
          await sleep(response.status === 429 ? 900 : 450);
          continue;
        }
        const codes = {
          401: "GROQ_UNAUTHORIZED",
          403: "GROQ_FORBIDDEN",
          429: "GROQ_RATE_LIMITED",
          500: "GROQ_UNAVAILABLE",
          503: "GROQ_UNAVAILABLE"
        };
        throw new AIServiceError(codes[response.status] || "GROQ_REQUEST_FAILED", response.status >= 500 ? 503 : 502);
      }

      const payload = await response.json();
      const content = payload.choices?.[0]?.message?.content;
      if (!content) {
        if (attempt < 2) {
          useJsonObjectFallback = true;
          continue;
        }
        throw new AIServiceError(
          payload.choices?.[0]?.finish_reason === "length" ? "AI_RESPONSE_TRUNCATED" : "EMPTY_AI_RESPONSE",
          502
        );
      }
      let parsed;
      try {
        parsed = JSON.parse(cleanJSON(content));
      } catch {
        if (attempt < 2) {
          useJsonObjectFallback = true;
          continue;
        }
        throw new AIServiceError("INVALID_AI_JSON", 502);
      }
      if (!validateAIResult(taskType, parsed)) {
        if (attempt < 2) {
          useJsonObjectFallback = true;
          continue;
        }
        throw new AIServiceError("INVALID_AI_SCHEMA", 502);
      }
      return { result: parsed, model, usage: payload.usage || null };
    } catch (error) {
      if (error?.name === "AbortError") throw new AIServiceError("AI_TIMEOUT", 504);
      if (error instanceof AIServiceError) throw error;
      if (attempt === 0) {
        await sleep(450);
        continue;
      }
      throw new AIServiceError("AI_NETWORK_ERROR", 503);
    } finally {
      clearTimeout(timeout);
    }
  }
  throw new AIServiceError("GROQ_REQUEST_FAILED", 503);
}

export const defaultModel = DEFAULT_MODEL;
