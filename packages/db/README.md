# @bower/db

SQL migrations, Drizzle schema, RLS policies, and the RLS isolation test
suite for Bower. Built and tested against a local Postgres 16 so that
pointing this at a real Supabase project (Phase 0b) is just changing
`DATABASE_URL`.

See `docs/specs/db-package.md`, `docs/specs/entities.md`, and the "Data
model" section of `docs/specs/phase-0-foundation.md` for the spec this
implements.

## Contents

- `migrations/0000_foundation.sql` — every table, the `is_wedding_member` /
  `is_wedding_owner` functions, RLS policies, and the Supabase realtime
  publication. Written to run unchanged on a bare local Postgres 16 (no
  Supabase installed) and on a real Supabase project — see the comment at
  the top of the file.
- `src/schema/*.ts` — Drizzle table definitions mirroring the SQL exactly.
- `src/index.ts` — exports `schema` and `createDb(connectionString)`.
- `src/migrate.ts` — applies every `.sql` file under `migrations/` that
  hasn't been recorded in the `_bower_migrations` tracking table yet, each
  in its own transaction. Every migration is also idempotent at the SQL
  level (`create table if not exists`, `create or replace function`,
  `drop policy if exists` + `create policy`, guarded `do` blocks), so
  re-running it — tracked or not — is a no-op. Wired to `pnpm db:migrate`.
- `src/seed.ts` — inserts one demo wedding end to end (a couple, settings,
  12 tasks across every lifecycle phase, 3 events, 2 destinations with 1
  venue each, 2 comparison scenarios). Safe to re-run: it does nothing if
  `demo-wedding` already exists. Wired to `pnpm db:seed`.
- `test/rls.test.ts` — the RLS isolation suite (see below).
- `scripts/local-pg.sh` — starts/stops a local Postgres 16 without Docker.

## Local Postgres (no Docker)

Postgres refuses to run as root, so it runs as a dedicated OS user. Once
per machine:

```sh
useradd -m pg   # as root; only needed once
```

Then:

```sh
packages/db/scripts/local-pg.sh start   # initdb (first run only), start, createdb
# -> prints DATABASE_URL, e.g. postgresql://pg@127.0.0.1:5544/bower
export DATABASE_URL=postgresql://pg@127.0.0.1:5544/bower

pnpm db:migrate
pnpm db:seed
pnpm --filter @bower/db test

packages/db/scripts/local-pg.sh stop
```

The script binds to `127.0.0.1` on port `5544` (override with
`LOCAL_PG_PORT`), stores its data directory under the `pg` user's home
(override with `LOCAL_PG_DATA`), and uses `trust` auth locally, so no
password is needed. See the top of `scripts/local-pg.sh` for every
override (`LOCAL_PG_BIN`, `LOCAL_PG_USER`, `LOCAL_PG_DB`, …).

`scripts/local-pg.sh status` reports whether it's running, and `... url`
prints the connection string without (re)starting anything.

## RLS isolation test

`test/rls.test.ts` requires a real, reachable `DATABASE_URL` — **it does
not skip**. It:

1. runs the migration against that database (idempotent, see above);
2. creates two weddings, each with one owner;
3. inserts one row into every tenant table for each wedding, directly as
   the table-owning role (which bypasses RLS, same as any migration
   runner);
4. opens two ordinary Postgres sessions under a dedicated login role that
   is a member of `authenticated` — no superuser, no table ownership —
   and, in each, runs `set role authenticated` plus
   `select set_config('request.jwt.claim.sub', <user id>, false)` so
   `auth.uid()` resolves the way it would from a real Supabase JWT claim;
5. asserts, acting as each owner: their `SELECT` only ever returns their
   own wedding's rows (with the admin connection confirming the other
   wedding's row genuinely exists — it's hidden by RLS, not just absent);
   they **can** insert into their own wedding (a positive control — a
   suite that denies everything would trivially "pass" isolation checks
   without proving any policy actually grants access); they **cannot**
   insert into the other wedding; and the `agent_runs` / `agent_events` /
   `cost_ledger` tables are read-only for members (no owner-write policy —
   only the worker's `service_role` writes them, bypassing RLS entirely).

Because policies for `FOR ALL` (write) already permit `SELECT` for an
owner, and every member is currently an owner (only the `owner` role is
issued today — see `docs/specs/phase-0-foundation.md`), dropping a
table's `_select` policy alone won't fail the suite by itself; dropping
its `_write` policy, disabling RLS, or removing `is_wedding_owner`/
`is_wedding_member` will. This was verified by hand while building the
suite (dropping `tasks_write` turned the "can insert into own wedding"
assertion red immediately).

## Bootstrap note (for whoever wires Phase 0b's onboarding flow)

`weddings` and `wedding_members` use the same members-select /
owners-write policies as every other tenant table. That means creating a
*brand new* wedding — where no `wedding_members` row exists yet — can't
go through the `authenticated` role's own RLS-checked insert (there's no
owner yet to satisfy the check). The onboarding server action should
create the wedding and its first `wedding_members` row using the
service-role connection (which bypasses RLS), consistent with
`CLAUDE.md`'s "secrets live only in the worker and server routes" rule.

## Environment variables

- `DATABASE_URL` — required by `migrate`, `seed`, and the RLS test suite.
- `LOCAL_PG_*` — optional overrides for `scripts/local-pg.sh` (see its
  header comment).
