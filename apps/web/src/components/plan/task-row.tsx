"use client";

import type { Task } from "@bower/shared";
import { Check } from "lucide-react";
import { useState } from "react";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * One task in the Plan. Everything edits inline: tap the circle to complete,
 * click the title or date to edit them in place. Dependency and travel hints
 * are derived, never stored.
 */
export function TaskRow({
  task,
  tasksById,
  windowLabels,
  onChange,
}: {
  task: Task;
  tasksById: Map<string, Task>;
  windowLabels: Record<string, string>;
  onChange: (patch: Partial<Task>) => void;
}) {
  const doneish = task.status === "done" || task.status === "skipped";
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDate, setEditingDate] = useState(false);
  const [justToggled, setJustToggled] = useState(false);

  function toggleDone() {
    const next = doneish ? "todo" : "done";
    onChange({ status: next });
    if (next === "done") {
      setJustToggled(true);
      window.setTimeout(() => setJustToggled(false), 420);
    }
  }

  const openDependency = task.dependsOn
    .map((id) => tasksById.get(id))
    .find((t): t is Task => t !== undefined && t.status !== "done" && t.status !== "skipped");

  const isInPerson = task.tags.includes("in-person");
  const visibleTags = task.tags.filter((t) => t !== "needs-window" && t !== "in-person");
  const windowLabel = task.windowId ? windowLabels[task.windowId] : undefined;

  return (
    <div className="flex items-start gap-3 py-3">
      <button
        type="button"
        onClick={toggleDone}
        aria-label={doneish ? `Mark "${task.title}" not done` : `Mark "${task.title}" done`}
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
          doneish ? "border-coral bg-coral text-primary-foreground" : "border-line-strong text-transparent hover:border-coral hover:text-coral",
          justToggled && "scale-125",
        )}
      >
        <Check className="size-3" />
      </button>

      <div className="min-w-0 flex-1">
        {editingTitle ? (
          <input
            autoFocus
            defaultValue={task.title}
            onBlur={(e) => {
              setEditingTitle(false);
              const value = e.target.value.trim();
              if (value && value !== task.title) onChange({ title: value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
              if (e.key === "Escape") setEditingTitle(false);
            }}
            className="w-full rounded-md border border-line-strong bg-transparent px-1.5 py-0.5 text-[15px] outline-none focus:border-coral"
          />
        ) : (
          <button
            type="button"
            onClick={() => setEditingTitle(true)}
            className={cn(
              "text-left text-[15px] leading-snug transition-colors hover:text-coral",
              doneish && "text-ink-mute line-through",
            )}
          >
            {task.title}
          </button>
        )}

        {(visibleTags.length > 0 || isInPerson || openDependency) && (
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {visibleTags.map((tag) => (
              <span key={tag} className="rounded-full border border-line px-2 py-0.5 text-[0.65rem] text-ink-soft">
                {tag.replace(/-/g, " ")}
              </span>
            ))}
            {isInPerson &&
              (windowLabel ? (
                <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[0.65rem] text-ink">{windowLabel}</span>
              ) : (
                <span className="rounded-full border border-coral/50 px-2 py-0.5 text-[0.65rem] text-coral">needs a trip</span>
              ))}
            {openDependency && <span className="text-[0.7rem] text-ink-mute">after: {openDependency.title}</span>}
          </div>
        )}
      </div>

      {editingDate ? (
        <input
          type="date"
          autoFocus
          defaultValue={task.dueDate ?? ""}
          onBlur={(e) => {
            setEditingDate(false);
            onChange({ dueDate: e.target.value || undefined });
          }}
          className="h-8 shrink-0 rounded-md border border-line-strong bg-transparent px-2 text-xs"
        />
      ) : (
        <button type="button" onClick={() => setEditingDate(true)} className="tabular shrink-0 text-xs text-ink-soft hover:text-coral">
          {task.dueDate ? formatDate(task.dueDate, "EEE, MMM d") : "Set date"}
        </button>
      )}
    </div>
  );
}
