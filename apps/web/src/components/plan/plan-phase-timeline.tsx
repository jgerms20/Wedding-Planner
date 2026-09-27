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
export function PlanPhaseTimeline({
  byPhase,
  selected,
  onSelect,
}: {
  byPhase: Map<PhaseKey, Task[]>;
  /** The phase the task list is showing on its own, if any. */
  selected?: PhaseKey | null;
  /** Click a phase to see just its tasks; click it again to see every phase. */
  onSelect?: (phase: PhaseKey | null) => void;
}) {
  const currentIndex = PHASE_ORDER.findIndex((phase) => {
    const items = byPhase.get(phase) ?? [];
    return items.length === 0 || items.some((t) => t.status !== "done" && t.status !== "skipped");
  });

  return (
    <div className="postcard p-5">
      <div className="flex items-baseline justify-between gap-2">
        <p className="eyebrow">Where we are</p>
        {selected && onSelect && (
          <button type="button" onClick={() => onSelect(null)} className="text-xs text-coral hover:underline">
            Show every phase
          </button>
        )}
      </div>
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
              <button
                type="button"
                onClick={() => onSelect?.(selected === phase ? null : phase)}
                disabled={!onSelect}
                aria-pressed={selected === phase}
                title={selected === phase ? "Show every phase" : `Show just ${PHASE_LABELS[phase]}`}
                className={cn(
                  "-mx-2 -mt-1 mb-4 min-w-0 flex-1 rounded-md px-2 py-1 text-left transition-colors enabled:hover:bg-paper-deep/60",
                  isLast && "mb-0",
                  selected === phase && "bg-coral-soft enabled:hover:bg-coral-soft",
                )}
              >
                <span className={cn("block text-sm leading-5", isCurrent || selected === phase ? "font-medium text-foreground" : done ? "text-ink-soft" : "text-ink-mute")}>
                  {PHASE_LABELS[phase]}
                </span>
                <span className="tabular block text-xs text-ink-mute">{items.length > 0 ? `${closedCount} of ${items.length}` : "nothing yet"}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
