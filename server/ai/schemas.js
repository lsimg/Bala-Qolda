const string = (max = 2000) => ({ type: "string", maxLength: max });
const nullableString = (max = 2000) => ({ type: ["string", "null"], maxLength: max });
const stringArray = (maxItems = 20, maxLength = 1000) => ({
  type: "array",
  maxItems,
  items: string(maxLength)
});

const stepSchema = {
  type: "object",
  additionalProperties: false,
  required: ["order", "description"],
  properties: {
    order: { type: "integer", minimum: 1, maximum: 12 },
    description: string(1000)
  }
};

const activitySchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "title", "purpose", "materials", "instructions", "durationMinutes",
    "frequency", "allowedSupport", "successCriteria", "stopConditions",
    "specialistComment"
  ],
  properties: {
    title: string(300),
    purpose: string(1000),
    materials: stringArray(10, 300),
    instructions: stringArray(12, 700),
    durationMinutes: { type: ["integer", "null"], minimum: 1, maximum: 60 },
    frequency: nullableString(300),
    allowedSupport: stringArray(8, 300),
    successCriteria: string(1000),
    stopConditions: stringArray(10, 500),
    specialistComment: nullableString(1000)
  }
};

const goalSchema = {
  type: "object",
  additionalProperties: false,
  required: ["id", "title", "measurableOutcome", "steps", "activities"],
  properties: {
    id: string(80),
    title: string(300),
    measurableOutcome: string(1200),
    steps: { type: "array", maxItems: 10, items: stepSchema },
    activities: { type: "array", maxItems: 6, items: activitySchema }
  }
};

export const schemas = {
  development_plan: {
    name: "balaqoldau_development_plan",
    schema: {
      type: "object",
      additionalProperties: false,
      required: [
        "summary", "periodWeeks", "focusAreas", "goals", "progressScale",
        "reviewRecommendation", "missingInformation", "safetyWarnings",
        "requiresProfessionalReview"
      ],
      properties: {
        summary: string(2000),
        periodWeeks: { type: "integer", minimum: 1, maximum: 12 },
        focusAreas: {
          type: "array",
          maxItems: 10,
          items: {
            type: "object",
            additionalProperties: false,
            required: ["id", "title", "reason"],
            properties: { id: string(80), title: string(300), reason: string(1000) }
          }
        },
        goals: { type: "array", maxItems: 8, items: goalSchema },
        progressScale: stringArray(6, 300),
        reviewRecommendation: string(500),
        missingInformation: stringArray(20, 500),
        safetyWarnings: stringArray(20, 500),
        requiresProfessionalReview: { type: "boolean" }
      }
    }
  },

  parent_explanation: {
    name: "balaqoldau_parent_explanation",
    schema: {
      type: "object",
      additionalProperties: false,
      required: [
        "observation", "everydayMeaning", "parentSupport", "avoid",
        "discussWithSpecialist", "warning", "requiresProfessionalReview"
      ],
      properties: {
        observation: string(1500),
        everydayMeaning: string(2000),
        parentSupport: stringArray(10, 700),
        avoid: stringArray(10, 700),
        discussWithSpecialist: stringArray(10, 700),
        warning: nullableString(1000),
        requiresProfessionalReview: { type: "boolean" }
      }
    }
  },

  observation_structure: {
    name: "balaqoldau_observation_structure",
    schema: {
      type: "object",
      additionalProperties: false,
      required: [
        "originalText", "skillArea", "activity", "result", "supportLevel",
        "context", "possibleTrigger", "calmingMethod", "safetyFlag", "confidence"
      ],
      properties: {
        originalText: string(3000),
        skillArea: nullableString(300),
        activity: nullableString(500),
        result: nullableString(500),
        supportLevel: nullableString(300),
        context: nullableString(300),
        possibleTrigger: nullableString(500),
        calmingMethod: nullableString(500),
        safetyFlag: { type: "boolean" },
        confidence: { type: "string", enum: ["low", "medium", "high"] }
      }
    }
  },

  progress_analysis: {
    name: "balaqoldau_progress_analysis",
    schema: {
      type: "object",
      additionalProperties: false,
      required: [
        "improvements", "stableAreas", "difficulties", "helpfulConditions",
        "questionsForSpecialist", "suggestedAdjustments", "parentSummary",
        "insufficientData", "requiresProfessionalReview"
      ],
      properties: {
        improvements: stringArray(12, 700),
        stableAreas: stringArray(12, 700),
        difficulties: stringArray(12, 700),
        helpfulConditions: stringArray(12, 700),
        questionsForSpecialist: stringArray(12, 700),
        suggestedAdjustments: stringArray(12, 700),
        parentSummary: string(2000),
        insufficientData: { type: "boolean" },
        requiresProfessionalReview: { type: "boolean" }
      }
    }
  },

  plan_adjustment: {
    name: "balaqoldau_plan_adjustment",
    schema: {
      type: "object",
      additionalProperties: false,
      required: ["summary", "changes", "requiresProfessionalReview"],
      properties: {
        summary: string(1500),
        changes: {
          type: "array",
          maxItems: 12,
          items: {
            type: "object",
            additionalProperties: false,
            required: ["target", "proposal", "reason", "risk"],
            properties: {
              target: string(300),
              proposal: string(1200),
              reason: string(1200),
              risk: nullableString(700)
            }
          }
        },
        requiresProfessionalReview: { type: "boolean" }
      }
    }
  },

  task_assistant: {
    name: "balaqoldau_task_assistant",
    schema: {
      type: "object",
      additionalProperties: false,
      required: [
        "originalText", "aiDraft", "steps", "successCriteria",
        "stopConditions", "ambiguities", "requiresProfessionalReview"
      ],
      properties: {
        originalText: string(5000),
        aiDraft: string(5000),
        steps: stringArray(12, 700),
        successCriteria: string(1200),
        stopConditions: stringArray(10, 700),
        ambiguities: stringArray(10, 700),
        requiresProfessionalReview: { type: "boolean" }
      }
    }
  }
};

