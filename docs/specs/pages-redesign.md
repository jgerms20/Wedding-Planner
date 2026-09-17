# Plan, Budget, Guests, Events, Party, Files, Settings, Intake redesign spec

Status: ready
Skills to load first: `bower-design`. Plan "Bower overhaul" §4. Reference implementation: `apps/web/src/app/w/[slug]/page.tsx` (Home), `apps/web/src/components/wedding-shell.tsx`, `apps/web/src/components/page-header.tsx` (use its `eyebrow` prop).

General: keep every existing behavior and data flow; change presentation, reduce manual input, and add estimates and empty states. Lists are lists, not rows of inputs: click to edit inline or in the existing dialog. Every seeded number shows its source (the item's `notes` or `sourceUrls`).

## Plan (`plan/page.tsx`)

- Phases as chapter openers: a large Fraunces phase title with the phase's date span and a progress fraction ("4 of 12"), then tasks grouped by month with a small month label.
- Task row: circle check (one tap → done, with a brief strike animation), title (click to edit inline), due date (click → date input), tags as chips, dependency hint ("after: Book venue") when `dependsOn` has an open task, in-person tasks show their travel window chip or "needs a trip".
- Right column (desktop) / top card (mobile): **Anchors** (list with dates and what they reveal) and **Travel windows** with the nudge "Add the dates you'll be on the East Coast; Bower will schedule tours and tastings into them" and an inline add form (label, start, end, location). Both edit `settings.planConfig` and regenerate via the existing regenerate flow.
- "Regenerate from template" moves into a small overflow menu with "Plan settings".
- Empty state (no tasks): one sentence and a "Build the plan" button that runs the existing generate.

## Budget (`budget/page.tsx`)

- Header shows the pinned scenario's total as the target and the sum of estimates; a per-guest slider (50–200) that previews the total using `scenarioMath({ ...pinned, guestAssumption })` and, on release, updates the pinned scenario's `guestAssumption` and calls `reestimateBudgetFromScenario` from `@bower/shared`.
- Category bars: one row per category with name, target percent, a bar of estimate vs target share, and the four money states as small tabular numbers; expanding shows the items.
- Item row: name, estimate / quoted / contracted / paid as click-to-edit numbers, due date, an "estimate" chip when `isAutoEstimated(item)`, and a "Sources" link that opens the **How we estimated this** drawer: the item's `notes` with URLs rendered as links.
- "Re-estimate from scenario" button (calls `reestimateBudgetFromScenario`).

## Guests (`guests/page.tsx`)

- Top: counts by tier (must / should / nice) and by side as three stat tiles, the "cut at N" slider showing which tiers fit and the resulting count.
- Table grouped by household (household name as a group header, members beneath), columns: name, side, tier, city, plus-one, child, dietary. Inline edit for tier and side (select), dialog for the rest.
- Hint line above the table: "Fastest way in: talk to the bar below. 'Add the Robinsons from DC, four of them, must-invite.'"
- CSV import kept (existing), restyled.

## Events (`events/page.tsx`)

- One `.postcard` per satellite event ordered by date: kind chip, title, date (or "date to pick"), location, host, budget estimate with "estimate" chip and the note as a caption, guest rule. Click to edit (existing dialog). "Add event" keeps the kind select.

## Party (`party/page.tsx`)

- Role scaffold when a role has no one: cards for maid/matron of honor, best man/best woman, bridesmaids, groomsmen, officiant, flower kid, ring bearer, readers, each with 2-3 duties in a caption and an inline "Add name" input that creates the member with that role. Existing members render as postcards with name, role, side, "asked" toggle, contact.

## Files (`files/page.tsx`)

- Empty state in the system: what will live here (contracts, quotes, inspiration, licenses, vows) and that uploads arrive with accounts.

## Settings (`settings/page.tsx`)

- Sections: **You two** (names, pronouns optional, season/date, flexibility, guest target, destination toggle), **Data** (export JSON, import JSON, "Restore the Joshua & Janel seed" which calls `restoreSeed` from `apps/web/src/lib/bootstrap.ts` after a confirm, then `touch()`), **Appearance** (theme: system/light/dark using `localStorage["bower:theme"]` and dispatching `bower:theme`), and a slot comment `{/* ai-settings slot: ConnectClaudeCard + AiUsageCard */}` placed between You two and Data (integrated at merge).

## Intake (`intake/page.tsx`)

- Reframe as "Refine our profile": no redirect logic, prefilled from the current wedding, same steps, "Save" instead of "Build my plan", and after save regenerate the plan preserving edits.

## Tests

- Update `apps/web/e2e/smoke.spec.ts`: first load lands on Home with "Joshua & Janel" and "Spring 2028"; Plan shows phase chapters; Budget shows the "estimate" chip and the drawer opens; Guests slider renders; Settings restore button exists. Remove the intake-first flow from the smoke.

## Acceptance

`pnpm --filter @bower/web typecheck lint test` green; static export builds; the Playwright smoke passes against the static server; screenshots at 1280 and 375 of Plan, Budget, Guests, Settings match the system.
