import type { DestinationSeed } from "../types";

/**
 * Grand Cayman — Black Urchin and Seven Mile Beach.
 *
 * Added because Janel sent one of its venues over (Sept 2026). Researched
 * lightly next to the original destinations: legal, flights and season are
 * sourced; lodging and the scenario are estimates, flagged as such.
 */
export const caymanIslands: DestinationSeed = {
  key: "cayman-islands",
  name: "Grand Cayman",
  country: "Cayman Islands",
  countryCode: "KY",
  region: "Seven Mile Beach and the East End",
  rank: 53,
  whyHere:
    "Janel sent Black Urchin, a buyout-able oceanfront estate. Grand Cayman has nonstop flights from Atlanta and Charlotte, and you can get married the day you land.",
  notes:
    "Left out on purpose: Pedro St. James, a 1780 great house built with enslaved labour and once a cotton plantation, even though it's one of the island's best-known wedding sites. Two ways to do it: Black Urchin's private estate (up to 88 with a buyout) or a big-resort wedding on Seven Mile Beach.",
  travelCostPerGuestEstimate: 1790,
  flightCostEstimate: 590,
  lodgingPerNightEstimate: 400,
  attendanceRateEstimate: 0.6,
  weatherNotes:
    "Caribbean high season is December to April, with less rain. Hurricane season runs June 1 to November 30 (curacao.com).",
  legalNotes:
    "Visitors marry on a Governor's Special Marriage Licence (CI$200), which can be issued the day you arrive at Passport and Corporate Services in George Town. Bring a passport or birth certificate, plus a divorce decree or death certificate if either was married before. The licence is good for three months (caymanresident.com; explorecayman.com). Verify with the local authority or an attorney.",
  seasonNotes: "April is high season: great weather, higher prices. Book the room block early.",
  travelNotes:
    "Delta flies Atlanta nonstop year-round (average round trip about $581) and American flies Charlotte nonstop (from about $598) (farecompare.com; aa.com; us.trip.com). Travel-cost math: ~$590 round-trip airfare + 3 nights x $400/night (estimate) = $1,790 per guest.",
  sourceUrls: [
    "https://caymanresident.com/live/getting-married/visitors-marrying-cayman-islands",
    "https://www.explorecayman.com/weddings/legal-requirements",
    "https://www.farecompare.com/flights/Atlanta-ATL/Grand_Cayman_Island-GCM/market.html",
    "https://www.aa.com/en-us/flights-from-charlotte-to-grand-cayman",
    "https://www.curacao.com/en/questions/weather/when-is-hurricane-season-in-curacao",
  ],
  venues: [
    {
      key: "cayman-black-urchin",
      name: "Black Urchin",
      website: "https://www.blackurchin.com/events",
      capacity: 88,
      lodgingOnSite: true,
      styleNotes:
        "A modern oceanfront boutique estate with beachfront lawns. A full buyout of two villas and four oceanfront suites hosts up to 88; the Grand Palm Residence sleeps 22 and the Coconut Grove Suites sleep up to 48. One of the few full-buyout properties on the island.",
      sourceUrls: ["https://www.blackurchin.com/events", "https://www.blackurchin.com/buyouts"],
      suggestedBy: "Janel",
      suggestedNote: "Boutique oceanfront estate vibe",
    },
    {
      key: "cayman-kimpton-seafire",
      name: "Kimpton Seafire Resort + Spa",
      website: "https://www.seafireresortandspa.com/beach-wedding-venues/",
      capacity: 450,
      lodgingOnSite: true,
      styleNotes:
        "Found by Atlas as the full-guest-list option: 266 rooms, nearly all with water views, on Seven Mile Beach. Weddings of 25-450 on the beach, the event lawn or the Aurea Ballroom.",
      sourceUrls: [
        "https://www.seafireresortandspa.com/beach-wedding-venues/",
        "https://caymanresident.com/profile/kimpton-seafire-resort-spa",
      ],
    },
    {
      key: "cayman-ritz-carlton",
      name: "The Ritz-Carlton, Grand Cayman",
      website: "https://www.ritzcarlton.com/en/hotels/gcmrz-the-ritz-carlton-grand-cayman/events/",
      capacity: 500,
      lodgingOnSite: true,
      styleNotes:
        "Found by Atlas: Seven Mile Beach resort with a ballroom for up to 500 and a Great Lawn; 22,000+ sq ft of event space.",
      sourceUrls: [
        "https://www.ritzcarlton.com/en/hotels/gcmrz-the-ritz-carlton-grand-cayman/events/",
        "https://www.partyslate.com/venues/the-ritz-carlton-grand-cayman",
      ],
    },
  ],
  scenario: {
    fixedCosts: 50000,
    perGuestCost: 225,
    travelCostPerGuest: 1790,
    attendanceRate: 0.6,
    notes:
      "Estimates. Lodging (~$400 a night) is Atlas's placeholder: no published rate was found in this pass. fixedCosts and perGuestCost are rough figures for a ~100-guest resort wedding, not quotes.",
  },
};
