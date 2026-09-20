import type { DestinationSeed } from "../types";

/**
 * Baton Rouge, LA.
 *
 * Louisiana's capital on the Mississippi River — real riverfront and
 * downtown personality with a smaller, less touristy footprint than New
 * Orleans, about 80 miles upriver. Baton Rouge's wedding-venue market
 * includes a genuinely large stock of literal antebellum plantation houses
 * still marketed for weddings today, so every candidate here was checked
 * individually per the standing rule in .claude/skills/wedding-research/
 * SKILL.md rather than assumed safe. **Mount Hope Plantation House** was
 * ruled out immediately and without further research: it is explicitly
 * self-marketed as "Mount Hope Plantation," built in 1817 on a Spanish land
 * grant to "a German planter" — textbook disqualifying history and
 * marketing under this rule. The three venues below are a purpose-built
 * modern arts center, a modern casino resort, and a 1920s bank building
 * converted to event space — none residential, none marketed around
 * enslaved labor. Numbers are sourced where a URL is given; anything
 * derived is flagged `estimated: true` (venues) or explained in a note.
 */
export const batonRougeLa: DestinationSeed = {
  key: "baton-rouge-la",
  name: "Baton Rouge, LA",
  country: "United States",
  countryCode: "US",
  region: "Downtown riverfront, Mississippi River",
  rank: 23,
  whyHere:
    "Baton Rouge gives Joshua & Janel real Mississippi River and Louisiana personality — live oaks, riverfront views, genuine Southern food culture — in a smaller, calmer capital city rather than New Orleans' tourist intensity, for a couple who wants the state's character without its biggest city.",
  notes:
    "Attendance is estimated at 0.80, at the bottom of the 80-85% 'local wedding' attendance band (pix.wedding; destify.com): Baton Rouge Metropolitan Airport has a much smaller route network (about 11 nonstop destinations) than New Orleans' 54+, so most East Coast guests will need a connection through Atlanta, Dallas, Houston or Charlotte.",
  travelCostPerGuestEstimate: 926,
  flightCostEstimate: 470,
  lodgingPerNightEstimate: 152,
  attendanceRateEstimate: 0.8,
  weatherNotes:
    "Baton Rouge spring runs warm and increasingly humid, similar to New Orleans but slightly drier: March averages a 73°F high/52°F low with about 5 rainy days that month, warming through April and into a hot, humid May (accuweather.com; wanderlog.com). The whole March-May window sits ahead of Atlantic hurricane season (June-November), though afternoon showers are a real possibility throughout.",
  legalNotes:
    "Both parties apply together, in person, at the East Baton Rouge Parish Clerk of Court's marriage license office; bring valid photo ID and Social Security numbers, and the fee is $27.50. As in the rest of Louisiana, there is a 24-hour waiting period between issuance and the ceremony, waivable for good cause by a judge for Louisiana residents. Once issued, the license expires 30 days later. Verify with the local authority or an attorney.",
  seasonNotes:
    "Spring is a comfortable shoulder season in Baton Rouge, ahead of the hot, humid summer that dominates June-September. LSU's academic calendar and home football season (fall, outside this window) are the city's main demand drivers, so a spring date generally finds good venue and hotel availability without a major citywide festival to compete with.",
  travelNotes:
    "Baton Rouge Metropolitan Airport (BTR) has nonstop service to about 11 domestic destinations via American, United, and Delta, with major connections through Atlanta, Dallas-Fort Worth, Houston, Charlotte, and Washington DC — a real but modest regional airport, smaller than New Orleans' MSY (flymyairport.com). Guests outside those direct routes will connect through one of those hubs; New Orleans' larger airport (about 80 miles away) is a fallback for guests who don't mind the extra drive. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average, though a connecting itinerary here may run somewhat higher) + 3 nights x $152/night (BudgetYourTrip's Baton Rouge one-week-trip average) = $926 per guest.",
  sourceUrls: [
    "https://www.brla.gov/2119/Marriages",
    "https://www.usmarriagelaws.com/marriage-license/louisiana/east-baton-rouge-parish/clerk-of-court/parish-requirements/",
    "https://www.accuweather.com/en/us/baton-rouge/70806/march-weather/329147",
    "https://wanderlog.com/weather/58339/3/baton-rouge-weather-in-march",
    "https://flymyairport.com/from/BTR/destinations",
    "https://en.wikipedia.org/wiki/Baton_Rouge_Metropolitan_Airport",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/baton-rouge-4315588",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "btr-shaw-center-river-terrace",
      name: "The River Terrace at Shaw Center for the Arts",
      website: "https://www.shawcenter.org/river-terrace",
      capacity: 400,
      rentalFee: 5000,
      estimated: true,
      styleNotes:
        "A purpose-built contemporary arts center (opened 2005) in downtown Baton Rouge with a glass-enclosed room opening onto a rooftop-style terrace and sculpture garden overlooking the Mississippi River — no residential or plantation-era history at all, a genuinely modern building. Holds up to 400 for a cocktail-style reception or 250 for a combined ceremony-and-reception, with real indoor/outdoor flow between the glass room and the terrace. Published wedding pricing ranges $4,500-$17,500; rentalFee above uses the lower published starting figure, marked estimated.",
      availabilityNotes: "Contact Shaw Center's events team via shawcenter.org for a date-specific quote.",
      sourceUrls: [
        "https://www.shawcenter.org/river-terrace",
        "https://www.theknot.com/marketplace/the-river-terrace-at-shaw-center-for-the-arts-baton-rouge-la-586387",
        "https://www.zola.com/wedding-vendors/wedding-venues/the-river-terrace-at-shaw-center-for-the-arts",
      ],
    },
    {
      key: "btr-lauberge-casino-hotel",
      name: "L'Auberge Casino & Hotel Baton Rouge",
      website: "https://www.lbatonrouge.com/meetings/weddings",
      capacity: 1600,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A modern casino resort (opened 2012) on the Mississippi River — purpose-built commercial construction, no residential-estate history to weigh. Far larger-scale than the other Baton Rouge venues, with a maximum seated capacity of 1,600 and standing capacity of 2,500, so a ~100-guest wedding would use one of the resort's smaller event rooms rather than the full space. No flat wedding rental fee is published; general event-space pricing runs $750-$2,350 for smaller functions, marked estimated and likely not representative of a full wedding package.",
      availabilityNotes: "Contact the resort's events team via lbatonrouge.com for a date-specific quote scoped to a ~100-guest wedding.",
      sourceUrls: [
        "https://www.lbatonrouge.com/meetings/weddings",
        "https://www.cvent.com/venues/baton-rouge/hotel/l-auberge-casino-hotel/venue-9c50a451-c340-447f-bc82-b2623ad79408",
        "https://www.weddingwire.com/biz/lauberge-casino-hotel-baton-rouge/3bac42488f6af8da.html",
      ],
    },
    {
      key: "btr-the-lyceum",
      name: "The Lyceum",
      website: "https://lyceumbatonrouge.com/wedding-venue/",
      capacity: 500,
      rentalFee: 3000,
      inHouseCatering: false,
      estimated: true,
      styleNotes:
        "A former bank building (City National Bank in the 1920s) in downtown Baton Rouge, renovated into a grand ballroom with Corinthian columns and Art Deco details — purpose-built commercial architecture, not a residence, so no plantation-era history applies. Over 15,000 sq ft, holding up to 500 for a reception or 200 for a seated dinner; the building's old bank vault is a distinctive photo spot. Rental runs $1,500 (Mon-Thu) to $3,000 (Fri-Sat), including tables/chairs/linens; rentalFee above is the weekend figure, marked estimated pending a specific date.",
      availabilityNotes: "Contact the venue directly via lyceumbatonrouge.com for a date-specific quote and outside-catering policy.",
      sourceUrls: [
        "https://lyceumbatonrouge.com/wedding-venue/",
        "https://www.theknot.com/marketplace/the-lyceum-historic-meeting-and-events-center-baton-rouge-la-477239",
        "https://www.eventective.com/baton-rouge-la/the-lyceum-historic-meeting-events-center-716460.html",
      ],
    },
  ],
  scenario: {
    fixedCosts: 21550,
    perGuestCost: 90,
    travelCostPerGuest: 926,
    attendanceRate: 0.8,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes The Lyceum's $3,000 weekend venue rental (a mid-market, guest-count-appropriate pick) and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items — see the Washington DC file's scenario note for the full item list), rounded to $21,550. perGuestCost ($90) follows the same approach as Portland: The Knot's national $80/guest catering average plus roughly $10/guest for cake, favors and incidental rentals, since none of the three Baton Rouge venues publishes a single all-in per-guest catering figure. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
