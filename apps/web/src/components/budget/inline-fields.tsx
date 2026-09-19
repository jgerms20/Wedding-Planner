"use client";

import { useState } from "react";
import { formatDate, formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";

/** A money figure that becomes a number input on click, and saves on blur/Enter. `muted` de-emphasizes
 * it (still fully editable) when the page's Estimate/Actuals toggle favors the other pair of fields. */
export function InlineMoney({
  label,
  value,
  onCommit,
  muted,
}: {
  label: string;
  value: number | undefined;
  onCommit: (value: number | undefined) => void;
  muted?: boolean;
}) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <label className={cn("flex flex-col items-end gap-0.5", muted && "opacity-50")}>
        <span className="text-[0.6rem] tracking-wide text-ink-mute uppercase">{label}</span>
        <input
          type="number"
          autoFocus
          defaultValue={value ?? ""}
          onBlur={(e) => {
            setEditing(false);
            const raw = e.target.value.trim();
            onCommit(raw === "" ? undefined : Number(raw));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
            if (e.key === "Escape") setEditing(false);
          }}
          className="tabular h-7 w-24 rounded-md border border-line-strong bg-transparent px-2 text-right text-sm outline-none focus:border-coral"
        />
      </label>
    );
  }

  return (
    <button type="button" onClick={() => setEditing(true)} className={cn("flex flex-col items-end gap-0.5 text-right", muted && "opacity-50")}>
      <span className="text-[0.6rem] tracking-wide text-ink-mute uppercase">{label}</span>
      <span className={cn("tabular text-sm", value === undefined ? "text-ink-mute" : "text-foreground")}>{formatMoney(value)}</span>
    </button>
  );
}

/** A category's target-percent assumption, editable the same way as `InlineMoney`. Categories
 * are adjusted independently — changing one doesn't rebalance the others — so "play around with
 * the split" is the couple's own call, not something the app second-guesses for them. */
export function InlinePercent({ value, onCommit }: { value: number | undefined; onCommit: (value: number | undefined) => void }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <input
        type="number"
        autoFocus
        min={0}
        max={100}
        defaultValue={value ?? ""}
        onBlur={(e) => {
          setEditing(false);
          const raw = e.target.value.trim();
          onCommit(raw === "" ? undefined : Number(raw));
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
          if (e.key === "Escape") setEditing(false);
        }}
        className="tabular h-6 w-14 rounded-md border border-line-strong bg-transparent px-1.5 text-xs outline-none focus:border-coral"
      />
    );
  }

  return (
    <button type="button" onClick={() => setEditing(true)} className="text-xs text-ink-mute underline decoration-dotted hover:text-coral">
      {value ?? "—"}%
    </button>
  );
}

/** A due date that becomes a date input on click. */
export function InlineDate({ value, onCommit }: { value: string | undefined; onCommit: (value: string | undefined) => void }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <input
        type="date"
        autoFocus
        defaultValue={value ?? ""}
        onBlur={(e) => {
          setEditing(false);
          onCommit(e.target.value || undefined);
        }}
        className="h-7 rounded-md border border-line-strong bg-transparent px-2 text-xs outline-none focus:border-coral"
      />
    );
  }

  return (
    <button type="button" onClick={() => setEditing(true)} className="flex flex-col items-end gap-0.5 text-right">
      <span className="text-[0.6rem] tracking-wide text-ink-mute uppercase">Due</span>
      <span className="tabular text-sm text-ink-soft">{value ? formatDate(value) : "Set date"}</span>
    </button>
  );
}
