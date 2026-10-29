import { generateAIContent, verifyModel, AIServiceError, defaultModel } from "./groq.js";
import { prompts, PROMPT_VERSION } from "./prompts.js";
import { validateAIResult } from "./schemas.js";

const rateBuckets = new Map();
const allowedTaskActions = new Set([
  "simplify", "explain_parent", "split_steps", "add_success_criteria",
  "translate_kk", "translate_ru", "check_ambiguity", "add_stop_conditions", "adapt_home"
]);
const allowedFocusAreas = new Set([
  "communication", "receptive_language", "social_interaction", "gross_motor",
  "fine_motor", "independence", "sensory_regulation", "attention",
  "daily_living", "aac", "learning", "emotions"
]);
const redFlags = [
  /потер(я|ю|ял|яла|яли|и).{0,30}(навык|умел|реч)/iu,
  /утрат(а|ил|ила).{0,30}(навык|умел|реч)/iu,
  /судорог/iu, /проблем.{0,15}дыхани/iu, /задых/iu, /потер.{0,10}сознани/iu,
  /сильн.{0,10}бол/iu, /отказ.{0,15}(ед|вод|пить)/iu, /самоповреж/iu,
  /угроз.{0,20}(друг|люд)/iu, /насили/iu, /резк.{0,15}ухудш/iu,
  /бұрынғы.{0,20}дағд.{0,20}жоғалт/iu, /құрыс/iu, /тыныс.{0,20}қиын/iu,
  /есінен тан/iu, /қатты ауыр/iu, /тамақтан.{0,15}бас тарт/iu,
  /өзін.{0,10}жарақат/iu, /зорлық/iu, /күрт нашар/iu
];

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "x-content-type-options": "nosniff",
  "referrer-policy": "no-referrer"
};

const respond = (payload, status = 200) => new Response(JSON.stringify(payload), { status, headers: jsonHeaders });
const safeText = (value, max) => typeof value === "string" ? value.trim().slice(0, max) : "";
const safeArray = (value, maxItems = 20, maxLength = 1000) => Array.isArray(value)
  ? value.slice(0, maxItems).map(item => safeText(item, maxLength)).filter(Boolean)
  : [];
const uid = prefix => `${prefix}_${crypto.randomUUID()}`;
const now = () => new Date().toISOString();
const parseJSON = value => {
  try { return value ? JSON.parse(value) : null; } catch { return null; }
};
export const redactDirectIdentifiers = value => String(value || "")
  .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/giu, "[email removed]")
  .replace(/(?:\+?7|8)[\s()-]*\d{3}[\s()-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}/gu, "[phone removed]")
  .replace(/\b\d{12}\b/gu, "[identifier removed]")
  .replace(/\b(?:ИИН|ЖСН|адрес|мекенжай)\s*[:—-]\s*[^,;\n]{3,120}/giu, "[direct identifier removed]");
const redactAIValue = value => {
  if (typeof value === "string") return redactDirectIdentifiers(value);
  if (Array.isArray(value)) return value.map(redactAIValue);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, redactAIValue(item)]));
  return value;
};

export const containsRedFlag = value => {
  const text = typeof value === "string" ? value : JSON.stringify(value || {});
  return redFlags.some(pattern => pattern.test(text));
};
export const containsUnsafeAIAdvice = value => {
  const text = JSON.stringify(value || {});
  return /(назнач(ьте|ить)\s+(лекар|препарат)|принимайте\s+\d|увелич(ьте|ить).{0,20}доз|уменьш(ите|ить).{0,20}доз|прекрат(ите|ить).{0,20}(лечен|терап)|дәрі.{0,20}қабылда|дозаны.{0,20}(арттыр|азайт)|емдеуді.{0,20}тоқтат)/iu.test(text);
};

export const getAgeGroup = age => {
  const numeric = Number(age);
  if (!Number.isFinite(numeric)) return "not_specified";
  if (numeric <= 3) return "0-3";
  if (numeric <= 6) return "4-6";
  if (numeric <= 9) return "7-9";
  if (numeric <= 12) return "10-12";
  return "13+";
};

