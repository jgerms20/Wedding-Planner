"use client";

import { CHECK_SPELLING_TAG, GROUP_TAG, guestDisplayName, sideSchema, TIERS, type Guest, type Side, type Tier } from "@bower/shared";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, X } from "lucide-react";
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
  withNames,
  selected,
  onSelect,
  dragEnabled,
  onOpen,
  onPatch,
  onRemove,
}: {
  guest: Guest;
  number: number;
  partnerAName: string;
  partnerBName: string;
  /** Display names of the guests this one comes with. */
  withNames: string[];
  selected: boolean;
  onSelect: (selected: boolean, shiftKey: boolean) => void;
  /** Off while a search or filter hides part of the list (order is per whole tier). */
  dragEnabled: boolean;
  onOpen: () => void;
  onPatch: (patch: Partial<Guest>) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: guest.id,
    disabled: !dragEnabled,
  });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const isGroup = guest.tags.includes(GROUP_TAG);
  const checkSpelling = guest.tags.includes(CHECK_SPELLING_TAG);
  const detail = [guest.relationship, withNames.length > 0 ? `with ${withNames.join(", ")}` : undefined, guest.notes].filter(Boolean).join(" · ");

  function commit() {
    setEditing(false);
    if (draft.trim() && draft.trim() !== guestDisplayName(guest)) {
      // A corrected spelling is the whole point — clear the "check spelling" flag with it.
      onPatch({ ...renamed(guest, draft), tags: guest.tags.filter((t) => t !== CHECK_SPELLING_TAG) });
    }
  }

  return (
    <tr
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={cn(
        "border-b border-line/70 bg-card last:border-0 hover:bg-paper-deep/40",
        selected && "bg-coral-soft/50 hover:bg-coral-soft/60",
        isDragging && "relative z-10 shadow-lg",
      )}
    >
      <td className="w-16 py-2.5 pl-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
            disabled={!dragEnabled}
            aria-label={`Drag ${guestDisplayName(guest)} to reorder`}
            title={dragEnabled ? "Drag to reorder, or onto another tier" : "Clear the search and filter to drag"}
            className="cursor-grab touch-none rounded p-0.5 text-ink-mute hover:text-foreground disabled:cursor-default disabled:opacity-30 active:cursor-grabbing"
          >
            <GripVertical className="size-3.5 stroke-[1.5]" />
          </button>
          <input
            type="checkbox"
            checked={selected}
            onClick={(e) => onSelect(!selected, e.shiftKey)}
            onChange={() => {}}
            aria-label={`Select ${guestDisplayName(guest)}`}
            className="accent-[var(--coral)]"
          />
          <span className="tabular ml-0.5 w-6 text-right text-xs text-ink-mute">{number}</span>
        </div>
      </td>
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
        {(detail || checkSpelling || isGroup || guest.role) && (
          <p className="mt-0.5 line-clamp-2 text-xs text-ink-mute">
            {guest.role && <span className="mr-1.5 rounded-full bg-ink px-1.5 py-px text-[0.65rem] font-medium text-rail-foreground">{guest.role}</span>}
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
      <td className="w-20 p-2 pr-3 text-right whitespace-nowrap">
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Edit ${guestDisplayName(guest)}`}
          className="rounded-full p-1.5 text-ink-mute transition-colors hover:bg-muted hover:text-foreground"
        >
          <Pencil className="size-3.5 stroke-[1.5]" />
        </button>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${guestDisplayName(guest)}`}
          title="Take off the list (you can undo)"
          className="rounded-full p-1.5 text-ink-mute transition-colors hover:bg-muted hover:text-destructive"
        >
          <X className="size-3.5 stroke-[1.5]" />
        </button>
      </td>
    </tr>
  );
}
