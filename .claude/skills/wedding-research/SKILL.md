---
name: wedding-research
description: How Bower researches destinations, venues, vendors, and costs with sources, and the seed/entity shapes the findings go into. Load for any task that produces numbers, venue lists, legal notes, or advice for the couple.
---

# Wedding research standard

## Rules

1. **No number without a source.** Every figure carries a URL in `sourceUrls`, or the record says `estimated: true` and its note explains the derivation ("midpoint of three 2025 planner ranges", "F&B minimum ÷ 100 guests").
2. **Prefer** venue websites, government pages (marriage license, visas), The Knot / Zola / WeddingWire studies, and established planner blogs. Recent (2024-2026). Reddit threads count as sources for *advice*, never for prices.
3. **USD, whole dollars.** Convert with the current rate and note it.
4. **Legal notes end with** "Verify with the local authority or an attorney."
5. **Write for the couple:** Joshua & Janel, spring 2028, ~100 guests, most on the US East Coast, Brazil is the front-runner. `whyHere` is specific to them.
6. **Never invent a venue.** If a place cannot be found on the web, it does not go in.

## Shapes

- Seed modules: `packages/shared/src/seed/types.ts` (`DestinationSeed`, `VenueSeed`, `CostBenchmarks`). Register new modules in `packages/shared/src/seed/registry.ts`.
- Runtime entities: `docs/specs/entities.md` (`Destination`, `Venue`, `Scenario`), created through `add_destination` / `add_venue` actions in `packages/shared/src/ai/actions.ts`.

## Per-destination checklist

Travel cost per guest (airfare from NYC/DC/ATL + 3 nights) with the math · lodging per night · attendance estimate with a cited basis · weather for the target months · legal requirements · season and holidays · airports and transfers · 3-4 real venues across price points · a 100-guest scenario (fixed, per guest, travel) with derivation notes.

## Reading Reddit for advice

WebSearch "site:reddit.com r/weddingplanning <topic>" or r/destinationwedding, then WebFetch the thread (old.reddit.com works best). Quote the idea, not the text; cite the thread URL. Favor long-lead-time and destination advice: hotel blocks, welcome parties, save-the-dates a year out, legal ceremony at home, guest travel subsidies, what people wish they had skipped.

## Verify before reporting

`pnpm --filter @bower/shared typecheck` passes; every `sourceUrls` array is non-empty; scan your file for any number whose origin you cannot name.
