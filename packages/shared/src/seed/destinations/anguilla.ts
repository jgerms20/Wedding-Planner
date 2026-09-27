import type { DestinationSeed } from "../types";

/**
 * Anguilla — Meads Bay.
 *
 * Added because Janel sent one of its venues over (Sept 2026). Researched
 * lightly next to the original destinations: legal, flights and season are
 * sourced; lodging and the scenario are estimates, flagged as such.
 */
export const anguilla: DestinationSeed = {
  key: "anguilla",
  name: "Anguilla",
  country: "Anguilla",
  countryCode: "AI",
  region: "Meads Bay (West End)",
  rank: 54,
  whyHere:
    "Janel sent Frangipani on Meads Bay: a small, classic Caribbean beach resort you can buy out. Anguilla is quiet and has some of the best beaches in the region.",
  notes:
    "Most guests fly into St. Maarten and take a 20-25 minute ferry. Frangipani is intimate, and Malliouhana next door fits a bigger list.",
  travelCostPerGuestEstimate: 1950,
  flightCostEstimate: 450,
  lodgingPerNightEstimate: 500,
  attendanceRateEstimate: 0.55,
  weatherNotes:
    "Caribbean high season is December to April, with less rain. Hurricane season runs June 1 to November 30 (curacao.com).",
  legalNotes:
    "Both partners appear at the Court Registry at least 2 days before the wedding. A special licence for visitors staying under 15 days is US$284 and takes 2 working days. Bring full birth certificates, photo ID and any divorce decree, all in English or certified translations (weddingsabroadguide.com). Verify with the local authority or an attorney.",
  seasonNotes: "April is the tail of high season. Frangipani's buyout has a 4-night minimum.",
  travelNotes:
    "American flies Miami to Anguilla (AXA) daily, about 3 hours. More guests will find better fares into St. Maarten, e.g. $420 round trip nonstop from Miami, then the ferry from Marigot to Blowing Point ($15 plus $3 tax, every 30 minutes) (ivisitanguilla.com; caribjournal.com; frommers.com). Travel-cost math: ~$450 round-trip airfare + 3 nights x $500/night (estimate) = $1,950 per guest.",
  sourceUrls: [
    "https://weddingsabroadguide.com/legal-requirements-for-getting-married-in-anguilla.html",
    "https://ivisitanguilla.com/getting-to-anguilla/",
    "https://www.caribjournal.com/2026/07/11/st-maarten-american-airlines-fare/",
    "https://www.frommers.com/destinations/anguilla/planning-a-trip/getting-there",
    "https://www.curacao.com/en/questions/weather/when-is-hurricane-season-in-curacao",
  ],
  venues: [
    {
      key: "anguilla-frangipani",
      name: "Frangipani Beach Resort",
      website: "https://frangipaniresort.com/events/",
      lodgingOnSite: true,
      styleNotes:
        "19 rooms and suites plus a four-bedroom beachfront villa, right on Meads Bay. Hosts everything from weddings for two to full buyouts, with a 4-night minimum for a buyout. Capacity and pricing aren't published.",
      sourceUrls: [
        "https://frangipaniresort.com/events/",
        "https://www.frommers.com/destinations/anguilla/hotels/frangipani-beach-resort/",
      ],
      suggestedBy: "Janel",
      suggestedNote: "Classic Caribbean beach vibe",
    },
    {
      key: "anguilla-malliouhana",
      name: "Malliouhana",
      website: "https://slh.com/hotels/malliouhana-resort",
      capacity: 220,
      lodgingOnSite: true,
      styleNotes:
        "Found by Atlas as the bigger-list option next door on Meads Bay: 25 acres of gardens, three beaches, five pools, and weddings up to 220.",
      sourceUrls: [
        "https://www.fivestaralliance.com/luxury-hotels/anguilla/malliouhana-hotel-and-spa",
        "https://slh.com/hotels/malliouhana-resort",
      ],
    },
    {
      key: "anguilla-cap-juluca",
      name: "Cap Juluca, A Belmond Hotel",
      website:
        "https://www.belmond.com/en/hotels/north-america/caribbean/cap-juluca-anguilla/celebrations",
      capacity: 200,
      lodgingOnSite: true,
      styleNotes:
        "Found by Atlas: 179 acres on Maundays Bay with an 1,800 sq ft event pavilion and sunset beach ceremonies, up to 200 guests, with an exclusive full-resort option.",
      sourceUrls: [
        "https://www.weddingstylemagazine.com/wedding-venues/belmond-cap-juluca",
        "https://www.belmond.com/en/hotels/north-america/caribbean/cap-juluca-anguilla/celebrations",
      ],
    },
  ],
  scenario: {
    fixedCosts: 50000,
    perGuestCost: 250,
    travelCostPerGuest: 1950,
    attendanceRate: 0.55,
    notes:
      "Estimates. Lodging (~$500 a night) is Atlas's placeholder: no published rate was found in this pass. fixedCosts and perGuestCost are rough luxury-island figures, not quotes.",
  },
};
