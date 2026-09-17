# Atlas and Calendar pages spec

Status: ready
Skills to load first: `bower-design`. Plan "Bower overhaul" §1 and §4. Reference implementation of the system: `apps/web/src/app/w/[slug]/page.tsx` (Home) and `apps/web/src/components/wedding-shell.tsx`.

## Atlas (`apps/web/src/app/w/[slug]/destinations/page.tsx`, components under `apps/web/src/components/atlas/`)

Data: `destinations`, `venues`, `scenarios`, `wedding.activeScenarioId`, `wedding.guestTarget`. Seeded destinations carry `notes` (why here + travel notes), `weatherNotes`, `legalNotes`, `seasonNotes`, `sourceUrls`, `travelCostPerGuestEstimate`, `lodgingPerNightEstimate`, `attendanceRateEstimate`. Country code for the stamp: `countryCode()` in `apps/web/src/lib/country-code.ts`.

1. **Header**: eyebrow "The atlas", title "Where it could be", description "Destination → venue → date. Compare, then make one the plan." Actions: Add destination (existing dialog restyled), and a slot comment `{/* research-venues-button slot */}` inside each destination card header (integrated at merge).
2. **Postcard grid** (`grid sm:grid-cols-2 xl:grid-cols-3`): each destination is a `.postcard` with the `.stamp`, name, region, "Front-runner" chip when it is the pinned scenario's destination, and four facts: total (from its scenario via `scenarioMath`), per guest to get there, likely to come (`round(guestTarget × attendance)`), lodging per night. Click expands (in place, accordion) to: "Why here" (first paragraph of notes), weather / season / legal / travel as labeled paragraphs, a **Sources** row of link chips (hostnames), the venue list, and an "Edit destination" button.
3. **Venues** inside the expanded card: rows with name (link to website), capacity, rental fee, F&B minimum, per-guest cost, chips for "lodging on site" / "in-house catering", "estimate" chip when styleNotes mention estimates, a status select (pipeline enum), sources as link chips, and edit. "Add venue" opens the existing dialog restyled.
4. **Scenarios: the comparison matrix**: a horizontally scrollable table with scenarios as columns and rows: destination, dates, guests invited, likely to come, fixed costs, per-guest cost, total, cost per guest, guest travel burden, notes (how derived). Pinned column highlighted with a coral top border and "Our plan" chip; other columns show the delta vs pinned on total and cost per guest (coral when higher, ink-soft when lower). Column actions: "Make this our plan" (calls `pinScenario` from `@bower/shared`, then `touch()`), Edit, Duplicate. "New scenario" opens the builder dialog (existing, restyled) with the destination preselected when launched from a card.
5. **Guest target control**: a small inline number at the top ("Planning for 100 invited") that edits `wedding.guestTarget` and updates every scenario's `guestAssumption` when they still equal the old target.
6. Empty state: "No destinations yet. Tell Bower a place, or add one."

## Calendar (`apps/web/src/app/w/[slug]/calendar/page.tsx`, `apps/web/src/components/calendar/month-grid.tsx`)

Data: `events` (kinds anchor / sub_event / travel / tour / deadline / other), task due dates (open tasks), `settings.planConfig.anchors`, `settings.planConfig.travelWindows`.

1. **Month grid** with date-fns: 7 columns, weeks as rows, previous/next month and a "Today" button, the month title in Fraunces. Each day cell shows up to 3 chips (color by kind: anchor = coral, sub_event = gold, task = ink-soft, travel = ink) and "+N more". Travel windows render as a light ink band across their days. Today has a coral ring.
2. Clicking a day opens a side list (right column on desktop, below on mobile) of everything that day with links to the entity's page.
3. **Agenda** below the grid: the next 12 items across months, grouped by month.
4. Keep the `.ics` export as a secondary outline button labeled "Add to Google / Apple Calendar" with a one-line explanation (downloads a file to import; live sync arrives with accounts).
5. Initial month: the month of the next upcoming item, else today.

## Tests

- Vitest unit test for the month-grid date math (weeks, leading/trailing days) in `apps/web/test/month-grid.test.ts`.
- Extend `apps/web/e2e/smoke.spec.ts` with: Atlas shows six postcards and a matrix with six columns and one "Our plan" chip; Calendar shows a 7-column grid and the anchor event in April 2027 after navigating.

## Acceptance

`pnpm --filter @bower/web typecheck lint test` green; static export builds; screenshots at 1280 and 375 of both pages look like the Home page's system (no horizontal page scroll; nothing under the bottom bars).
