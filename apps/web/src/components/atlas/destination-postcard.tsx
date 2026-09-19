"use client";

import { scenarioMath, type Destination, type Scenario } from "@bower/shared";
import { ChevronDown, ChevronUp, Heart, X } from "lucide-react";
import { AccentChip } from "@/components/atlas/chips";
import { Button } from "@/components/ui/button";
import { countryCode } from "@/lib/country-code";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";

export function DestinationPostcard({
  destination,
  venueCount,
  scenario,
  isFrontRunner,
  guestTarget,
  onViewDetails,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  partnerAName,
  partnerBName,
  onToggleFavorite,
  onRemove,
  className,
}: {
  destination: Destination;
  venueCount: number;
  scenario?: Scenario;
  isFrontRunner: boolean;
  guestTarget: number;
  onViewDetails: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  partnerAName: string;
  partnerBName: string;
  onToggleFavorite: (partner: "A" | "B") => void;
  onRemove: () => void;
  className?: string;
}) {
  const math = scenario ? scenarioMath(scenario) : undefined;
  const attendanceRate = destination.attendanceRateEstimate ?? scenario?.attendanceRate ?? 0.8;
  const likely = Math.round(guestTarget * attendanceRate);
  const favoritedBy = destination.favoritedBy ?? [];

  return (
    <div className={cn("postcard flex flex-col overflow-hidden p-0", className)}>
      {destination.imageUrl && <img src={destination.imageUrl} alt="" className="h-32 w-full object-cover" />}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <span className="stamp stamp-sm">{countryCode(destination.country, destination.name)}</span>
          <div className="flex items-center gap-2">
            {isFrontRunner && <AccentChip>Front-runner</AccentChip>}
            <FavoriteToggle label={partnerAName} active={favoritedBy.includes("A")} onClick={() => onToggleFavorite("A")} />
            <FavoriteToggle label={partnerBName} active={favoritedBy.includes("B")} onClick={() => onToggleFavorite("B")} />
            <button
              type="button"
              onClick={onRemove}
              aria-label={`Remove ${destination.name}`}
              title="Remove"
              className="rounded-full p-1 text-ink-mute transition-colors hover:bg-muted hover:text-destructive"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-display text-2xl leading-tight">{destination.name}</p>
            <p className="mt-0.5 line-clamp-1 text-xs text-ink-mute">{destination.region ?? destination.country}</p>
          </div>
          <div className="flex shrink-0 flex-col rounded-full border border-line">
            <button
              type="button"
              onClick={onMoveUp}
              disabled={!canMoveUp}
              aria-label={`Rank ${destination.name} higher`}
              title="Rank higher"
              className="rounded-t-full p-1 text-ink-soft transition-colors hover:bg-muted disabled:opacity-30"
            >
              <ChevronUp className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={onMoveDown}
              disabled={!canMoveDown}
              aria-label={`Rank ${destination.name} lower`}
              title="Rank lower"
              className="rounded-b-full p-1 text-ink-soft transition-colors hover:bg-muted disabled:opacity-30"
            >
              <ChevronDown className="size-3.5" />
            </button>
          </div>
        </div>

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

        <p className="mt-3 text-xs text-ink-mute">
          {venueCount} venue{venueCount === 1 ? "" : "s"} · {destination.sourceUrls.length} source{destination.sourceUrls.length === 1 ? "" : "s"}
        </p>

        <Button variant="outline" size="sm" className="mt-4 self-start" onClick={onViewDetails}>
          View details
        </Button>
      </div>
    </div>
  );
}

/** One partner's own favorite marker — independent of the other partner's, since they don't always agree. */
function FavoriteToggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={active ? `${label}'s favorite` : `Mark as ${label}'s favorite`}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition-colors",
        active ? "border-coral bg-coral/10 text-coral" : "border-line text-ink-mute hover:border-line-strong hover:text-ink-soft",
      )}
    >
      <Heart className={cn("size-3", active && "fill-coral")} />
      {label}
    </button>
  );
}
