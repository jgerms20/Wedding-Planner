import type { DestinationSeed } from "../types";

/**
 * The Bahamas — Nassau/Paradise Island, Exuma.
 *
 * The safety-net choice: the shortest flights and easiest entry of the three
 * finalists, trading some of Brazil's and Jamaica's price advantage for
 * maximum guest turnout. Numbers below are sourced where a URL is given;
 * anything derived is flagged `estimated: true` with the derivation spelled
 * out in a note.
 */
export const bahamas: DestinationSeed = {
  key: "bahamas",
  name: "The Bahamas",
  country: "The Bahamas",
  countryCode: "BS",
  region: "Nassau/Paradise Island, Exuma",
  rank: 3,
  whyHere:
    "Even closer than Jamaica, with some of the shortest flight times from the US East Coast of any international option, plus resort-dense Nassau and a private-island feel in Exuma — the Bahamas is the pick if the couple wants to maximize how many of their ~100 guests actually show up.",
  notes:
    "Attendance is estimated at 0.70, the top of the 60-70% typical destination-wedding range reported by Destify's guest-attendance analysis — reflecting the shortest flights and no US-citizen visa requirement of the three finalist destinations (destify.com; immigration.gov.bs).",
  travelCostPerGuestEstimate: 1250,
  lodgingPerNightEstimate: 300,
  attendanceRateEstimate: 0.7,
  weatherNotes:
    "The Bahamas' dry season runs December-May, and March-April sit right in the sweet spot: warm (mid-70s to low-80s°F), sunny, calm and essentially hurricane-free. May marks the start of the transition toward the wet season, with rising humidity and rainfall as the calendar approaches June (villapads.com; nassauparadiseisland.com). Atlantic hurricane season officially runs June-November, so any date in the March-May window is safely ahead of it.",
  legalNotes:
    "There is no formal residency period, but both partners must be physically present in the Bahamas for at least 24 hours before applying in person for a marriage license (a de facto presence requirement). Required documents: valid passports, proof of single status (a sworn declaration for anyone never married), and — for anyone previously married — an original final divorce decree or a deceased spouse's death certificate, translated/certified/notarized if not in English. The license is issued the same day it's applied for and is valid for 90 days (esim.holafly.com; bahamas.gov.bs; bahamas.com). Verify with the local authority or an attorney.",
  seasonNotes:
    "December-May is the Bahamas' dry, high-demand season, and February-April specifically draws the heaviest crowds (including US spring break), pushing resort rates to their annual peak (villapads.com). Easter 2028 (Sunday, April 16) is a widely observed Bahamian holiday weekend and will add further demand and price pressure that week. Late April into May is a useful shoulder window — after the spring-break crush and before the wet season fully sets in — for somewhat better rates without giving up the dry-season weather.",
  travelNotes:
    "Nassau's Lynden Pindling International (NAS) has abundant nonstop service from New York, Atlanta and most other East Coast hubs, often under 3 hours flight time — the shortest and simplest logistics of the three finalist destinations. If the couple leans toward a more private Exuma venue, guests would connect through Nassau or Miami to Exuma International (GGT), adding a leg. No visa is required for US citizens; current Bahamian immigration policy allows visa-free tourist stays of up to 8 months with just a valid passport and a return/onward ticket (immigration.gov.bs; uspassporthelpguide.com). Travel-cost math: ~$350 round-trip airfare (midpoint of cited NYC/Atlanta-Nassau 2026 fares) + 3 nights x $300/night resort lodging = $1,250 per guest.",
  sourceUrls: [
    "https://esim.holafly.com/travel-tips/getting-married-in-the-bahamas/",
    "https://www.bahamas.gov.bs/service/marriage-licence",
    "https://www.bahamas.com/plan-your-trip/weddings/marriage-license",
    "https://www.immigration.gov.bs/entry-requirements/",
    "https://villapads.com/details/best-time-to-visit-the-bahamas-2026-weather-seasons-and-crowds",
    "https://www.nassauparadiseisland.com/blog/the-best-time-to-visit-the-bahamas-find-your-ideal-season-in-nassau-paradise-island",
    "https://www.smallvowrenewalnassaubahamas.com/bahamas-wedding-costs",
    "https://travellersworldwide.com/trip-to-the-bahamas-cost/",
    "https://www.expedia.com/lp/flights/atl/nas/atlanta-to-nassau",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
  ],
  venues: [
    {
      key: "bahamas-grand-isle-resort-exuma",
      name: "Grand Isle Resort & Spa",
      website: "https://www.grandisleresort.com/weddings.htm",
      capacity: 150,
      rentalFee: 5000,
      estimated: true,
      lodgingOnSite: true,
      styleNotes:
        "Great Exuma beachfront resort; the 23° North Beach Club offers 30,000 sq ft of indoor/outdoor event space alongside smaller terraces (25-50 guests). Capacity and rental fee are estimated from general Bahamas wedding-market rental ranges ($2,500-$7,500), not a venue-specific published rate.",
      availabilityNotes: "Request a quote for a 100-guest reception.",
      sourceUrls: [
        "https://www.grandisleresort.com/weddings.htm",
        "https://www.grandisleresort.com/occasions.htm",
      ],
    },
    {
      key: "bahamas-turquoise-cay-exuma",
      name: "Turquoise Cay",
      website: "https://turquoisecay.com/",
      capacity: 100,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "Private eight-room estate on Great Exuma with its own private chef and service team, bookable in full for a wedding weekend; explicitly advertised as accommodating up to 100 guests for the event itself, though its 8 rooms only sleep a fraction of that — most guests would stay at nearby hotels.",
      availabilityNotes: "No published wedding-package price; contact the property directly.",
      sourceUrls: ["https://chicbahamasweddings.com/exuma-bahamas-wedding/"],
    },
    {
      key: "bahamas-goldwynn-nassau",
      name: "Goldwynn Resort & Residences",
      website: "https://goldwynnresorts.com/nassau-bahamas-wedding/",
      capacity: 200,
      rentalFee: 5000,
      lodgingOnSite: true,
      styleNotes:
        "Modern, minimalist Cable Beach (Nassau) resort with private villas and oceanfront pools; wedding events run from small and intimate up to 200 guests. Starting wedding price of $5,000 is published directly by the resort.",
      availabilityNotes: "Final pricing is customized by guest count, date and services.",
      sourceUrls: ["https://goldwynnresorts.com/nassau-bahamas-wedding/"],
    },
    {
      key: "bahamas-grand-hyatt-baha-mar-nassau",
      name: "Grand Hyatt Baha Mar",
      website: "https://www.hyatt.com/grand-hyatt/en-US/nasgh-grand-hyatt-baha-mar/weddings",
      capacity: 150,
      inHouseCatering: true,
      estimated: true,
      lodgingOnSite: true,
      styleNotes:
        "Large-scale Cable Beach (Nassau) resort; the property's chapel seats 100 in pews or 150 with folding chairs, with additional ballroom/outdoor space for larger receptions. In-house catering is marked estimated — standard for a resort of this scale but not explicitly stated in available sources.",
      availabilityNotes: "No wedding-package price is published; request a group quote.",
      sourceUrls: ["https://www.hyatt.com/grand-hyatt/en-US/nasgh-grand-hyatt-baha-mar/weddings"],
    },
  ],
  scenario: {
    fixedCosts: 15000,
    perGuestCost: 105,
    travelCostPerGuest: 1250,
    attendanceRate: 0.7,
    notes:
      "fixedCosts is estimated from the Bahamas destination-wedding market's cited $10,000 starting all-in package fee (venue/coordinator/basic decor) plus a private-estate-style venue rental in the $2,500-$7,500 published range (midpoint ~$5,000, matching Goldwynn's own published $5,000 starting price), rounded to $15,000. perGuestCost ($105) is the midpoint of the Bahamas' cited $60-100/person plated-dinner catering range (smallvowrenewalnassaubahamas.com) plus a ~30% open-bar upcharge. travelCostPerGuest matches travelCostPerGuestEstimate. Sources: smallvowrenewalnassaubahamas.com/bahamas-wedding-costs, goldwynnresorts.com, grandisleresort.com.",
  },
};
