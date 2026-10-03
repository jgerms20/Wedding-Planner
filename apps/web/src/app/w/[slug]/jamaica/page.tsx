"use client";

import { JAMAICA_DATE_NOTES, JAMAICA_EXCLUDED, JAMAICA_EXPERIENCES, JAMAICA_VENUE_COSTS } from "@bower/shared";
import { CalendarHeart, ExternalLink, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CostOut, defaultCostSettings, totalsFor, type CostSettings } from "@/components/jamaica/cost-out";
import { ExperienceGrid, Itinerary } from "@/components/jamaica/experiences";
import { LoadingState } from "@/components/loading-state";
import { formatMoney } from "@/lib/format";
import { useRepoContext } from "@/lib/repo-context";

export default function JamaicaPage() {
  const { wedding } = useRepoContext();
  const guestTarget = wedding?.guestTarget ?? 150;
  const [settings, setSettings] = useState<CostSettings | null>(null);
  useEffect(() => {
    if (wedding && !settings) setSettings(defaultCostSettings(guestTarget));
  }, [wedding, settings, guestTarget]);

  const range = useMemo(() => {
    if (!settings) return null;
    const all = JAMAICA_VENUE_COSTS.map((v) => totalsFor(v, settings));
    return {
      coupleLow: Math.min(...all.map((a) => a.couple)),
      coupleHigh: Math.max(...all.map((a) => a.couple)),
      guestLow: Math.min(...all.map((a) => a.perGuest)),
      guestHigh: Math.max(...all.map((a) => a.perGuest)),
    };
  }, [settings]);

  if (!wedding || !settings || !range) return <LoadingState />;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] px-6 py-10 text-rail-foreground sm:px-10 sm:py-14 rail-surface">
        <div aria-hidden className="pointer-events-none absolute -top-24 -right-16 size-80 rounded-full bg-gold/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-28 left-1/3 size-72 rounded-full bg-lagoon/30 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-gold uppercase">The deep dive · Spring 2028</p>
            <h1 className="mt-3 text-6xl text-white sm:text-7xl lg:text-8xl">
              One love, <span className="italic text-gold">Jamaica</span>
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-rail-muted">
              What it really costs at each venue, what guests pay to get there, and how to turn a wedding into a long weekend everyone talks about for years. Every number has a source.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Stat label="You two" value={`${formatMoney(range.coupleLow)}–${formatMoney(range.coupleHigh)}`} />
            <Stat label="Per guest" value={`${formatMoney(range.guestLow)}–${formatMoney(range.guestHigh)}`} />
            <Stat label="Venues costed" value={String(JAMAICA_VENUE_COSTS.length)} />
            <Stat label="Things to do" value={String(JAMAICA_EXPERIENCES.length)} />
          </div>
        </div>
      </section>

      <SectionHead eyebrow="Cost it out" title="Pick a venue, see the bill" description="Drag the headcount, pick a venue, and tick the extras you'd actually do. Totals update as you go." />
      <CostOut settings={settings} onChange={setSettings} guestTarget={guestTarget} />

      <SectionHead eyebrow="Make it an experience" title="The weekend, day by day" description="A plan built around where you're based. It follows the venue you picked above; switch it to see the others." />
      <Itinerary venueKey={settings.venueKey} />

      <SectionHead eyebrow="Things to do" title="Falls, rafts, jerk and sunsets" description="Real prices per person, so guests can plan their own days too." />
      <ExperienceGrid />

      <SectionHead eyebrow="Know before you book" title="Dates and deal-breakers" />
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="tint self-start p-5 sm:p-6">
          <p className="eyebrow flex items-center gap-1.5">
            <CalendarHeart className="size-3.5 text-coral" /> About the date
          </p>
          <ul className="mt-3 space-y-3 text-sm leading-relaxed">
            {JAMAICA_DATE_NOTES.map((n) => (
              <li key={n.text}>
                {n.text}{" "}
                <a href={n.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 text-coral hover:underline">
                  source <ExternalLink className="size-2.5" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink-mute">
            Legal: be in Jamaica 24 hours before applying for the licence, and bring birth certificates and passports. Verify with the local authority or an attorney.
          </p>
        </section>
        <section className="postcard p-5 sm:p-6" data-testid="jamaica-excluded">
          <p className="eyebrow flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-lagoon" /> Left off on purpose
          </p>
          <p className="mt-2 text-sm text-ink-soft">Never a plantation. These came up in the research and were cut:</p>
          <ul className="mt-3 divide-y divide-line/70 text-sm">
            {JAMAICA_EXCLUDED.map((x) => (
              <li key={x.name} className="py-2.5">
                <p className="font-medium">{x.name}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-ink-mute">
                  {x.reason}{" "}
                  <a href={x.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 text-coral hover:underline">
                    source <ExternalLink className="size-2.5" />
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] bg-white/8 p-3.5 ring-1 ring-white/12 backdrop-blur-sm">
      <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-rail-muted uppercase">{label}</p>
      <p className="tabular mt-1 font-display text-xl leading-tight text-white sm:text-2xl">{value}</p>
    </div>
  );
}

function SectionHead({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mt-14 mb-6">
      <div className="hairline mb-10" />
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-1 text-4xl sm:text-5xl">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{description}</p>}
    </div>
  );
}
