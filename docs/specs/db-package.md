# DB package (Phase 0a build, 0b wiring)

Status: ready
Design doc sections: §4.1, §4.2. Entities: `docs/specs/entities.md`. Phase 0 spec tasks 2-3.

## Goal

`packages/db` holds the SQL migrations, Drizzle schema, RLS policies, and an isolation test suite. It is built and tested now against a local Postgres 16 so that Phase 0b is only pointing it at Supabase.

## Contents

- `migrations/0000_foundation.sql`: every table from `docs/specs/phase-0-foundation.md` (data model section) **plus** the entity tables from `entities.md`: `destinations`, `venues`, `scenarios`, `households`, `guests`, `budget_categories`, `budget_items`, `sub_events`, `wedding_party_members`, `decisions`. `wedding_settings` gains `plan_config jsonb default '{}'`. `weddings` gains `partner_a jsonb`, `partner_b jsonb`, `target_season text`, `is_destination boolean default false`, `active_scenario_id uuid`. Column names snake_case, JSON fields `jsonb`, arrays as `text[]` or `uuid[]`, timestamps `timestamptz default now()`.
- `is_wedding_member(uuid)` security-definer function reading `wedding_members` for `auth.uid()`; a stub `auth` schema with `auth.uid()` reading `current_setting('request.jwt.claim.sub', true)` is created **only when the `auth` schema does not exist** (local Postgres) so the same migration runs on Supabase untouched.
- RLS enabled on every tenant table with policies per the Phase 0 spec (members select; owners write; run/event/cost tables read-only for members).
- `src/schema/*.ts` Drizzle definitions mirroring the SQL exactly; `src/index.ts` exports schema and a `createDb(connectionString)`.
- `src/migrate.ts` (node-postgres + drizzle migrator or plain SQL runner) wired to `pnpm db:migrate`; `src/seed.ts` inserts a demo couple, wedding, settings, 12 tasks across phases, 3 events, 2 destinations with 1 venue each, 2 scenarios (`pnpm db:seed`).
- `test/rls.test.ts` (vitest): starts or connects to Postgres, applies the migration, creates two weddings and two member users, and for each tenant table asserts user 1 (with `request.jwt.claim.sub` set via `set_config` in a non-superuser role that has RLS applied) sees only wedding 1 rows and cannot insert into wedding 2. Fails if any policy is dropped.

## Local Postgres

Docker may be unavailable. Use `/usr/lib/postgresql/16/bin/{initdb,pg_ctl,postgres}`; Postgres refuses to run as root, so create a `pg` system user (or `su` to an existing non-root user) and run `initdb` into a temp dir, start on a free port, and expose `DATABASE_URL`. Provide `scripts/local-pg.sh start|stop` and document it in `packages/db/README.md`. If it truly cannot run here, make the test skip with a printed reason and say so in your report.

## Acceptance

`pnpm --filter @bower/db typecheck lint test` green with the RLS suite actually executing; `pnpm db:migrate` idempotent on a fresh database; `pnpm db:seed` succeeds after migrate.
