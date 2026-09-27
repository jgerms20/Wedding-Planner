import type { DestinationSeed } from "../types";

/**
 * Canouan, St. Vincent & the Grenadines — Mandarin Oriental.
 *
 * Added because Janel sent one of its venues over (Sept 2026). Researched
 * lightly next to the original destinations: legal, flights and season are
 * sourced; lodging and the scenario are estimates, flagged as such.
 */
export const stVincentGrenadines: DestinationSeed = {
  key: "st-vincent-grenadines",
  name: "Canouan (St. Vincent & the Grenadines)",
  country: "St. Vincent and the Grenadines",
  countryCode: "VC",
  region: "Canouan, Bequia and Petit St. Vincent",
  rank: 55,
  whyHere:
    "Janel sent the Mandarin Oriental on Canouan: a formal, ultra-luxe estate on a tiny island in the Grenadines.",
  notes:
    "Getting there is the catch: fly to Barbados, then a small plane to Canouan. Seated dinners top out around 80.",
  travelCostPerGuestEstimate: 3525,
  flightCostEstimate: 1125,
  lodgingPerNightEstimate: 800,
  attendanceRateEstimate: 0.4,
  weatherNotes:
    "Caribbean high season is December to April, with less rain. Hurricane season runs June 1 to November 30 (curacao.com).",
  legalNotes:
    "Visitors need 24 hours in the country, then apply in person at the Attorney General's office (Ministry of Justice) in St. Vincent for a Governor-General's licence, EC$525 plus stamps. Bring passports and any divorce or death certificate (confetti.co.uk; caribbeanweddings.com). Verify with the local authority or an attorney.",
  seasonNotes: "April is high season. Book inter-island seats before international flights.",
  travelNotes:
    "Fly to Barbados (BGI), then a regional flight to Canouan: about $525 round trip commercially, or about $1,500 a seat round trip on the resort's semi-private jet. Airfare here is a ~$600 estimate to Barbados plus $525 (mandarinoriental.com; canouan.co). Travel-cost math: ~$1125 round-trip airfare + 3 nights x $800/night (estimate) = $3,525 per guest.",
  sourceUrls: [
    "https://www.confetti.co.uk/wedding/getting-married-abroad/getting-married-in-st-vincent-and-the-grenadines/",
    "https://caribbeanweddings.com/stvincent-thegrenadines/legal-requirements/",
    "https://www.mandarinoriental.com/en/canouan/caribbean/getting-here",
    "https://www.canouan.co/get-here",
    "https://www.curacao.com/en/questions/weather/when-is-hurricane-season-in-curacao",
  ],
  venues: [
    {
      key: "svg-mandarin-oriental-canouan",
      name: "Mandarin Oriental, Canouan",
      website: "https://www.mandarinoriental.com/en/canouan/caribbean/celebrate",
      capacity: 80,
      lodgingOnSite: true,
      styleNotes:
        "1,200 acres on Canouan's north shore: 26 suites and 7 villas, Italianate architecture on the beach, and a golf course. Seated capacity about 80. Ceremony spots include a poolside terrace over Godahl Beach, the Spa Pavilion by the sea and a 17th-century Anglican church.",
      sourceUrls: [
        "https://www.mandarinoriental.com/en/canouan/caribbean/celebrate",
        "https://www.weddingstylemagazine.com/wedding-venues/mandarin-oriental-canouan",
      ],
      suggestedBy: "Janel",
      suggestedNote: "Ultra-luxe estate vibe",
    },
    {
      key: "svg-bequia-beach-hotel",
      name: "Bequia Beach Hotel",
      website: "https://bequiabeachhotel.com/celebrations-weddings-events",
      capacity: 100,
      lodgingOnSite: true,
      styleNotes:
        "Found by Atlas, on neighboring Bequia (Friendship Bay): a 58-key boutique beach resort with rooms, cottages and villas, a wedding coordinator, and a venue for about 100.",
      sourceUrls: [
        "https://bequiabeachhotel.com/celebrations-weddings-events",
        "https://vacations.aircanada.com/en/accommodation-details/SVDBBE/bequia-beach-hotel-&-spa",
      ],
    },
    {
      key: "svg-petit-st-vincent",
      name: "Petit St. Vincent",
      website: "https://www.destinationweddings.com/petit-st-vincent-resort",
      lodgingOnSite: true,
      styleNotes:
        "Found by Atlas: a private-island resort at the southern end of the Grenadines with beach and clifftop ceremony spots. Capacity and pricing aren't published.",
      sourceUrls: ["https://www.destinationweddings.com/petit-st-vincent-resort"],
    },
  ],
  scenario: {
    fixedCosts: 60000,
    perGuestCost: 300,
    travelCostPerGuest: 3525,
    attendanceRate: 0.4,
    notes:
      "Estimates. Lodging (~$800 a night) is Atlas's placeholder for an ultra-luxury resort; no published rate was found in this pass. fixedCosts and perGuestCost are rough figures, not quotes.",
  },
};
