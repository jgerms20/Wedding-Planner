"use client";

import type { Priority } from "@bower/shared";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/** A must-haves checklist scoped to one area (e.g. "Venue", "Budget", "Overall"). Reused across
 * Atlas, Budget, and Plan rather than building three bespoke UIs — each page just passes its own
 * `area` and the wedding's full priorities list. */
export function PrioritiesCard({
  title = "Must-haves",
  area,
  priorities,
  onAdd,
  onToggle,
  onRemove,
}: {
  title?: string;
  area: string;
  priorities: Priority[];
  onAdd: (area: string, label: string) => void;
  onToggle: (priority: Priority) => void;
  onRemove: (priority: Priority) => void;
}) {
  const [draft, setDraft] = useState("");
  const items = priorities.filter((p) => p.area === area);

  return (
    <div className="postcard p-5">
      <p className="eyebrow">{title}</p>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-ink-mute">Nothing marked yet.</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-1.5">
          {items.map((p) => (
            <li key={p.id} className="flex items-center gap-2 text-sm">
              <Checkbox checked={p.done} onChange={() => onToggle(p)} />
              <span className={cn("flex-1 min-w-0 truncate", p.done && "text-ink-mute line-through")}>{p.label}</span>
              <button
                type="button"
                onClick={() => onRemove(p)}
                aria-label={`Remove ${p.label}`}
                className="shrink-0 rounded-full p-1 text-ink-mute transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const label = draft.trim();
          if (!label) return;
          onAdd(area, label);
          setDraft("");
        }}
        className="mt-3 flex gap-2"
      >
        <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="A must-have…" className="flex-1" />
        <Button type="submit" size="sm" variant="outline" disabled={!draft.trim()}>
          <Plus className="size-3.5" />
        </Button>
      </form>
    </div>
  );
}
