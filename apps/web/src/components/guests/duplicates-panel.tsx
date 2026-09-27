"use client";

import { guestDisplayName, type Guest, type PossibleDuplicate } from "@bower/shared";
import { ChevronDown, ChevronRight, Copy } from "lucide-react";
import { useState } from "react";
import { sideLabel } from "@/lib/side-label";

const REASON: Record<PossibleDuplicate["reason"], string> = {
  "same-name": "Same name, same side",
  "both-sides": "Same name on both sides — the same person?",
  "similar-spelling": "Almost the same spelling",
};

/** Pairs that might be one person listed twice. Nothing merges without a click. */
export function DuplicatesPanel({
  duplicates,
  partnerAName,
  partnerBName,
  onMerge,
  onDifferent,
}: {
  duplicates: PossibleDuplicate[];
  partnerAName: string;
  partnerBName: string;
  onMerge: (keep: Guest, drop: Guest) => void;
  onDifferent: (pair: PossibleDuplicate) => void;
}) {
  const [open, setOpen] = useState(false);
  if (duplicates.length === 0) return null;

  const describe = (g: Guest) =>
    [sideLabel(g.side, partnerAName, partnerBName), g.relationship, g.notes].filter(Boolean).join(" · ");

  return (
    <section className="rise rounded-lg border border-gold bg-gold-soft/30 p-4">
      <button type="button" onClick={() => setOpen((v) => !v)} className="flex w-full items-center gap-2 text-left text-sm">
        {open ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
        <Copy className="size-3.5 stroke-[1.5] text-ink-soft" />
        <span className="font-medium">
          {duplicates.length} possible {duplicates.length === 1 ? "duplicate" : "duplicates"} to check
        </span>
        <span className="hidden text-ink-soft sm:inline">— nothing merges until you say so</span>
      </button>
      {open && (
        <ul className="mt-3 flex flex-col gap-2">
          {duplicates.map((pair) => (
            <li key={pair.key} className="rounded-md border border-line bg-card p-3 text-sm">
              <p className="text-xs text-ink-mute">{REASON[pair.reason]}</p>
              <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
                {[pair.a, pair.b].map((g) => (
                  <div key={g.id}>
                    <p className="font-medium">{guestDisplayName(g)}</p>
                    <p className="text-xs text-ink-soft">{describe(g)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onMerge(pair.a, pair.b)}
                  className="rounded-full bg-coral px-3 py-1 text-xs font-medium text-primary-foreground"
                >
                  Same person — keep one
                </button>
                <button
                  type="button"
                  onClick={() => onDifferent(pair)}
                  className="rounded-full border border-line px-3 py-1 text-xs text-ink-soft hover:border-line-strong"
                >
                  Different people
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
