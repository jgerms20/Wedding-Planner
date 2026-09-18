"use client";

import { applyActions, describeAction, undoResults, type ApplyResult, type BowerAction } from "@bower/shared";
import { Check, Pencil, Undo2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRepoContext } from "@/lib/repo-context";
import type { ActionSource } from "@/lib/ai/interpret";
import { cn } from "@/lib/utils";

/**
 * What Atlas proposes, as cards the couple approves one at a time.
 *
 * Nothing here touches the data until Apply is pressed, and everything that
 * was applied stays undoable until the toast clears — `undoResults` reverses
 * exactly what `applyActions` created.
 */

type CardState = "pending" | "applied" | "skipped" | "failed";

interface Item {
  key: string;
  action: BowerAction;
  state: CardState;
  summary?: string;
  error?: string;
}

export interface ProposalCardsProps {
  actions: BowerAction[];
  /** Already applied for them (autonomy level 2). Shown done, still undoable. */
  applied?: ApplyResult[];
  source?: ActionSource;
  /** Called once no card is left waiting, so the host can dismiss the panel. */
  onResolved?: () => void;
  className?: string;
}

/**
 * Card state (applied, skipped, edited) lives here for the life of the
 * component, so a new proposal must arrive as a new instance: give each one a
 * stable `key` — the message id in the Concierge, a per-submission id in the
 * Tell Atlas bar. Re-deriving state from the props would wipe "applied" every
 * time a data refresh re-rendered the list.
 */
export function ProposalCards({ actions, applied, source = "chat", onResolved, className }: ProposalCardsProps) {
  const { repo, wedding, touch } = useRepoContext();
  const [items, setItems] = useState<Item[]>(() => initialItems(actions, applied));
  const [undoable, setUndoable] = useState<{ results: ApplyResult[]; keys: string[] } | null>(() => initialUndo(applied));
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!undoable) return;
    const timer = setTimeout(() => setUndoable(null), 9000);
    return () => clearTimeout(timer);
  }, [undoable]);

  const pendingKeys = items.filter((item) => item.state === "pending").map((item) => item.key);
  const settled = items.length > 0 && pendingKeys.length === 0 && !undoable;

  useEffect(() => {
    if (settled) onResolved?.();
  }, [settled, onResolved]);

  if (items.length === 0) return null;

  async function applyKeys(keys: string[]) {
    if (!repo || !wedding || busy) return;
    const chosen = items.filter((item) => keys.includes(item.key) && item.state === "pending");
    if (chosen.length === 0) return;
    setBusy(true);
    try {
      const results = await applyActions(
        repo,
        wedding.id,
        chosen.map((item) => item.action),
        { source },
      );
      setItems((current) =>
        current.map((item) => {
          const index = chosen.findIndex((c) => c.key === item.key);
          if (index === -1) return item;
          const result = results[index]!;
          return {
            ...item,
            state: result.ok ? "applied" : "failed",
            summary: result.summary,
            error: result.error,
          };
        }),
      );
      const applied = results.filter((result) => result.ok);
      if (applied.length > 0) setUndoable({ results: applied, keys: chosen.map((item) => item.key) });
      touch();
    } finally {
      setBusy(false);
    }
  }

  async function undoLast() {
    if (!repo || !undoable) return;
    setBusy(true);
    try {
      await undoResults(repo, undoable.results);
      setItems((current) =>
        current.map((item) =>
          undoable.keys.includes(item.key) ? { ...item, state: "pending", summary: undefined, error: undefined } : item,
        ),
      );
      setUndoable(null);
      touch();
    } finally {
      setBusy(false);
    }
  }

  function skip(key: string) {
    setItems((current) => current.map((item) => (item.key === key ? { ...item, state: "skipped" } : item)));
  }

  function edit(key: string, action: BowerAction) {
    setItems((current) => current.map((item) => (item.key === key ? { ...item, action } : item)));
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {pendingKeys.length > 1 && (
        <div className="flex items-center justify-between gap-3 px-1">
          <p className="eyebrow">{pendingKeys.length} proposed</p>
          <button
            type="button"
            onClick={() => void applyKeys(pendingKeys)}
            disabled={busy}
            className="text-sm font-medium text-coral disabled:opacity-40"
          >
            Apply all
          </button>
        </div>
      )}

      {items.map((item) => (
        <ProposalCard
          key={item.key}
          item={item}
          busy={busy}
          onApply={() => void applyKeys([item.key])}
          onSkip={() => skip(item.key)}
          onEdit={(action) => edit(item.key, action)}
        />
      ))}

      {undoable && (
        <div className="rise flex items-center justify-between gap-3 rounded-md border border-line bg-card px-4 py-2 text-sm text-ink-soft shadow-lg">
          <span>
            Done — {undoable.results.length} change{undoable.results.length === 1 ? "" : "s"} saved.
          </span>
          <button
            type="button"
            onClick={() => void undoLast()}
            disabled={busy}
            className="inline-flex items-center gap-1 font-medium text-coral disabled:opacity-40"
          >
            <Undo2 className="size-3.5" /> Undo
          </button>
        </div>
      )}
    </div>
  );
}

