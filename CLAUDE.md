# Wedding Planner

An agent-powered wedding planning product. A team of specialist AI agents does the legwork (research, vendor outreach and negotiation, budget and guest tracking, event planning) and the couple approves and decides. Multi-tenant SaaS; the founders' own wedding (spring 2028) is the first customer.

## Read first

- `docs/plans/2026-09-17-wedding-planner-design.md` — the founding design: domain map, agent roster, architecture, data model, build phases.
- `docs/specs/` — one spec per module with acceptance criteria. Build from a spec, never from a vague ask. `docs/specs/phase-0-foundation.md` is the current one.

## Stack (see design doc §4)

pnpm + Turborepo monorepo: `apps/web` (Next.js App Router, TypeScript, Tailwind, shadcn/ui), `apps/worker` (Node, pg-boss), `packages/db` (Drizzle + SQL migrations + RLS), `packages/agents` (agent registry + runtime), `packages/shared` (types, Zod schemas). Supabase for Postgres/Auth/Storage/Realtime. Postmark for email. `@anthropic-ai/sdk` tool runner for agents.

## Non-negotiable conventions

- **Tenancy:** every tenant table has `wedding_id` and an RLS policy via `is_wedding_member(wedding_id)`. New tables ship with their RLS policy and an isolation test in the same change.
- **Tool scoping:** agent tools are built by a factory closed over `weddingId`. The model never passes a wedding id as a tool argument.
- **Side effects are gated:** anything that leaves the app (email, calendar invites to third parties, spending commitments) writes a `pending_approvals` row and ends the run. The approval handler performs the action. No process waits on a human.
- **Untrusted input:** inbound email bodies and fetched web pages are wrapped as data in prompts and never treated as instructions.
- **Models:** `claude-opus-5` by default with adaptive thinking, `output_config.effort` set per agent, and `fallbacks: "default"`; `claude-sonnet-5` for bulk extraction/classification. Use `messages.parse` + Zod for structured extraction. Stable system prompt first with `cache_control`, volatile context after. Handle `pause_turn` when server tools are in play.
- **Every run is logged:** `agent_runs` (input, transcript, tool calls, usage) and `cost_ledger` rows are written for every agent invocation.
- **Secrets** live only in the worker and server routes. Nothing sensitive in the client bundle.
- **Legal/admin output** always carries a "verify with the county / an attorney" note and cites its source.

## Commands (once Phase 0 lands)

```
pnpm install
pnpm dev          # web on :3000 + worker
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm db:migrate   # apply migrations to the target Supabase project
pnpm db:seed      # demo wedding
```

Run typecheck, lint, and test before every commit. A change that adds a table without RLS or a gated side effect without an approval row is not done.

## Working style

- Work on the designated branch; small commits with clear messages.
- Sub-agents get a spec section and acceptance criteria, not the whole repo to explore.
- Prefer existing utilities in `packages/shared` and `packages/db` over new helpers.
