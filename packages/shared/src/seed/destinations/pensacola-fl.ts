import type { DestinationSeed } from "../types";

/**
 * Pensacola, FL.
 *
 * A Gulf Coast domestic finalist: a real beach-town-plus-historic-downtown
 * personality, no passport, and a straightforward regional airport. Pensacola
 * and the wider Gulf Coast carry real antebellum and plantation history in
 * the surrounding region, so every candidate venue below was checked
 * individually against the standing rule in
 * .claude/skills/wedding-research/SKILL.md before it went in — see each
 * venue's styleNotes. All four venues below turned out to be purpose-built
 * commercial buildings (a shoe-repair-shop-then-ship-chandlery-then-bar
 * building, a 1946 warehouse, a hotel, and a country club founded in 1902,
 * decades after emancipation) rather than converted antebellum residences, so
 * none carry the disqualifying history the rule targets; no venue needed to
 * be excluded outright, but the check was done for each regardless. Numbers
 * below are sourced where a URL is given; anything derived is flagged
 * `estimated: true` (venues) or explained in a note.
 */
export const pensacolaFl: DestinationSeed = {
  key: "pensacola-fl",
  name: "Pensacola, FL",
  country: "United States",
  countryCode: "US",
  region: "Downtown Pensacola, Palafox Street Historic District, Pensacola Beach",
  rank: 16,
  whyHere:
    "Joshua & Janel wanted a Gulf Coast option with real beach-town character and a walkable historic downtown, still fully domestic and reachable in a single flight for most of their ~100-person East Coast guest list, at a noticeably lower price point than New Orleans or Charleston.",
  notes:
    "Attendance is estimated at 0.81, in the middle of the 80-85% 'local wedding' attendance band (pix.wedding; destify.com) — domestic and no passport, but Pensacola International's 27 nonstop destinations is the thinnest route network of the Gulf Coast/Southeast finalists, with only two Northeast nonstops (LaGuardia via Delta, Washington-DCA via American), so more of the East Coast list would need a one-stop connection than at New Orleans or Charleston.",
  travelCostPerGuestEstimate: 890,
  lodgingPerNightEstimate: 140,
  attendanceRateEstimate: 0.81,
  weatherNotes:
    "Pensacola spring is mild and increasingly warm: March averages a 69°F high / 56°F low, April climbs to around 77°F, and by May highs often reach the mid-80s (accuweather.com; beachbumbb.com). The whole March-May window falls before the Atlantic hurricane season, which officially runs June 1-November 30 (8nfinityphotography.com), so a spring date sidesteps the storm-season cancellation and insurance concerns that hang over a Gulf Coast wedding later in the year.",
  legalNotes:
    "Both parties apply together, in person, at the Escambia County Clerk of Courts marriage license office. Bring a valid driver's license, state ID, or passport and a Social Security number for each party; anyone previously married should bring the final divorce decree or a deceased spouse's death certificate. The standard fee is $86, reduced to $61 if both parties completed a Florida-registered premarital preparation course within the year before applying (plus $3.50 for an oath if an Affirmation of Common Children form is needed). Florida imposes a 3-business-day waiting period between issuance and the ceremony for Florida residents — waived entirely for out-of-state residents, and also waived for FL residents who complete the premarital course. Verify with the local authority or an attorney.",
  seasonNotes:
    "The one recurring spring event that could affect hotel inventory and prices in the target window is the Pensacola (Beach) Crawfish Festival, held in mid-to-late April (2026 dates are reported as either April 17-19 at the beach or April 24-26 downtown at Seville Square, depending on the source, so the actual spring-2028 dates are worth checking against any date hold) — it draws large weekend crowds downtown and at the beach for live music and food (mustdopensacola.com; pensacolabeach.com). Outside that weekend, March through most of May is a comparatively quiet, pre-summer stretch with mild weather and lower demand than the Gulf Coast's June-August peak.",
  travelNotes:
    "Pensacola International Airport (PNS) offers nonstop service to 27 destinations across seven airlines, led by Atlanta, Dallas, and Charlotte; Delta flies nonstop to New York-LaGuardia and American to Washington-DCA, but most other Northeast and Mid-Atlantic guests would connect through Atlanta, Charlotte, or Dallas rather than fly nonstop (flightsfrom.com; flypensacola.com). There's no practical drive or rail alternative for most East Coast guests (a drive from the Northeast runs well over 14 hours), so this is a fly-in wedding for nearly everyone, typically with one connection for guests outside PNS's small nonstop network. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average domestic round-trip fare, the same national figure used across the other US finalists) + 3 nights x $140/night (blended between BudgetYourTrip's $135 all-Pensacola average and its $148 mid-range-hotel average, since a wedding block skews toward mid-range inventory over the budget end) = $890 per guest.",
  sourceUrls: [
    "https://www.escambiaclerk.com/212/Marriage-Licenses",
    "https://www.usmarriagelaws.com/marriage-license/florida/escambia-county/clerk-recorder/office-requirements",
    "https://www.accuweather.com/en/us/pensacola/32501/march-weather/328165",
    "https://www.beachbumbb.com/your-guide-to-weather-in-pensacola-fl/",
    "https://www.8nfinityphotography.com/blog/real-cost-pensacola-wedding-2026/",
    "https://www.mustdopensacola.com/news/pensacola-crawfish-festival-2026",
    "https://pensacolabeach.com/pensacola-beach-crawfish-festival/",
    "https://www.flightsfrom.com/PNS",
    "https://flypensacola.com/pensacola-international-airport-announces-three-new-nonstop-destinations/",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/pensacola-4168228",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "pns-5eleven-palafox",
      name: "5eleven Palafox",
      website: "https://5elevenpalafox.com/",
      capacity: 140,
      rentalFee: 9500,
      estimated: true,
      styleNotes:
        "A restored 1896 brick commercial building in downtown Pensacola's Palafox Street historic district. Its documented history is entirely commercial, not residential: in the early 1900s it housed Samuel Charles's shoe-repair shop (Pensacola's largest at the time, run by one of the city's most prominent Black businessmen), then a ship chandlery in the 1920s, then Trader Jon's, a Navy-favorite bar, from the early 1950s until 5eleven took over as an event venue in 2007 — no residential or plantation-era history to weigh. A raw, all-in-one event space with an indoor/outdoor combo and an on-site bridal suite. Published pricing runs by day of week: $6,500 for a Monday-Thursday 8-hour block, $10,500 Friday-Sunday, and $12,500 for a full Saturday; rentalFee above is the midpoint of that range, marked estimated.",
      availabilityNotes: "Contact the venue directly via 5elevenpalafox.com for a date-specific quote.",
      sourceUrls: [
        "https://5elevenpalafox.com/weddings/",
        "https://www.theknot.com/marketplace/5-eleven-palafox-pensacola-fl-610803",
        "https://www.visitpensacola.com/directory/five-eleven-palafox/",
      ],
    },
    {
      key: "pns-country-club",
      name: "Pensacola Country Club",
      website: "https://www.pensacolacountryclub.com/weddings/events",
      capacity: 250,
      rentalFee: 15000,
      inHouseCatering: true,
      estimated: true,
      styleNotes:
        "Florida's oldest private country club, founded in 1902 — decades after emancipation, so there's no plantation-era or enslaved-labor history to weigh here at all. A 23,000 sq ft waterfront clubhouse with exposed brick, decorative columns, and porches overlooking Pensacola Bay; two dining rooms plus banquet space accommodate up to 250. All-inclusive wedding pricing is reported starting around $15,000; rentalFee above is that published starting figure, marked estimated pending a date-specific quote.",
      availabilityNotes: "Contact the club directly via pensacolacountryclub.com for a date-specific quote and membership-sponsor requirements, if any apply to non-member events.",
      sourceUrls: [
        "https://www.pensacolacountryclub.com/weddings/events",
        "https://www.zola.com/wedding-vendors/search/pensacola-fl--wedding-venues--all-inclusive",
        "https://www.weddingwire.com/biz/pensacola-country-club-pensacola/706d50dde6d31fe0.html",
      ],
    },
    {
      key: "pns-supposey",
      name: "Supposey Warehouse & Gardens",
      website: "https://supposey.com/",
      capacity: 200,
      rentalFee: 11750,
      estimated: true,
      styleNotes:
        "A warehouse built in 1946 in Pensacola's historic Tanyard district, reimagined in 2019 as a luxury event venue by Chloe and Nick Sexton — a mid-20th-century commercial/industrial building, well after emancipation, with no residential or plantation history to weigh. Exposed wood beams under a 25ft vaulted ceiling, natural skylights, and 6,000+ sq ft of ballroom space plus gardens for an indoor/outdoor combo. Full wedding pricing is reported at $7,500-$16,000 per event; rentalFee above is the midpoint, marked estimated.",
      availabilityNotes: "Contact the venue directly via supposey.com for a date-specific quote.",
      sourceUrls: [
        "https://supposey.com/",
        "https://www.visitpensacola.com/directory/supposey-warehouse-and-gardens/",
        "https://www.theknot.com/marketplace/supposey-pensacola-fl-2075687",
      ],
    },
    {
      key: "pns-hilton-pensacola-beach",
      name: "Hilton Pensacola Beach",
      website: "https://hiltonpensacolabeach.com/pensacola-beach-weddings-2/",
      capacity: 400,
      fbMinimum: 10000,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A modern beachfront hotel directly on Pensacola Beach — no historic-estate history to weigh, since it was built and operated from the outset as a resort hotel. The Royal Palm Ballroom holds up to 350 guests, the smaller White Sands Room up to 80, for an overall reception capacity of about 400; a beachfront ceremony is a short walk from either room, and on-site lodging means the wedding party and many guests can stay where the event is held. Peak-season (March-November) packages carry roughly a $10,000 combined ceremony/reception minimum (food, beverage, and venue services), with open-bar packages running about $35/person separately; fbMinimum above is that reported peak-season minimum, marked estimated.",
      availabilityNotes: "Contact the hotel's events team via hiltonpensacolabeach.com for a date-specific quote.",
      sourceUrls: [
        "https://hiltonpensacolabeach.com/pensacola-beach-weddings-2/reception/",
        "https://www.hilton.com/en/hotels/pnspehf-hilton-pensacola-beach/events/",
        "https://www.theknot.com/marketplace/hilton-pensacola-beach-pensacola-beach-fl-2029280",
      ],
    },
  ],
  scenario: {
    fixedCosts: 26050,
    perGuestCost: 100,
    travelCostPerGuest: 890,
    attendanceRate: 0.81,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes 5eleven Palafox's $9,500 midpoint venue rental and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items: planner $2,100, photographer $3,000 + partial videographer allowance, flowers $2,800, DJ $1,800, stationery ~$600, attire+beauty ~$2,900, transportation $1,100, wedding bands ~$1,400), for $26,050. perGuestCost ($100) is Hilton Pensacola Beach's own ~$10,000 peak-season ceremony/reception minimum divided by 100 guests — a direct, sourced floor rather than a national average, mirroring how New Orleans' Board of Trade F&B minimum was used in that file. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
