"use client";

import { JAMAICA_EXPERIENCES, JAMAICA_ITINERARIES, type ExperienceCategory, type JamaicaExperience } from "@bower/shared";
import { Clock, ExternalLink, Footprints, Landmark, Music, Sun, Utensils, Waves } from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<ExperienceCategory, typeof Waves> = {
  Water: Waves,
  Adventure: Footprints,
  "Culture & music": Music,
  Food: Utensils,
  Nightlife: Landmark,
  Chill: Sun,
};
const CATEGORIES = Object.keys(CATEGORY_ICONS) as ExperienceCategory[];
const BY_KEY = new Map(JAMAICA_EXPERIENCES.map((e) => [e.key, e]));

function price(e: JamaicaExperience) {
  return e.pricePerPerson === 0 ? "Free" : formatMoney(e.pricePerPerson);
}

export function ExperienceGrid() {
  const [category, setCategory] = useState<ExperienceCategory | "all">("all");
  const shown = useMemo(() => (category === "all" ? JAMAICA_EXPERIENCES : JAMAICA_EXPERIENCES.filter((e) => e.category === category)), [category]);

  return (
    <div>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter experiences">
        <Chip active={category === "all"} onClick={() => setCategory("all")}>
          All {JAMAICA_EXPERIENCES.length}
        </Chip>
        {CATEGORIES.map((c) => {
          const Icon = CATEGORY_ICONS[c];
          return (
            <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
              <Icon className="size-3.5" /> {c}
            </Chip>
          );
        })}
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((e) => {
          const Icon = CATEGORY_ICONS[e.category];
          return (
            <article key={e.key} className="postcard flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lagoon-soft text-foreground">
                  <Icon className="size-4 stroke-[1.6]" />
                </span>
                <span className="rounded-full bg-gold-soft px-2.5 py-1 text-sm font-semibold tabular">{price(e)}</span>
              </div>
              <h3 className="mt-3 text-2xl leading-tight">{e.name}</h3>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-mute">
                {e.area} · <Clock className="size-3" /> {e.duration}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{e.why}</p>
              {e.historyNote && <p className="mt-3 rounded-xl bg-paper-deep/70 p-2.5 text-xs leading-relaxed text-ink-soft">{e.historyNote}</p>}
              <div className="mt-3 flex items-center justify-between gap-2 text-xs">
                <span className="text-ink-mute">{e.priceNote}</span>
                <a href={e.sourceUrl} target="_blank" rel="noreferrer" aria-label={`Source for ${e.name}`} className="inline-flex shrink-0 items-center gap-1 text-coral hover:underline">
                  source <ExternalLink className="size-3" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function Itinerary({ venueKey }: { venueKey: string }) {
  const suggested = JAMAICA_ITINERARIES.find((i) => i.forVenues.includes(venueKey))?.key ?? JAMAICA_ITINERARIES[0]!.key;
  const [picked, setPicked] = useState<string | null>(null);
  const activeKey = picked ?? suggested;
  const itinerary = JAMAICA_ITINERARIES.find((i) => i.key === activeKey)!;
  const extras = itinerary.days.flatMap((d) => d.experienceKeys).map((k) => BY_KEY.get(k)).filter((e): e is JamaicaExperience => Boolean(e));
  const everything = extras.reduce((s, e) => s + e.pricePerPerson, 0);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Where you're based">
        {JAMAICA_ITINERARIES.map((i) => (
          <Chip key={i.key} active={i.key === activeKey} onClick={() => setPicked(i.key)} role="tab">
            {i.base}
            {i.key === suggested && <span className="text-[0.6rem] tracking-wider uppercase opacity-70">· your venue</span>}
          </Chip>
        ))}
      </div>
      <ol className="relative mt-6 flex flex-col gap-4 before:absolute before:top-2 before:bottom-2 before:left-[1.1rem] before:w-px before:bg-gradient-to-b before:from-gold before:via-coral/60 before:to-lagoon">
        {itinerary.days.map((d, i) => (
          <li key={d.day} className="relative flex gap-4">
            <span
              className={cn(
                "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-background text-xs font-semibold",
                d.title === "The wedding" ? "bg-coral text-primary-foreground" : "bg-gold text-ink-900",
              )}
            >
              {i + 1}
            </span>
            <div className={cn("min-w-0 flex-1 rounded-[1.25rem] border border-line/80 bg-card/80 p-4", d.title === "The wedding" && "tint-coral border")}>
              <p className="eyebrow">{d.day}</p>
              <p className="mt-0.5 font-display text-2xl leading-tight">{d.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{d.plan}</p>
              {d.experienceKeys.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {d.experienceKeys.map((k) => {
                    const e = BY_KEY.get(k);
                    if (!e) return null;
                    return (
                      <span key={k} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper-raised px-2.5 py-1 text-xs">
                        {e.name} <span className="tabular text-ink-mute">{price(e)}</span>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-sm text-ink-soft">
        Doing every outing on this plan runs a guest about <span className="tabular font-medium text-foreground">{formatMoney(everything)}</span> on top of the trip, before shuttles and food out.
      </p>
    </div>
  );
}

function Chip({ active, onClick, children, role }: { active: boolean; onClick: () => void; children: ReactNode; role?: string }) {
  return (
    <button
      type="button"
      role={role}
      aria-pressed={role ? undefined : active}
      aria-selected={role ? active : undefined}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
        active ? "border-ink bg-ink text-rail-foreground dark:border-gold dark:bg-gold dark:text-ink-900" : "border-line bg-card/70 text-ink-soft hover:border-gold hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
