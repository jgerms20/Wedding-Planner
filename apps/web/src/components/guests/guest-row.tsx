"use client";

import { sideSchema, tierSchema, type Guest, type Side, type Tier } from "@bower/shared";
import { sideLabel } from "@/lib/side-label";
import { cn } from "@/lib/utils";

const TIER_CLASS: Record<Tier, string> = {
  must: "text-coral border-coral/40 bg-coral-soft",
  should: "text-ink border-line-strong bg-paper-deep",
  nice: "text-ink-soft border-line bg-transparent",
};

export function GuestRow({
  guest,
  partnerAName,
  partnerBName,
  onOpen,
  onPatch,
}: {
  guest: Guest;
  partnerAName: string;
  partnerBName: string;
  onOpen: () => void;
  onPatch: (patch: Partial<Guest>) => void;
}) {
  return (
    <tr className="border-b border-line/70 last:border-0 hover:bg-paper-deep/40">
      <td className="p-3">
        <button type="button" onClick={onOpen} className="text-left text-[15px] hover:text-coral">
          {guest.firstName} {guest.lastName}
        </button>
      </td>
      <td className="p-2">
        <select
          value={guest.side}
          onChange={(e) => onPatch({ side: e.target.value as Side })}
          className="rounded-md border border-transparent bg-transparent px-1.5 py-1 text-sm outline-none hover:border-line-strong focus:border-coral"
        >
          {sideSchema.options.map((s) => (
            <option key={s} value={s}>
              {sideLabel(s, partnerAName, partnerBName)}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2">
        <select
          value={guest.tier}
          onChange={(e) => onPatch({ tier: e.target.value as Tier })}
          className={cn("rounded-full border px-2 py-0.5 text-xs font-medium capitalize outline-none", TIER_CLASS[guest.tier])}
        >
          {tierSchema.options.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </td>
      <td className="p-3 text-sm text-ink-soft">{guest.homeCity ?? "—"}</td>
      <td className="p-3 text-center text-sm">{guest.plusOne ? "Yes" : "—"}</td>
      <td className="p-3 text-center text-sm">{guest.isChild ? "Yes" : "—"}</td>
      <td className="p-3 text-sm text-ink-soft">{guest.dietary ?? "—"}</td>
    </tr>
  );
}
