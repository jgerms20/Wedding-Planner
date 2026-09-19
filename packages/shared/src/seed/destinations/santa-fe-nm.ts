import type { DestinationSeed } from "../types";

/**
 * Santa Fe, NM.
 *
 * The couple's "one more, distinct" pick: high-desert adobe architecture,
 * Southwestern art and food, and mountain light — a genuinely different look
 * from the beach (Brazil, Jamaica, Bahamas), Mid-Atlantic city (DC), and
 * Southeast/Pacific Northwest options already on the list. It also has the
 * simplest marriage-license paperwork of any US finalist. Numbers are
 * sourced where a URL is given; anything derived is flagged `estimated: true`
 * (venues) or explained in a note, per the seed-data research standard.
 */
export const santaFeNm: DestinationSeed = {
  key: "santa-fe-nm",
  name: "Santa Fe, NM",
  country: "United States",
  countryCode: "US",
  region: "Santa Fe & the high desert foothills of the Sangre de Cristo Mountains",
  rank: 9,
  whyHere:
    "A real change of scenery from every other finalist on the list — adobe architecture, high-desert light, and a genuinely different food and art scene — without a passport, and with the easiest marriage-license process of any US option (no waiting period, $25 flat fee). Worth a look if Joshua & Janel want a domestic wedding that doesn't read as a beach trip or an East Coast city.",
  notes:
    "Attendance is estimated at 0.80, the same figure used for Portland — domestic and no passport, but the smallest, least-connected airport of the US finalists, since almost every guest will actually fly into Albuquerque and drive about an hour rather than land in Santa Fe itself (pix.wedding; destify.com).",
  travelCostPerGuestEstimate: 1200,
  lodgingPerNightEstimate: 260,
  attendanceRateEstimate: 0.8,
  weatherNotes:
    "Santa Fe sits at about 7,000 feet, which keeps spring notably cooler and drier than the other US finalists: April highs average around 64°F with lows near 34°F, and May highs reach about 73°F with lows around 43°F, both with minimal rainfall (weatherspark.com; twocasitas.com). It's real high-desert shoulder-season weather — sunny and dry most days, but with cold mornings, occasional gusty spring winds, and a chance of a late-season snow flurry, so an outdoor ceremony should plan layers and a wind contingency rather than a rain one.",
  legalNotes:
    "Both parties apply together, in person, at the Santa Fe County Clerk's office (102 Grant Avenue, Santa Fe). Bring a valid government-issued photo ID or passport (16-17 year olds need a certified birth certificate plus notarized parental consent; under 16 needs a district court order) and a Social Security number for each party. The fee is $25, cash only. There is no blood test and no waiting period — the license can be issued and the ceremony held the same day — and the license itself never expires, though it must be returned to the County Clerk's office, in person or by mail, within 90 days of the ceremony to be recorded. Verify with the local authority or an attorney.",
  seasonNotes:
    "Santa Fe's peak tourist and event season runs late spring through fall — June-August for warm-weather travel, then Indian Market (mid-August, drawing an estimated 150,000 visitors) and Fiestas de Santa Fe (early September) as the two busiest weekends of the year. Spring, by contrast, is described by local guides as a genuine shoulder season: thinner crowds, better rates, and easier venue availability, with the trade-off being cold mornings and gusty dust-laden winds in March and early April (championtraveler.com; santafe.com; taketravelinfo.com).",
  travelNotes:
    "Santa Fe Regional Airport (SAF) has only limited regional jet service (American and United, mostly to Dallas, Phoenix, and Denver), so most guests will do better flying into Albuquerque International Sunport (ABQ) — about 60 miles / an hour's drive away — which has nonstop service to 30+ destinations on 8 carriers, including East Coast nonstops to Charlotte, Philadelphia, and Washington-Dulles, plus a long-haul JetBlue nonstop to New York-JFK (abqsunport.com). No passport needed; a rental car or shuttle for the Albuquerque-to-Santa Fe leg should be budgeted for guests who fly in. Travel-cost math: $421 round-trip airfare (KAYAK's 12-month average fare to Albuquerque) + 3 nights x $260/night (blended between BudgetYourTrip's Santa Fe two-star average of $106 and its overall city average of $363, reflecting a boutique-hotel-heavy local market) = $1,200 per guest.",
  sourceUrls: [
    "https://www.santafecountynm.gov/clerk/divisions/marriagelicenses",
    "https://www.santafecountynm.gov/probate/wedding-information",
    "https://www.docdraft.ai/legal-guides/getting-married/new-mexico",
    "https://weatherspark.com/s/3506/0/Average-Spring-Weather-in-Santa-Fe-New-Mexico-United-States",
    "https://twocasitas.com/spring-in-santa-fe/",
    "https://championtraveler.com/dates/best-time-to-visit-downtown-santa-fe-nm-us/",
    "https://santafe.com/santa-fe-indian-market/",
    "https://taketravelinfo.com/best-time-to-travel-to-santa-fe-new-mexico/",
    "https://www.abqsunport.com/wherewefly/",
    "https://www.abqsunport.com/2025/07/14/more-routes-for-balloon-fiesta-american-airlines-adds-nonstop-flights-from-charlotte-and-philadelphia/",
    "https://www.kayak.com/flight-routes/United-States-US0/Albuquerque-ABQ",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/santa-fe-5490263",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "sf-bishops-lodge",
      name: "Bishop's Lodge, Auberge Collection",
      website: "https://auberge.com/bishops-lodge/",
      capacity: 200,
      rentalFee: 20000,
      fbMinimum: 35000,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A 317-acre ranch resort three miles from the Plaza, fully renovated and reopened as an Auberge Collection property in 2021, with a restored 1800s chapel, mountain-backed event lawns, and 98 guest rooms that can sleep 240-250 on property. Planner write-ups cite a flat $20,000 facility fee plus a $35,000 food & beverage minimum (rentals — tables, chairs, bars, china — included in the facility fee), putting an all-in budget for 100 guests around $150,000; figures are marked estimated since they come from third-party planner aggregation rather than Auberge's own published rate sheet. Comfortable capacity is 175, with a ceremony maximum of 200.",
      availabilityNotes: "Contact the property directly through auberge.com/bishops-lodge/events/weddings/ for a date-specific quote.",
      sourceUrls: [
        "https://auberge.com/bishops-lodge/events/weddings/",
        "https://www.rockymountainbride.com/vendors/bishops-lodge-auberge-collection/",
        "https://www.theknot.com/marketplace/bishops-lodge-auberge-collection-santa-fe-nm-761849",
        "https://www.weddingwire.com/biz/bishops-lodge-ranch-resort-spa-santa-fe/f8222b42f19293f4.html",
      ],
    },
    {
      key: "sf-la-fonda-on-the-plaza",
      name: "La Fonda on the Plaza",
      website: "https://lafondasantafe.com/weddings/",
      capacity: 300,
      perGuestCost: 70,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A historic hotel directly on the Plaza with 20,112 sq ft across eight event spaces, including La Terraza (a rooftop garden with city and mountain views) and the hand-painted Lumpkins Ballroom, which seats up to 300; the wider property tops out around 550-600 guests across multiple spaces. Published in-house catering runs $30-55/guest for a themed reception menu or $65-75/guest for a plated prix-fixe (appetizer, salad, entree, dessert) — perGuestCost above is the prix-fixe midpoint, marked estimated; bar service is priced separately.",
      availabilityNotes: "The venue asks that couples contact its events team directly for date-specific capacity and pricing.",
      sourceUrls: [
        "https://lafondasantafe.com/weddings/",
        "https://www.theknot.com/marketplace/la-fonda-on-the-plaza-santa-fe-nm-962089",
        "https://www.herecomestheguide.com/wedding-venues/new-mexico/la-fonda-on-the-plaza",
        "https://www.weddingwire.com/biz/la-fonda-on-the-plaza-santa-fe/940235792202b480.html",
      ],
    },
    {
      key: "sf-botanical-garden",
      name: "Santa Fe Botanical Garden",
      website: "https://visitsfbg.org/explore/rent-the-garden/",
      capacity: 350,
      rentalFee: 3025,
      inHouseCatering: false,
      estimated: true,
      styleNotes:
        "A public garden at nearly 7,200 feet at the base of the Sangre de Cristo Mountains, rented as a raw space (couples bring their own caterer and vendors) across several distinct areas — Orchard Gardens and Ojos y Manos each hold up to 150 seated or 200 standing, with the full property accommodating up to 350. Reported wedding rental pricing runs $1,050-$5,000 depending on space and duration; rentalFee above is the midpoint, marked estimated.",
      availabilityNotes: "See visitsfbg.org/explore/rent-the-garden/ for the current rate sheet and outside-caterer policy.",
      sourceUrls: [
        "https://www.eventective.com/santa-fe-nm/santa-fe-botanical-garden-591324.html",
        "https://www.herecomestheguide.com/wedding-venues/new-mexico/santa-fe-botanical-garden",
        "https://www.rockymountainbride.com/vendors/santa-fe-botanical-garden/",
      ],
    },
  ],
  scenario: {
    fixedCosts: 19600,
    perGuestCost: 70,
    travelCostPerGuest: 1200,
    attendanceRate: 0.8,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes Santa Fe Botanical Garden's $3,025 midpoint rental and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items — see the Washington DC and New Orleans files for the full item list), rounded to $19,600. perGuestCost ($70) uses La Fonda on the Plaza's own published plated-dinner midpoint, a concrete Santa Fe catering anchor since the Botanical Garden itself is a BYO-caterer raw space with no catering price of its own. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
