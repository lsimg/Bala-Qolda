import test from "node:test";
import assert from "node:assert/strict";
import { containsRedFlag, containsUnsafeAIAdvice, createAnonymizedAIContext, getAgeGroup, handleApi, redactDirectIdentifiers } from "../server/ai/ai-runtime.js";
import { validateAIResult } from "../server/ai/schemas.js";
import { createGroqProviderSchema, generateAIContent } from "../server/ai/groq.js";

test("anonymized context drops direct identifiers and groups age", () => {
  const context = createAnonymizedAIContext({
    fullName: "Асыл Т.",
    phone: "+7 700 000 00 00",
    address: "Exact address",
    age: 5,
    focusAreas: ["communication", "unknown"],
    strengths: ["Любит визуальные подсказки"]
  });
  assert.equal(context.ageGroup, "4-6");
  assert.deepEqual(context.focusAreas, ["communication"]);
  assert.equal("fullName" in context, false);
  assert.equal("phone" in context, false);
  assert.equal("address" in context, false);
});

test("red flag blocks ordinary plan flow", () => {
  assert.equal(containsRedFlag("Родитель заметил потерю ранее сформированных навыков"), true);
  assert.equal(containsRedFlag("Сегодня карточка использована с подсказкой"), false);
});

test("age groups are stable", () => {
  assert.equal(getAgeGroup(3), "0-3");
  assert.equal(getAgeGroup(6), "4-6");
  assert.equal(getAgeGroup(10), "10-12");
});

test("runtime schema validation rejects malformed plan", () => {
  assert.equal(validateAIResult("development_plan", { summary: "x" }), false);
});

test("post-generation safety filter blocks medication advice", () => {
  assert.equal(containsUnsafeAIAdvice({ text: "Назначьте лекарство и увеличьте дозировку" }), true);
  assert.equal(containsUnsafeAIAdvice({ text: "Обсудите изменение плана со специалистом" }), false);
});

test("health endpoint never exposes a secret and reports missing configuration safely", async () => {
  const response = await handleApi(new Request("http://localhost/api/health/ai"), {});
  const payload = await response.json();
  assert.equal(payload.configured, false);
  assert.equal(payload.provider, "groq");
  assert.equal("apiKey" in payload, false);
});

test("direct identifiers are removed before provider prompts", () => {
  const redacted = redactDirectIdentifiers("Телефон +7 700 123 45 67, email parent@example.kz, ИИН: 123456789012");
  assert.equal(redacted.includes("parent@example.kz"), false);
  assert.equal(redacted.includes("700 123 45 67"), false);
  assert.equal(redacted.includes("123456789012"), false);
});

test("Groq provider schema keeps structure but removes unsupported length constraints", () => {
  const providerSchema = createGroqProviderSchema({
    type: "object",
    additionalProperties: false,
    required: ["items"],
    properties: {
      items: {
        type: "array",
        maxItems: 10,
        items: { type: "string", maxLength: 500 }
      },
      score: { type: "integer", minimum: 1, maximum: 5 }
    }
  });
  assert.equal(providerSchema.additionalProperties, false);
  assert.equal("maxItems" in providerSchema.properties.items, false);
  assert.equal("maxLength" in providerSchema.properties.items.items, false);
  assert.equal(providerSchema.properties.score.minimum, 1);
  assert.equal(providerSchema.properties.score.maximum, 5);
});

test("Groq request safely falls back to JSON object mode after a strict-schema 400", async () => {
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (url, options = {}) => {
    requests.push({ url: String(url), options });
    if (String(url).endsWith("/models")) {
      return Response.json({ data: [{ id: "openai/gpt-oss-20b", active: true }] });
    }
    const body = JSON.parse(options.body);
    if (body.response_format.type === "json_schema") {
      return Response.json({ error: { message: "unsupported schema constraint" } }, { status: 400 });
    }
    return Response.json({
      choices: [{
        finish_reason: "stop",
        message: {
          content: JSON.stringify({
            observation: "Наблюдение специалиста.",
            everydayMeaning: "Понятное объяснение.",
            parentSupport: ["Использовать короткую инструкцию."],
            avoid: ["Не перегружать подсказками."],
            discussWithSpecialist: ["Уточнить следующий шаг."],
            warning: "Это не медицинское назначение.",
            requiresProfessionalReview: true
          })
        }
      }]
    });
  };
  try {
    const generated = await generateAIContent({
      env: {
        GROQ_API_KEY: "test-only-key",
        GROQ_MODEL: "openai/gpt-oss-20b",
        GROQ_MAX_TOKENS: "2200",
        GROQ_TEMPERATURE: "0.2",
        AI_REQUEST_TIMEOUT_MS: "30000"
      },
      taskType: "parent_explanation",
      systemPrompt: "Return safe JSON.",
      userData: { specialistNote: "Тестовая заметка", targetLanguage: "ru" }
    });
    assert.equal(generated.result.requiresProfessionalReview, true);
    const completionBodies = requests
      .filter(request => request.url.endsWith("/chat/completions"))
      .map(request => JSON.parse(request.options.body));
    assert.equal(completionBodies.length, 2);
    assert.equal(completionBodies[0].response_format.type, "json_schema");
    assert.equal(completionBodies[0].reasoning_effort, "low");
    assert.equal(completionBodies[1].response_format.type, "json_object");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("parent can read an immediately shared AI explanation without the original specialist note", async () => {
  const sharedDraft = {
    observation: "Специалист отметил особенность.",
    everydayMeaning: "Ребёнку может быть легче с короткой инструкцией.",
    parentSupport: ["Говорить спокойно и кратко."],
    avoid: ["Не давать много инструкций одновременно."],
    discussWithSpecialist: ["Как постепенно усложнять задание."],
    warning: "Это не медицинское назначение.",
    requiresProfessionalReview: true
  };
  const db = {
    batch: async () => [],
    prepare(sql) {
      return {
        bind() {
          return {
            first: async () => sql.includes("FROM parent_explanations")
              ? {
                  id: "explanation_shared",
                  draft_json: JSON.stringify(sharedDraft),
                  approved_json: null,
                  status: "shared_ai",
                  created_at: "2026-07-23T08:00:00.000Z",
                  approved_at: null
                }
              : null
          };
        }
      };
    }
  };
  const response = await handleApi(new Request(
    "http://localhost/api/explanations?childProfileId=child_primary&language=ru",
    {
      headers: {
        "oai-authenticated-user-email": "parent-shared-test@example.kz",
        "x-bq-role": "parent"
      }
    }
  ), { DB: db });
  const payload = await response.json();
  assert.equal(response.status, 200);
  assert.deepEqual(payload.explanation.shared, sharedDraft);
  assert.equal(payload.explanation.status, "shared_ai");
  assert.equal(payload.explanation.verifiedBySpecialist, false);
  assert.equal("originalText" in payload.explanation, false);
});
