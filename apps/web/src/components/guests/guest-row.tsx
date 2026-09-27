"use client";

import { CHECK_SPELLING_TAG, GROUP_TAG, guestDisplayName, sideSchema, TIERS, type Guest, type Side, type Tier } from "@bower/shared";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { sideLabel } from "@/lib/side-label";
import { cn } from "@/lib/utils";

const TIER_CLASS: Record<Tier, string> = {
  1: "text-coral border-coral/50 bg-coral-soft",
  2: "text-coral border-coral/30 bg-transparent",
  3: "text-foreground border-line-strong bg-paper-deep",
  4: "text-ink-soft border-line bg-transparent",
  5: "text-ink-mute border-line border-dashed bg-transparent",
};

/** Splits an edited name back into first/last, keeping a single-field name single. */
function renamed(guest: Guest, value: string): Partial<Guest> {
  const name = value.trim().replace(/\s+/g, " ");
  if (!guest.lastName || !name.includes(" ")) return { firstName: name, lastName: undefined };
  const at = name.lastIndexOf(" ");
  return { firstName: name.slice(0, at), lastName: name.slice(at + 1) };
}

export function GuestRow({
  guest,
  number,
  partnerAName,
  partnerBName,
  onOpen,
  onPatch,
}: {
  guest: Guest;
  number: number;
  partnerAName: string;
  partnerBName: string;
  onOpen: () => void;
  onPatch: (patch: Partial<Guest>) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const isGroup = guest.tags.includes(GROUP_TAG);
  const checkSpelling = guest.tags.includes(CHECK_SPELLING_TAG);
  const detail = [guest.relationship, guest.notes].filter(Boolean).join(" · ");

  function commit() {
    setEditing(false);
    if (draft.trim() && draft.trim() !== guestDisplayName(guest)) {
      // A corrected spelling is the whole point — clear the "check spelling" flag with it.
      onPatch({ ...renamed(guest, draft), tags: guest.tags.filter((t) => t !== CHECK_SPELLING_TAG) });
    }
  }

  return (
    <tr className="border-b border-line/70 last:border-0 hover:bg-paper-deep/40">
      <td className="tabular w-10 py-2.5 pr-1 pl-3 text-right text-xs text-ink-mute">{number}</td>
      <td className="min-w-[14rem] p-2.5">
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") setEditing(false);
            }}
            aria-label="Guest name"
            className="w-full rounded-md border border-coral bg-background px-2 py-1 text-[15px] outline-none"
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setDraft(guestDisplayName(guest));
              setEditing(true);
            }}
            title="Click to fix the spelling"
            className="text-left text-[15px] decoration-dotted underline-offset-4 hover:text-coral hover:underline"
          >
            {guestDisplayName(guest)}
          </button>
        )}
        {(detail || checkSpelling || isGroup) && (
          <p className="mt-0.5 line-clamp-2 text-xs text-ink-mute">
            {checkSpelling && <span className="mr-1.5 rounded-full bg-gold-soft px-1.5 py-px text-[0.65rem] font-medium text-ink">check spelling</span>}
            {isGroup && <span className="mr-1.5 rounded-full border border-line px-1.5 py-px text-[0.65rem]">group · names to come</span>}
            {detail}
          </p>
        )}
      </td>
      <td className="p-2">
        <select
          value={guest.side}
          onChange={(e) => onPatch({ side: e.target.value as Side })}
          aria-label={`${guestDisplayName(guest)}'s side`}
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
          onChange={(e) => onPatch({ tier: Number(e.target.value) as Tier })}
          aria-label={`${guestDisplayName(guest)}'s tier`}
          className={cn("tabular rounded-full border px-2 py-0.5 text-xs font-medium outline-none", TIER_CLASS[guest.tier])}
        >
          {TIERS.map((t) => (
            <option key={t} value={t}>
              Tier {t}
            </option>
          ))}
        </select>
      </td>
      <td className="p-2 text-center">
        {isGroup ? (
          <span className="text-xs text-ink-mute">—</span>
        ) : (
          <button
            type="button"
            onClick={() => onPatch({ plusOne: !guest.plusOne })}
            aria-pressed={guest.plusOne}
            aria-label={`${guestDisplayName(guest)} plus-one`}
            className={cn(
              "tabular min-w-[3rem] rounded-full border px-2 py-0.5 text-xs whitespace-nowrap transition-colors",
              guest.plusOne ? "border-coral/50 bg-coral-soft text-coral" : "border-line text-ink-mute hover:border-line-strong",
            )}
          >
            {guest.plusOne ? (guest.plusOneCount && guest.plusOneCount > 1 ? `Yes · ${guest.plusOneCount}` : "Yes") : "No"}
          </button>
        )}
      </td>
      <td className="w-10 p-2 pr-3 text-right">
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Edit ${guestDisplayName(guest)}`}
          className="rounded-full p-1.5 text-ink-mute transition-colors hover:bg-muted hover:text-foreground"
        >
          <Pencil className="size-3.5 stroke-[1.5]" />
        </button>
      </td>
    </tr>
  );
}
