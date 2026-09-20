import type { DestinationSeed } from "../types";

/**
 * Riviera Maya (Playa del Carmen), Mexico.
 *
 * Same Cancún airport and coastline as Tulum, but a longer-established,
 * larger-scale resort-wedding market (Grand Velas, Karisma's El Dorado
 * Royale, Generations) with more venue and price-point variety. Numbers
 * below are sourced where a URL is given; anything derived is flagged
 * `estimated: true` with the derivation spelled out in a note.
 */
export const rivieraMayaMexico: DestinationSeed = {
  key: "riviera-maya-mexico",
  name: "Riviera Maya",
  country: "Mexico",
  countryCode: "MX",
  region: "Playa del Carmen & Riviera Maya, Quintana Roo",
  rank: 33,
  whyHere:
    "Playa del Carmen and the Riviera Maya corridor share Tulum's Cancún airport and Caribbean coastline but layer on a deeper bench of large, purpose-built all-inclusive resorts that run 100+ guest weddings every week — a practical middle ground between Tulum's boutique scene and Cabo's bigger ballrooms, all still close enough to fold in a Cancún or Playa welcome-party night.",
  notes:
    "Attendance is estimated at 0.66 — the upper-middle of the 60-70% typical destination-wedding range reported by Destify's guest-attendance analysis — reflecting the same easy Cancún-airport nonstop access as Tulum, plus a wedding market so large and price-tiered that a guest can usually find a room in their budget on-site (destify.com).",
  travelCostPerGuestEstimate: 1360,
  lodgingPerNightEstimate: 290,
  attendanceRateEstimate: 0.66,
  weatherNotes:
    "Riviera Maya shares Tulum's climate pattern almost exactly, since both sit on the same stretch of Quintana Roo coast: March is warm and one of the least rainy months (highs ~82°F/28°C); April and May stay warm-to-hot and increasingly humid, with the first spring thunderstorms typically arriving in May as the wet season builds. Mid-March through late May is generally the best window for dry, sunny conditions before peak-summer heat and rain (accuweather.com; wanderlog.com; weatherspark.com — Tulum readings, ~40 miles south, are the closest published data to Playa del Carmen).",
  legalNotes:
    "Playa del Carmen sits in Quintana Roo, so the same state rules as Tulum apply: only a civil ceremony performed by a Quintana Roo Civil Registry judge is legally binding, and a beach ceremony with an outside officiant is symbolic unless paired with that filing. Required documents: valid passports, an apostilled birth certificate with certified Spanish translation, and a final divorce decree (with Quintana Roo generally requiring about a year to have passed since the divorce) or death certificate for anyone previously married. Four witnesses 18 or older with valid ID must be present. As of a June 2026 rule change, Quintana Roo no longer requires the mandatory blood test/medical certificate that used to apply, though this should be reconfirmed before the wedding date; there's no residency requirement, but expect a short administrative wait (commonly two to three business days) between filing and the ceremony. Verify with the local authority or an attorney.",
  seasonNotes:
    "Like Tulum, December-March is the Riviera Maya's peak wedding season, with March carrying the added crowding and price pressure of US spring break (concentrated weeks in March) and Semana Santa (Holy Week), which in a comparable 2026 calendar runs March 29-April 5 and floods the coast with domestic Mexican travelers on school holiday. Easter Sunday 2028 falls April 16 (publicholidays.com). Playa del Carmen's larger resort supply means availability is generally easier to find than Tulum's smaller boutique-hotel market even at peak times, but pricing still follows the same seasonal curve — late April into May offers a calmer, less expensive window than a March date (mexicodave.com; casatira.com).",
  travelNotes:
    "Guests fly into Cancún International (CUN), the same airport used for Tulum, with frequent nonstop service from most East Coast hubs (Delta from JFK in ~3.5 hours and from Atlanta in ~2 hours 40 minutes at 26 flights/week as of an August 2026 count; additional nonstop service from Southwest, American and Frontier). Playa del Carmen itself is a shorter transfer than Tulum — about 45 minutes (55km) south on Federal Highway 307, a modern toll-free divided highway, versus Tulum's ~1.5 hours. No US visa is required. Travel-cost math: round-trip NYC-Cancún fares cluster in the $371-$602 range across aggregators as of 2026 (momondo.com, skyscanner.com), midpoint ~$480, + 3 nights lodging at $290/night (the midpoint of Playa del Carmen's cited 4-star ~$203/night and 5-star ~$321/night resort rates) = $1,360 per guest.",
  sourceUrls: [
    "https://mx.usembassy.gov/marriage/",
    "https://translayte.com/blog/mexico-marriage-requirements",
    "https://boutiqueweddingsmexico.com/guia/requisitos-boda-civil-por-estado",
    "https://www.accuweather.com/en/mx/tulum/235062/march-weather/235062",
    "https://weatherspark.com/y/13835/Average-Weather-in-Tulum-Mexico-Year-Round",
    "https://mexicodave.com/tulum-in-march",
    "https://casatira.com/best-time-to-visit-tulum-month-by-month-weather-crowd-guide-for-2026",
    "https://publicholidays.com/easter/",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.flightconnections.com/flights-from-atl-to-cun",
    "https://www.momondo.com/flights/new-york-city/cancun",
    "https://www.transfeero.com/en/cancun-international-airport-transfers-cun/transfer-from-cancun-international-airport-to-playa-del-carmen/",
    "https://blog.destinationweddings.com/riviera-maya-wedding-cost-guide",
  ],
  venues: [
    {
      key: "riviera-maya-mexico-grand-velas",
      name: "Grand Velas Riviera Maya",
      website: "https://rivieramaya.grandvelas.com/weddings",
      capacity: 260,
      perGuestCost: 110,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "AAA Five-Diamond all-inclusive resort with eight event venues, including an Ocean Terrace (ceremony up to 260, reception up to 160) and a dedicated chapel for Catholic ceremonies (up to 143). The resort doesn't sell fixed wedding packages — everything is custom-quoted — so perGuestCost above ($110) is drawn from a cited basic-package example (a $3,300 base for 30 guests) and marked estimated, since actual per-person cost varies with menu and bar selections.",
      availabilityNotes: "Request a custom proposal from the resort's wedding team; no flat package price is published.",
      sourceUrls: [
        "https://rivieramaya.grandvelas.com/weddings",
        "https://www.myoverseaswedding.com/wedding-destinations/mexico/grand-velas-riviera-maya/ceremony-venues",
        "https://paradiseweddings.com/mx/riviera-maya/grand-velas-riviera-maya",
      ],
    },
    {
      key: "riviera-maya-mexico-el-dorado-royale",
      name: "El Dorado Royale, a Karisma Resort",
      website: "https://www.royalerivieramaya.com/weddings.asp",
      capacity: 800,
      perGuestCost: 13,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "Adults-only, AAA Four-Diamond all-inclusive resort set on 450 acres of coastal jungle; venue spaces scale from an intimate 20-guest ceremony up to 800 for a large reception. Packages are priced from a 24-guest base with $13 per additional guest for at least one published tier — a strong fit for the couple's ~100-guest count within a single resort's largest spaces. perGuestCost marked estimated since it reflects one package tier among several.",
      availabilityNotes: "Contact the resort or a Karisma-affiliated planner for guest-count-specific package quotes.",
      sourceUrls: [
        "https://www.royalerivieramaya.com/weddings.asp",
        "https://paradiseweddings.com/mx/riviera-maya/el-dorado-royale",
      ],
    },
    {
      key: "riviera-maya-mexico-generations",
      name: "Generations Riviera Maya",
      website: "https://paradiseweddings.com/mx/riviera-maya/generations-riviera-maya",
      capacity: 300,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "All-inclusive resort with a Premium Sky Deck rooftop venue (ceremony and cocktail hour up to 300, reception up to 200) offering open-air sea views. The Always & Forever package starts at $1,889 for a 10-guest base with $30/additional guest; the Memorable Moments Ultimate package charges $161 per guest over a 24-guest base — a wide enough spread to fit different budget tiers within one property.",
      availabilityNotes: "Multiple package tiers are published; confirm current guest-count breakpoints with the resort.",
      sourceUrls: [
        "https://paradiseweddings.com/mx/riviera-maya/generations-riviera-maya",
        "https://paradiseweddings.com/mx/riviera-maya/generations-riviera-maya/packages/always-forever",
        "https://paradiseweddings.com/mx/riviera-maya/generations-riviera-maya/packages/memorable-moments-ultimate",
      ],
    },
  ],
  scenario: {
    fixedCosts: 13000,
    perGuestCost: 100,
    travelCostPerGuest: 1360,
    attendanceRate: 0.66,
    notes:
      "fixedCosts uses the general Riviera Maya destination-wedding cost band ($9,416 average for 20-60 guests, up to $25,000+ for luxury 100+-guest events per blog.destinationweddings.com), positioned near the middle of that range for a ~66-attendee wedding and rounded to $13,000 for venue/planner/photo/decor/attire/misc. perGuestCost ($100) sits between El Dorado Royale's low per-additional-guest rate ($13, likely reflecting an all-inclusive base that already covers most F&B) and Grand Velas's estimated $110/guest, chosen as a representative middle figure across the three named resorts' widely varying package structures. travelCostPerGuest matches travelCostPerGuestEstimate. Sources: blog.destinationweddings.com/riviera-maya-wedding-cost-guide, paradiseweddings.com venue pages above.",
  },
};
