"use client";

import {
  alreadyListed,
  newId,
  nowIso,
  parseGuestList,
  sideSchema,
  TIERS,
  type Guest,
  type ParsedGuest,
  type Side,
  type Tier,
} from "@bower/shared";
import { FileUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogBody, DialogCloseButton, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { sideLabel } from "@/lib/side-label";
import { cn } from "@/lib/utils";

interface ReviewRow extends ParsedGuest {
  key: string;
  include: boolean;
  /** Someone with this name is already on the list (same side). */
  existing?: string;
}

const MAX_FILE_BYTES = 2 * 1024 * 1024;

/**
 * Paste a list (or drop a text/CSV file) and review what it turns into before anything is saved.
 * Shorthand like "Reagan +1", "Lauren + Ben", "Danielle (maybe +1)" is understood; anything
 * hedged or unclear is flagged; names already on the list start unchecked.
 */
export function BulkAddDialog({
  open,
  onOpenChange,
  weddingId,
  guests,
  partnerAName,
  partnerBName,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  weddingId: string;
  guests: Guest[];
  partnerAName: string;
  partnerBName: string;
  onAdd: (guests: Guest[]) => Promise<void>;
}) {
  const [text, setText] = useState("");
  const [side, setSide] = useState<Side>("both");
  const [rows, setRows] = useState<ReviewRow[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setText("");
    setRows(null);
    setError(null);
  }

  function review() {
    const parsed = parseGuestList(text, { side });
    setRows(
      parsed.map((row, i) => {
        const match = alreadyListed(row, guests);
        return { ...row, key: `${i}-${row.firstName}`, include: !match, existing: match ? [match.firstName, match.lastName].filter(Boolean).join(" ") : undefined };
      }),
    );
  }

  async function readFile(file: File) {
    setError(null);
    if (file.size > MAX_FILE_BYTES) return setError(`${file.name} is too big for a guest list — paste the names instead.`);
    if (!/^text\/|csv|markdown/.test(file.type) && !/\.(txt|csv|md|tsv)$/i.test(file.name)) {
      return setError("That file type isn't readable here — use a .txt or .csv, or paste the names. (For a spreadsheet, export it as CSV first.)");
    }
    const content = await file.text();
    // CSV/TSV: the first column holds the name; keep any second column as a note.
    const lines = /\.(csv|tsv)$/i.test(file.name)
      ? content
          .split(/\r?\n/)
          .map((line) => line.split(/\t|,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map((cell) => cell.replace(/^"|"$/g, "").trim()))
          .filter((cells) => cells[0])
          .map(([name, note]) => (note ? `${name} — ${note}` : name!))
          .join("\n")
      : content;
    setText((current) => (current ? `${current}\n${lines}` : lines));
  }

  const update = (key: string, patch: Partial<ReviewRow>) => setRows((rs) => rs?.map((r) => (r.key === key ? { ...r, ...patch } : r)) ?? null);
  const chosen = rows?.filter((r) => r.include && r.firstName.trim()) ?? [];

  async function add() {
    setBusy(true);
    const now = nowIso();
    await onAdd(
      chosen.map((r) => ({
        id: newId(),
        weddingId,
        firstName: r.firstName.trim(),
        lastName: r.lastName?.trim() || undefined,
        relationship: r.relationship,
        notes: r.notes,
        side: r.side,
        tier: r.tier,
        plusOne: r.plusOne,
        plusOneCount: r.plusOneCount,
        isChild: false,
        tags: r.tags,
        rsvp: {},
        createdAt: now,
        updatedAt: now,
      })),
    );
    setBusy(false);
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
      className="max-w-4xl"
    >
      <DialogHeader>
        <DialogTitle>{rows ? `Review ${rows.length} ${rows.length === 1 ? "name" : "names"}` : "Add a list of guests"}</DialogTitle>
        <DialogCloseButton onClose={() => onOpenChange(false)} />
      </DialogHeader>

      {!rows ? (
        <DialogBody className="flex flex-col gap-3">
          <p className="text-sm text-ink-soft">
            Paste names one per line — numbered, bulleted, however they came. &ldquo;Reagan +1&rdquo;, &ldquo;Lauren + Ben&rdquo; and
            &ldquo;Danielle (maybe +1)&rdquo; all work. You&apos;ll check everything before it&apos;s added.
          </p>
          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) void readFile(file);
            }}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-line-strong px-3 py-2.5 text-sm text-ink-soft hover:border-coral hover:text-coral"
          >
            <FileUp className="size-4 stroke-[1.5]" /> Drop a .txt or .csv here, or choose one
            <input
              type="file"
              accept=".txt,.csv,.tsv,.md,text/plain,text/csv"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void readFile(file);
                e.target.value = "";
              }}
            />
          </label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            placeholder={"Mom\nDad\nReagan +1\nLauren + Ben\nDanielle (maybe +1)\nKayleigh — girl from CLT"}
            className="font-mono text-sm"
          />
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            Whose list is this?
            <Select value={side} onChange={(e) => setSide(e.target.value as Side)} className="w-auto">
              {sideSchema.options.map((s) => (
                <option key={s} value={s}>
                  {sideLabel(s, partnerAName, partnerBName)}
                </option>
              ))}
            </Select>
          </label>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </DialogBody>
      ) : (
        <DialogBody className="max-h-[65vh] overflow-auto p-0">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead className="sticky top-0 bg-card">
              <tr className="border-b border-line text-left text-[0.65rem] font-semibold tracking-[0.14em] text-ink-mute uppercase">
                <th className="w-8 p-2" />
                <th className="p-2">Name</th>
                <th className="p-2">Side</th>
                <th className="p-2">Tier</th>
                <th className="p-2 text-center">+1</th>
                <th className="p-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className={cn("border-b border-line/70", !row.include && "opacity-50")}>
                  <td className="p-2 text-center">
                    <input
                      type="checkbox"
                      checked={row.include}
                      onChange={(e) => update(row.key, { include: e.target.checked })}
                      aria-label={`Include ${row.firstName}`}
                      className="accent-[var(--coral)]"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      value={[row.firstName, row.lastName].filter(Boolean).join(" ")}
                      onChange={(e) => {
                        const value = e.target.value;
                        const at = row.lastName ? value.lastIndexOf(" ") : -1;
                        update(row.key, at > 0 ? { firstName: value.slice(0, at), lastName: value.slice(at + 1) } : { firstName: value, lastName: undefined });
                      }}
                      className="w-full rounded-md border border-transparent bg-transparent px-1.5 py-1 outline-none hover:border-line-strong focus:border-coral"
                    />
                    <p className="px-1.5 text-[0.7rem] text-ink-mute">
                      {row.existing && <span className="mr-1.5 text-coral">already listed as {row.existing}</span>}
                      {row.flags.map((flag) => (
                        <span key={flag} className="mr-1 rounded-full bg-gold-soft px-1.5 py-px text-ink">
                          {flag}
                        </span>
                      ))}
                      <span title="The line this came from">“{row.source}”</span>
                    </p>
                  </td>
                  <td className="p-2">
                    <select
                      value={row.side}
                      onChange={(e) => update(row.key, { side: e.target.value as Side })}
                      className="rounded-md border border-transparent bg-transparent px-1 py-1 outline-none hover:border-line-strong"
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
                      value={row.tier}
                      onChange={(e) => update(row.key, { tier: Number(e.target.value) as Tier })}
                      className="tabular rounded-md border border-transparent bg-transparent px-1 py-1 outline-none hover:border-line-strong"
                    >
                      {TIERS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2 text-center">
                    <button
                      type="button"
                      onClick={() => update(row.key, { plusOne: !row.plusOne })}
                      className={cn(
                        "tabular rounded-full border px-2 py-0.5 text-xs whitespace-nowrap",
                        row.plusOne ? "border-coral/50 bg-coral-soft text-coral" : "border-line text-ink-mute",
                      )}
                    >
                      {row.plusOne ? (row.plusOneCount && row.plusOneCount > 1 ? `Yes · ${row.plusOneCount}` : "Yes") : "No"}
                    </button>
                  </td>
                  <td className="p-2">
                    <input
                      value={[row.relationship, row.notes].filter(Boolean).join(" · ")}
                      onChange={(e) => update(row.key, { relationship: undefined, notes: e.target.value || undefined })}
                      className="w-full rounded-md border border-transparent bg-transparent px-1.5 py-1 text-xs text-ink-soft outline-none hover:border-line-strong focus:border-coral"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogBody>
      )}

      <DialogFooter>
        {rows ? (
          <>
            <Button variant="outline" onClick={() => setRows(null)}>
              Back to the list
            </Button>
            <Button onClick={() => void add()} disabled={busy || chosen.length === 0}>
              {busy ? "Adding…" : `Add ${chosen.length} ${chosen.length === 1 ? "guest" : "guests"}`}
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={review} disabled={!text.trim()}>
              Review names
            </Button>
          </>
        )}
      </DialogFooter>
    </Dialog>
  );
}