export function createAnonymizedAIContext(input = {}) {
  return {
    ageGroup: getAgeGroup(input.age),
    focusAreas: safeArray(input.focusAreas, 12, 80).filter(item => allowedFocusAreas.has(item)),
    strengths: safeArray(input.strengths, 20, 500),
    challenges: safeArray(input.challenges, 20, 500),
    interests: safeArray(input.interests, 20, 300),
    communicationLevel: safeText(input.communicationLevel, 500),
    instructionLevel: safeText(input.instructionLevel, 500),
    motorFeatures: safeText(input.motorFeatures, 1200),
    sensoryFeatures: safeText(input.sensoryFeatures, 1200),
    behavioralResponses: safeText(input.behavioralResponses, 1200),
    attentionFeatures: safeText(input.attentionFeatures, 1200),
    independenceLevel: safeText(input.independenceLevel, 500),
    motivators: safeArray(input.motivators, 20, 300),
    effectivePrompts: safeArray(input.effectivePrompts, 20, 300),
    ineffectiveMethods: safeArray(input.ineffectiveMethods, 20, 500),
    triggers: safeArray(input.triggers, 20, 500),
    fatigueSigns: safeArray(input.fatigueSigns, 20, 500),
    calmingMethods: safeArray(input.calmingMethods, 20, 500),
    restrictions: safeArray(input.restrictions, 20, 700),
    contraindications: safeArray(input.contraindications, 20, 700),
    stopConditions: safeArray(input.stopConditions, 20, 700),
    familyGoals: safeArray(input.familyGoals, 12, 700),
    specialistPriorities: safeArray(input.specialistPriorities, 12, 700),
    specialistGoals: safeArray(input.specialistGoals, 10, 2000),
    allowedFrequency: safeText(input.allowedFrequency, 300),
    originalLanguage: input.originalLanguage === "kk" ? "kk" : "ru",
    specialistNotes: Array.isArray(input.specialistNotes)
      ? input.specialistNotes.slice(0, 20).map(note => ({
          id: safeText(note.id, 80),
          originalText: safeText(note.originalText, 5000),
          originalLanguage: note.originalLanguage === "kk" ? "kk" : "ru"
        })).filter(note => note.id && note.originalText)
      : [],
    aggregatedProgress: input.aggregatedProgress && typeof input.aggregatedProgress === "object"
      ? {
          periodDays: Math.min(90, Math.max(1, Number(input.aggregatedProgress.periodDays || 14))),
          attempts: Math.min(1000, Math.max(0, Number(input.aggregatedProgress.attempts || 0))),
          independent: Math.min(1000, Math.max(0, Number(input.aggregatedProgress.independent || 0))),
          visualPrompt: Math.min(1000, Math.max(0, Number(input.aggregatedProgress.visualPrompt || 0))),
          partialHelp: Math.min(1000, Math.max(0, Number(input.aggregatedProgress.partialHelp || 0))),
          fullHelp: Math.min(1000, Math.max(0, Number(input.aggregatedProgress.fullHelp || 0))),
          missed: Math.min(1000, Math.max(0, Number(input.aggregatedProgress.missed || 0))),
          contexts: input.aggregatedProgress.contexts && typeof input.aggregatedProgress.contexts === "object"
            ? Object.fromEntries(Object.entries(input.aggregatedProgress.contexts).slice(0, 10).map(([key, count]) => [
                safeText(key, 80), Math.min(1000, Math.max(0, Number(count || 0)))
              ]))
            : {},
          confirmedObservations: safeArray(input.aggregatedProgress.confirmedObservations, 20, 1000)
        }
      : null
  };
}

const hashContext = async value => {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, "0")).join("");
};

