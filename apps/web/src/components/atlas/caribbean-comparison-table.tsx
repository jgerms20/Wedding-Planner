"use client";

import { scenarioMath, type Destination, type Scenario } from "@bower/shared";
import { countryCode } from "@/lib/country-code";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";

const ORIGINS = ["Atlanta", "Charlotte", "Baltimore", "Los Angeles"];

/**
 * A dedicated side-by-side of the island finalists — the couple's own comparison table groups by
 * destination, not by "which island is cheapest to actually fly to from where our people live."
 * Only destinations carrying real, cited `originFlights` data show up here; everything else in
 * the atlas is unaffected.
 */
export function CaribbeanComparisonTable({
  destinations,
  scenarioByDestination,
  onViewDetails,
}: {
  destinations: Destination[];
  scenarioByDestination: Map<string, Scenario>;
  onViewDetails: (destinationId: string) => void;
}) {
  const islands = destinations.filter((d) => (d.originFlights ?? []).length > 0);

  if (islands.length === 0) {
    return <p className="mt-6 text-sm text-ink-soft">No Caribbean-island flight data yet.</p>;
  }

  return (
    <div className="mt-6">
      <p className="max-w-2xl text-[15px] text-ink-soft">
        Price, plus real flight time and fare from Atlanta, Charlotte, Baltimore and Los Angeles — the four cities the
        wedding party is actually flying from.
      </p>
      <div className="rise mt-5 overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-deep/60 text-left">
              <th className="sticky left-0 z-10 w-36 shrink-0 border-r border-line bg-paper-deep p-3 align-bottom text-xs font-semibold tracking-wide text-ink-mute uppercase">
                &nbsp;
              </th>
              {islands.map((d) => (
                <th key={d.id} className="min-w-[170px] p-3 align-top">
                  <div className="flex items-center gap-1.5">
                    <span className="stamp stamp-sm">{countryCode(d.country, d.name)}</span>
                    <p className="font-display text-lg leading-tight">{d.name}</p>
                  </div>
                  <button type="button" onClick={() => onViewDetails(d.id)} className="mt-1.5 text-xs text-coral underline decoration-dotted underline-offset-4">
                    View details
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <Row
              label="Price"
              islands={islands}
              render={(d) => {
                const scenario = scenarioByDestination.get(d.id);
                return scenario ? formatMoney(scenarioMath(scenario).totalCost) : "—";
              }}
              emphasize
            />
            <Row label="Flight, roughly" islands={islands} render={(d) => formatMoney(d.flightCostEstimate)} />
            {ORIGINS.map((origin) => (
              <Row
                key={origin}
                label={`From ${origin}`}
                islands={islands}
                render={(d) => {
                  const flight = d.originFlights?.find((f) => f.origin === origin);
                  return flight ? `${flight.hours.toFixed(1)}h · ${formatMoney(flight.fareEstimate)}` : "—";
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-mute">
        Flight times and fares are real, cited averages per route (nonstop where it exists, a representative connecting
        itinerary otherwise) — see each island's detail view for sources.
      </p>
    </div>
  );
}

function Row({
  label,
  islands,
  render,
  emphasize,
}: {
  label: string;
  islands: Destination[];
  render: (d: Destination) => string;
  emphasize?: boolean;
}) {
  return (
    <tr className="border-b border-line last:border-0">
      <td className="sticky left-0 z-10 border-r border-line bg-paper p-3 text-xs font-semibold tracking-wide text-ink-mute uppercase">
        {label}
      </td>
      {islands.map((d) => (
        <td key={d.id} className={cn("tabular p-3 align-top text-[15px]", emphasize ? "font-medium text-coral" : "text-foreground")}>
          {render(d)}
        </td>
      ))}
    </tr>
  );
}