function ProposalCard({
  item,
  busy,
  onApply,
  onSkip,
  onEdit,
}: {
  item: Item;
  busy: boolean;
  onApply: () => void;
  onSkip: () => void;
  onEdit: (action: BowerAction) => void;
}) {
  const [editing, setEditing] = useState(false);
  const editable = item.action.type === "add_guests" || item.action.type === "add_task";

  if (item.state === "skipped") {
    return (
      <div className="rounded-lg border border-dashed border-line px-4 py-2 text-sm text-ink-mute line-through">
        {describeAction(item.action)}
      </div>
    );
  }

  if (item.state === "applied") {
    return (
      <div className="flex items-start gap-2 rounded-lg border border-line bg-gold-soft px-4 py-2.5 text-sm">
        <Check className="mt-0.5 size-4 shrink-0 text-coral" />
        <span>{item.summary ?? describeAction(item.action)}</span>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-line-strong bg-card p-3 shadow-sm">
      <div className="flex items-start gap-3">
        <p className="min-w-0 flex-1 text-[15px] leading-snug">{describeAction(item.action)}</p>
        <div className="flex shrink-0 items-center gap-1">
          {editable && (
            <button
              type="button"
              onClick={() => setEditing((value) => !value)}
              aria-label="Edit"
              className={cn("rounded-full p-1.5 text-ink-soft hover:bg-muted", editing && "bg-muted text-foreground")}
            >
              <Pencil className="size-3.5" />
            </button>
          )}
          <button type="button" onClick={onSkip} aria-label="Skip" className="rounded-full p-1.5 text-ink-soft hover:bg-muted">
            <X className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={onApply}
            disabled={busy}
            className="rounded-full bg-coral px-3 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-40"
          >
            Apply
          </button>
        </div>
      </div>

      {item.error && <p className="mt-2 text-sm text-destructive">{item.error}</p>}

      {editing && item.action.type === "add_guests" && <GuestEditor action={item.action} onChange={onEdit} />}
      {editing && item.action.type === "add_task" && <TaskEditor action={item.action} onChange={onEdit} />}
    </div>
  );
}

type GuestAction = Extract<BowerAction, { type: "add_guests" }>;
type TaskAction = Extract<BowerAction, { type: "add_task" }>;

function GuestEditor({ action, onChange }: { action: GuestAction; onChange: (action: BowerAction) => void }) {
  function update(index: number, patch: Partial<GuestAction["guests"][number]>) {
    const guests = action.guests.map((guest, i) => (i === index ? { ...guest, ...patch } : guest));
    onChange({ ...action, guests });
  }

  return (
    <div className="mt-3 space-y-3 border-t border-line pt-3">
      {action.guests.map((guest, index) => (
        <div key={index} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <label className="col-span-2 flex flex-col gap-1 sm:col-span-2">
            <span className="eyebrow">Name</span>
            <input
              value={[guest.firstName, guest.lastName].filter(Boolean).join(" ")}
              onChange={(e) => {
                const [first, ...rest] = e.target.value.split(" ");
                update(index, { firstName: first ?? "", lastName: rest.length > 0 ? rest.join(" ") : undefined });
              }}
              className="h-9 rounded-md border border-line-strong bg-background px-2 text-sm outline-none focus:border-coral"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="eyebrow">Side</span>
            <select
              value={guest.side ?? "both"}
              onChange={(e) => update(index, { side: e.target.value as GuestAction["guests"][number]["side"] })}
              className="h-9 rounded-md border border-line-strong bg-background px-2 text-sm outline-none focus:border-coral"
            >
              <option value="a">Joshua</option>
              <option value="b">Janel</option>
              <option value="both">Both</option>
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="eyebrow">Tier</span>
            <select
              value={guest.tier ?? "must"}
              onChange={(e) => update(index, { tier: e.target.value as GuestAction["guests"][number]["tier"] })}
              className="h-9 rounded-md border border-line-strong bg-background px-2 text-sm outline-none focus:border-coral"
            >
              <option value="must">Must</option>
              <option value="should">Should</option>
              <option value="nice">Nice</option>
            </select>
          </label>
          <label className="col-span-2 flex flex-col gap-1 sm:col-span-4">
            <span className="eyebrow">City</span>
            <input
              value={guest.homeCity ?? ""}
              placeholder="Where they'd fly from"
              onChange={(e) => update(index, { homeCity: e.target.value || undefined })}
              className="h-9 rounded-md border border-line-strong bg-background px-2 text-sm outline-none focus:border-coral"
            />
          </label>
        </div>
      ))}
    </div>
  );
}

function TaskEditor({ action, onChange }: { action: TaskAction; onChange: (action: BowerAction) => void }) {
  return (
    <div className="mt-3 grid gap-2 border-t border-line pt-3 sm:grid-cols-[1.6fr_1fr]">
      <label className="flex flex-col gap-1">
        <span className="eyebrow">Task</span>
        <input
          value={action.title}
          onChange={(e) => onChange({ ...action, title: e.target.value })}
          className="h-9 rounded-md border border-line-strong bg-background px-2 text-sm outline-none focus:border-coral"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="eyebrow">Due</span>
        <input
          type="date"
          value={action.dueDate ?? ""}
          onChange={(e) => onChange({ ...action, dueDate: e.target.value || undefined })}
          className="h-9 rounded-md border border-line-strong bg-background px-2 text-sm outline-none focus:border-coral"
        />
      </label>
    </div>
  );
}

function initialItems(actions: BowerAction[], applied?: ApplyResult[]): Item[] {
  const done: Item[] = (applied ?? []).map((result, index) => ({
    key: `a${index}-${result.action.type}`,
    action: result.action,
    state: result.ok ? "applied" : "failed",
    summary: result.summary,
    error: result.error,
  }));
  const pending: Item[] = actions.map((action, index) => ({ key: `p${index}-${action.type}`, action, state: "pending" }));
  return [...done, ...pending];
}

function initialUndo(applied?: ApplyResult[]): { results: ApplyResult[]; keys: string[] } | null {
  if (!applied || applied.length === 0) return null;
  const keys = applied.map((result, index) => ({ result, key: `a${index}-${result.action.type}` })).filter((entry) => entry.result.ok);
  if (keys.length === 0) return null;
  return { results: keys.map((entry) => entry.result), keys: keys.map((entry) => entry.key) };
}
