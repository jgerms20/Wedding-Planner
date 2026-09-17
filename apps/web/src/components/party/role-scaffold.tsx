"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Shown for a role nobody is filling yet: what the role is on the hook for, and a one-line way to fill it. */
export function RoleScaffold({ label, duties, onAdd }: { label: string; duties: string[]; onAdd: (name: string) => Promise<void> | void }) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (!name.trim()) return;
    setSaving(true);
    await onAdd(name.trim());
    setSaving(false);
    setName("");
    setAdding(false);
  }

  return (
    <div className="postcard flex flex-col gap-3 border-dashed p-5">
      <div>
        <p className="font-display text-lg leading-tight text-ink-soft">{label}</p>
        <p className="mt-1 text-xs text-ink-mute">{duties.join(" · ")}</p>
      </div>
      {adding ? (
        <div className="flex gap-2">
          <Input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void submit();
              if (e.key === "Escape") setAdding(false);
            }}
            placeholder="Their name"
            className="h-8 text-sm"
          />
          <Button type="button" size="sm" onClick={submit} disabled={!name.trim() || saving}>
            Add
          </Button>
        </div>
      ) : (
        <Button type="button" variant="outline" size="sm" className="w-fit" onClick={() => setAdding(true)}>
          <Plus className="size-3.5" /> Add name
        </Button>
      )}
    </div>
  );
}
