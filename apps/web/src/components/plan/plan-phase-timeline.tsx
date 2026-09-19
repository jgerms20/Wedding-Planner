"use client";

import { PHASE_LABELS, PHASE_ORDER, type PhaseKey, type Task } from "@bower/shared";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * "Where are we" at a glance — the eight phases the task list is already grouped by (Just
 * engaged → After), each marked done/current/upcoming. The main column already shows this
 * structure per-section, but nothing gave a persistent, whole-plan view of it; this is that.
 *
 * The first phase (in `PHASE_ORDER`) that isn't fully done is "current"; everything before it is
 * "done"; everything after is "upcoming" — a phase with no tasks yet reads as upcoming too.
 */
export function PlanPhaseTimeline({ byPhase }: { byPhase: Map<PhaseKey, Task[]> }) {
  const currentIndex = PHASE_ORDER.findIndex((phase) => {
    const items = byPhase.get(phase) ?? [];
    return items.length === 0 || items.some((t) => t.status !== "done" && t.status !== "skipped");
  });

  return (
    <div className="postcard p-5">
      <p className="eyebrow">Where we are</p>
      <ol className="mt-4 flex flex-col">
        {PHASE_ORDER.map((phase, i) => {
          const items = byPhase.get(phase) ?? [];
          const done = items.length > 0 && items.every((t) => t.status === "done" || t.status === "skipped");
          const isCurrent = currentIndex === -1 ? false : i === currentIndex;
          const closedCount = items.filter((t) => t.status === "done" || t.status === "skipped").length;
          const isLast = i === PHASE_ORDER.length - 1;
          return (
            <li key={phase} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full border text-[0.65rem]",
                    done
                      ? "border-coral bg-coral text-primary-foreground"
                      : isCurrent
                        ? "border-coral text-coral"
                        : "border-line text-ink-mute",
                  )}
                >
                  {done ? <Check className="size-3" /> : i + 1}
                </span>
                {!isLast && <span className={cn("mt-0.5 w-px flex-1", done ? "bg-coral" : "bg-line")} />}
              </div>
              <div className={cn("min-w-0 pb-5", isLast && "pb-0")}>
                <p className={cn("text-sm leading-5", isCurrent ? "font-medium text-foreground" : done ? "text-ink-soft" : "text-ink-mute")}>
                  {PHASE_LABELS[phase]}
                </p>
                {items.length > 0 && (
                  <p className="tabular text-xs text-ink-mute">
                    {closedCount} of {items.length}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
