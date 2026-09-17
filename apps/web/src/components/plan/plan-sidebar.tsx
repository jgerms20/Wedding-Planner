"use client";

import { newId, type Anchor, type TravelWindow } from "@bower/shared";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/format";

export function AnchorsCard({ anchors }: { anchors: Anchor[] }) {
  return (
    <div className="postcard rise p-5">
      <p className="eyebrow">Anchors</p>
      {anchors.length === 0 ? (
        <p className="mt-3 text-sm text-ink-soft">No anchors yet. Add one from Plan settings.</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-4">
          {anchors.map((anchor) => (
            <li key={anchor.id}>
              <p className="font-display text-lg leading-tight">{anchor.title}</p>
              <p className="mt-0.5 text-sm text-ink-soft">{anchor.date ? formatDate(anchor.date, "EEE, MMM d, yyyy") : "No date yet"}</p>
              {anchor.reveals.length > 0 && (
                <p className="mt-0.5 text-xs text-ink-mute">The reveal: {anchor.reveals.map((r) => r.replace(/_/g, " ")).join(", ")}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function TravelWindowsCard({ windows, onAdd }: { windows: TravelWindow[]; onAdd: (window: TravelWindow) => Promise<void> | void }) {
  const [adding, setAdding] = useState(false);
  const [label, setLabel] = useState("");
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (!start || !end) return;
    setSaving(true);
    await onAdd({ id: newId(), label: label.trim() || location.trim() || "Trip", start, end, location: location.trim() });
    setSaving(false);
    setLabel("");
    setLocation("");
    setStart("");
    setEnd("");
    setAdding(false);
  }

  return (
    <div className="postcard rise rise-2 p-5">
      <p className="eyebrow">Travel windows</p>
      <p className="mt-2 text-sm text-ink-soft">Add the dates you&apos;ll be on the East Coast; Bower will schedule tours and tastings into them.</p>

      {windows.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2 text-sm">
          {windows.map((w) => (
            <li key={w.id} className="flex items-center justify-between gap-3">
              <span className="min-w-0 truncate">{w.label || w.location}</span>
              <span className="tabular shrink-0 text-ink-soft">
                {formatDate(w.start, "MMM d")} – {formatDate(w.end, "MMM d")}
              </span>
            </li>
          ))}
        </ul>
      )}

      {adding ? (
        <div className="mt-4 flex flex-col gap-2 rounded-md border border-line p-3">
          <div className="grid grid-cols-2 gap-2">
            <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label" className="h-8 text-xs" />
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="h-8 text-xs" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="h-8 text-xs" aria-label="Start date" />
            <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="h-8 text-xs" aria-label="End date" />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" size="sm" onClick={() => setAdding(false)}>
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={submit} disabled={!start || !end || saving}>
              {saving ? "Saving…" : "Add window"}
            </Button>
          </div>
        </div>
      ) : (
        <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => setAdding(true)}>
          <Plus className="size-3.5" /> Add travel window
        </Button>
      )}
    </div>
  );
}
