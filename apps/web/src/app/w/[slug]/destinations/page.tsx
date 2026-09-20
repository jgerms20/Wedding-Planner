"use client";

import { newId, nowIso, pinScenario, unpinScenario, reestimateBudgetFromScenario, type Destination, type Scenario, type Venue, type VenueStatus } from "@bower/shared";
import { Plus, RefreshCw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { CaribbeanComparisonTable } from "@/components/atlas/caribbean-comparison-table";
import { DestinationDetailDialog } from "@/components/atlas/destination-detail-dialog";
import { DestinationExploreCard } from "@/components/atlas/destination-explore-card";
import { DestinationPostcard } from "@/components/atlas/destination-postcard";
import { GuestTargetControl } from "@/components/atlas/guest-target-control";
import { ScenarioMatrix } from "@/components/atlas/scenario-matrix";
import { ResearchDestinationBox } from "@/components/ai/research-destination-box";
import { DestinationEditorDialog } from "@/components/destination-editor-dialog";
import { PageHeader } from "@/components/page-header";
import { PrioritiesCard } from "@/components/priorities/priorities-card";
import { ScenarioEditorDialog } from "@/components/scenario-editor-dialog";
import { Button } from "@/components/ui/button";
import { VenueEditorDialog } from "@/components/venue-editor-dialog";
import { restoreSeed } from "@/lib/bootstrap";
import { isDomesticCountry } from "@/lib/country-code";
import { cn } from "@/lib/utils";
import { LoadingState } from "@/components/loading-state";
import { usePriorities } from "@/lib/use-priorities";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";

type DestinationTab = "explore" | "favorites" | "caribbean";
type RegionFilter = "all" | "domestic" | "international";

const REGION_FILTERS: { key: RegionFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "domestic", label: "Domestic" },
  { key: "international", label: "International" },
];

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

  const { priorities, add: addPriority, toggle: togglePriority, remove: removePriority } = usePriorities();

  const [tab, setTab] = useState<DestinationTab>("explore");
  const [region, setRegion] = useState<RegionFilter>("all");
  const [detailId, setDetailId] = useState<string | null>(null);
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

  // Order is the couple's own call (sortOrder), not derived from cost or whatever scenario
  // happens to be pinned — that's what made Brazil "stuck" as the front-runner before. Rank 1
  // (lowest sortOrder) is the front-runner, full stop.
  const orderedDestinations = useMemo(
    () => [...destinations].sort((a, b) => (a.sortOrder ?? Number.MAX_SAFE_INTEGER) - (b.sortOrder ?? Number.MAX_SAFE_INTEGER)),
    [destinations],
  );
  // Favorites: the same manual rank/Front-runner logic, scoped to whichever destinations either
  // partner has hearted — this is the "actually comparing" subset, versus Explore's "just browsing."
  const favoriteDestinations = useMemo(() => orderedDestinations.filter((d) => (d.favoritedBy ?? []).length > 0), [orderedDestinations]);
  const favoriteFrontRunnerId = favoriteDestinations[0]?.id;
  const favoriteDomesticCount = useMemo(() => favoriteDestinations.filter((d) => isDomesticCountry(d.country)).length, [favoriteDestinations]);
  const favoriteInternationalCount = favoriteDestinations.length - favoriteDomesticCount;
  const visibleFavorites = useMemo(
    () =>
      region === "all"
        ? favoriteDestinations
        : favoriteDestinations.filter((d) => isDomesticCountry(d.country) === (region === "domestic")),
    [favoriteDestinations, region],
  );

  const caribbeanDestinations = useMemo(() => orderedDestinations.filter((d) => (d.originFlights ?? []).length > 0), [orderedDestinations]);

  const explorePool = useMemo(() => [...destinations].sort((a, b) => a.name.localeCompare(b.name)), [destinations]);
  const exploreDomesticCount = useMemo(() => explorePool.filter((d) => isDomesticCountry(d.country)).length, [explorePool]);
  const exploreInternationalCount = explorePool.length - exploreDomesticCount;
  const visibleExplore = useMemo(
    () =>
      region === "all" ? explorePool : explorePool.filter((d) => isDomesticCountry(d.country) === (region === "domestic")),
    [explorePool, region],
  );

  const detailDestination = detailId ? destinations.find((d) => d.id === detailId) : undefined;

  if (!repo || !wedding) return <LoadingState label="Opening the atlas…" />;

  const guestTarget = wedding.guestTarget ?? 150;

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

  const handleUnpinScenario = async (scenarioId: string) => {
    await unpinScenario(repo, wedding.id, scenarioId);
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

  const handleToggleFavorite = async (destination: Destination, partner: "A" | "B") => {
    const current = destination.favoritedBy ?? [];
    const favoritedBy = current.includes(partner) ? current.filter((p) => p !== partner) : [...current, partner];
    await repo.destinations.upsert({ ...destination, favoritedBy, updatedAt: nowIso() });
    await reloadDestinations();
  };

  // Moves a destination up/down within its own Domestic/International group by swapping
  // sortOrder with that neighbor — keeps reordering intuitive without a drag-and-drop library.
  const handleReorder = async (group: Destination[], destination: Destination, direction: -1 | 1) => {
    const index = group.findIndex((d) => d.id === destination.id);
    const neighbor = group[index + direction];
    if (!neighbor) return;
    const now = nowIso();
    const a = destination.sortOrder ?? index + 1;
    const b = neighbor.sortOrder ?? index + 1 + direction;
    await Promise.all([
      repo.destinations.upsert({ ...destination, sortOrder: b, updatedAt: now }),
      repo.destinations.upsert({ ...neighbor, sortOrder: a, updatedAt: now }),
    ]);
    await reloadDestinations();
  };

  // No cascade exists at the repo layer (`EntityRepo.remove` is a plain delete), so a removed
  // destination's venues/scenarios would otherwise become orphaned rows still pointing at an id
  // that no longer resolves to anything. Clean those up here, and clear the pinned scenario if it
  // was one of them, before removing the destination itself.
  const handleRemoveDestination = async (destination: Destination) => {
    if (!window.confirm(`Remove ${destination.name}? This also removes its venues and any scenarios built for it.`)) return;
    const staleVenues = venues.filter((v) => v.destinationId === destination.id);
    const staleScenarios = scenarios.filter((s) => s.destinationId === destination.id);
    await Promise.all([...staleVenues.map((v) => repo.venues.remove(v.id)), ...staleScenarios.map((s) => repo.scenarios.remove(s.id))]);
    if (staleScenarios.some((s) => s.id === wedding.activeScenarioId)) {
      await repo.upsertWedding({ ...wedding, activeScenarioId: undefined, updatedAt: nowIso() });
    }
    await repo.destinations.remove(destination.id);
    touch();
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

      <PrioritiesCard
        title="Venue must-haves"
        area="Venue"
        priorities={priorities}
        onAdd={(area, label) => void addPriority(area, label)}
        onToggle={(p) => void togglePriority(p)}
        onRemove={(p) => void removePriority(p)}
      />

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
        <>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex w-fit rounded-full border border-line p-0.5 text-sm">
              {([
                { key: "explore", label: "Explore" },
                { key: "favorites", label: `Favorites${favoriteDestinations.length > 0 ? ` (${favoriteDestinations.length})` : ""}` },
                { key: "caribbean", label: "Caribbean" },
              ] as const).map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  aria-pressed={tab === t.key}
                  className={cn("rounded-full px-4 py-1.5 transition-colors", tab === t.key ? "bg-ink text-rail-foreground" : "text-ink-soft hover:text-foreground")}
                >
                  {t.label}
                </button>
              ))}
            </div>
            {tab !== "caribbean" && (
            <div className="inline-flex w-fit rounded-full border border-line p-0.5 text-xs">
              {REGION_FILTERS.map((r) => {
                const count = tab === "explore" ? (r.key === "domestic" ? exploreDomesticCount : r.key === "international" ? exploreInternationalCount : explorePool.length) : r.key === "domestic" ? favoriteDomesticCount : r.key === "international" ? favoriteInternationalCount : favoriteDestinations.length;
                return (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setRegion(r.key)}
                    aria-pressed={region === r.key}
                    className={cn(
                      "rounded-full px-3 py-1 transition-colors",
                      region === r.key ? "bg-ink text-rail-foreground" : "text-ink-soft hover:text-foreground",
                    )}
                  >
                    {r.label} {count > 0 && `(${count})`}
                  </button>
                );
              })}
            </div>
            )}
          </div>

          {tab === "explore" ? (
            <div className="mt-6 flex flex-col gap-8">
              <div>
                <p className="eyebrow mb-3">Add a destination</p>
                <ResearchDestinationBox />
              </div>
              {visibleExplore.length === 0 ? (
                <p className="text-sm text-ink-soft">Nothing in this group yet.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {visibleExplore.map((destination, i) => (
                    <DestinationExploreCard
                      key={destination.id}
                      className={`rise rise-${Math.min(i + 1, 8)}`}
                      destination={destination}
                      partnerAName={wedding.partnerA.name}
                      partnerBName={wedding.partnerB.name}
                      onToggleFavorite={(partner) => void handleToggleFavorite(destination, partner)}
                      onViewDetails={() => setDetailId(destination.id)}
                      onRemove={() => void handleRemoveDestination(destination)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : tab === "caribbean" ? (
            <CaribbeanComparisonTable
              destinations={caribbeanDestinations}
              scenarioByDestination={scenarioByDestination}
              onViewDetails={(destinationId) => setDetailId(destinationId)}
            />
          ) : favoriteDestinations.length === 0 ? (
            <p className="mt-6 rounded-lg border border-dashed border-line-strong p-4 text-sm text-ink-soft">
              Heart a destination on Explore and it&apos;ll show up here, ready to rank and compare.
            </p>
          ) : visibleFavorites.length === 0 ? (
            <p className="mt-6 text-sm text-ink-soft">Nothing in this group yet.</p>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visibleFavorites.map((destination, i) => (
                <DestinationPostcard
                  key={destination.id}
                  className={`rise rise-${Math.min(i + 1, 8)}`}
                  destination={destination}
                  venueCount={venues.filter((v) => v.destinationId === destination.id).length}
                  scenario={scenarioByDestination.get(destination.id)}
                  isFrontRunner={destination.id === favoriteFrontRunnerId}
                  guestTarget={guestTarget}
                  onViewDetails={() => setDetailId(destination.id)}
                  canMoveUp={i > 0}
                  canMoveDown={i < visibleFavorites.length - 1}
                  onMoveUp={() => void handleReorder(visibleFavorites, destination, -1)}
                  onMoveDown={() => void handleReorder(visibleFavorites, destination, 1)}
                  partnerAName={wedding.partnerA.name}
                  partnerBName={wedding.partnerB.name}
                  onToggleFavorite={(partner) => void handleToggleFavorite(destination, partner)}
                  onRemove={() => void handleRemoveDestination(destination)}
                />
              ))}
            </div>
          )}
        </>
      )}

      <div className="hairline my-10" />

      <ScenarioMatrix
        scenarios={scenarios}
        destinations={destinations}
        onPin={(id) => void handlePinScenario(id)}
        onUnpin={(id) => void handleUnpinScenario(id)}
        onEdit={(scenario) => setScenarioDialog({ open: true, scenario })}
        onDuplicate={(s) => void handleDuplicateScenario(s)}
        onNewScenario={() => setScenarioDialog({ open: true })}
        onViewDetails={(destinationId) => setDetailId(destinationId)}
      />

      <DestinationDetailDialog
        open={detailId !== null}
        onOpenChange={(open) => !open && setDetailId(null)}
        destination={detailDestination}
        scenario={detailDestination ? scenarioByDestination.get(detailDestination.id) : undefined}
        guestTarget={guestTarget}
        venues={detailDestination ? venues.filter((v) => v.destinationId === detailDestination.id) : []}
        onEditDestination={() => detailDestination && setDestinationDialog({ open: true, destination: detailDestination })}
        onAddVenue={() => detailDestination && setVenueDialog({ open: true, destinationId: detailDestination.id })}
        onEditVenue={(venue) => detailDestination && setVenueDialog({ open: true, destinationId: detailDestination.id, venue })}
        onVenueStatusChange={(venue, status) => void handleVenueStatusChange(venue, status)}
        onNewScenario={() => {
          if (!detailDestination) return;
          setDetailId(null);
          setScenarioDialog({ open: true, destinationId: detailDestination.id });
        }}
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
