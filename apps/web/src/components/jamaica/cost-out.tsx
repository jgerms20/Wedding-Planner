"use client";

import {
  JAMAICA_LINE_ITEMS,
  JAMAICA_ORIGINS,
  JAMAICA_TRANSFER_EACH_WAY,
  JAMAICA_VENUE_COSTS,
  jamaicaGuestTripCost,
  jamaicaLineItemCost,
  jamaicaVenueCost,
  type JamaicaVenueCost,
} from "@bower/shared";
import { ExternalLink, Info, Plane, Users } from "lucide-react";
import { type ReactNode, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";

export type Level = "low" | "typical" | "high";
const LEVELS: { key: Level; label: string }[] = [
  { key: "low", label: "Lean" },
  { key: "typical", label: "Typical" },
  { key: "high", label: "Splurge" },
];

const AVERAGE_FARE = Math.round(JAMAICA_ORIGINS.reduce((s, o) => s + o.roundTripFare, 0) / JAMAICA_ORIGINS.length);

export interface CostSettings {
  guests: number;
  nights: number;
  level: Level;
  origin: string;
  venueKey: string;
  items: Record<string, boolean>;
}

export function defaultCostSettings(guestTarget: number): CostSettings {
  return {
    // Same 65% attendance the Jamaica destination research uses.
    guests: Math.round((guestTarget * 0.65) / 5) * 5,
    nights: 4,
    level: "typical",
    origin: "average",
    venueKey: JAMAICA_VENUE_COSTS[0]!.key,
    items: Object.fromEntries(JAMAICA_LINE_ITEMS.map((i) => [i.key, i.defaultOn])),
  };
}

function fareFor(origin: string): number {
  return JAMAICA_ORIGINS.find((o) => o.airport === origin)?.roundTripFare ?? AVERAGE_FARE;
}

export function totalsFor(venue: JamaicaVenueCost, s: CostSettings) {
  const venueCost = jamaicaVenueCost(venue, s.guests);
  const extras = JAMAICA_LINE_ITEMS.filter((i) => s.items[i.key]).reduce((sum, i) => sum + jamaicaLineItemCost(i, s.level, s.guests), 0);
  const perGuest = jamaicaGuestTripCost(venue, s.nights, fareFor(s.origin));
  return { venueCost, extras, couple: venueCost + extras, perGuest };
}

export function CostOut({
  settings,
  onChange,
  guestTarget,
}: {
  settings: CostSettings;
  onChange: (next: CostSettings) => void;
  guestTarget: number;
}) {
  const set = (patch: Partial<CostSettings>) => onChange({ ...settings, ...patch });
  const venue = JAMAICA_VENUE_COSTS.find((v) => v.key === settings.venueKey) ?? JAMAICA_VENUE_COSTS[0]!;
  const t = totalsFor(venue, settings);
  const fare = fareFor(settings.origin);
  const extraGuests = Math.max(0, settings.guests - venue.pkg.includedGuests);

  const ranked = useMemo(
    () => JAMAICA_VENUE_COSTS.map((v) => ({ v, ...totalsFor(v, settings) })).sort((a, b) => a.couple - b.couple),
    [settings],
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="postcard grid gap-6 p-5 sm:p-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-baseline justify-between gap-2">
            <label htmlFor="jm-guests" className="eyebrow flex items-center gap-1.5">
              <Users className="size-3.5 text-coral" /> People coming
            </label>
            <span className="numeral text-3xl">{settings.guests}</span>
          </div>
          <Slider id="jm-guests" min={10} max={200} step={5} value={settings.guests} onChange={(e) => set({ guests: Number(e.target.value) })} className="mt-3" />
          <p className="mt-2 text-xs text-ink-mute">
            Starts at {guestTarget} invited × 65% who usually make the trip.
          </p>
        </div>
        <div>
          <p className="eyebrow">Nights</p>
          <div className="mt-2 inline-flex rounded-full border border-line bg-card/70 p-0.5" role="group" aria-label="Nights">
            {[3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={settings.nights === n}
                onClick={() => set({ nights: n })}
                className={cn("tabular h-8 min-w-10 rounded-full px-3 text-sm transition-colors", settings.nights === n ? "bg-ink text-rail-foreground dark:bg-gold dark:text-ink-900" : "text-ink-soft hover:text-foreground")}
              >
                {n}
              </button>
            ))}
          </div>
          <p className="eyebrow mt-4">Style</p>
          <div className="mt-2 inline-flex rounded-full border border-line bg-card/70 p-0.5" role="group" aria-label="Spending style">
            {LEVELS.map((l) => (
              <button
                key={l.key}
                type="button"
                aria-pressed={settings.level === l.key}
                onClick={() => set({ level: l.key })}
                className={cn("h-8 rounded-full px-3 text-sm transition-colors", settings.level === l.key ? "bg-ink text-rail-foreground dark:bg-gold dark:text-ink-900" : "text-ink-soft hover:text-foreground")}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="jm-origin" className="eyebrow flex items-center gap-1.5">
            <Plane className="size-3.5 text-coral" /> Guests fly from
          </label>
          <Select id="jm-origin" value={settings.origin} onChange={(e) => set({ origin: e.target.value })} className="mt-2">
            <option value="average">Average · {formatMoney(AVERAGE_FARE)}</option>
            {JAMAICA_ORIGINS.map((o) => (
              <option key={o.airport} value={o.airport}>
                {o.city} · {formatMoney(o.roundTripFare)} · {o.hours} hr
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Venue picker */}
      <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {JAMAICA_VENUE_COSTS.map((v) => {
          const active = v.key === venue.key;
          const vt = totalsFor(v, settings);
          return (
            <button
              key={v.key}
              type="button"
              onClick={() => set({ venueKey: v.key })}
              aria-pressed={active}
              className={cn(
                "group relative w-64 shrink-0 snap-start rounded-[1.25rem] border p-4 text-left transition-all sm:w-auto",
                active ? "border-coral bg-coral-soft/50 shadow-[var(--shadow-card)]" : "border-line bg-card/80 hover:border-gold hover:bg-card",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-display text-xl leading-tight">{v.name}</p>
                {active && <span className="mt-1 size-2 shrink-0 rounded-full bg-coral" />}
              </div>
              <p className="mt-0.5 text-xs text-ink-mute">
                {v.area} · {v.fromAirport} from MBJ
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {v.suggestedBy && <Tag tone="coral">From {v.suggestedBy}</Tag>}
                <Tag tone={v.allInclusive ? "lagoon" : "gold"}>{v.allInclusive ? "All-inclusive" : "Boutique"}</Tag>
                {v.adultsOnly && <Tag tone="ink">Adults only</Tag>}
              </div>
              <p className="tabular mt-3 text-sm">
                <span className="font-medium">{formatMoney(vt.couple)}</span> <span className="text-ink-mute">for you two</span>
              </p>
              <p className="tabular text-sm">
                <span className="font-medium">{formatMoney(vt.perGuest)}</span> <span className="text-ink-mute">a guest</span>
              </p>
            </button>
          );
        })}
      </div>

      {/* Result */}
      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <section className="postcard p-5 sm:p-6" aria-live="polite">
          <p className="eyebrow">Your wedding at {venue.name}</p>
          <p className="numeral mt-2 text-6xl text-coral sm:text-7xl" data-testid="jamaica-couple-total">
            {formatMoney(t.couple)}
          </p>
          <p className="mt-1 text-sm text-ink-soft">{venue.vibe}</p>

          <dl className="mt-5 divide-y divide-line/70 text-sm">
            <Row
              label={`${venue.pkg.name} package`}
              detail={venue.pkg.includes}
              value={formatMoney(venue.pkg.price)}
            />
            {venue.pkg.perExtraGuest > 0 && extraGuests > 0 && (
              <Row label={`${extraGuests} more guests × ${formatMoney(venue.pkg.perExtraGuest)}`} value={formatMoney(extraGuests * venue.pkg.perExtraGuest)} />
            )}
            {venue.receptionPerGuest > 0 && (
              <Row
                label={`Reception food & bar · ${settings.guests} × ${formatMoney(venue.receptionPerGuest)}`}
                detail="Boutique hotels quote catering separately."
                value={formatMoney(settings.guests * venue.receptionPerGuest)}
              />
            )}
          </dl>

          <p className="eyebrow mt-6">What the package doesn&apos;t cover</p>
          <ul className="mt-2 divide-y divide-line/70 text-sm">
            {JAMAICA_LINE_ITEMS.map((item) => {
              const on = settings.items[item.key] ?? false;
              const amount = jamaicaLineItemCost(item, settings.level, settings.guests);
              return (
                <li key={item.key} className="flex items-start gap-3 py-2.5">
                  <Checkbox
                    checked={on}
                    onChange={(e) => set({ items: { ...settings.items, [item.key]: e.target.checked } })}
                    aria-label={item.label}
                    className="mt-0.5"
                  />
                  <div className="min-w-0 flex-1">
                    <p className={cn(!on && "text-ink-mute")}>
                      {item.label}
                      {item.basis === "per_guest" && <span className="text-ink-mute"> · {formatMoney(item[settings.level])} a guest</span>}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-ink-mute">
                      {item.note}{" "}
                      <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 text-coral hover:underline">
                        source <ExternalLink className="size-2.5" />
                      </a>
                    </p>
                  </div>
                  <span className={cn("tabular shrink-0", on ? "font-medium" : "text-ink-mute line-through")}>{formatMoney(amount)}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <aside className="flex flex-col gap-6">
          <section className="tint tint-lagoon p-5 sm:p-6">
            <p className="eyebrow">Each guest pays about</p>
            <p className="numeral mt-2 text-5xl" data-testid="jamaica-guest-total">
              {formatMoney(t.perGuest)}
            </p>
            <dl className="mt-4 space-y-1.5 text-sm">
              <MiniRow label="Round-trip flight" value={formatMoney(fare)} />
              <MiniRow label="Airport shuttle, both ways" value={formatMoney(JAMAICA_TRANSFER_EACH_WAY.amount * 2)} />
              <MiniRow label={`${settings.nights} nights × ${formatMoney(venue.guestNightlyPerPerson)}`} value={formatMoney(settings.nights * venue.guestNightlyPerPerson)} />
              {venue.guestFoodPerDay > 0 && (
                <MiniRow label={`Meals, ${settings.nights} days × ${formatMoney(venue.guestFoodPerDay)}`} value={formatMoney(settings.nights * venue.guestFoodPerDay)} />
              )}
            </dl>
            <p className="mt-3 text-xs leading-relaxed text-ink-soft">
              {venue.allInclusive ? "Food and drinks are covered by the room." : "Not all-inclusive, so meals are on top."} Rooms assume two people share. Fares are 2026; budget higher for 2028.
            </p>
          </section>

          <section className="postcard p-5">
            <p className="eyebrow flex items-center gap-1.5">
              <Info className="size-3.5 text-gold" /> Fine print
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{venue.fineprint}</p>
            {venue.derivation && <p className="mt-2 text-xs leading-relaxed text-ink-mute">Estimate: {venue.derivation}</p>}
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
              {venue.sourceUrls.map((u) => (
                <a key={u} href={u} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-coral hover:underline">
                  {new URL(u).hostname.replace(/^www\./, "")} <ExternalLink className="size-3" />
                </a>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* Compare */}
      <section className="postcard overflow-hidden">
        <div className="flex flex-wrap items-baseline justify-between gap-2 px-5 pt-5 sm:px-6">
          <h3 className="text-2xl">Every venue, same settings</h3>
          <p className="text-xs text-ink-mute">
            {settings.guests} people · {settings.nights} nights · {LEVELS.find((l) => l.key === settings.level)!.label.toLowerCase()}
          </p>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[34rem] text-sm">
            <thead>
              <tr className="border-y border-line/70 bg-paper-deep/50 text-left text-[0.7rem] tracking-wider text-ink-mute uppercase">
                <th className="px-5 py-2 font-semibold sm:px-6">Venue</th>
                <th className="px-3 py-2 text-right font-semibold">You two</th>
                <th className="px-3 py-2 text-right font-semibold">Per guest</th>
                <th className="px-5 py-2 text-right font-semibold sm:px-6">Everyone, all in</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map(({ v, couple, perGuest }) => (
                <tr
                  key={v.key}
                  onClick={() => set({ venueKey: v.key })}
                  className={cn("cursor-pointer border-b border-line/50 transition-colors last:border-0 hover:bg-gold-soft/40", v.key === venue.key && "bg-coral-soft/40")}
                >
                  <td className="px-5 py-2.5 sm:px-6">
                    <span className="font-medium">{v.name}</span>
                    <span className="ml-2 text-xs text-ink-mute">{v.area}</span>
                    {v.estimated && <span className="ml-2 rounded-full bg-paper-deep px-1.5 py-0.5 text-[0.65rem] text-ink-mute">estimate</span>}
                  </td>
                  <td className="tabular px-3 py-2.5 text-right">{formatMoney(couple)}</td>
                  <td className="tabular px-3 py-2.5 text-right">{formatMoney(perGuest)}</td>
                  <td className="tabular px-5 py-2.5 text-right text-ink-soft sm:px-6">{formatMoney(couple + perGuest * settings.guests)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-5 py-3 text-xs text-ink-mute sm:px-6">&ldquo;Everyone, all in&rdquo; adds up what you two spend plus every guest&apos;s trip: the true cost of the weekend across the whole group.</p>
      </section>
    </div>
  );
}

function Row({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <dt className="min-w-0">
        <span>{label}</span>
        {detail && <span className="mt-0.5 block text-xs leading-relaxed text-ink-mute">{detail}</span>}
      </dt>
      <dd className="tabular shrink-0 font-medium">{value}</dd>
    </div>
  );
}

function MiniRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="tabular font-medium">{value}</dd>
    </div>
  );
}

function Tag({ children, tone }: { children: ReactNode; tone: "coral" | "lagoon" | "gold" | "ink" }) {
  const tones = {
    coral: "bg-coral-soft text-coral-deep",
    lagoon: "bg-lagoon-soft text-foreground",
    gold: "bg-gold-soft text-foreground",
    ink: "bg-paper-deep text-ink-soft",
  } as const;
  return <span className={cn("rounded-full px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide", tones[tone])}>{children}</span>;
}
