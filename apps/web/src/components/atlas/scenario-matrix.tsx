"use client";

import { scenarioMath, type Destination, type Scenario } from "@bower/shared";
import { format, isValid, parseISO } from "date-fns";
import { Copy, Plus } from "lucide-react";
import { useState, type ReactNode } from "react";
import { AccentChip } from "@/components/atlas/chips";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ScenarioMatrix({
  scenarios,
  destinations,
  onPin,
  onEdit,
  onDuplicate,
  onNewScenario,
}: {
  scenarios: Scenario[];
  destinations: Destination[];
  onPin: (scenarioId: string) => void;
  onEdit: (scenario: Scenario) => void;
  onDuplicate: (scenario: Scenario) => void;
  onNewScenario: () => void;
}) {
  const destinationById = new Map(destinations.map((d) => [d.id, d]));
  const pinnedSource = scenarios.find((s) => s.pinned);
  // Our plan reads first; the rest follow by total so the comparison is a ladder.
  const ordered = [...scenarios].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return scenarioMath(a).totalCost - scenarioMath(b).totalCost;
  });
  const pinned = pinnedSource;
  const pinnedMath = pinned ? scenarioMath(pinned) : undefined;

  return (
    <section>
      <div className="rise flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">The comparison</p>
          <h2 className="mt-1 text-3xl">Scenarios</h2>
          <p className="mt-2 max-w-2xl text-[15px] text-ink-soft">
            Each column is a destination, venue, date, and guest-count bet. Pin one to drive the budget and timeline.
          </p>
        </div>
        <Button size="sm" onClick={onNewScenario}>
          <Plus className="size-4 stroke-[1.5]" /> New scenario
        </Button>
      </div>

      {ordered.length === 0 ? (
        <p className="mt-5 text-sm text-ink-soft">No scenarios yet. Tell Atlas a place, or add one.</p>
      ) : (
        <div className="rise rise-2 mt-5 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line bg-paper-deep/60 text-left">
                <th className="w-40 shrink-0 p-3 align-bottom text-xs font-semibold tracking-wide text-ink-mute uppercase">
                  &nbsp;
                </th>
                {ordered.map((s) => (
                  <th key={s.id} className={cn("min-w-[190px] p-3 align-top", s.pinned && "border-t-2 border-t-coral")}>
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-display text-lg leading-tight">{s.name}</p>
                      {s.pinned && <AccentChip className="shrink-0">Our plan</AccentChip>}
                    </div>
                    <p className="mt-0.5 text-xs text-ink-mute">{destinationById.get(s.destinationId ?? "")?.name ?? "No destination set"}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {!s.pinned && (
                        <ActionPill onClick={() => onPin(s.id)}>Make this our plan</ActionPill>
                      )}
                      <ActionPill onClick={() => onEdit(s)}>Edit</ActionPill>
                      <ActionPill onClick={() => onDuplicate(s)}>
                        <Copy className="size-3 stroke-[1.5]" /> Duplicate
                      </ActionPill>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <Row label="Destination" values={ordered.map((s) => destinationById.get(s.destinationId ?? "")?.name ?? "—")} />
              <Row label="Dates" values={ordered.map((s) => formatDateRange(s.dateStart, s.dateEnd))} />
              <Row label="Guests invited" values={ordered.map((s) => String(s.guestAssumption))} tabular />
              <Row label="Likely to come" values={ordered.map((s) => String(scenarioMath(s).expectedGuests))} tabular />
              <Row label="Fixed costs" values={ordered.map((s) => formatMoney(s.fixedCosts))} tabular />
              <Row label="Per-guest cost" values={ordered.map((s) => formatMoney(s.perGuestCost))} tabular />
              <DeltaRow label="Total" pinnedId={pinned?.id} values={ordered.map((s) => ({ id: s.id, value: scenarioMath(s).totalCost }))} />
              <DeltaRow
                label="Cost per guest"
                pinnedId={pinned?.id}
                values={ordered.map((s) => ({ id: s.id, value: scenarioMath(s).costPerGuest }))}
              />
              <Row label="Guest travel burden" values={ordered.map((s) => formatMoney(scenarioMath(s).guestTravelBurden))} tabular />
              <NotesRow values={ordered.map((s) => s.notes ?? "—")} />
            </tbody>
          </table>
        </div>
      )}
      {pinnedMath === undefined && scenarios.length > 0 && (
        <p className="mt-2 text-xs text-ink-mute">Pin a scenario to see how the others compare against it.</p>
      )}
    </section>
  );
}

function ActionPill({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-full border border-line px-2 py-0.5 text-[0.7rem] text-ink-soft transition-colors hover:border-coral hover:text-coral"
    >
      {children}
    </button>
  );
}

function Row({ label, values, tabular, wrap }: { label: string; values: string[]; tabular?: boolean; wrap?: boolean }) {
  return (
    <tr className="border-b border-line last:border-0">
      <td className="p-3 text-xs font-semibold tracking-wide text-ink-mute uppercase">{label}</td>
      {values.map((v, i) => (
        <td key={i} className={cn("p-3 align-top text-[15px]", tabular && "tabular", wrap ? "text-xs text-ink-soft" : "text-foreground")}>
          {v}
        </td>
      ))}
    </tr>
  );
}

function DeltaRow({ label, values, pinnedId }: { label: string; values: { id: string; value: number }[]; pinnedId?: string }) {
  const pinnedValue = values.find((v) => v.id === pinnedId)?.value;
  return (
    <tr className="border-b border-line last:border-0">
      <td className="p-3 text-xs font-semibold tracking-wide text-ink-mute uppercase">{label}</td>
      {values.map(({ id, value }) => {
        const isPinned = id === pinnedId;
        const delta = pinnedValue !== undefined && !isPinned ? value - pinnedValue : undefined;
        return (
          <td key={id} className="tabular p-3 align-top text-[15px] font-medium">
            {formatMoney(value)}
            {delta !== undefined && delta !== 0 && (
              <div className={cn("mt-0.5 text-xs font-normal", delta > 0 ? "text-coral" : "text-ink-soft")}>
                {delta > 0 ? "+" : "−"}
                {formatMoney(Math.abs(delta))} vs. plan
              </div>
            )}
          </td>
        );
      })}
    </tr>
  );
}

/** "Sat, Apr 17" — the year only when it isn't the current one. Local to Atlas; see bower-design voice rules. */
function formatDateRange(start: string | undefined, end: string | undefined): string {
  if (!start) return "Date TBD";
  const startLabel = formatOne(start);
  if (!end || end === start) return startLabel ?? "Date TBD";
  const endLabel = formatOne(end);
  if (!startLabel) return "Date TBD";
  return endLabel ? `${startLabel} – ${endLabel}` : startLabel;
}

function formatOne(iso: string): string | undefined {
  const date = parseISO(iso);
  if (!isValid(date)) return undefined;
  const pattern = date.getFullYear() === new Date().getFullYear() ? "EEE, MMM d" : "EEE, MMM d, yyyy";
  return format(date, pattern);
}


/** How each number was derived. Long by design, so it starts collapsed. */
function NotesRow({ values }: { values: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <tr className="border-b border-line last:border-0">
      <td className="p-3 align-top text-xs font-semibold tracking-wide text-ink-mute uppercase">
        <button type="button" onClick={() => setOpen((v) => !v)} className="text-left underline decoration-dotted underline-offset-4">
          {open ? "Hide how" : "How we got these"}
        </button>
      </td>
      {values.map((v, i) => (
        <td key={i} className={cn("p-3 align-top text-xs leading-relaxed text-ink-soft", !open && "line-clamp-3")}>
          {v}
        </td>
      ))}
    </tr>
  );
}
