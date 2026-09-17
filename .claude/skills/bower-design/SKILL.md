---
name: bower-design
description: The Bower design system ("The Atlas"). Load before writing or changing any UI in apps/web so every screen shares one look: ink-green chrome, ivory pages, coral accent, gold hairlines, Fraunces + Instrument Sans, postcards and stamps, staggered reveals.
---

# Bower design system: "The Atlas"

A destination-first wedding, typeset like a travel atlas crossed with a letterpress invitation suite. One idea, executed precisely. Warm, editorial, never "admin dashboard".

## Tokens (all in `apps/web/src/app/globals.css`, never inline hex)

| Use | Class / token |
|---|---|
| Page background | `bg-background` (ivory paper; ink-green in dark mode) |
| Cards | `.postcard` (lifted, gold hairline top, hover tilt) or `bg-card border-line rounded-lg` |
| Chrome (rail, tab bar) | `bg-rail text-rail-foreground`, muted `text-rail-muted`, dividers `border-rail-line`, active `bg-rail-active` |
| Text | `text-foreground`; secondary `text-ink-soft`; tertiary `text-ink-mute` |
| Accent (one only) | `text-coral` / `bg-coral text-primary-foreground`; soft fills `bg-coral-soft` |
| Gold | hairlines `.hairline`, `border-gold`, soft fills `bg-gold-soft`; never gold text on ivory |
| Eyebrow labels | `.eyebrow` |
| Money and countdown digits | `.tabular`; big display numbers `.numeral` |
| Passport stamp | `.stamp` (`.stamp-sm`) with a 2-letter country code inside |
| Reveal on load | `.rise` + `.rise-1` … `.rise-8` on siblings; `.settle` for hero numerals |
| Mic listening | `.listening` |

## Type

- Headlines: Fraunces (`font-display`, already applied to h1-h3). Sizes: page title `text-4xl sm:text-5xl`, hero `text-7xl sm:text-8xl`, card title `text-xl`.
- UI/body: Instrument Sans (default). Body `text-[15px] leading-relaxed`; small `text-sm`; labels `.eyebrow`.
- Never Inter, Roboto, Arial, system-ui, Space Grotesk.

## Layout

- Desktop: left rail `var(--rail-w)` wide, content `max-w-6xl px-6 py-10`. Mobile: top bar + bottom tab bar; content `px-4 py-6 pb-32` (clears the Tell Bower bar and tabs).
- Rhythm: sections separated by `.hairline` with `my-10`; asymmetric two-column `lg:grid-cols-[1.4fr_1fr]` for editorial pages.
- Every list is a real list, not a table of inputs. Inline edit on click/tap, not permanent input boxes.
- Empty states say what Bower will do or what to tell it, in one sentence, with one action.

## Components (`apps/web/src/components/ui/*`, hand-written shadcn style)

button, card, badge, input, textarea, label, select, checkbox, slider, dialog, drawer, separator. Add new ones in the same style; no external UI kits. Icons: lucide-react, `size-4`, `stroke-[1.5]`.

## Voice and copy

- Address the couple as "you two" or by name. Bower speaks in first person, briefly, warmly, no exclamation marks.
- Every estimate shows where it came from: a "Sources" row with the URLs, or "estimate" in a badge.
- Dates read as "Sat, Apr 17" (date-fns `EEE, MMM d`) and add the year only when it is not the current year.

## Checks before you finish

1. `pnpm --filter @bower/web typecheck && pnpm --filter @bower/web lint`.
2. Static export: `NEXT_PUBLIC_DATA_MODE=local NEXT_PUBLIC_BASE_PATH=/Wedding-Planner pnpm --filter @bower/web build`.
3. Screenshot at 1280×900 and 375×812 with Playwright (Chromium at `/opt/pw-browsers/chromium`, never `playwright install`) and look at them. No horizontal scroll, nothing hidden under the bottom bars, dark mode readable.
