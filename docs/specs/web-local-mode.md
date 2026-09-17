# Web app, local data mode (Phase 0a)

Status: ready
Design doc sections: §2.1, §2.6, §5, §6 Phase 0a. Entities: `docs/specs/entities.md`.

## Goal

A hosted, usable app for the couple this weekend with no accounts: static export deployed to GitHub Pages, all data in the browser (IndexedDB), JSON export/import to move data between devices until Supabase arrives. Same UI code will later run against Supabase.

## Data layer (`packages/shared`)

- Types + Zod schemas for every entity in `entities.md` (`src/entities/*.ts`, `src/index.ts` re-exports).
- `src/repo/types.ts` (`WeddingRepo`), `src/repo/local.ts` (Dexie, database name `bower`, one table per entity, indexes on `weddingId`), `src/repo/index.ts` with `createRepo(mode)`.
- `exportJson` / `importJson` round-trip everything for one wedding.
- Unit tests with `fake-indexeddb`.

## Timeline engine (`packages/shared/src/timeline`)

- `template.ts`: ~50-70 template tasks authored from design doc §2.1-2.5, each `{ templateId, title, description?, phase, monthsBefore, tags, destinationOnly?, anchorKind?, dependsOn }`. Comms tasks (`save_the_dates`, `invitations`, `rsvp_deadline`) take their `monthsBefore` from `PlanConfig`, not the template.
- `generatePlan({ wedding, planConfig, existingTasks }) => Task[]`:
  - due date = targetDate minus `monthsBefore` (or targetSeason's first day when only a season is known; mark `dueDate` undefined when nothing is known and keep phase ordering).
  - anchors: a `save_the_dates` anchor with a date wins over `saveTheDatesMonthsBefore`; an `engagement_party` anchor creates an Event of kind `anchor` and a "Prepare engagement party materials" task 8 weeks before it; if the engagement party `reveals` the date/destination/wedding party, the tasks "finalize date", "pin destination scenario", "choose wedding party" get due dates 2 weeks before it.
  - travel windows: tasks tagged `in-person` are assigned `windowId` of the latest window that ends before their due date (or the earliest window after, with a `needs-window` tag if none precede); the Plan page shows them grouped under the window.
  - regeneration preserves user edits: existing tasks matched by `templateId` keep `status`, edited `title`, and any manually changed `dueDate` unless `overrides[templateId]` says otherwise; `skipped` overrides mark the task skipped.
- Unit tests covering each rule above.

## Routes (`apps/web`, App Router, all client components in local mode)

Local mode uses a single wedding with slug `our-wedding`; no auth. A "Viewing as: partner A / partner B" toggle in the top bar (localStorage) is stored on edits as `decidedBy`.

- `/` → redirects to `/w/our-wedding` (create the wedding with placeholder names on first visit and send to intake).
- `/w/[slug]` Home: countdown (days to targetDate, or "Spring 2028" style when only a season), next anchor countdown, this week's tasks (due within 7 days or overdue), pinned scenario summary card (expected guests, total, per guest), budget snapshot (sum of estimates vs scenario total), quick links.
- `/w/[slug]/intake`: multi-step form of the design doc §8 questions (names + pronouns, date/season + flexibility, destination candidates, size, budget range + priorities, vibe, wedding party, satellite events wanted, policies, helpers, tools, the "could not have done this without" sentence). Saves to `Wedding`, `Settings.planConfig`, seeds `Destination` rows from candidates, seeds `SubEvent` rows from the events chosen, then regenerates the plan.
- `/w/[slug]/plan`: tasks grouped by phase (collapsible), each row inline-editable (title, due date, status), tag chips, window grouping for in-person tasks, add-task, "Regenerate from template" button, and a Plan Settings panel to edit anchors, travel windows, and the three comms offsets.
- `/w/[slug]/destinations`: destinations list with add/edit drawer; expanding a destination shows its venues (add/edit, status pipeline chip); a Scenarios section with a builder (pick destination, venue, dates, guest assumption, attendance rate, fixed, per-guest, travel) and a **comparison table** with scenarios as columns and rows: expected guests, total cost, cost per guest, guest travel burden, weather notes, legal notes, unknowns (free text); "Pin" sets `wedding.activeScenarioId`.
- `/w/[slug]/guests`: table (name, household, side, tier, plus-one, child, home city) with add/edit, counts by tier and side, a "cut at N" slider that shows which tiers fit.
- `/w/[slug]/budget`: categories seeded with typical percentages (venue+catering 45, photo/video 12, attire 7, flowers/decor 9, music 7, stationery 3, cake 2, transport 2, rings 3, planner 5, gifts/favors 2, contingency 3), items with estimate/quoted/contracted/paid, totals, and the pinned scenario's total shown as the target.
- `/w/[slug]/events`: satellite events cards (kind, date, host, location, budget estimate, notes) with add/edit.
- `/w/[slug]/party`: wedding party members (role, side, asked, contact) with add/edit.
- `/w/[slug]/calendar`: month list of Events + task due dates + anchors + travel windows; "Download .ics" of everything (generate client-side).
- `/w/[slug]/files`: empty state explaining files arrive with Phase 0b.
- `/w/[slug]/settings`: names, date, flexibility, guest target, destination toggle, export JSON (download), import JSON (file input, confirms overwrite), reset all data, data-mode badge ("Local: this device only").
- Concierge drawer button in the top bar opens a panel that explains agents arrive in Phase 0b.

## Design

Invoke the `anthropic-skills:frontend-design` skill before writing UI. Warm and editorial, not a generic admin template; readable at 375px; light and dark. Keep dependencies to: dexie, zod, date-fns, lucide-react, shadcn/ui components already in the repo plus what you add via the shadcn CLI. No state libraries; a small `useRepo()` hook + React state is enough.

## Static export and Pages

- `NEXT_PUBLIC_DATA_MODE=local NEXT_PUBLIC_BASE_PATH=/Wedding-Planner pnpm --filter @bower/web build` must succeed; dynamic route `/w/[slug]` needs `generateStaticParams` returning `our-wedding`.
- `.github/workflows/pages.yml`: on push to the default branch and manual dispatch; `actions/checkout`, pnpm setup with cache, `pnpm install --frozen-lockfile`, the build above, `actions/configure-pages@v5` with `enablement: true` (`continue-on-error: true`), `actions/upload-pages-artifact` from `apps/web/out`, `actions/deploy-pages`. Permissions: `pages: write`, `id-token: write`, `contents: read`.

## Tests

- Vitest: timeline engine, scenario math, local repo round trip.
- Playwright smoke (`apps/web/e2e/smoke.spec.ts`, Chromium from `PLAYWRIGHT_BROWSERS_PATH`, never run `playwright install`): loads `/`, completes a minimal intake, sees a countdown on Home, sees generated tasks on Plan, adds a destination + scenario and sees it in the comparison table, exports JSON.

## Acceptance

`pnpm typecheck && pnpm lint && pnpm test` green; static export builds; smoke passes against `next start` or a static server serving `apps/web/out`.
