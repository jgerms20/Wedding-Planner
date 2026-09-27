"use client";

import { PARTY_IDEAS, type PartyKind } from "@bower/shared";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const KINDS: { key: PartyKind; label: string }[] = [
  { key: "bachelor", label: "Bachelor" },
  { key: "bachelorette", label: "Bachelorette" },
  { key: "joint_bachelor_bachelorette", label: "Together" },
];

const domain = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

/** Researched bachelor/bachelorette ideas, each with a source and a rough cost where one exists. */
export function PartyIdeas({ kind, onKindChange }: { kind: PartyKind; onKindChange: (kind: PartyKind) => void }) {
  const ideas = PARTY_IDEAS[kind];
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="max-w-2xl text-[15px] text-ink-soft">
          A starting list — weekends away, local nights, and cheaper options — for whoever&apos;s planning it. Costs are per person
          where a source gave one, before flights unless it says otherwise.
        </p>
        <div className="inline-flex rounded-full border border-line p-0.5 text-sm" role="group" aria-label="Which party">
          {KINDS.map((k) => (
            <button
              key={k.key}
              type="button"
              onClick={() => onKindChange(k.key)}
              aria-pressed={kind === k.key}
              className={cn("rounded-full px-3.5 py-1.5 transition-colors", kind === k.key ? "bg-ink text-rail-foreground" : "text-ink-soft hover:text-foreground")}
            >
              {k.label}
            </button>
          ))}
        </div>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ideas.map((idea, i) => (
          <li key={idea.title} className={`postcard rise rise-${Math.min(i + 1, 8)} flex flex-col gap-2 p-4`}>
            <p className="font-medium leading-snug">{idea.title}</p>
            <p className="flex-1 text-sm text-ink-soft">{idea.description}</p>
            {idea.roughCostPerPerson && <p className="tabular text-sm text-coral">{idea.roughCostPerPerson} per person</p>}
            <a
              href={idea.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-1 text-xs text-ink-mute hover:text-coral"
            >
              {domain(idea.sourceUrl)} <ExternalLink className="size-3 stroke-[1.5]" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
