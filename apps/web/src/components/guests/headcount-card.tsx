"use client";

import { GROUP_TAG, guestHeadcount, TIER_LABELS, TIERS, type Guest, type Tier } from "@bower/shared";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * "If we invite tiers 1 through N, how many people is that?" — counting plus-ones, which is the
 * number a venue and a caterer actually care about. Replaces the old cut-at-N slider, which ranked
 * individual names and didn't count anyone's plus-one.
 */
export function HeadcountCard({
  guests,
  throughTier,
  onThroughTierChange,
  target,
  partnerAName,
  partnerBName,
}: {
  guests: Guest[];
  throughTier: Tier;
  onThroughTierChange: (tier: Tier) => void;
  target?: number;
  partnerAName: string;
  partnerBName: string;
}) {
  const invited = guests.filter((g) => g.tier <= throughTier);
  const people = invited.reduce((sum, g) => sum + guestHeadcount(g), 0);
  const named = invited.filter((g) => !g.tags.includes(GROUP_TAG)).length;
  const plusOnes = people - named;
  const groups = invited.filter((g) => g.tags.includes(GROUP_TAG)).length;
  const bySide = (side: Guest["side"]) => invited.filter((g) => g.side === side).reduce((sum, g) => sum + guestHeadcount(g), 0);
  const over = target ? people - target : 0;

  return (
    <section className="postcard rise p-5 sm:p-6" data-testid="guests-headcount">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow flex items-center gap-1.5">
            <Users className="size-3.5 text-coral" /> Headcount
          </p>
          <p className="numeral mt-1 text-5xl">{people}</p>
          <p className="mt-1 text-sm text-ink-soft">
            people if you invite {throughTier === 1 ? "tier 1" : `tiers 1–${throughTier}`} —{" "}
            <span className="tabular">{named}</span> guests + <span className="tabular">{plusOnes}</span> plus-ones
            {groups > 0 && <>, plus {groups === 1 ? "a group" : `${groups} groups`} still to name</>}
          </p>
          {target !== undefined && (
            <p className={cn("tabular mt-1 text-sm", over > 0 ? "text-coral" : "text-ink-soft")}>
              {over > 0 ? `${over} over` : over < 0 ? `${-over} under` : "Exactly"} your {target} target
            </p>
          )}
        </div>
        <div className="flex flex-col items-start gap-1.5">
          <span className="text-xs text-ink-mute">Invite tiers 1 through</span>
          <div className="inline-flex rounded-full border border-line p-0.5" role="group" aria-label="Invite through tier">
            {TIERS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onThroughTierChange(t)}
                aria-pressed={throughTier === t}
                title={TIER_LABELS[t]}
                className={cn(
                  "tabular size-8 rounded-full text-sm transition-colors",
                  throughTier === t ? "bg-ink text-rail-foreground" : "text-ink-soft hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-5 gap-1.5 text-center">
        {TIERS.map((t) => {
          const inTier = guests.filter((g) => g.tier === t);
          const count = inTier.reduce((sum, g) => sum + guestHeadcount(g), 0);
          return (
            <button
              key={t}
              type="button"
              onClick={() => onThroughTierChange(t)}
              className={cn(
                "rounded-xl border px-1 py-2 transition-colors",
                t <= throughTier ? "border-gold/50 bg-gold-soft/70" : "border-line opacity-60 hover:opacity-100",
              )}
            >
              <p className="text-[0.65rem] font-semibold tracking-wide text-ink-mute uppercase">Tier {t}</p>
              <p className="tabular text-lg leading-tight">{count}</p>
              <p className="hidden text-[0.65rem] leading-tight text-ink-soft sm:block">{TIER_LABELS[t]}</p>
            </button>
          );
        })}
      </div>

      <p className="tabular mt-3 text-xs text-ink-soft">
        {partnerAName} {bySide("a")} · {partnerBName} {bySide("b")} · Both {bySide("both")}
        {bySide("unsure") > 0 && <> · Not sure yet {bySide("unsure")}</>}
      </p>
    </section>
  );
}
