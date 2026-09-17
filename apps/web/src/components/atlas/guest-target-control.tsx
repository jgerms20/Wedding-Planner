"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "Planning for 100 invited" — click the number to edit it in place. No
 * permanent input box, per the design system's inline-edit rule.
 */
export function GuestTargetControl({ value, onSave }: { value: number; onSave: (next: number) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editing) setDraft(String(value));
  }, [value, editing]);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  function commit() {
    const next = Math.round(Number(draft));
    setEditing(false);
    if (Number.isFinite(next) && next > 0 && next !== value) onSave(next);
    else setDraft(String(value));
  }

  return (
    <p className="rise text-sm text-ink-soft">
      Planning for{" "}
      {editing ? (
        <input
          ref={inputRef}
          type="number"
          min={1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") {
              setDraft(String(value));
              setEditing(false);
            }
          }}
          className="tabular inline-block w-16 rounded-md border border-line-strong bg-transparent px-1.5 py-0.5 text-center text-sm font-medium text-foreground outline-none focus:border-coral"
        />
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="tabular rounded-md px-1 font-medium text-foreground underline decoration-line-strong decoration-dotted underline-offset-4 transition-colors hover:text-coral hover:decoration-coral"
        >
          {value}
        </button>
      )}{" "}
      invited
    </p>
  );
}
