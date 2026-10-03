---
name: bower-design
description: The Atlas design system ("sun-washed tropical modern"). Load before writing or changing any UI in apps/web so every screen shares one look: sand pages lit by soft sun and lagoon washes, a floating palm-green rail, hibiscus coral accent, marigold highlights, Instrument Serif + Instrument Sans, pill buttons, rounded postcards, staggered reveals.
---

# Atlas design system: "Sun-washed tropical modern"

A resort lookbook, not a dashboard. Warm sand pages with soft sun (top right) and lagoon (bottom left) light, a deep palm-green frame, one hibiscus accent and marigold for highlights. Fun and a little playful (a rotated sticker, an italic "&"), never goofy. Token names predate this palette: **ink = palm green, paper = sand, coral = hibiscus, gold = marigold**.

## Tokens (all in `apps/web/src/app/globals.css`, never inline hex)

| Use | Class / token |
|---|---|
| Page background | `bg-background` (sand; "night on the lagoon" in dark mode). Atmosphere washes and grain live on `body::before/::after`. |
| House card | `.postcard`: rounded 1.25rem, soft shadow, lifts 3px on hover with a marigold-tinted border. Or the `Card` component. |
| Callout panels | `.tint` (marigold), `.tint .tint-lagoon`, `.tint .tint-coral` |
| Chrome (rail, mobile bars, hero bands) | `.rail-surface` (palm gradient with gold/lagoon light) + `text-rail-foreground`, muted `text-rail-muted`. Active nav: `bg-rail-foreground/12` pill, icon `text-gold`, gold dot. |
| Text | `text-foreground`; secondary `text-ink-soft`; tertiary `text-ink-mute` |
| Accent | `text-coral` / `bg-coral text-primary-foreground`; soft fills `bg-coral-soft` |
| Marigold | `bg-gold text-ink-900` for the Concierge button and stickers; `bg-gold-soft` fills; `.hairline` (gold to coral rule). Never gold text on sand. |
| Lagoon | `bg-lagoon-soft`, `text-lagoon` icons, the "per guest" panel |
| Eyebrow labels | `.eyebrow` |
| Money and countdown digits | `.tabular`; big display numbers `.numeral` |
| Passport stamp | `.stamp` (`.stamp-sm`) with a 2-letter country code |
| Reveal on load | `.rise` + `.rise-1` … `.rise-8`; `.settle` for hero numerals |
| Shadows | `shadow-[var(--shadow-card)]`, `shadow-[var(--shadow-lift)]` |

## Type

- Headlines: Instrument Serif (`font-display`, already on h1-h3; weight 400 only, never `font-semibold` on it). Italic for flourishes: `<span className="italic text-gold">&amp;</span>`. Page title `text-5xl sm:text-6xl` (PageHeader does this), hero `text-6xl sm:text-7xl lg:text-8xl`, section `text-4xl`, card title `text-xl`-`text-2xl`.
- UI/body: Instrument Sans (default). Body `text-[15px] leading-relaxed`; small `text-sm`; labels `.eyebrow`.
- Never Inter, Roboto, Arial, system-ui, Space Grotesk, Fraunces (retired).

## Components (`apps/web/src/components/ui/*`)

- Button: `rounded-full` pills. `default` coral with a coral glow; `outline` sand glass with a marigold hover; `secondary` palm green; `ghost`.
- Input/Select/Textarea: `rounded-xl`, `h-10`, `bg-card/80`.
- Dialog: `rounded-[1.5rem]`, serif `text-2xl` title, footer on `bg-paper-deep/40`. Drawer floats with rounded corners on desktop.
- Segmented controls: `rounded-full border border-line p-0.5` with the active pill `bg-ink text-rail-foreground`.
- Filter chips: `rounded-full border` pills; active `border-ink bg-ink text-rail-foreground`.
- Icons: lucide-react, `size-4`, `stroke-[1.5]`-`stroke-[1.6]`.

## Layout

- Desktop: a floating rail (`m-3 rounded-[1.75rem]`, column width `calc(var(--rail-w)+0.75rem)`), content `max-w-6xl`. Mobile: a rounded top bar plus a floating pill dock at the bottom; content `pb-28` clears it and the Tell Atlas button.
- Rhythm: sections separated by `.hairline` with `my-10`; asymmetric `lg:grid-cols-[1.4fr_1fr]` for editorial pages.
- Feature bands (e.g. Home's Jamaica link, the Jamaica hero) use `.rail-surface rounded-[1.5rem]-[2rem]` with blurred gold/lagoon glows.
- Every list is a real list. Inline edit on click. Empty states say what to do in one sentence, in a `.tint` panel.

## Voice and copy

- Address the couple as "you two" or by name. Warm, brief, no exclamation marks.
- Every estimate shows where it came from: a source link, or "estimate" in a badge with the derivation.
- Dates read as "Sat, Apr 17" (date-fns `EEE, MMM d`), with the year only when it isn't this year.

## Checks before you finish

1. `pnpm --filter @bower/web typecheck && pnpm --filter @bower/web lint`.
2. Static export: `NEXT_PUBLIC_DATA_MODE=local NEXT_PUBLIC_BASE_PATH=/Wedding-Planner pnpm --filter @bower/web build`.
3. Screenshot at 1280×900 and 375×812, light and dark, with Playwright (Chromium at `/opt/pw-browsers/chromium`, never `playwright install`). No horizontal scroll, nothing hidden under the dock, dark mode readable.
