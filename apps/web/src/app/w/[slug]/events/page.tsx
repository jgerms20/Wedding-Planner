"use client";

import type { SubEvent } from "@bower/shared";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { SubEventEditorDialog } from "@/components/sub-event-editor-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatMoney } from "@/lib/format";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";

export default function EventsPage() {
  const { repo, wedding } = useRepoContext();
  const weddingId = wedding?.id;

  const loadSubEvents = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.subEvents.list(weddingId);
  }, [repo, weddingId]);
  const { items: subEvents, reload } = useEntityList(loadSubEvents);

  const [dialog, setDialog] = useState<{ open: boolean; subEvent?: SubEvent }>({ open: false });

  const ordered = useMemo(
    () =>
      [...subEvents].sort((a, b) => {
        if (a.date && b.date) return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
        if (a.date) return -1;
        if (b.date) return 1;
        return a.title.localeCompare(b.title);
      }),
    [subEvents],
  );

  if (!repo || !weddingId) return <p className="font-display text-xl text-ink-soft">Loading…</p>;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Satellite events"
        description="Each has its own date, host, budget, and guest subset — a mini-project of its own."
        action={
          <Button size="sm" onClick={() => setDialog({ open: true })}>
            <Plus className="size-4" /> Add event
          </Button>
        }
      />

      {ordered.length === 0 ? (
        <div className="postcard rise flex flex-col items-start gap-2 p-8">
          <p className="text-[15px] text-ink-soft">No satellite events yet. Tell Bower about a shower, a bach trip, or a rehearsal dinner and it lands here.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((event, i) => (
            <button
              key={event.id}
              type="button"
              onClick={() => setDialog({ open: true, subEvent: event })}
              className={`postcard rise rise-${Math.min(i + 1, 8)} flex flex-col gap-3 p-5 text-left`}
            >
              <div className="flex items-start justify-between gap-2">
                <Badge variant="outline" className="capitalize">
                  {event.kind.replace(/_/g, " ")}
                </Badge>
                {event.budgetEstimate !== undefined && <Badge className="border-transparent bg-gold-soft text-ink">estimate</Badge>}
              </div>
              <p className="font-display text-xl leading-tight">{event.title}</p>
              <dl className="flex flex-col gap-1 text-sm text-ink-soft">
                <div className="flex justify-between gap-2">
                  <dt>When</dt>
                  <dd className="tabular text-right text-foreground">{event.date ? formatDate(event.date, "EEE, MMM d, yyyy") : "date to pick"}</dd>
                </div>
                {event.location && (
                  <div className="flex justify-between gap-2">
                    <dt>Where</dt>
                    <dd className="text-right text-foreground">{event.location}</dd>
                  </div>
                )}
                {event.hostName && (
                  <div className="flex justify-between gap-2">
                    <dt>Host</dt>
                    <dd className="text-right text-foreground">{event.hostName}</dd>
                  </div>
                )}
                {event.budgetEstimate !== undefined && (
                  <div className="flex justify-between gap-2">
                    <dt>Budget</dt>
                    <dd className="tabular text-right text-foreground">{formatMoney(event.budgetEstimate)}</dd>
                  </div>
                )}
              </dl>
              {event.guestRule && <p className="text-xs text-ink-mute">{event.guestRule}</p>}
              {event.notes && <p className="text-xs italic text-ink-mute">{event.notes}</p>}
            </button>
          ))}
        </div>
      )}

      <SubEventEditorDialog
        open={dialog.open}
        onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}
        weddingId={weddingId}
        subEvent={dialog.subEvent}
        onSave={async (subEvent) => {
          await repo.subEvents.upsert(subEvent);
          await reload();
        }}
      />
    </div>
  );
}
