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
7. **Never a plantation, and never a property whose marketed history includes enslaved people, full stop.** The couple has stated this in the clearest possible terms and it is not negotiable. This is broader than the word "plantation" — it covers any venue that markets or preserves a "slave quarters," "servants' quarters" (a common euphemism for the same thing), or similar structure as part of its historic charm, whether the property was a rural plantation or a wealthy urban household. New Orleans' "Race & Religious" is the confirmed example that triggered this rule: its own marketing describes a preserved two-story "slave quarter" building as part of the venue, despite being an urban Creole-cottage property, not a rural estate — a former plantation marketed today as a "historic estate," "manor," "antebellum home," or "historic Southern venue" carries the same disqualifying history under a gentler name ("restored," "charming," "live-oak-lined" is exactly the marketing language a plantation-turned-event-venue uses). Any venue built roughly 1700s-1890s in the South — and this includes urban courtyard mansions and townhouses, not just rural estates, since domestic slavery among wealthy Creole/Southern households was common and its quarters are often preserved as a selling point — gets its actual history checked (who built it, what it operated as, whether any part of the property is marketed around enslaved labor) before it goes in a seed file. Purpose-built commercial/industrial buildings (former banks, warehouses, refineries, convents, museums) carry much lower risk than converted private residences, and are the safer category to reach for first. When history is genuinely unclear after a real check, leave the venue out rather than guess. This applies to every Southern US destination researched (Charleston, New Orleans, Savannah-adjacent options, etc.), not just the ones the couple has already flagged.

## Shapes

- Seed modules: `packages/shared/src/seed/types.ts` (`DestinationSeed`, `VenueSeed`, `CostBenchmarks`). Register new modules in `packages/shared/src/seed/registry.ts`.
- Runtime entities: `docs/specs/entities.md` (`Destination`, `Venue`, `Scenario`), created through `add_destination` / `add_venue` actions in `packages/shared/src/ai/actions.ts`.

## Per-destination checklist

Travel cost per guest (airfare from NYC/DC/ATL + 3 nights) with the math · lodging per night · attendance estimate with a cited basis · weather for the target months · legal requirements · season and holidays · airports and transfers · 3-4 real venues across price points · a 100-guest scenario (fixed, per guest, travel) with derivation notes.

## Reading Reddit for advice

WebSearch "site:reddit.com r/weddingplanning <topic>" or r/destinationwedding, then WebFetch the thread (old.reddit.com works best). Quote the idea, not the text; cite the thread URL. Favor long-lead-time and destination advice: hotel blocks, welcome parties, save-the-dates a year out, legal ceremony at home, guest travel subsidies, what people wish they had skipped.

## Verify before reporting

`pnpm --filter @bower/shared typecheck` passes; every `sourceUrls` array is non-empty; scan your file for any number whose origin you cannot name.
