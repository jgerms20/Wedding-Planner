"use client";

import type { SavingsEntry } from "@bower/shared";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate, formatMoney } from "@/lib/format";

/** How the wedding fund is tracking against the pinned scenario's total (or a manual override),
 * plus a log of what's gone in so far. `targetDate` drives the "per month" suggestion; without
 * one, the couple just sees where they stand. */
export function SavingsPanel({
  entries,
  total,
  target,
  targetDate,
  onAdd,
  onRemove,
}: {
  entries: SavingsEntry[];
  total: number;
  target: number | undefined;
  targetDate: string | undefined;
  onAdd: (date: string, amount: number, note?: string) => void;
  onRemove: (entry: SavingsEntry) => void;
}) {
  const remaining = target !== undefined ? Math.max(0, target - total) : undefined;
  const monthsLeft = targetDate ? monthsUntil(targetDate) : undefined;
  const perMonth = remaining !== undefined && monthsLeft && monthsLeft > 0 ? remaining / monthsLeft : undefined;

  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <div className="postcard grid gap-6 p-6 sm:grid-cols-3">
        <Stat label="Saved so far" value={formatMoney(total)} accent />
        <Stat label="Target" value={target !== undefined ? formatMoney(target) : "—"} />
        <Stat label="Remaining" value={remaining !== undefined ? formatMoney(remaining) : "—"} />
      </div>
      {perMonth !== undefined && (
        <p className="text-sm text-ink-soft">
          At this rate, saving <span className="tabular font-medium text-foreground">{formatMoney(perMonth)}</span> a month gets you there by the
          wedding date.
        </p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const value = Number(amount);
          if (!date || !value) return;
          onAdd(date, value, note.trim() || undefined);
          setAmount("");
          setNote("");
        }}
        className="postcard flex flex-wrap items-end gap-3 p-4"
      >
        <div className="flex shrink-0 flex-col gap-1">
          <label className="text-[0.65rem] tracking-wide text-ink-mute uppercase">Date</label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-9 w-36" />
        </div>
        <div className="flex shrink-0 flex-col gap-1">
          <label className="text-[0.65rem] tracking-wide text-ink-mute uppercase">Amount</label>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="500" className="h-9 w-28" />
        </div>
        <div className="flex min-w-[10rem] flex-1 flex-col gap-1">
          <label className="text-[0.65rem] tracking-wide text-ink-mute uppercase">Note (optional)</label>
          <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Tax refund, monthly transfer…" className="h-9" />
        </div>
        <Button type="submit" size="sm" className="shrink-0" disabled={!date || !amount}>
          <Plus className="size-3.5" /> Add
        </Button>
      </form>

      {entries.length === 0 ? (
        <p className="text-sm text-ink-mute">Nothing logged yet.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-line">
          {entries.map((entry) => (
            <li key={entry.id} className="flex items-center gap-3 py-2.5 text-sm">
              <span className="tabular w-24 shrink-0 text-ink-soft">{formatDate(entry.date)}</span>
              <span className="tabular w-24 shrink-0 font-medium">{formatMoney(entry.amount)}</span>
              <span className="min-w-0 flex-1 truncate text-ink-soft">{entry.note}</span>
              <button
                type="button"
                onClick={() => onRemove(entry)}
                aria-label={`Remove ${formatMoney(entry.amount)} entry`}
                className="shrink-0 rounded-full p-1 text-ink-mute transition-colors hover:bg-muted hover:text-destructive"
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <p className={`numeral mt-1 text-3xl ${accent ? "text-coral" : ""}`}>{value}</p>
    </div>
  );
}

function monthsUntil(isoDate: string): number {
  const now = new Date();
  const target = new Date(`${isoDate}T00:00:00`);
  const months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
  return Math.max(0, months);
}
