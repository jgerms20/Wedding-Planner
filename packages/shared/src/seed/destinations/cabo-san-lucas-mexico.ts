import type { DestinationSeed } from "../types";

/**
 * Cabo San Lucas, Mexico (Baja California Sur).
 *
 * The desert-meets-ocean alternative on Mexico's Pacific side: dramatic
 * cliffs and the Land's End arch rather than jungle and cenotes, with a
 * wedding industry built around large resort ballrooms. Numbers below are
 * sourced where a URL is given; anything derived is flagged `estimated: true`
 * with the derivation spelled out in a note.
 */
export const caboSanLucasMexico: DestinationSeed = {
  key: "cabo-san-lucas-mexico",
  name: "Cabo San Lucas",
  country: "Mexico",
  countryCode: "MX",
  region: "Cabo San Lucas & San José del Cabo, Baja California Sur",
  rank: 32,
  whyHere:
    "For a couple weighing a dramatic-landscape wedding against Brazil's coastline, Cabo trades jungle for desert cliffs and the Arch at Land's End — reliably dry spring weather, nonstop flights from the East Coast, and resort ballrooms built to run a 100-guest wedding without the multi-flight-leg logistics of Brazil.",
  notes:
    "Attendance is estimated at 0.62 — near the middle of the 60-70% typical destination-wedding range reported by Destify's guest-attendance analysis, but below Tulum/Riviera Maya's 0.65 because Cabo has fewer nonstop East Coast routes (concentrated on NYC and Atlanta rather than spread across many hubs) and resort lodging runs noticeably pricier than the Caribbean coast of Mexico (destify.com; thecabosun.com).",
  travelCostPerGuestEstimate: 1470,
  flightCostEstimate: 606,
  lodgingPerNightEstimate: 290,
  attendanceRateEstimate: 0.62,
  weatherNotes:
    "March, April and May are all reliably dry and sunny in Cabo: March averages a high of ~80°F with only ~7mm of rain across the month; April is drier still, with highs near 82°F and essentially no rainfall; May is typically the driest month of the year (windier, with highs building toward 84-86°F) and is recommended mainly for beach activities, since the Pacific side stays cool for swimming and evenings can call for a light jacket. This is Cabo's tropical-desert dry season, running December through roughly May (holiday-weather.com; climatestotravel.com; caboplatinum.com).",
  legalNotes:
    "As in the rest of Mexico, only a civil ceremony performed by a Baja California Sur Civil Registry judge is legally binding; a beach ceremony with an outside officiant is symbolic unless paired with the civil filing (available at the judge's chambers weekdays 9am-1pm, or on-site elsewhere for an added fee). Required documents: valid passports and tourist permits, an apostilled birth certificate, and a divorce decree or death certificate for anyone previously married. Baja California Sur still requires a medical certificate (a blood test) for each partner, which must be drawn at a health center within the state and is valid for no more than 15 days — couples typically plan to arrive at least two to four business days ahead of the ceremony to complete this locally, since it cannot be done in advance in the US. Four witnesses 18 or older with valid ID must also be present. Verify with the local authority or an attorney.",
  seasonNotes:
    "December through April is Cabo's peak season across the board — for weather, whale watching (December-April, peaking January-March) and pricing — so a spring wedding sits at the top of both demand and hotel rates; February is cited as the single most expensive month for lodging (average nightly rate over $1,100). Cabo's major sportfishing tournaments (Bisbee's, the Los Cabos Billfish Tournament) run July through November and don't affect a spring date. US spring break (March) adds crowds and airfare pressure similar to Mexico's Caribbean coast. Net recommendation: a late-April or May date trades slightly less consistent weather variety for meaningfully lower resort and flight pricing than a March date (thecabosun.com; caborentalsbyjane.com).",
  travelNotes:
    "Los Cabos International Airport (SJD) serves both Cabo San Lucas and San José del Cabo and has nonstop service from New York (JetBlue and United, several flights weekly, plus seasonal Frontier service to JFK) and Atlanta (Delta year-round, Frontier seasonally); resorts are generally a 20-45 minute transfer from the airport. No US visa is required. Travel-cost math: round-trip NYC-SJD fares run roughly $469-$789 across aggregators in 2026, averaging about $606 over a trailing 12 months (kayak.com) — used here as the airfare figure — plus 3 nights lodging at $290/night (the average of Cabo's cited 4-star ~$126/night and 5-star ~$449/night rates, since the named wedding resorts sit at the upper end of that range) = $1,470 per guest ($606 + $870, rounded).",
  sourceUrls: [
    "https://blog.destinationweddings.com/getting-married-in-cabo",
    "https://cabo.la/cabo/cabo-wedding-legal-requirements",
    "https://anabadillophoto.com/blog/requirements-to-get-married-in-cabo-san-lucas",
    "https://www.holiday-weather.com/cabo_san_lucas/averages/march/",
    "https://www.climatestotravel.com/climate/mexico/cabo-san-lucas",
    "https://caboplatinum.com/cabo-weather/",
    "https://thecabosun.com/this-is-the-average-daily-rate-of-a-hotel-in-los-cabos-for-2026/",
    "https://thecabosun.com/this-is-what-an-all-inclusive-los-cabos-resort-will-cost-you-in-2026/",
    "https://thecabosun.com/you-can-fly-nonstop-to-los-cabos-from-these-destinations-check-your-city-in-seconds/",
    "https://www.kayak.com/flight-routes/New-York-NYC/San-Jose-del-Cabo-Los-Cabos-SJD",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://blog.destinationweddings.com/wedding-cost-in-cabo-san-lucas",
    "https://paradiseweddings.com/mx/cabo",
  ],
  venues: [
    {
      key: "cabo-san-lucas-mexico-the-cape",
      name: "The Cape, a Thompson Hotel",
      website: "https://www.tripadvisor.com/HotelsList-Cabo_San_Lucas-Wedding-Resorts-zfp2977811.html",
      capacity: 180,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "Modern architectural hotel perched on the rocks above the Pacific near Land's End; a favorite for upscale, design-forward Cabo weddings. Capacity marked estimated pending a direct venue-level breakdown; no rental fee or per-guest catering price was published in available sources — contact the hotel directly for a quote.",
      availabilityNotes: "No published pricing; request a proposal from the hotel's events team.",
      sourceUrls: ["https://www.tripadvisor.com/HotelsList-Cabo_San_Lucas-Wedding-Resorts-zfp2977811.html"],
    },
    {
      key: "cabo-san-lucas-mexico-sunset-da-monalisa",
      name: "Sunset Da Monalisa",
      website: "https://sunsetmonalisa.com/events/",
      capacity: 300,
      estimated: true,
      styleNotes:
        "Cliffside restaurant-and-event venue cut into the rock above the Bay of Cabo San Lucas with a direct view of the Arch; terraces step down the cliff so every table keeps the sunset line. A well-known ceremony/reception backdrop distinct from a resort ballroom. No published rental fee or per-guest catering price was found; capacity of 300 is the venue's own cited maximum but marked estimated pending confirmation of the wedding-specific (vs. general event) cap.",
      availabilityNotes: "Contact the venue directly for pricing and wedding-specific capacity by space.",
      sourceUrls: ["https://sunsetmonalisa.com/events/"],
    },
    {
      key: "cabo-san-lucas-mexico-grand-fiesta-americana",
      name: "Grand Fiesta Americana Los Cabos All Inclusive",
      website: "https://www.myoverseaswedding.com/wedding-destinations/mexico/grand-fiesta-americana-los-cabos",
      capacity: 600,
      rentalFee: 10600,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "All-inclusive beachfront resort at Cabo del Sol; multiple venues scale from an intimate ceremony space up to the Grand Master Ballroom (capacity up to 1,100 for a large event). A basic wedding package for a 30-guest base is quoted at $10,600; rentalFee above uses that published figure and is marked estimated since it is specific to the 30-guest package rather than a flat venue rental.",
      availabilityNotes: "Additional-guest pricing and larger-package quotes require contacting the resort directly.",
      sourceUrls: [
        "https://www.myoverseaswedding.com/wedding-destinations/mexico/grand-fiesta-americana-los-cabos",
        "https://holaweddings.com/wedding-venues/grand-fiesta-americana-los-cabos-weddings/",
      ],
    },
    {
      key: "cabo-san-lucas-mexico-hilton-los-cabos",
      name: "Hilton Los Cabos Beach & Golf Resort",
      website: "https://www.hiltonloscabos.com/weddings/",
      capacity: 400,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "All-inclusive beachfront resort on the Sea of Cortez side of the corridor between Cabo San Lucas and San José del Cabo; indoor/outdoor venues scale up to a published 400-guest capacity. No specific wedding-package price was found in available sources.",
      availabilityNotes: "Contact the resort's wedding team for a guest-count-specific quote.",
      sourceUrls: ["https://www.hiltonloscabos.com/weddings/"],
    },
  ],
  scenario: {
    fixedCosts: 16000,
    perGuestCost: 145,
    travelCostPerGuest: 1470,
    attendanceRate: 0.62,
    notes:
      "fixedCosts is derived from the Grand Fiesta Americana's published $10,600 base package for 30 guests, backing out an estimated ~30 x $145/guest catering component (~$4,350) to leave roughly $6,250 in venue/planner-type cost, then scaling up toward the broader luxury Cabo benchmark of $30,000-$150,000 for full-scale events (blog.destinationweddings.com) for a ~62-attendee wedding, rounded to $16,000. perGuestCost ($145) reflects the all-inclusive-resort market's typical per-additional-guest surcharge band seen across Cabo venues (roughly $85-$270 at comparable Mexican beach resorts; see Tulum file), taken near the middle since Cabo's resort tier skews slightly upscale of Tulum's. travelCostPerGuest matches travelCostPerGuestEstimate. Sources: myoverseaswedding.com Grand Fiesta Americana Los Cabos, blog.destinationweddings.com/wedding-cost-in-cabo-san-lucas.",
  },
};
