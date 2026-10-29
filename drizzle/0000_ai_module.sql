CREATE TABLE IF NOT EXISTS ai_contexts (
  child_profile_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  context_json TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (child_profile_id, user_id)
);

CREATE TABLE IF NOT EXISTS ai_generations (
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
);

CREATE INDEX IF NOT EXISTS ai_generations_user_created_idx
  ON ai_generations (user_id, created_at);

CREATE TABLE IF NOT EXISTS development_plans (
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
);

CREATE INDEX IF NOT EXISTS development_plans_child_status_idx
  ON development_plans (child_profile_id, status);

CREATE TABLE IF NOT EXISTS plan_versions (
  id TEXT PRIMARY KEY,
  plan_id TEXT NOT NULL,
  version INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  created_by TEXT NOT NULL,
  source TEXT NOT NULL,
  approved_by TEXT,
  changes_json TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS plan_versions_plan_version_idx
  ON plan_versions (plan_id, version);

CREATE TABLE IF NOT EXISTS parent_explanations (
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
);

CREATE INDEX IF NOT EXISTS parent_explanations_child_status_idx
  ON parent_explanations (child_profile_id, status, target_language);
