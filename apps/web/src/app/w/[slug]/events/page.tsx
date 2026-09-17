"use client";

import type { SubEvent } from "@bower/shared";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { SubEventEditorDialog } from "@/components/sub-event-editor-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  if (!repo || !weddingId) return <p className="text-sm text-muted-foreground">Loading…</p>;

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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subEvents.map((event) => (
          <Card key={event.id} className="cursor-pointer transition-colors hover:bg-accent" onClick={() => setDialog({ open: true, subEvent: event })}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                {event.title}
                <span className="text-xs font-normal text-muted-foreground capitalize">{event.kind.replace(/_/g, " ")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 text-sm text-muted-foreground">
              <p>{formatDate(event.date)}</p>
              {event.location && <p>{event.location}</p>}
              {event.hostName && <p>Hosted by {event.hostName}</p>}
              {event.budgetEstimate !== undefined && <p>Budget: {formatMoney(event.budgetEstimate)}</p>}
              {event.guestRule && <p>{event.guestRule}</p>}
              {event.notes && <p className="italic">{event.notes}</p>}
            </CardContent>
          </Card>
        ))}
        {subEvents.length === 0 && <p className="text-sm text-muted-foreground">No satellite events yet.</p>}
      </div>

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