async function ensureDatabase(db) {
  if (!db) return;
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS ai_contexts (
      child_profile_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      context_json TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      PRIMARY KEY (child_profile_id, user_id)
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS ai_generations (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      child_profile_id TEXT NOT NULL,
      task_type TEXT NOT NULL,
      model TEXT NOT NULL,
      prompt_version TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL,
      approved_by TEXT,
      error_code TEXT,
      context_hash TEXT NOT NULL,
      result_json TEXT
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS development_plans (
      id TEXT PRIMARY KEY,
      child_profile_id TEXT NOT NULL,
      owner_user_id TEXT NOT NULL,
      status TEXT NOT NULL,
      period_weeks INTEGER NOT NULL,
      draft_json TEXT NOT NULL,
      approved_ru_json TEXT,
      approved_kk_json TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      review_date TEXT,
      author TEXT NOT NULL
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS plan_versions (
      id TEXT PRIMARY KEY,
      plan_id TEXT NOT NULL,
      version INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      created_by TEXT NOT NULL,
      source TEXT NOT NULL,
      approved_by TEXT,
      changes_json TEXT NOT NULL
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS parent_explanations (
      id TEXT PRIMARY KEY,
      child_profile_id TEXT NOT NULL,
      owner_user_id TEXT NOT NULL,
      original_text TEXT NOT NULL,
      target_language TEXT NOT NULL,
      draft_json TEXT NOT NULL,
      approved_json TEXT,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL,
      approved_at TEXT,
      approved_by TEXT
    )`)
  ]);
}

const getIdentity = request => {
  const email = safeText(request.headers.get("oai-authenticated-user-email"), 320).toLowerCase();
  if (email) return email;
  const host = new URL(request.url).hostname;
  if ((host === "127.0.0.1" || host === "localhost") && request.headers.get("x-bq-local-test") === "1") {
    return safeText(request.headers.get("x-bq-user"), 320) || "local-test@balaqoldau.local";
  }
  return "";
};

const requireRole = (request, allowed) => {
  const role = safeText(request.headers.get("x-bq-role"), 40);
  return allowed.includes(role) ? role : "";
};

const checkOrigin = request => {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try { return new URL(origin).host === new URL(request.url).host; } catch { return false; }
};

const rateLimit = (key, limit = 10) => {
  const minute = Math.floor(Date.now() / 60000);
  const bucketKey = `${key}:${minute}`;
  const count = (rateBuckets.get(bucketKey) || 0) + 1;
  rateBuckets.set(bucketKey, count);
  if (rateBuckets.size > 1000) {
    for (const stored of rateBuckets.keys()) if (!stored.endsWith(`:${minute}`)) rateBuckets.delete(stored);
  }
  return count <= limit;
};

const readBody = async request => {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 100000) throw new AIServiceError("REQUEST_TOO_LARGE", 413);
  try { return await request.json(); } catch { throw new AIServiceError("INVALID_REQUEST_JSON", 400); }
};

async function saveContext(db, userId, childProfileId, context) {
  if (!db) return;
  await db.prepare(`INSERT INTO ai_contexts (child_profile_id, user_id, context_json, updated_at)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(child_profile_id, user_id) DO UPDATE SET context_json=excluded.context_json, updated_at=excluded.updated_at`)
    .bind(childProfileId, userId, JSON.stringify(context), now()).run();
}

async function loadContext(db, userId, childProfileId) {
  if (!db) return null;
  const row = await db.prepare("SELECT context_json FROM ai_contexts WHERE child_profile_id=? AND user_id=?")
    .bind(childProfileId, userId).first();
  return parseJSON(row?.context_json);
}

async function saveGeneration(db, record) {
  if (!db) return;
  await db.prepare(`INSERT INTO ai_generations
    (id,user_id,child_profile_id,task_type,model,prompt_version,status,created_at,approved_by,error_code,context_hash,result_json)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`)
    .bind(
      record.id, record.userId, record.childProfileId, record.taskType, record.model,
      PROMPT_VERSION, record.status, record.createdAt, record.approvedBy || null,
      record.errorCode || null, record.contextHash, record.result ? JSON.stringify(record.result) : null
    ).run();
}

async function savePlan(db, plan) {
  if (!db) return;
  await db.prepare(`INSERT INTO development_plans
    (id,child_profile_id,owner_user_id,status,period_weeks,draft_json,approved_ru_json,approved_kk_json,created_at,updated_at,review_date,author)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`)
    .bind(
      plan.id, plan.childProfileId, plan.ownerUserId, plan.status, plan.periodWeeks,
      JSON.stringify(plan.draft), null, null, plan.createdAt, plan.updatedAt, plan.reviewDate, plan.author
    ).run();
  await db.prepare(`INSERT INTO plan_versions
    (id,plan_id,version,created_at,created_by,source,approved_by,changes_json)
    VALUES (?,?,?,?,?,?,?,?)`)
    .bind(uid("version"), plan.id, 1, plan.createdAt, plan.author, "ai_suggestion", null, JSON.stringify([
      { field: "plan", previousText: "", newText: "AI draft created" }
    ])).run();
}

async function updatePlanStatus(db, userId, planId, requestedStatus, payload) {
  if (!db) throw new AIServiceError("PERSISTENCE_UNAVAILABLE", 503);
  const plan = await db.prepare("SELECT * FROM development_plans WHERE id=? AND owner_user_id=?")
    .bind(planId, userId).first();
  if (!plan) throw new AIServiceError("PLAN_NOT_FOUND", 404);
  const transitions = {
    ai_draft: ["review"],
    review: ["approved"],
    approved: ["published"],
    published: ["needs_review", "completed"],
    needs_review: ["review", "completed"]
  };
  if (!transitions[plan.status]?.includes(requestedStatus)) throw new AIServiceError("INVALID_PLAN_TRANSITION", 409);
  if ((requestedStatus === "approved" || requestedStatus === "published") && !payload.safetyConfirmed) {
    throw new AIServiceError("SAFETY_CONFIRMATION_REQUIRED", 400);
  }
  const approvedRu = payload.approvedRu ? JSON.stringify(payload.approvedRu) : plan.approved_ru_json;
  const approvedKk = payload.approvedKk ? JSON.stringify(payload.approvedKk) : plan.approved_kk_json;
  if (requestedStatus === "published" && !approvedRu && !approvedKk) throw new AIServiceError("APPROVED_CONTENT_REQUIRED", 400);
  const updatedAt = now();
  await db.prepare(`UPDATE development_plans
    SET status=?, approved_ru_json=?, approved_kk_json=?, updated_at=?, review_date=?
    WHERE id=? AND owner_user_id=?`)
    .bind(requestedStatus, approvedRu, approvedKk, updatedAt, safeText(payload.reviewDate, 40) || plan.review_date, planId, userId).run();
  if (requestedStatus === "approved" || requestedStatus === "published") {
    await db.prepare(`UPDATE ai_generations SET status='approved',approved_by=?
      WHERE id=(SELECT id FROM ai_generations WHERE user_id=? AND child_profile_id=? AND task_type='development_plan' ORDER BY created_at DESC LIMIT 1)`)
      .bind(userId, userId, plan.child_profile_id).run();
  }
  const versionRow = await db.prepare("SELECT MAX(version) AS version FROM plan_versions WHERE plan_id=?").bind(planId).first();
  await db.prepare(`INSERT INTO plan_versions
    (id,plan_id,version,created_at,created_by,source,approved_by,changes_json)
    VALUES (?,?,?,?,?,?,?,?)`)
    .bind(
      uid("version"), planId, Number(versionRow?.version || 0) + 1, updatedAt, userId,
      "specialist", requestedStatus === "approved" || requestedStatus === "published" ? userId : null,
      JSON.stringify([{ field: "status", previousText: plan.status, newText: requestedStatus }])
    ).run();
  return { ...plan, status: requestedStatus, approved_ru_json: approvedRu, approved_kk_json: approvedKk, updated_at: updatedAt };
}

async function updatePlanDraft(db, userId, planId, draft) {
  if (!db) throw new AIServiceError("PERSISTENCE_UNAVAILABLE", 503);
  if (!validateAIResult("development_plan", draft)) throw new AIServiceError("INVALID_PLAN_DRAFT", 400);
  const plan = await db.prepare("SELECT status,draft_json FROM development_plans WHERE id=? AND owner_user_id=?")
    .bind(planId, userId).first();
  if (!plan) throw new AIServiceError("PLAN_NOT_FOUND", 404);
  if (!["ai_draft", "review", "needs_review"].includes(plan.status)) throw new AIServiceError("PLAN_NOT_EDITABLE", 409);
  const previousText = plan.draft_json;
  const nextText = JSON.stringify(draft);
  if (previousText === nextText) return { saved: true, unchanged: true };
  const updatedAt = now();
  await db.prepare("UPDATE development_plans SET draft_json=?,updated_at=? WHERE id=? AND owner_user_id=?")
    .bind(nextText, updatedAt, planId, userId).run();
  const versionRow = await db.prepare("SELECT MAX(version) AS version FROM plan_versions WHERE plan_id=?").bind(planId).first();
  await db.prepare(`INSERT INTO plan_versions
    (id,plan_id,version,created_at,created_by,source,approved_by,changes_json)
    VALUES (?,?,?,?,?,?,?,?)`)
    .bind(
      uid("version"), planId, Number(versionRow?.version || 0) + 1, updatedAt, userId,
      "specialist", null, JSON.stringify([{ field: "plan", previousText, newText: nextText }])
    ).run();
  return { saved: true, unchanged: false, updatedAt };
}

const professionalReviewPayload = language => ({
  code: "PROFESSIONAL_REVIEW_REQUIRED",
  requiresProfessionalReview: true,
  message: language === "kk"
    ? "Көрсетілген ақпарат негізінде алдымен маманның кәсіби бағалауы қажет. AI-жоспар маман тексергенге дейін жасалмайды."
    : "На основании указанной информации сначала требуется профессиональная оценка. AI-план не будет сформирован до проверки специалистом."
});

async function runGeneration({ request, env, db, userId, childProfileId, taskType, language, context, systemPrompt }) {
  const providerContext = redactAIValue(context);
  const contextHash = await hashContext(providerContext);
  const generationId = uid("ai");
  try {
    const generated = await generateAIContent({ env, taskType, systemPrompt, userData: providerContext });
    if (containsUnsafeAIAdvice(generated.result)) throw new AIServiceError("UNSAFE_AI_OUTPUT", 422);
    await saveGeneration(db, {
      id: generationId, userId, childProfileId, taskType, model: generated.model,
      status: "success", createdAt: now(), contextHash, result: generated.result
    });
    return { generationId, ...generated };
  } catch (error) {
    await saveGeneration(db, {
      id: generationId, userId, childProfileId, taskType,
      model: env.GROQ_MODEL || defaultModel, status: "failed", createdAt: now(),
      contextHash, errorCode: error.code || "AI_FAILED"
    });
    console.warn("BalaQoldau AI generation failed", {
      taskType,
      code: error.code || "AI_FAILED",
      status: error.status || 500
    });
    throw error;
  }
}

export async function handleApi(request, env) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/")) return null;
  if (!checkOrigin(request)) return respond({ code: "INVALID_ORIGIN" }, 403);

  const db = env.DB || null;
  await ensureDatabase(db);

  if (request.method === "GET" && url.pathname === "/api/health/ai") {
    const configured = Boolean(env.GROQ_API_KEY);
    const model = env.GROQ_MODEL || defaultModel;
    if (!configured) return respond({ configured: false, provider: "groq", model, status: "not_configured" });
    if (url.searchParams.get("check") === "1") {
      try {
        const status = await verifyModel(env, true);
        return respond({ configured: true, provider: "groq", model, status: status.available ? "available" : "temporarily_unavailable" });
      } catch {
        return respond({ configured: true, provider: "groq", model, status: "temporarily_unavailable" });
      }
    }
    return respond({ configured: true, provider: "groq", model, status: "configured" });
  }

  const userId = getIdentity(request);
  if (!userId) return respond({ code: "AUTH_REQUIRED" }, 401);
  const role = safeText(request.headers.get("x-bq-role"), 40);
  if (!rateLimit(`${userId}:${role}`, role === "demo" ? 3 : 10)) return respond({ code: "RATE_LIMITED" }, 429);

  try {
    if (request.method === "GET" && url.pathname === "/api/ai/metrics") {
      if (!requireRole(request, ["specialist", "admin"])) throw new AIServiceError("SPECIALIST_ROLE_REQUIRED", 403);
      if (!db) return respond({ testData: false, generations: {}, tasks: {}, plans: {} });
      const [generationRows, taskRows, planRows] = await Promise.all([
        db.prepare("SELECT status,COUNT(*) AS count FROM ai_generations WHERE user_id=? GROUP BY status").bind(userId).all(),
        db.prepare("SELECT task_type,COUNT(*) AS count FROM ai_generations WHERE user_id=? GROUP BY task_type").bind(userId).all(),
        db.prepare("SELECT status,COUNT(*) AS count FROM development_plans WHERE owner_user_id=? GROUP BY status").bind(userId).all()
      ]);
      const toCounts = (rows, key) => Object.fromEntries((rows.results || []).map(row => [row[key], Number(row.count || 0)]));
      return respond({
        testData: false,
        generations: toCounts(generationRows, "status"),
        tasks: toCounts(taskRows, "task_type"),
        plans: toCounts(planRows, "status")
      });
    }

    if (request.method === "POST" && url.pathname === "/api/ai/profile-context") {
      if (!requireRole(request, ["specialist", "admin"])) throw new AIServiceError("SPECIALIST_ROLE_REQUIRED", 403);
      const body = await readBody(request);
      const childProfileId = safeText(body.childProfileId, 100);
      if (!childProfileId) throw new AIServiceError("CHILD_PROFILE_REQUIRED", 400);
      const context = createAnonymizedAIContext(body.context);
      await saveContext(db, userId, childProfileId, context);
      return respond({ saved: true, childProfileId, anonymized: true, updatedAt: now() });
    }

    if (request.method === "POST" && url.pathname === "/api/ai/development-plan") {
      if (!requireRole(request, ["specialist", "admin"])) throw new AIServiceError("SPECIALIST_ROLE_REQUIRED", 403);
      const body = await readBody(request);
      const childProfileId = safeText(body.childProfileId, 100);
      const language = body.targetLanguage === "kk" ? "kk" : "ru";
      if (!rateLimit(`${userId}:${childProfileId}:development_plan`, 3)) throw new AIServiceError("PLAN_GENERATION_COOLDOWN", 429);
      const context = await loadContext(db, userId, childProfileId);
      if (!context) throw new AIServiceError("AI_CONTEXT_NOT_FOUND", 404);
      if (containsRedFlag(context)) return respond(professionalReviewPayload(language), 422);
      const periodWeeks = Math.min(12, Math.max(1, Number(body.periodWeeks || 4)));
      const generation = await runGeneration({
        request, env, db, userId, childProfileId, taskType: "development_plan", language,
        context: { ...context, periodWeeks, targetLanguage: language },
        systemPrompt: prompts.developmentPlan(language)
      });
      if (generation.result.requiresProfessionalReview) return respond(professionalReviewPayload(language), 422);
      const createdAt = now();
      const reviewDate = new Date(Date.now() + periodWeeks * 7 * 86400000).toISOString();
      const plan = {
        id: uid("plan"), childProfileId, ownerUserId: userId, status: "ai_draft",
        periodWeeks, draft: generation.result, createdAt, updatedAt: createdAt,
        reviewDate, author: userId
      };
      await savePlan(db, plan);
      return respond({ plan, generationId: generation.generationId }, 201);
    }

    if (request.method === "POST" && url.pathname === "/api/ai/explain-specialist-note") {
      if (!requireRole(request, ["specialist", "admin"])) throw new AIServiceError("SPECIALIST_ROLE_REQUIRED", 403);
      const body = await readBody(request);
      const childProfileId = safeText(body.childProfileId, 100);
      const noteId = safeText(body.specialistNoteId, 80);
      const language = body.targetLanguage === "kk" ? "kk" : "ru";
      const context = await loadContext(db, userId, childProfileId);
      const note = context?.specialistNotes?.find(item => item.id === noteId);
      if (!note) throw new AIServiceError("SPECIALIST_NOTE_NOT_FOUND", 404);
      if (containsRedFlag(note.originalText)) return respond(professionalReviewPayload(language), 422);
      const generation = await runGeneration({
        request, env, db, userId, childProfileId, taskType: "parent_explanation", language,
        context: { specialistNote: note.originalText, targetLanguage: language },
        systemPrompt: prompts.parentExplanation(language)
      });
      const explanationId = uid("explanation");
      if (db) {
        await db.prepare(`INSERT INTO parent_explanations
          (id,child_profile_id,owner_user_id,original_text,target_language,draft_json,approved_json,status,created_at,approved_at,approved_by)
          VALUES (?,?,?,?,?,?,NULL,'shared_ai',?,NULL,NULL)`)
          .bind(explanationId, childProfileId, userId, note.originalText, language, JSON.stringify(generation.result), now()).run();
      }
      return respond({
        draft: generation.result,
        explanationId,
        generationId: generation.generationId,
        originalText: note.originalText,
        status: "shared_ai",
        sharedWithParent: true
      });
    }

    if (request.method === "POST" && url.pathname === "/api/ai/structure-observation") {
      if (!requireRole(request, ["parent", "specialist"])) throw new AIServiceError("ROLE_NOT_ALLOWED", 403);
      const body = await readBody(request);
      const childProfileId = safeText(body.childProfileId, 100);
      const originalText = safeText(body.originalText, 3000);
      const language = body.targetLanguage === "kk" ? "kk" : "ru";
      if (!originalText) throw new AIServiceError("OBSERVATION_REQUIRED", 400);
      if (containsRedFlag(originalText)) return respond({
        ...professionalReviewPayload(language),
        draft: {
          originalText, skillArea: null, activity: null, result: null, supportLevel: null,
          context: null, possibleTrigger: null, calmingMethod: null, safetyFlag: true, confidence: "high"
        }
      }, 422);
      const generation = await runGeneration({
        request, env, db, userId, childProfileId, taskType: "observation_structure", language,
        context: { originalText, targetLanguage: language },
        systemPrompt: prompts.observationParser(language)
      });
      return respond({ draft: generation.result, generationId: generation.generationId, requiresConfirmation: true });
    }

    if (request.method === "POST" && url.pathname === "/api/ai/analyze-progress") {
      if (!requireRole(request, ["specialist", "admin"])) throw new AIServiceError("SPECIALIST_ROLE_REQUIRED", 403);
      const body = await readBody(request);
      const childProfileId = safeText(body.childProfileId, 100);
      const language = body.targetLanguage === "kk" ? "kk" : "ru";
      const context = await loadContext(db, userId, childProfileId);
      if (!context?.aggregatedProgress) throw new AIServiceError("PROGRESS_DATA_NOT_FOUND", 404);
      if (containsRedFlag(context.aggregatedProgress)) return respond(professionalReviewPayload(language), 422);
      const generation = await runGeneration({
        request, env, db, userId, childProfileId, taskType: "progress_analysis", language,
        context: { progress: context.aggregatedProgress, focusAreas: context.focusAreas, targetLanguage: language },
        systemPrompt: prompts.progressAnalysis(language)
      });
      return respond({ analysis: generation.result, generationId: generation.generationId });
    }

    if (request.method === "POST" && url.pathname === "/api/ai/suggest-plan-adjustment") {
      if (!requireRole(request, ["specialist", "admin"])) throw new AIServiceError("SPECIALIST_ROLE_REQUIRED", 403);
      const body = await readBody(request);
      const childProfileId = safeText(body.childProfileId, 100);
      const language = body.targetLanguage === "kk" ? "kk" : "ru";
      const context = await loadContext(db, userId, childProfileId);
      if (!context?.aggregatedProgress) throw new AIServiceError("PROGRESS_DATA_NOT_FOUND", 404);
      const generation = await runGeneration({
        request, env, db, userId, childProfileId, taskType: "plan_adjustment", language,
        context: { progress: context.aggregatedProgress, restrictions: context.restrictions, targetLanguage: language },
        systemPrompt: prompts.planAdjustment(language)
      });
      return respond({ adjustmentDraft: generation.result, generationId: generation.generationId, applied: false });
    }

    if (request.method === "POST" && url.pathname === "/api/ai/task-assistant") {
      if (!requireRole(request, ["specialist", "admin"])) throw new AIServiceError("SPECIALIST_ROLE_REQUIRED", 403);
      const body = await readBody(request);
      const action = safeText(body.action, 80);
      const originalText = safeText(body.originalText, 5000);
      const childProfileId = safeText(body.childProfileId, 100);
      const language = body.targetLanguage === "kk" ? "kk" : "ru";
      if (!allowedTaskActions.has(action) || !originalText) throw new AIServiceError("INVALID_TASK_ASSISTANT_INPUT", 400);
      if (containsRedFlag(originalText)) return respond(professionalReviewPayload(language), 422);
      const generation = await runGeneration({
        request, env, db, userId, childProfileId, taskType: "task_assistant", language,
        context: { originalText, action, targetLanguage: language },
        systemPrompt: prompts.taskAssistant(language, action)
      });
      return respond({ draft: generation.result, generationId: generation.generationId });
    }

    if (request.method === "POST" && url.pathname === "/api/ai/translate-approved-content") {
      if (!requireRole(request, ["specialist", "admin"])) throw new AIServiceError("SPECIALIST_ROLE_REQUIRED", 403);
      const body = await readBody(request);
      const childProfileId = safeText(body.childProfileId, 100);
      const planId = safeText(body.planId, 120);
      const language = body.targetLanguage === "kk" ? "kk" : "ru";
      if (!db) throw new AIServiceError("PERSISTENCE_UNAVAILABLE", 503);
      const plan = await db.prepare("SELECT draft_json FROM development_plans WHERE id=? AND child_profile_id=? AND owner_user_id=?")
        .bind(planId, childProfileId, userId).first();
      const draft = parseJSON(plan?.draft_json);
      if (!draft) throw new AIServiceError("PLAN_NOT_FOUND", 404);
      const generation = await runGeneration({
        request, env, db, userId, childProfileId, taskType: "development_plan", language,
        context: { plan: draft, targetLanguage: language, translationOnly: true },
        systemPrompt: prompts.planTranslation(language)
      });
      return respond({
        translationDraft: generation.result,
        generationId: generation.generationId,
        status: "ai_translation_draft",
        targetLanguage: language
      });
    }

    const statusMatch = url.pathname.match(/^\/api\/plans\/([^/]+)\/status$/);
    if (request.method === "POST" && statusMatch) {
      if (!requireRole(request, ["specialist", "admin"])) throw new AIServiceError("SPECIALIST_ROLE_REQUIRED", 403);
      const body = await readBody(request);
      const plan = await updatePlanStatus(db, userId, safeText(statusMatch[1], 120), safeText(body.status, 40), body);
      return respond({ plan });
    }

    const draftMatch = url.pathname.match(/^\/api\/plans\/([^/]+)\/draft$/);
    if (request.method === "POST" && draftMatch) {
      if (!requireRole(request, ["specialist", "admin"])) throw new AIServiceError("SPECIALIST_ROLE_REQUIRED", 403);
      const body = await readBody(request);
      const result = await updatePlanDraft(db, userId, safeText(draftMatch[1], 120), body.draft);
      return respond(result);
    }

    const explanationMatch = url.pathname.match(/^\/api\/explanations\/([^/]+)\/approve$/);
    if (request.method === "POST" && explanationMatch) {
      if (!requireRole(request, ["specialist", "admin"])) throw new AIServiceError("SPECIALIST_ROLE_REQUIRED", 403);
      const body = await readBody(request);
      if (!validateAIResult("parent_explanation", body.approved)) throw new AIServiceError("INVALID_EXPLANATION", 400);
      if (!db) throw new AIServiceError("PERSISTENCE_UNAVAILABLE", 503);
      const approvedAt = now();
      const result = await db.prepare(`UPDATE parent_explanations
        SET approved_json=?,status='approved',approved_at=?,approved_by=?
        WHERE id=? AND owner_user_id=?`)
        .bind(JSON.stringify(body.approved), approvedAt, userId, safeText(explanationMatch[1], 120), userId).run();
      if (!result.meta?.changes) throw new AIServiceError("EXPLANATION_NOT_FOUND", 404);
      return respond({ approved: true, approvedAt });
    }

    if (request.method === "GET" && url.pathname === "/api/explanations") {
      const childProfileId = safeText(url.searchParams.get("childProfileId"), 100);
      const language = url.searchParams.get("language") === "kk" ? "kk" : "ru";
      if (!childProfileId || !db) throw new AIServiceError("EXPLANATION_NOT_FOUND", 404);
      const row = role === "parent"
        ? await db.prepare(`SELECT id,draft_json,approved_json,status,created_at,approved_at FROM parent_explanations
          WHERE child_profile_id=? AND owner_user_id=? AND target_language=?
          AND status IN ('shared_ai','approved')
          ORDER BY created_at DESC LIMIT 1`)
          .bind(childProfileId, userId, language).first()
        : await db.prepare(`SELECT id,original_text,draft_json,approved_json,status,created_at,approved_at FROM parent_explanations
          WHERE child_profile_id=? AND owner_user_id=? AND target_language=? ORDER BY created_at DESC LIMIT 1`)
          .bind(childProfileId, userId, language).first();
      if (!row) throw new AIServiceError("EXPLANATION_NOT_FOUND", 404);
      const draft = parseJSON(row.draft_json);
      const approved = parseJSON(row.approved_json);
      return respond({
        explanation: {
          id: row.id,
          originalText: role === "parent" ? undefined : row.original_text,
          draft: role === "parent" ? undefined : draft,
          shared: role === "parent" ? approved || draft : undefined,
          approved,
          status: row.status || "approved",
          verifiedBySpecialist: row.status === "approved",
          createdAt: row.created_at,
          approvedAt: row.approved_at
        }
      });
    }

    if (request.method === "GET" && url.pathname === "/api/plans") {
      const childProfileId = safeText(url.searchParams.get("childProfileId"), 100);
      if (!childProfileId || !db) throw new AIServiceError("PLAN_NOT_FOUND", 404);
      const query = role === "parent"
        ? "SELECT * FROM development_plans WHERE child_profile_id=? AND status='published' ORDER BY updated_at DESC LIMIT 1"
        : "SELECT * FROM development_plans WHERE child_profile_id=? AND owner_user_id=? ORDER BY updated_at DESC LIMIT 1";
      const row = role === "parent"
        ? await db.prepare(query).bind(childProfileId).first()
        : await db.prepare(query).bind(childProfileId, userId).first();
      if (!row) throw new AIServiceError("PLAN_NOT_FOUND", 404);
      const versionResult = role === "parent"
        ? { results: [] }
        : await db.prepare("SELECT version,created_at,created_by,source,approved_by,changes_json FROM plan_versions WHERE plan_id=? ORDER BY version")
          .bind(row.id).all();
      return respond({
        plan: {
          id: row.id, childProfileId: row.child_profile_id, status: row.status,
          periodWeeks: row.period_weeks, draft: role === "parent" ? undefined : parseJSON(row.draft_json),
          approvedRu: parseJSON(row.approved_ru_json), approvedKk: parseJSON(row.approved_kk_json),
          createdAt: row.created_at, updatedAt: row.updated_at, reviewDate: row.review_date, author: row.author
        },
        versions: (versionResult.results || []).map(version => ({
          version: version.version, createdAt: version.created_at, createdBy: version.created_by,
          source: version.source, approvedBy: version.approved_by, changes: parseJSON(version.changes_json) || []
        }))
      });
    }

    return respond({ code: "API_ROUTE_NOT_FOUND" }, 404);
  } catch (error) {
    const status = error instanceof AIServiceError ? error.status : 500;
    const code = error instanceof AIServiceError ? error.code : "AI_INTERNAL_ERROR";
    return respond({ code, message: "AI request could not be completed safely." }, status);
  }
}
