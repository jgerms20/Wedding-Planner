import type { DestinationSeed } from "../types";

/**
 * Tulum, Mexico (Quintana Roo).
 *
 * A short, cheap, mostly-nonstop hop for East Coast guests with a mature
 * boutique/all-inclusive wedding industry — the barefoot-luxury answer to
 * Brazil's longer, pricier trip. Numbers below are sourced where a URL is
 * given; anything derived is flagged `estimated: true` with the derivation
 * spelled out in a note, per the seed-data research standard.
 */
export const tulumMexico: DestinationSeed = {
  key: "tulum-mexico",
  name: "Tulum",
  country: "Mexico",
  countryCode: "MX",
  region: "Tulum, Quintana Roo",
  rank: 31,
  whyHere:
    "A ~4-hour nonstop flight for almost every East Coast guest, real jungle-meets-Caribbean scenery, and a wedding industry that runs a beach ceremony every night of high season — Tulum gives Joshua & Janel a lower-friction, lower-cost alternative to Brazil without giving up the barefoot-luxury feel they liked about it.",
  notes:
    "Attendance is estimated at 0.65, the middle of the 60-70% typical destination-wedding range reported by Destify's guest-attendance analysis — nonstop flights and no visa requirement pull it up from Brazil's 0.60, but March-May overlaps hard with US spring break and Semana Santa, which raises both cost and hassle enough to keep it below the top of the band (destify.com; mexicodave.com).",
  travelCostPerGuestEstimate: 1380,
  lodgingPerNightEstimate: 300,
  attendanceRateEstimate: 0.65,
  weatherNotes:
    "March is one of Tulum's least rainy months, sunny and warm (highs ~82°F/28°C, evenings ~72°F/22°C, moderate humidity). April and May stay warm-to-hot (May highs ~89°F/32°C) with rain increasing through the spring and the first thunderstorms typically arriving in May as the wet season approaches — the window from mid-March to late May is generally reported as the best combination of dry weather and manageable heat (accuweather.com; wanderlog.com; weatherspark.com).",
  legalNotes:
    "Only a civil ceremony performed by a Quintana Roo Civil Registry judge is legally binding in Mexico; a beach ceremony with an officiant is symbolic unless paired with that civil filing. Required documents: valid passports, an apostilled birth certificate with a certified Spanish translation, and — for anyone previously divorced — the final divorce decree (Quintana Roo civil law generally does not let a person remarry until roughly a year after their divorce is finalized) or a death certificate if widowed. Four witnesses 18 or older with valid ID must be present. As of a June 2026 rule change, Quintana Roo no longer requires the mandatory blood test/medical certificate that used to apply to civil marriages in the state, though couples should confirm this is still current before relying on it; there's no residency requirement, but most registries impose a short administrative wait (commonly two to three business days) between filing the application and the ceremony, so budget a few extra days in Tulum before the wedding date. Verify with the local authority or an attorney.",
  seasonNotes:
    "December-March is Tulum's peak wedding season, and March specifically is both the height of the dry season and the heart of US spring break (concentrated weeks around March 8-15, 15-22 and 22-29), which drives up flight and resort prices and crowds the beach road and cenotes; the Spring Equinox (March 20) adds a separate wave of visitors to nearby Maya archaeological sites. Semana Santa (Holy Week) falls March 29-April 5 in the comparable 2026 calendar and, by extension, sits in the same late-March/early-April window in most years — Mexican school holidays fill every beach club and cenote that week. Easter Sunday 2028 specifically falls April 16 (publicholidays.com, matching the date cited in the Brazil file). Net recommendation: target late April into May, after Semana Santa-equivalent crowds clear and before peak summer heat, or book 9-12 months ahead if set on a March date (mexicodave.com; casatira.com; tulumtravel.blog).",
  travelNotes:
    "Tulum has no commercial airport of its own; guests fly into Cancún International (CUN), then take a private shuttle or rental car roughly 1.5 hours (~80 miles) south down the coast. CUN has frequent nonstop service from most East Coast hubs — Delta flies nonstop from JFK (~3.5 hours) and Atlanta (~2 hours 40 minutes, 26 flights/week as of an August 2026 count), with additional nonstop service from Southwest, American and Frontier — making this the easiest air logistics of the couple's international options after Jamaica. No US visa is required; a passport valid at entry/exit is sufficient for tourist stays. Travel-cost math: round-trip NYC-Cancún fares cluster in the $371-$602 range across aggregators as of 2026 (momondo.com, skyscanner.com, expedia.com), midpoint ~$480 + 3 nights lodging at $300/night (the average of Tulum's cited 4-star ~$201/night and 5-star ~$396/night rates, since the named wedding resorts sit in that upscale/all-inclusive tier) = $1,380 per guest.",
  sourceUrls: [
    "https://mx.usembassy.gov/marriage/",
    "https://translayte.com/blog/mexico-marriage-requirements",
    "https://boutiqueweddingsmexico.com/guia/requisitos-boda-civil-por-estado",
    "https://www.accuweather.com/en/mx/tulum/235062/march-weather/235062",
    "https://wanderlog.com/weather/81909/3/tulum-weather-in-march",
    "https://weatherspark.com/y/13835/Average-Weather-in-Tulum-Mexico-Year-Round",
    "https://mexicodave.com/tulum-in-march",
    "https://casatira.com/best-time-to-visit-tulum-month-by-month-weather-crowd-guide-for-2026",
    "https://tulumtravel.blog/tulum-in-march/",
    "https://www.calendarlabs.com/holidays/brazil/carnival.php",
    "https://publicholidays.com/easter/",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.flightconnections.com/flights-from-atl-to-cun",
    "https://www.momondo.com/flights/new-york-city/cancun",
    "https://www.skyscanner.com/routes/nyca/cun/new-york-to-cancun.html",
    "https://paradiseweddings.com/blog/best-wedding-locations-tulum/",
  ],
  venues: [
    {
      key: "tulum-mexico-nu-tulum",
      name: "NÜ Tulum",
      website: "https://www.nutulum.com/events",
      capacity: 150,
      perGuestCost: 85,
      styleNotes:
        "Beach-club-style event venue with flexible spaces: tables/chairs for up to 60 for a seated dinner and a reception-dinner area scaling to 150; positioned near four boutique hotels (Radhoo, La Valise, Encantada, NEST) that together sleep up to 116 guests, so overnight lodging is a short walk rather than on-site.",
      availabilityNotes:
        "Pricing starts from £10,000 (venue) with catering from £85/person, per Wedinspire's venue listing; converted to USD per-guest catering above at roughly 1:1 for a round figure — confirm exact GBP/USD conversion and current minimums with the venue.",
      sourceUrls: [
        "https://www.wedinspire.com/wedding-venues/tulum/itzik-tulum/",
        "https://www.nutulum.com/events",
      ],
    },
    {
      key: "tulum-mexico-dreams-tulum",
      name: "Dreams Tulum Resort & Spa",
      website:
        "https://www.hyattinclusivecollection.com/en/resorts-hotels/dreams/mexico/tulum-resort-spa/events/weddings-honeymoons/wedding-packages/",
      capacity: 130,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "All-inclusive beachfront resort (Hyatt Inclusive Collection); ceremony space for up to 130, cocktail hour up to 120, reception up to 80. The Beyond Memorable package runs from $10,399 for a 79-guest base with $153 per additional guest; a smaller Eternal Love package runs $4,349-$5,099 for a 20-guest base with $104/additional guest.",
      availabilityNotes:
        "Guests' meals are covered by their own all-inclusive stay, so package fees are mostly venue/decor/planner cost rather than per-guest catering.",
      sourceUrls: [
        "https://paradiseweddings.com/mx/tulum/dreams-tulum-resort-and-spa",
        "https://paradiseweddings.com/mx/tulum/dreams-tulum-resort-and-spa/packages/beyond-memorable",
      ],
    },
    {
      key: "tulum-mexico-hilton-tulum",
      name: "Hilton Tulum Riviera Maya All-Inclusive Resort",
      website: "https://www.hilton.com/en/hotels/cunhihh-hilton-tulum-riviera-maya-all-inclusive-resort/events/weddings/",
      capacity: 300,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "All-inclusive resort with two ceremony venues (a modern space and a classic beachfront setup); comfortably runs weddings from 20 up to 300+ guests. Four packages (Signature, Devotion, Cherish, Cherish Captured) run roughly $7,000-$31,500 for a 28-guest base, with additional guests $85-$270/person depending on package.",
      availabilityNotes:
        "capacity marked estimated because the resort's own materials describe a range (\"20-50 up to 100-300+\") rather than a single published ceremony-space maximum; confirm the exact figure for the specific venue space with the resort.",
      sourceUrls: [
        "https://www.hilton.com/en/hotels/cunhihh-hilton-tulum-riviera-maya-all-inclusive-resort/events/weddings/",
        "https://paradiseweddings.com/blog/hilton-tulum-weddings-review/",
      ],
    },
    {
      key: "tulum-mexico-conrad-tulum",
      name: "Conrad Tulum Riviera Maya",
      website: "https://roamrecs.com/mexico-wedding-venues.html",
      capacity: 80,
      perGuestCost: 30,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "Hilton-family all-inclusive resort; the Oceanview Palapa ceremony/reception space holds up to 80 guests, with additional guests running $30-$580 per person depending on the wedding package tier chosen. perGuestCost above uses the low end of that published range and is marked estimated since the true per-guest cost depends heavily on package selection.",
      availabilityNotes: "Contact the resort's wedding team for a guest-count-specific quote across package tiers.",
      sourceUrls: ["https://roamrecs.com/mexico-wedding-venues.html"],
    },
  ],
  scenario: {
    fixedCosts: 12000,
    perGuestCost: 90,
    travelCostPerGuest: 1380,
    attendanceRate: 0.65,
    notes:
      "fixedCosts is derived from Tulum's general destination-wedding cost band — $10,000-$25,000 for a smaller/mid-size wedding (paradiseweddings.com) — taking a conservative point near the low end since most named venues are all-inclusive resorts where per-guest catering is billed separately, then rounding to $12,000 for venue/planner/photo/decor/attire/misc. perGuestCost ($90) sits between Hilton Tulum's per-additional-guest range ($85-$270) and Dreams Tulum's Beyond Memorable per-guest rate ($153), weighted toward the lower end since most Tulum all-inclusive weddings bill added guests well under $150/person. travelCostPerGuest matches travelCostPerGuestEstimate. Sources: paradiseweddings.com/blog/best-wedding-locations-tulum, paradiseweddings.com/blog/hilton-tulum-weddings-review, paradiseweddings.com Dreams Tulum package pages.",
  },
};
