"use client";

import { nowIso, scenarioMath, type Destination, type Scenario, type Venue } from "@bower/shared";
import { MapPin, Pin, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { DestinationEditorDialog } from "@/components/destination-editor-dialog";
import { ScenarioEditorDialog } from "@/components/scenario-editor-dialog";
import { VenueEditorDialog } from "@/components/venue-editor-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMoney } from "@/lib/format";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";

export default function DestinationsPage() {
  const { repo, wedding, reloadWedding } = useRepoContext();
  const weddingId = wedding?.id;

  const loadDestinations = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.destinations.list(weddingId);
  }, [repo, weddingId]);
  const { items: destinations, reload: reloadDestinations } = useEntityList(loadDestinations);

  const loadVenues = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.venues.list(weddingId);
  }, [repo, weddingId]);
  const { items: venues, reload: reloadVenues } = useEntityList(loadVenues);

  const loadScenarios = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.scenarios.list(weddingId);
  }, [repo, weddingId]);
  const { items: scenarios, reload: reloadScenarios } = useEntityList(loadScenarios);

  const [destinationDialog, setDestinationDialog] = useState<{ open: boolean; destination?: Destination }>({ open: false });
  const [venueDialog, setVenueDialog] = useState<{ open: boolean; destinationId: string; venue?: Venue } | null>(null);
  const [scenarioDialog, setScenarioDialog] = useState<{ open: boolean; scenario?: Scenario }>({ open: false });

  if (!repo || !weddingId) return <p className="text-sm text-muted-foreground">Loading…</p>;

  async function pinScenario(scenario: Scenario) {
    const alreadyPinned = scenario.pinned;
    await Promise.all(scenarios.map((s) => repo!.scenarios.upsert({ ...s, pinned: s.id === scenario.id ? !alreadyPinned : false })));
    await repo!.upsertWedding({ ...wedding!, activeScenarioId: alreadyPinned ? undefined : scenario.id, updatedAt: nowIso() });
    await Promise.all([reloadScenarios(), reloadWedding()]);
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Destinations"
        description="Destination → venue → date. Compare scenarios before pinning one."
        action={
          <Button size="sm" onClick={() => setDestinationDialog({ open: true })}>
            <Plus className="size-4" /> Add destination
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {destinations.length === 0 && (
          <p className="text-sm text-muted-foreground">No destinations yet. Add candidates to start comparing.</p>
        )}
        {destinations.map((destination) => (
          <Card key={destination.id}>
            <CardHeader className="flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="flex items-center gap-1.5">
                  <MapPin className="size-4 text-rose" /> {destination.name}
                </CardTitle>
                <p className="text-xs text-muted-foreground">{[destination.region, destination.country].filter(Boolean).join(", ")}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setDestinationDialog({ open: true, destination })}>
                Edit
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {destination.notes && <p className="text-sm text-muted-foreground">{destination.notes}</p>}
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                {destination.travelCostPerGuestEstimate !== undefined && <span>Travel: {formatMoney(destination.travelCostPerGuestEstimate)}/guest</span>}
                {destination.lodgingPerNightEstimate !== undefined && <span>Lodging: {formatMoney(destination.lodgingPerNightEstimate)}/night</span>}
                {destination.attendanceRateEstimate !== undefined && <span>Est. attendance: {Math.round(destination.attendanceRateEstimate * 100)}%</span>}
              </div>

              <div className="flex flex-col gap-2 border-t border-border pt-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Venues</h4>
                  <Button variant="outline" size="sm" onClick={() => setVenueDialog({ open: true, destinationId: destination.id })}>
                    <Plus className="size-3.5" /> Venue
                  </Button>
                </div>
                {venues
                  .filter((v) => v.destinationId === destination.id)
                  .map((venue) => (
                    <button
                      key={venue.id}
                      type="button"
                      onClick={() => setVenueDialog({ open: true, destinationId: destination.id, venue })}
                      className="flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2 text-left text-sm transition-colors hover:bg-accent"
                    >
                      <span>{venue.name}</span>
                      <Badge variant={venue.status === "booked" ? "default" : venue.status === "declined" ? "destructive" : "secondary"}>
                        {venue.status}
                      </Badge>
                    </button>
                  ))}
                {venues.filter((v) => v.destinationId === destination.id).length === 0 && (
                  <p className="text-xs text-muted-foreground">No venues yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section>
        <PageHeader
          title="Scenarios"
          description="Each column is a destination + venue + date + guest-count bet. Pin one to drive the budget and timeline."
          action={
            <Button size="sm" onClick={() => setScenarioDialog({ open: true })}>
              <Plus className="size-4" /> New scenario
            </Button>
          }
        />
        {scenarios.length === 0 ? (
          <p className="text-sm text-muted-foreground">No scenarios yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50 text-left">
                  <th className="p-3 font-medium text-muted-foreground">&nbsp;</th>
                  {scenarios.map((s) => (
                    <th key={s.id} className="p-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setScenarioDialog({ open: true, scenario: s })}
                          className="font-display text-base hover:underline"
                        >
                          {s.name}
                        </button>
                        <button
                          type="button"
                          onClick={() => pinScenario(s)}
                          className={s.pinned ? "text-rose" : "text-muted-foreground hover:text-rose"}
                          title={s.pinned ? "Unpin" : "Pin as active"}
                        >
                          <Pin className="size-3.5" fill={s.pinned ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <ComparisonRow label="Expected guests" values={scenarios.map((s) => String(scenarioMath(s).expectedGuests))} />
                <ComparisonRow label="Total cost" values={scenarios.map((s) => formatMoney(scenarioMath(s).totalCost))} />
                <ComparisonRow label="Cost per guest" values={scenarios.map((s) => formatMoney(scenarioMath(s).costPerGuest))} />
                <ComparisonRow label="Guest travel burden" values={scenarios.map((s) => formatMoney(scenarioMath(s).guestTravelBurden))} />
                <ComparisonRow
                  label="Weather"
                  values={scenarios.map((s) => destinations.find((d) => d.id === s.destinationId)?.weatherNotes ?? "—")}
                />
                <ComparisonRow
                  label="Legal"
                  values={scenarios.map((s) => destinations.find((d) => d.id === s.destinationId)?.legalNotes ?? "—")}
                />
                <ComparisonRow label="Unknowns" values={scenarios.map((s) => s.notes ?? "—")} />
              </tbody>
            </table>
          </div>
        )}
      </section>

      <DestinationEditorDialog
        open={destinationDialog.open}
        onOpenChange={(open) => setDestinationDialog((d) => ({ ...d, open }))}
        weddingId={weddingId}
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
          weddingId={weddingId}
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
        weddingId={weddingId}
        destinations={destinations}
        venues={venues}
        scenario={scenarioDialog.scenario}
        onSave={async (s) => {
          await repo.scenarios.upsert(s);
          await reloadScenarios();
        }}
      />
    </div>
  );
}

function ComparisonRow({ label, values }: { label: string; values: string[] }) {
  return (
    <tr className="border-b border-border last:border-0">
      <td className="p-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="p-3">
          {v}
        </td>
      ))}
    </tr>
  );
}
