"use client";

import { scenarioMath, venueStatusSchema, type Destination, type Scenario, type Venue, type VenueStatus } from "@bower/shared";
import { ChevronDown, ExternalLink, Pencil, Plus } from "lucide-react";
import { AccentChip, EstimateChip, NeutralChip, SourceChips } from "@/components/atlas/chips";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { countryCode } from "@/lib/country-code";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";

const NOTE_LABELS = ["Weather", "Season", "Legal", "Travel"] as const;

export function DestinationPostcard({
  destination,
  venues,
  scenario,
  isFrontRunner,
  guestTarget,
  expanded,
  onToggleExpand,
  onEditDestination,
  onAddVenue,
  onEditVenue,
  onVenueStatusChange,
  onNewScenario,
  className,
}: {
  destination: Destination;
  venues: Venue[];
  scenario?: Scenario;
  isFrontRunner: boolean;
  guestTarget: number;
  expanded: boolean;
  onToggleExpand: () => void;
  onEditDestination: () => void;
  onAddVenue: () => void;
  onEditVenue: (venue: Venue) => void;
  onVenueStatusChange: (venue: Venue, status: VenueStatus) => void;
  onNewScenario: () => void;
  className?: string;
}) {
  const math = scenario ? scenarioMath(scenario) : undefined;
  const attendanceRate = destination.attendanceRateEstimate ?? scenario?.attendanceRate ?? 0.8;
  const likely = Math.round(guestTarget * attendanceRate);

  const paragraphs = (destination.notes ?? "").split(/\n{2,}/).filter(Boolean);
  const whyHere = paragraphs[0];
  const travelNotes = paragraphs.slice(1).join("\n\n") || undefined;
  const notesByLabel: Record<(typeof NOTE_LABELS)[number], string | undefined> = {
    Weather: destination.weatherNotes,
    Season: destination.seasonNotes,
    Legal: destination.legalNotes,
    Travel: travelNotes,
  };

  return (
    <div className={cn("postcard flex flex-col p-5", className)}>
      <div className="flex items-start justify-between gap-2">
        <span className="stamp stamp-sm">{countryCode(destination.country, destination.name)}</span>
        <div className="flex items-center gap-2">
          {isFrontRunner && <AccentChip>Front-runner</AccentChip>}
          {/* research-venues-button slot */}
        </div>
      </div>

      <button type="button" onClick={onToggleExpand} aria-expanded={expanded} className="mt-4 flex flex-col text-left">
        <p className="font-display text-2xl leading-tight">{destination.name}</p>
        <p className="mt-0.5 line-clamp-1 text-xs text-ink-mute">{destination.region ?? destination.country}</p>
        <dl className="mt-4 space-y-1.5 text-sm">
          <div className="flex justify-between gap-2">
            <dt className="text-ink-soft">Total</dt>
            <dd className="tabular font-medium">{math ? formatMoney(math.totalCost) : "—"}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-ink-soft">Per guest to get there</dt>
            <dd className="tabular font-medium">{formatMoney(destination.travelCostPerGuestEstimate)}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-ink-soft">Likely to come</dt>
            <dd className="tabular font-medium">
              ~{likely} of {guestTarget}
            </dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-ink-soft">Lodging / night</dt>
            <dd className="tabular font-medium">{formatMoney(destination.lodgingPerNightEstimate)}</dd>
          </div>
        </dl>
        <span className="mt-3 inline-flex items-center gap-1 text-xs text-ink-mute">
          <ChevronDown className={cn("size-3.5 stroke-[1.5] transition-transform", expanded && "rotate-180")} />
          {expanded ? "Hide details" : "Why here, venues, sources"}
        </span>
      </button>

      {expanded && (
        <div className="hairline mt-4" />
      )}

      {expanded && (
        <div className="flex flex-col gap-4 pt-4">
          {whyHere && (
            <div>
              <p className="eyebrow">Why here</p>
              <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{whyHere}</p>
            </div>
          )}

          {NOTE_LABELS.filter((label) => notesByLabel[label]).map((label) => (
            <div key={label}>
              <p className="eyebrow">{label}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{notesByLabel[label]}</p>
            </div>
          ))}

          <div>
            <p className="eyebrow mb-1.5">Sources</p>
            <SourceChips urls={destination.sourceUrls} />
            {destination.sourceUrls.length === 0 && <p className="text-sm text-ink-mute">No sources logged yet.</p>}
          </div>

          <div className="hairline" />

          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="eyebrow">Venues</p>
              <Button variant="ghost" size="sm" onClick={onAddVenue}>
                <Plus className="size-3.5 stroke-[1.5]" /> Add venue
              </Button>
            </div>
            {venues.length === 0 ? (
              <p className="mt-2 text-sm text-ink-mute">No venues yet. Tell Bower to find some, or add one.</p>
            ) : (
              <ul className="mt-2 flex flex-col gap-2">
                {venues.map((venue) => (
                  <VenueRow key={venue.id} venue={venue} onEdit={() => onEditVenue(venue)} onStatusChange={(s) => onVenueStatusChange(venue, s)} />
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Button variant="outline" size="sm" onClick={onEditDestination}>
              <Pencil className="size-3.5 stroke-[1.5]" /> Edit destination
            </Button>
            <button type="button" onClick={onNewScenario} className="text-coral hover:underline">
              New scenario for {destination.name}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function VenueRow({
  venue,
  onEdit,
  onStatusChange,
}: {
  venue: Venue;
  onEdit: () => void;
  onStatusChange: (status: VenueStatus) => void;
}) {
  const isEstimate = venue.styleNotes?.toLowerCase().includes("estimate") ?? false;
  return (
    <li className="rounded-md border border-line p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          {venue.website ? (
            <a
              href={venue.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 truncate font-medium text-foreground hover:text-coral"
            >
              {venue.name}
              <ExternalLink className="size-3 shrink-0 stroke-[1.5] text-ink-mute" />
            </a>
          ) : (
            <span className="truncate font-medium">{venue.name}</span>
          )}
          {venue.lodgingOnSite && <NeutralChip>Lodging on site</NeutralChip>}
          {venue.inHouseCatering && <NeutralChip>In-house catering</NeutralChip>}
          {isEstimate && <EstimateChip />}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Select
            value={venue.status}
            onChange={(e) => onStatusChange(e.target.value as VenueStatus)}
            className="h-7 w-auto py-0 pr-7 text-xs"
            aria-label={`${venue.name} status`}
          >
            {venueStatusSchema.options.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
          <Button variant="ghost" size="sm" onClick={onEdit}>
            Edit
          </Button>
        </div>
      </div>
      <div className="tabular mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-soft">
        <span>Capacity {venue.capacity ?? "—"}</span>
        <span>Rental {formatMoney(venue.rentalFee)}</span>
        <span>F&amp;B min {formatMoney(venue.fbMinimum)}</span>
        <span>Per guest {formatMoney(venue.perGuestCost)}</span>
      </div>
      {venue.sourceUrls.length > 0 && <SourceChips urls={venue.sourceUrls} className="mt-2" />}
    </li>
  );
}
