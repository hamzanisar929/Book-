ALTER TABLE ibook.users ADD COLUMN IF NOT EXISTS clerk_id text;
CREATE UNIQUE INDEX IF NOT EXISTS users_clerk_identity ON ibook.users(clerk_id) WHERE clerk_id IS NOT NULL;
ALTER TABLE ibook.users ADD COLUMN IF NOT EXISTS preferences jsonb NOT NULL DEFAULT '{}';
ALTER TABLE ibook.users ADD COLUMN IF NOT EXISTS onboarding_completed boolean NOT NULL DEFAULT false;
ALTER TABLE ibook.reel_media ADD COLUMN IF NOT EXISTS payload bytea;
