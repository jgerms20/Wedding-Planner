import type { DestinationSeed } from "../types";

/**
 * Portland, Oregon.
 *
 * The Pacific Northwest option: garden and warehouse-style venues sized for a
 * ~100-guest wedding, a real rain/shoulder-season trade-off in March-April,
 * and the longest flight of the three US finalists for an East-Coast-heavy
 * guest list. Numbers below are sourced where a URL is given; anything
 * derived is flagged `estimated: true` (venues) or explained in a note.
 */
export const portlandOr: DestinationSeed = {
  key: "portland-or",
  name: "Portland, OR",
  country: "United States",
  countryCode: "US",
  region: "Portland metro / Willamette Valley (with Columbia River Gorge and wine-country day trips)",
  rank: 6,
  whyHere:
    "Portland is on the list as a possibility if one of Joshua or Janel has personal ties there — living there now, having lived there before, or having close friends or family in the area — which could make it the most personally meaningful of the three US finalists even though it's the farthest from most East Coast guests.",
  notes:
    "Attendance is estimated at 0.80, the bottom of the 80-85% 'local wedding' attendance band, reflecting that Portland is domestic (no passport needed) but is the longest flight and biggest time-zone shift of the three US finalists for a guest list concentrated on the East Coast (pix.wedding; destify.com).",
  travelCostPerGuestEstimate: 970,
  lodgingPerNightEstimate: 170,
  attendanceRateEstimate: 0.8,
  weatherNotes:
    "Portland's wet season runs roughly October-February, and spring is the transition out of it rather than fully clear of it: normal monthly rainfall is about 3.68in in March, 3.11in in April, and down to 1.77in — the lowest of the spring months — by May (weather-and-climate.com). Practically, that means a March or April outdoor ceremony should plan a tented or indoor backup, while a May date meaningfully improves the odds of dry weather. Temperatures are mild throughout, generally in the 50s-60s°F.",
  legalNotes:
    "Marriage licenses are issued by county clerks — Multnomah County's office is at 501 SE Hawthorne Blvd in Portland. Both parties must appear in person with valid photo ID and Social Security numbers; the fee is $60 (or $65 to also waive the waiting period). Oregon imposes a 3-day waiting period between purchase and use of the license, which the county will waive for an extra $5 if the ceremony will happen within those 3 days. Once effective, the license is valid for 60 days for a ceremony held anywhere in Oregon. Eligible officiants include judicial officers, county clerks, and clergy or celebrants authorized by a religious or secular organization to solemnize marriages — no separate state registration of the officiant is required. Verify with the local authority or an attorney.",
  seasonNotes:
    "March and April are Portland's rainy shoulder season, which keeps hotel rates below summer peak, but the Portland Rose Festival (late May into June) starts pulling rates and vendor demand back up as the calendar moves toward Memorial Day — a wedding aiming for the tail end of the March-May window should watch for overlap with it. Overall, March-April offers the best rate leverage of the spring months; May trades a modest rate increase for a real jump in dry-weather odds.",
  travelNotes:
    "Portland International (PDX) has nonstop service to 60+ domestic destinations plus international routes, with Alaska Airlines operating the most flights (connecting to roughly 67 airports) alongside United, American and Delta; several East Coast hubs (New York among them) have nonstop or near-nonstop options, but flight time from the East Coast still runs 5-6 hours, longer than either DC or Columbia (pdxmonthly.com; flypdx.com). There is no realistic drive or rail alternative for East Coast guests. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average) + 3 nights x $170/night (roughly the Portland 3-star hotel average) = $970 per guest.",
  sourceUrls: [
    "https://multco.us/services/marriage-licenses",
    "https://darthelionapps.multco.us/OnlineMarriage",
    "https://www.aclu-or.org/obtaining-marriage-license-oregon-county/",
    "https://theamm.org/weddings-by-state/oregon/officiant-registration-requirements",
    "https://weather-and-climate.com/average-monthly-precipitation-Rainfall,portland,United-States-of-America",
    "https://portlandweather.com/weather-headlines/224",
    "https://www.pdxmonthly.com/travel-and-outdoors/nonstop-direct-flights-from-pdx-portland-airport",
    "https://www.flypdx.com/NonstopDestinations",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/portland-5746545",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "portland-opal-28",
      name: "Opal 28",
      website: "https://www.opal28.com/",
      capacity: 100,
      rentalFee: 4275,
      perGuestCost: 16,
      inHouseCatering: true,
      estimated: true,
      styleNotes:
        "A restored 1908 building in the Kerns neighborhood with industrial-chic charm, a built-in bar and a private patio. All-day Saturday rental (7am-11pm) is $4,275; off-peak (Sun-Fri) runs $475/hour with a 6-hour minimum. In-house cocktail-style catering starts at $16/guest for hors d'oeuvres — a floor, not a full seated-dinner price, so perGuestCost is marked estimated. Capacity is up to 100 for a standing ceremony and cocktail reception, or 50-70 seated.",
      availabilityNotes: "Contact via opal28events.com for a date-specific quote and full-dinner catering pricing.",
      sourceUrls: [
        "https://www.opal28.com/",
        "https://www.herecomestheguide.com/wedding-venues/oregon/opal-28",
      ],
    },
    {
      key: "portland-leach-botanical-garden",
      name: "Leach Botanical Garden",
      website: "https://www.leachgarden.org/rent/private-event-rentals",
      capacity: 100,
      rentalFee: 5200,
      inHouseCatering: false,
      estimated: true,
      styleNotes:
        "A wooded garden along Johnson Creek in SE Portland, about 20 minutes from downtown, centered on a historic Manor House — a classic PNW garden-wedding setting, and its published cap of 100 guests lines up exactly with the couple's guest count. Full wedding pricing (ceremony from $1,000 plus reception $2,000-2,500 plus rental) runs $3,800-$8,600 overall; rentalFee above is the midpoint, marked estimated.",
      availabilityNotes: "See leachgarden.org/rent/rental-faqs for the current rate sheet and outside-caterer policy.",
      sourceUrls: [
        "https://www.leachgarden.org/rent/private-event-rentals",
        "https://www.leachgarden.org/rent/rental-faqs",
      ],
    },
    {
      key: "portland-castaway",
      name: "Castaway Portland",
      website: "https://www.castawayportland.com/",
      capacity: 400,
      rentalFee: 5225,
      estimated: true,
      styleNotes:
        "A restored 1929 warehouse in NW Portland's Historic Warehouse District near the Pearl District — 10,000 sq ft with exposed steel-sash windows and 14-foot ceilings, flexible from intimate gatherings up to 400 guests. Published wedding cost runs $2,950 (Thursday) to $7,500 (peak Saturday); rentalFee above is the midpoint, marked estimated pending an exact date and package.",
      availabilityNotes: "Contact 503-224-4898 or info@castandcopdx.com.",
      sourceUrls: [
        "https://www.castawayportland.com/",
        "https://www.originalweddings.com/blog/venues/castaway-portland-wedding/",
      ],
    },
  ],
  scenario: {
    fixedCosts: 21750,
    perGuestCost: 90,
    travelCostPerGuest: 970,
    attendanceRate: 0.8,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes Castaway Portland's $5,225 midpoint venue rental and adds a national non-venue, non-catering baseline of ~$16,550 built from The Knot's 2026 Real Weddings Study line items (see the Washington DC file's scenario note for the same build), rounded to $21,750. perGuestCost ($90) starts from The Knot's national $80/guest food-and-drink catering average — since no Portland-specific full seated-dinner per-guest figure is published (Opal 28's own $16/guest is a cocktail-hors-d'oeuvres floor, not a full-dinner price) — plus roughly $10/guest for cake, favors and incidental rentals per national averages. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
