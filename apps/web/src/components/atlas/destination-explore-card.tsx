"use client";

import type { Destination } from "@bower/shared";
import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { countryCode } from "@/lib/country-code";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * The Explore tab's card: browsing, not deciding. No rank, no Front-runner, no
 * cost stats — just enough to decide "is this worth a heart." Once favorited,
 * the same destination shows up on the Favorites tab as the full
 * `DestinationPostcard` (rank arrows, stats, "View details").
 */
export function DestinationExploreCard({
  destination,
  partnerAName,
  partnerBName,
  onToggleFavorite,
  onViewDetails,
  onRemove,
  className,
}: {
  destination: Destination;
  partnerAName: string;
  partnerBName: string;
  onToggleFavorite: (partner: "A" | "B") => void;
  onViewDetails: () => void;
  onRemove: () => void;
  className?: string;
}) {
  const favoritedBy = destination.favoritedBy ?? [];
  const whyHere = destination.notes?.split(/\n\s*\n/)[0];

  return (
    <div className={cn("postcard flex flex-col overflow-hidden p-0", className)}>
      {destination.imageUrl && <img src={destination.imageUrl} alt="" className="h-28 w-full object-cover" />}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <span className="stamp stamp-sm">{countryCode(destination.country, destination.name)}</span>
          <div className="flex items-center gap-2">
            {destination.travelCostPerGuestEstimate !== undefined && (
              <span className="tabular text-sm font-medium text-coral">~{formatMoney(destination.travelCostPerGuestEstimate)}/guest</span>
            )}
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

        <p className="mt-2 font-display text-xl leading-tight">{destination.name}</p>
        <p className="mt-0.5 line-clamp-1 text-xs text-ink-mute">{destination.region ?? destination.country}</p>
        {whyHere && <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{whyHere}</p>}

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <div className="flex items-center gap-1.5">
            <FavoriteToggle label={partnerAName} active={favoritedBy.includes("A")} onClick={() => onToggleFavorite("A")} />
            <FavoriteToggle label={partnerBName} active={favoritedBy.includes("B")} onClick={() => onToggleFavorite("B")} />
          </div>
          <Button variant="outline" size="sm" onClick={onViewDetails}>
            View details
          </Button>
        </div>
      </div>
    </div>
  );
}

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