const isObject = value => value && typeof value === "object" && !Array.isArray(value);
const isStringArray = (value, max) => Array.isArray(value)
  && value.length <= max
  && value.every(item => typeof item === "string");

export function validateAIResult(taskType, value) {
  if (!isObject(value)) return false;
  if (typeof value.requiresProfessionalReview !== "boolean") return false;
  if (taskType === "development_plan") {
    return typeof value.summary === "string"
      && Number.isInteger(value.periodWeeks)
      && value.periodWeeks >= 1
      && value.periodWeeks <= 12
      && Array.isArray(value.focusAreas)
      && value.focusAreas.length <= 10
      && Array.isArray(value.goals)
      && value.goals.length <= 8
      && isStringArray(value.missingInformation, 20)
      && isStringArray(value.safetyWarnings, 20);
  }
  if (taskType === "parent_explanation") {
    return typeof value.observation === "string"
      && typeof value.everydayMeaning === "string"
      && isStringArray(value.parentSupport, 10)
      && isStringArray(value.avoid, 10)
      && isStringArray(value.discussWithSpecialist, 10);
  }
  if (taskType === "observation_structure") {
    return typeof value.originalText === "string"
      && ["low", "medium", "high"].includes(value.confidence)
      && typeof value.safetyFlag === "boolean";
  }
  if (taskType === "progress_analysis") {
    return isStringArray(value.improvements, 12)
      && isStringArray(value.difficulties, 12)
      && isStringArray(value.suggestedAdjustments, 12)
      && typeof value.parentSummary === "string"
      && typeof value.insufficientData === "boolean";
  }
  if (taskType === "plan_adjustment") {
    return typeof value.summary === "string"
      && Array.isArray(value.changes)
      && value.changes.length <= 12;
  }
  if (taskType === "task_assistant") {
    return typeof value.originalText === "string"
      && typeof value.aiDraft === "string"
      && isStringArray(value.steps, 12)
      && typeof value.successCriteria === "string";
  }
  return false;
}

