"use client";

import { newId, subEventKindSchema, type SubEvent, type SubEventKind } from "@bower/shared";
import { Plus, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { SubEventEditorDialog } from "@/components/sub-event-editor-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatMoney } from "@/lib/format";
import { LoadingState } from "@/components/loading-state";
import { SUB_EVENT_DESCRIPTIONS, SUB_EVENT_LABELS } from "@/lib/sub-event-catalog";
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
  const [adding, setAdding] = useState<SubEventKind | null>(null);

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

  const addedKinds = useMemo(() => new Set(subEvents.map((e) => e.kind)), [subEvents]);
  const considerKinds = useMemo(() => subEventKindSchema.options.filter((k) => !addedKinds.has(k)), [addedKinds]);

  async function quickAdd(kind: SubEventKind) {
    if (!repo || !weddingId || adding) return;
    setAdding(kind);
    try {
      await repo.subEvents.upsert({ id: newId(), weddingId, kind, title: SUB_EVENT_LABELS[kind] });
      await reload();
    } finally {
      setAdding(null);
    }
  }

  async function remove(event: SubEvent) {
    if (!repo) return;
    await repo.subEvents.remove(event.id);
    await reload();
  }

  if (!repo || !weddingId) return <LoadingState />;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Events"
        description="Browse the events couples typically have, pick the ones you want, then fill in the details."
      />

      <div>
        <p className="eyebrow mb-3">Your events</p>
        {ordered.length === 0 ? (
          <div className="postcard rise flex flex-col items-start gap-2 p-8">
            <p className="text-[15px] text-ink-soft">Nothing picked yet — add one from the catalog below, or tell Atlas about it directly.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ordered.map((event, i) => (
              <div key={event.id} className={`postcard rise rise-${Math.min(i + 1, 8)} flex flex-col gap-3 p-5 text-left`}>
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="outline" className="capitalize">
                    {event.kind.replace(/_/g, " ")}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {event.budgetEstimate !== undefined && <Badge className="border-transparent bg-gold-soft text-ink">estimate</Badge>}
                    <button
                      type="button"
                      onClick={() => void remove(event)}
                      aria-label={`Remove ${event.title}`}
                      className="rounded-full p-1 text-ink-mute transition-colors hover:bg-muted hover:text-destructive"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                </div>
                <button type="button" onClick={() => setDialog({ open: true, subEvent: event })} className="flex flex-1 flex-col gap-3 text-left">
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
              </div>
            ))}
          </div>
        )}
      </div>

      {considerKinds.length > 0 && (
        <div>
          <p className="eyebrow mb-3">Consider</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {considerKinds.map((kind) => (
              <div key={kind} className="postcard flex flex-col gap-2 p-4">
                <p className="font-medium">{SUB_EVENT_LABELS[kind]}</p>
                <p className="flex-1 text-xs text-ink-soft">{SUB_EVENT_DESCRIPTIONS[kind]}</p>
                <Button variant="outline" size="sm" className="mt-1 self-start" onClick={() => void quickAdd(kind)} disabled={adding === kind}>
                  <Plus className="size-3.5" /> {adding === kind ? "Adding…" : "Add"}
                </Button>
              </div>
            ))}
          </div>
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
