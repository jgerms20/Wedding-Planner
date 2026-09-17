# Phase 0: Foundation spec

Status: in progress (0a)
Design doc sections: §2.1, §2.6, §4, §4.2, §4.3, §6 Phase 0a/0b

## Goal

Both partners can sign in, create or join their wedding, see the empty dashboard shell, and trigger a test agent whose steps and cost appear live in an activity feed. Deploy pipeline and CI exist. Everything after this phase is a feature on top of this skeleton.

## Prerequisites (owner supplies)

- Supabase project (or local `supabase start` with Docker) and its URL, anon key, service role key, DB URL
- Anthropic API key
- GitHub Actions enabled on the repo
- Vercel project (web) and Railway or Fly.io service (worker); can come last
- Product name is not needed yet

## Data model (migration `0000_foundation`)

- `profiles` (id = auth.users.id, display_name, pronouns, created_at); trigger creates a row on auth signup
- `weddings` (id, slug unique, partner_a_name, partner_b_name, target_date nullable, date_flexibility enum[fixed, month, season, open], location_text, style_notes, guest_target int, created_by, created_at)
- `wedding_members` (wedding_id, user_id, role enum[owner] for now (viewer/editor/planner reserved), invited_email, accepted_at); PK (wedding_id, user_id)
- `wedding_invites` (id, wedding_id, email, token, expires_at, accepted_by)
- `wedding_settings` (wedding_id PK, autonomy jsonb default {}, notifications jsonb default {}, monthly_cost_cap_cents int default 5000)
- `tasks` (id, wedding_id, title, description, phase text, due_date, status enum[todo, doing, done, skipped], depends_on uuid[] , source_agent text, created_at, updated_at)
- `events` (id, wedding_id, title, starts_at, ends_at, all_day bool, kind text, linked_type text, linked_id uuid)
- `agent_runs` (id, wedding_id, agent text, trigger text, status enum[queued, running, awaiting_approval, done, failed], input jsonb, output jsonb, transcript jsonb, model text, input_tokens, output_tokens, cache_read_tokens, cache_write_tokens, cost_cents numeric, started_at, finished_at, error text)
- `agent_events` (id bigserial, run_id, wedding_id, seq int, kind enum[thinking, text, tool_call, tool_result, approval_requested, done, error], payload jsonb, created_at)
- `pending_approvals` (id, wedding_id, run_id, action_type text, payload jsonb, status enum[pending, approved, rejected, executed, failed], decided_by, decided_at, note text, created_at)
- `cost_ledger` (id, wedding_id, run_id, model, input_tokens, output_tokens, cache_read_tokens, cache_write_tokens, cost_cents, created_at)
- Function `is_wedding_member(w uuid) returns boolean` (security definer, checks `wedding_members` for `auth.uid()`)
- RLS enabled on every table above; policies: members can select; owners can insert/update/delete on their wedding; `agent_runs`/`agent_events`/`cost_ledger` are read-only for members (worker writes with service role)
- Realtime enabled on `agent_events` and `pending_approvals`

## UI

Routes (App Router):
- `/login` — magic link + Google sign-in (Supabase Auth UI or custom)
- `/onboarding` — create wedding (names, slug auto, target date or flexibility, guest target) or accept invite via `/invite/[token]`
- `/w/[slug]` layout — sidebar nav: Home, Plan, Budget, Guests, Vendors, Events, Party, Files, Calendar, Settings; top bar with wedding name and countdown; Concierge drawer button (placeholder)
- `/w/[slug]` Home — countdown, "this week" (empty state), budget snapshot (empty), pending approvals count, activity feed (live)
- `/w/[slug]/activity` — list of `agent_runs`, click into a run to see `agent_events` streaming
- `/w/[slug]/settings` — partner invite (email → invite link shown; email sending arrives with Postmark in Phase 2), members list
- Every other nav item renders a titled empty state

## Agent runtime (`packages/agents` + `apps/worker`)

- `defineAgent({ name, description, system, tools: (ctx) => Tool[], model, effort, maxIterations })`
- `runAgent({ weddingId, agent, input, trigger })`: creates `agent_runs` row, builds tools via factory closed over `weddingId`, calls `client.beta.messages.toolRunner` with `betaZodTool` tools, streams each iteration to `agent_events`, resumes `pause_turn`, records usage to `agent_runs` and `cost_ledger`, sets status
- Request shape: `model: "claude-opus-5"`, `thinking: { type: "adaptive" }`, `output_config: { effort }`, `betas: ["server-side-fallback-2026-07-01"]`, `fallbacks: "default"`, system as content blocks with `cache_control` on the stable block, then a wedding snapshot text block
- Gated tool helper: `gatedTool({ name, schema, actionType })` inserts `pending_approvals` and returns "Queued for approval: <id>"; run status becomes `awaiting_approval` if any approval was requested
- Queue: pg-boss on the Supabase Postgres, queue `agent.run`; worker entry `apps/worker/src/index.ts`
- First agent `hello`: system prompt "You are the wedding concierge"; tools `get_wedding_summary` (reads weddings + counts) and `propose_task` (gated, actionType `create_task`); effort `low`
- API: `POST /api/agents/run` (auth required, verifies membership) enqueues; `POST /api/approvals/[id]` approve/reject; approval handler for `create_task` inserts the task
- Fake-client mode: `ANTHROPIC_FAKE=1` swaps in a scripted client so tests and CI never hit the API

