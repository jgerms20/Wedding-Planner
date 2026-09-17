"use client";

import { newId, nowIso, pinScenario, reestimateBudgetFromScenario, type Destination, type Scenario, type Venue, type VenueStatus, scenarioMath } from "@bower/shared";
import { Plus, RefreshCw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { DestinationPostcard } from "@/components/atlas/destination-postcard";
import { GuestTargetControl } from "@/components/atlas/guest-target-control";
import { ScenarioMatrix } from "@/components/atlas/scenario-matrix";
import { DestinationEditorDialog } from "@/components/destination-editor-dialog";
import { PageHeader } from "@/components/page-header";
import { ScenarioEditorDialog } from "@/components/scenario-editor-dialog";
import { Button } from "@/components/ui/button";
import { VenueEditorDialog } from "@/components/venue-editor-dialog";
import { restoreSeed } from "@/lib/bootstrap";
import { cn } from "@/lib/utils";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";

export default function DestinationsPage() {
  const { repo, wedding, touch } = useRepoContext();
  const weddingId = wedding?.id;
  const [restoring, setRestoring] = useState(false);

  const loadDestinations = useCallback(async () => (repo && weddingId ? repo.destinations.list(weddingId) : undefined), [repo, weddingId]);
  const { items: destinations, reload: reloadDestinations } = useEntityList(loadDestinations);

  const loadVenues = useCallback(async () => (repo && weddingId ? repo.venues.list(weddingId) : undefined), [repo, weddingId]);
  const { items: venues, reload: reloadVenues } = useEntityList(loadVenues);

  const loadScenarios = useCallback(async () => (repo && weddingId ? repo.scenarios.list(weddingId) : undefined), [repo, weddingId]);
  const { items: scenarios } = useEntityList(loadScenarios);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [destinationDialog, setDestinationDialog] = useState<{ open: boolean; destination?: Destination }>({ open: false });
  const [venueDialog, setVenueDialog] = useState<{ open: boolean; destinationId: string; venue?: Venue } | null>(null);
  const [scenarioDialog, setScenarioDialog] = useState<{ open: boolean; scenario?: Scenario; destinationId?: string }>({ open: false });

  const scenarioByDestination = useMemo(() => {
    const map = new Map<string, Scenario>();
    for (const s of scenarios) {
      if (!s.destinationId) continue;
      if (!map.has(s.destinationId) || s.pinned) map.set(s.destinationId, s);
    }
    return map;
  }, [scenarios]);

  const pinned = useMemo(
    () => scenarios.find((s) => s.id === wedding?.activeScenarioId) ?? scenarios.find((s) => s.pinned),
    [scenarios, wedding?.activeScenarioId],
  );

  // The front-runner leads the atlas; everything else follows by total cost, so
  // the cheapest alternative is the next thing they see.
  const orderedDestinations = useMemo(() => {
    const totalFor = (id: string) => {
      const scenario = scenarioByDestination.get(id);
      return scenario ? scenarioMath(scenario).totalCost : Number.MAX_SAFE_INTEGER;
    };
    return [...destinations].sort((a, b) => {
      const aPinned = pinned?.destinationId === a.id;
      const bPinned = pinned?.destinationId === b.id;
      if (aPinned !== bPinned) return aPinned ? -1 : 1;
      return totalFor(a.id) - totalFor(b.id);
    });
  }, [destinations, scenarioByDestination, pinned?.destinationId]);

  if (!repo || !wedding) return <p className="font-display text-xl text-ink-soft">Opening the atlas…</p>;

  const guestTarget = wedding.guestTarget ?? 100;

  const updateGuestTarget = async (next: number) => {
    const oldTarget = guestTarget;
    await repo.upsertWedding({ ...wedding, guestTarget: next, updatedAt: nowIso() });
    await Promise.all(
      scenarios
        .filter((s) => s.guestAssumption === oldTarget)
        .map((s) => repo.scenarios.upsert({ ...s, guestAssumption: next, updatedAt: nowIso() })),
    );
    touch();
  };

  const handlePinScenario = async (scenarioId: string) => {
    await pinScenario(repo, wedding.id, scenarioId);
    touch();
  };

  const handleSaveScenario = async (s: Scenario) => {
    await repo.scenarios.upsert(s);
    if (s.pinned) await reestimateBudgetFromScenario(repo, wedding.id, s);
    touch();
  };

  const handleDuplicateScenario = async (s: Scenario) => {
    const now = nowIso();
    await repo.scenarios.upsert({ ...s, id: newId(), name: `${s.name} (copy)`, pinned: false, createdAt: now, updatedAt: now });
    touch();
  };

  const handleVenueStatusChange = async (venue: Venue, status: VenueStatus) => {
    await repo.venues.upsert({ ...venue, status, updatedAt: nowIso() });
    await reloadVenues();
  };

  const restoreTheSeed = async () => {
    if (restoring) return;
    setRestoring(true);
    try {
      await restoreSeed(repo);
      touch();
    } finally {
      setRestoring(false);
    }
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        eyebrow="The atlas"
        title="Where it could be"
        description="Destination → venue → date. Compare, then make one the plan."
        action={
          <Button size="sm" onClick={() => setDestinationDialog({ open: true })}>
            <Plus className="size-4 stroke-[1.5]" /> Add destination
          </Button>
        }
      />

      <GuestTargetControl value={guestTarget} onSave={(next) => void updateGuestTarget(next)} />

      {destinations.length === 0 ? (
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg border border-dashed border-line-strong p-4 text-sm">
          <p className="flex-1 text-ink-soft">
            This looks like it&apos;s from before we added the destination research. One click brings in Brazil, Jamaica, and the
            rest with real costs and sources.
          </p>
          <button
            type="button"
            onClick={() => void restoreTheSeed()}
            disabled={restoring}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-coral px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity disabled:opacity-60"
          >
            <RefreshCw className={cn("size-3.5", restoring && "animate-spin")} />
            {restoring ? "Bringing it in…" : "Bring in the atlas"}
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {orderedDestinations.map((destination, i) => (
            <DestinationPostcard
              key={destination.id}
              className={`rise rise-${Math.min(i + 1, 8)}`}
              destination={destination}
              venues={venues.filter((v) => v.destinationId === destination.id)}
              scenario={scenarioByDestination.get(destination.id)}
              isFrontRunner={pinned?.destinationId === destination.id}
              guestTarget={guestTarget}
              expanded={expandedId === destination.id}
              onToggleExpand={() => setExpandedId((id) => (id === destination.id ? null : destination.id))}
              onEditDestination={() => setDestinationDialog({ open: true, destination })}
              onAddVenue={() => setVenueDialog({ open: true, destinationId: destination.id })}
              onEditVenue={(venue) => setVenueDialog({ open: true, destinationId: destination.id, venue })}
              onVenueStatusChange={(venue, status) => void handleVenueStatusChange(venue, status)}
              onNewScenario={() => setScenarioDialog({ open: true, destinationId: destination.id })}
            />
          ))}
        </div>
      )}

      <div className="hairline my-10" />

      <ScenarioMatrix
        scenarios={scenarios}
        destinations={destinations}
        onPin={(id) => void handlePinScenario(id)}
        onEdit={(scenario) => setScenarioDialog({ open: true, scenario })}
        onDuplicate={(s) => void handleDuplicateScenario(s)}
        onNewScenario={() => setScenarioDialog({ open: true })}
      />

      <DestinationEditorDialog
        open={destinationDialog.open}
        onOpenChange={(open) => setDestinationDialog((d) => ({ ...d, open }))}
        weddingId={wedding.id}
        destination={destinationDialog.destination}
        onSave={async (d) => {
          await repo.destinations.upsert(d);
          await reloadDestinations();
        }}
      />
      {venueDialog && (
        <VenueEditorDialog
          open={venueDialog.open}
          onOpenChange={(open) => setVenueDialog((v) => (v ? { ...v, open } : v))}
          weddingId={wedding.id}
          destinationId={venueDialog.destinationId}
          venue={venueDialog.venue}
          onSave={async (v) => {
            await repo.venues.upsert(v);
            await reloadVenues();
          }}
        />
      )}
      <ScenarioEditorDialog
        open={scenarioDialog.open}
        onOpenChange={(open) => setScenarioDialog((s) => ({ ...s, open }))}
        weddingId={wedding.id}
        destinations={destinations}
        venues={venues}
        scenario={scenarioDialog.scenario}
        initialDestinationId={scenarioDialog.destinationId}
        onSave={handleSaveScenario}
      />
    </div>
  );
}
