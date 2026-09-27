import type { DestinationSeed } from "../types";

/**
 * Dominica — Secret Bay, near Portsmouth.
 *
 * Added because Janel sent one of its venues over (Sept 2026). Researched
 * lightly next to the original destinations: legal, flights and season are
 * sourced; lodging and the scenario are estimates, flagged as such.
 */
export const dominica: DestinationSeed = {
  key: "dominica",
  name: "Dominica",
  country: "Dominica",
  countryCode: "DM",
  region: "Portsmouth (northwest coast)",
  rank: 51,
  whyHere:
    "Janel sent Secret Bay: rainforest-and-cliff villas on the Caribbean's most untouched island. It's the wild, green, private-buyout version of an island wedding.",
  notes:
    "A hard cap to know up front: Secret Bay's full buyout holds 80 guests, so this only works as a smaller wedding.",
  travelCostPerGuestEstimate: 1564,
  flightCostEstimate: 700,
  lodgingPerNightEstimate: 288,
  attendanceRateEstimate: 0.5,
  weatherNotes:
    "Dominica is one of the wettest islands in the Caribbean. The drier season runs about February to April (roughly 4-5 inches of rain a month), and the rainy season is May to December. April sits inside the drier window (simcorner.com; climatestotravel.com).",
  legalNotes:
    "At least one partner must be on the island 2 days before applying. Bring passports, birth certificates, and proof neither has been married (or a divorce decree / death certificate). A special licence comes from the Ministry of Social Services in Roseau; the licence is EC$300 plus a non-residency fee of EC$500 (~US$185) (grouptravel.org; dominicaconsulategreece.com). Verify with the local authority or an attorney.",
  seasonNotes:
    "February to April is the drier, more popular window. Outside hurricane season (June 1 to November 30).",
  travelNotes:
    "American Airlines flies nonstop Miami to Dominica (DOM), about 3 hours 40 minutes, now daily; recent round trips from Miami start around $658, so most guests connect through Miami (flightsfrom.com; caribjournal.com). Secret Bay is near Portsmouth in the north. Travel-cost math: ~$700 round-trip airfare + 3 nights x $288/night (estimate) = $1,564 per guest.",
  sourceUrls: [
    "http://grouptravel.org/destination-wedding/getting-married-in-dominica-legal-requirements/",
    "https://dominicaconsulategreece.com/getting-married-in-dominica/",
    "https://www.caribjournal.com/2025/12/26/american-airlines-dominica-miami-nonstop-doubled/",
    "https://www.flightsfrom.com/MIA-DOM",
    "https://simcorner.com/blogs/travel-guides/best-time-to-visit-dominica",
    "https://secretbay.dm/weddings-and-honeymoons/",
  ],
  venues: [
    {
      key: "dominica-secret-bay",
      name: "Secret Bay",
      website: "https://secretbay.dm/weddings-and-honeymoons/",
      capacity: 80,
      lodgingOnSite: true,
      styleNotes:
        "Clifftop treehouse-style villas with plunge pools over rainforest and sea, growing to 42 villas. A full buyout holds up to 80 guests with a 3-night minimum, from US$23,000 a night. Vows on one of three beaches or a clifftop deck.",
      sourceUrls: [
        "https://secretbay.dm/vogue-names-secret-bay-among-the-worlds-best-boutique-hotels-for-a-wedding-buyout/",
        "https://secretbay.dm/weddings-and-honeymoons/",
      ],
      suggestedBy: "Janel",
      suggestedNote: "Tropical rainforest & villa vibe",
    },
    {
      key: "dominica-intercontinental-cabrits",
      name: "InterContinental Dominica Cabrits Resort & Spa",
      website:
        "https://www.ihg.com/intercontinental/hotels/us/en/portsmouth/dompr/hoteldetail/meetings-events/weddings",
      capacity: 1000,
      lodgingOnSite: true,
      styleNotes:
        "Found by Atlas as the full-guest-list option near Secret Bay (both around Portsmouth): an oceanfront Cabana Lawn for up to 1,000, 8,475 sq ft of indoor space and a private beach.",
      sourceUrls: [
        "https://www.ihg.com/intercontinental/hotels/us/en/portsmouth/dompr/hoteldetail/meetings-events/weddings",
        "https://www.weddingwire.com/biz/intercontinental-dominica-cabrits-resort-spa/34f428b15c4ff711.html",
      ],
    },
    {
      key: "dominica-jungle-bay",
      name: "Jungle Bay",
      website: "https://www.junglebaydominica.com/caribbean-island-wedding",
      lodgingOnSite: true,
      styleNotes:
        "Found by Atlas: an eco-luxury villa resort where vows happen beside waterfalls and in the rainforest. Capacity and pricing aren't published.",
      sourceUrls: ["https://www.junglebaydominica.com/caribbean-island-wedding"],
    },
    {
      key: "dominica-intercontinental-cabrits",
      name: "InterContinental Dominica Cabrits Resort & Spa",
      website:
        "https://www.ihg.com/intercontinental/hotels/us/en/portsmouth/dompr/hoteldetail/meetings-events/weddings",
      capacity: 1000,
      lodgingOnSite: true,
      styleNotes:
        "Found by Atlas as the full-guest-list option near Secret Bay (both around Portsmouth): an oceanfront Cabana Lawn for up to 1,000, 8,475 sq ft of indoor space and a private beach.",
      sourceUrls: [
        "https://www.ihg.com/intercontinental/hotels/us/en/portsmouth/dompr/hoteldetail/meetings-events/weddings",
        "https://www.weddingwire.com/biz/intercontinental-dominica-cabrits-resort-spa/34f428b15c4ff711.html",
      ],
    },
    {
      key: "dominica-jungle-bay",
      name: "Jungle Bay",
      website: "https://www.junglebaydominica.com/caribbean-island-wedding",
      lodgingOnSite: true,
      styleNotes:
        "Found by Atlas: an eco-luxury villa resort where vows happen beside waterfalls and in the rainforest. Capacity and pricing aren't published.",
      sourceUrls: ["https://www.junglebaydominica.com/caribbean-island-wedding"],
    },
  ],
  scenario: {
    fixedCosts: 45000,
    perGuestCost: 250,
    travelCostPerGuest: 1564,
    attendanceRate: 0.5,
    notes:
      "Estimates. Lodging per guest-night is Secret Bay's US$23,000/night buyout split across its 80-guest capacity (~$288). fixedCosts (~$45,000) and perGuestCost (~$250 food and drink) are Atlas's rough figures for a luxury island wedding, not quotes; ask Secret Bay for a buyout proposal.",
  },
};