## Phase 0a tasks (no accounts needed)

A. **Monorepo scaffold** (= task 1 below).
B. **Data access layer.** `packages/shared/src/repo/` defines `WeddingRepo` (weddings, tasks, events, destinations, scenarios, guests, budget items, decisions, settings) and `packages/shared/src/repo/local.ts` implements it on IndexedDB (Dexie) with `exportJson()` / `importJson()`. The Supabase adapter is Phase 0b. Data mode is chosen by `NEXT_PUBLIC_DATA_MODE=local|supabase`.
C. **Web app in local mode.** All routes from the UI section, plus: `/w/[slug]/intake` (the §8 questions as a form that seeds the profile), Plan page with the template timeline generated from date + anchors + travel windows and editable inline, Destinations page with destinations → venues and a scenario comparison table (manual entry, computed cost per guest and total from simple inputs), Settings with export/import JSON. Static export (`output: "export"`) must build.
D. **GitHub Pages deploy.** Workflow on push to the default branch builds the static export with `NEXT_PUBLIC_DATA_MODE=local` and a `basePath` of `/Wedding-Planner`, uploads it with `actions/upload-pages-artifact`, deploys with `actions/deploy-pages`, and tries `actions/configure-pages` with `enablement: true`.
E. **DB package** (= tasks 2-3) tested against a local Postgres 16 started from `/usr/lib/postgresql/16/bin` when Docker is unavailable.
F. **Agent runtime with fake client** (= task 6, minus the API route which needs Supabase auth).

## Tasks

1. **Monorepo scaffold.** pnpm workspaces, Turborepo, shared tsconfig/eslint/prettier, `apps/web` (Next.js, Tailwind, shadcn/ui init with a neutral theme), `apps/worker` (tsx runtime), `packages/{db,agents,shared}` with placeholder exports, root scripts from CLAUDE.md, `.env.example` listing every variable. Acceptance: `pnpm install && pnpm typecheck && pnpm lint && pnpm build` green; `pnpm dev` starts both apps.
2. **Migration + Drizzle schema.** SQL migration `0000_foundation` under `packages/db/migrations`, matching Drizzle schema in `packages/db/src/schema`, `is_wedding_member` function, RLS policies, realtime publication. Acceptance: migration applies to a fresh database; `pnpm db:migrate` idempotent.
3. **RLS isolation test.** Vitest suite in `packages/db/test/rls.test.ts`: two users, two weddings, each user's anon-key client can read only their wedding's rows across every tenant table. Acceptance: fails if any policy is removed.
4. **Auth + onboarding.** Supabase Auth (magic link, Google), middleware protecting `/w/*`, `/onboarding` create-wedding form (server action), invite creation and `/invite/[token]` acceptance that adds a second owner. Acceptance: Playwright test signs in two users and both land on the same wedding.
5. **App shell + empty states.** Layout, nav, countdown component (handles no date/flexible date), empty states for every route, responsive at 375px. Acceptance: Playwright smoke visits every nav item without console errors.
6. **Agent runtime + hello agent.** As specified above, including fake-client mode and unit tests for `runAgent` (logs events, records usage, handles `pause_turn`, marks `awaiting_approval`). Acceptance: with `ANTHROPIC_FAKE=1`, running `hello` produces an `agent_runs` row with events and a pending approval.
7. **Activity feed + approvals UI.** Live feed on Home and `/activity` via Supabase Realtime; approvals list with approve/reject; approving a `create_task` shows the task in Plan. Acceptance: end-to-end with the fake client in Playwright.
8. **Seed script.** `pnpm db:seed` creates a demo couple, wedding, a dozen tasks across phases, three events. Acceptance: Home shows countdown and this-week items after seeding.
9. **CI + deploy.** GitHub Actions (typecheck, lint, test, build; Postgres service container for the RLS test), Vercel project for `apps/web`, Railway/Fly config for `apps/worker`, `docs/runbooks/deploy.md`. Acceptance: green check on the PR; preview URL loads `/login`.

Tasks 1 → 2 → (3, 4, 5 in parallel) → 6 → 7 → (8, 9 in parallel).

## Tests

- Unit: runtime, gated tool helper, countdown math
- RLS isolation suite (task 3)
- Playwright: login, onboarding, invite, nav smoke, hello-agent end to end
- No live Anthropic calls in CI

## Open questions

- Google sign-in needs an OAuth consent screen with basic scopes only; fine to defer and ship magic link first.
- Local Supabase needs Docker; cloud dev sessions may need a hosted dev project instead.
