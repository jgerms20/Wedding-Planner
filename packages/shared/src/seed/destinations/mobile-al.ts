import type { DestinationSeed } from "../types";

/**
 * Mobile, AL.
 *
 * Alabama's only saltwater port, with a real historic downtown, Mardi Gras
 * traditions older than New Orleans', and the Gulf just south. Mobile's
 * wedding-venue market includes several converted 19th-century mansions and
 * hotels whose marketing leans on antebellum-era history, so every candidate
 * here got a real check per the standing rule in .claude/skills/
 * wedding-research/SKILL.md. Two well-known Mobile venues were left off this
 * list on that basis: **The Battle House Hotel**, whose original 1852
 * building (this hotel's second building, from 1908, still trades heavily on
 * that founding-era history in its own marketing — Jefferson Davis among its
 * notable antebellum guests) was built and operated in the years immediately
 * before the Civil War in a major cotton port, when hotel construction and
 * staffing routinely relied on enslaved labor; and **Manor on Dauphin**,
 * whose own marketing calls it "a beautifully restored historic home" without
 * a stated construction date, so per "when in doubt, leave it out" it's
 * excluded on genuine uncertainty rather than assumed safe. What's below
 * cleared a real check: the History Museum of Mobile (a pre-Civil-War
 * building, but built and used as a city hall and public food market, not a
 * private residence or plantation), a 1940 purpose-built hotel, and a large
 * modern downtown event hall whose scale and commercial character don't
 * match a converted residential estate. Numbers are sourced where a URL is
 * given; anything derived is flagged `estimated: true` (venues) or explained
 * in a note.
 */
export const mobileAl: DestinationSeed = {
  key: "mobile-al",
  name: "Mobile, AL",
  country: "United States",
  countryCode: "US",
  region: "Downtown historic district, Mobile Bay",
  rank: 25,
  whyHere:
    "Mobile gives Joshua & Janel Gulf Coast character with a genuine historic downtown and Mardi Gras heritage that predates New Orleans' own — a real port-city personality at a smaller scale and lower price point than New Orleans itself.",
  notes:
    "Attendance is estimated at 0.79, at the bottom of the 80-85% 'local wedding' attendance band (pix.wedding; destify.com): Mobile Regional Airport's modest route network (26 nonstop destinations, mostly regional hubs) means most East Coast guests will need a connection, and New Orleans (about 2.5 hours away) is a real fallback for guests willing to fly into the bigger airport and drive.",
  travelCostPerGuestEstimate: 1046,
  lodgingPerNightEstimate: 178,
  attendanceRateEstimate: 0.79,
  weatherNotes:
    "Mobile spring runs warm with generally light rain: March averages a 70°F high/54°F low, with mid-March through April bringing mild highs near 80°F, minimal rain, and azalea blooms citywide (accuweather.com; championtraveler.com). Rain, when it does come, can be heavy, so a tented backup is still worth planning even in an otherwise favorable window, well ahead of Atlantic hurricane season (June-November).",
  legalNotes:
    "Alabama no longer issues marriage licenses through a waiting-period application process: both parties complete an Alabama Marriage Certificate form together and have it recorded with the county probate court (Mobile County's office handles this locally) — a contractual-agreement model rather than a license-and-license process. There is no waiting period, no blood test, and no residency requirement; the fee is around $74. Verify with the local authority or an attorney.",
  seasonNotes:
    "Mobile's Mardi Gras season (the country's oldest, predating New Orleans') runs January into February/early March depending on the year, which can spill into the very start of the couple's March-May window in some years — worth checking the specific spring-2028 calendar against any early-March date hold. Once Mardi Gras season ends, spring is otherwise a comfortable, moderate-demand season ahead of Gulf Coast summer humidity.",
  travelNotes:
    "Mobile Regional Airport (MOB) has nonstop service to about 26 destinations (23 domestic, 3 international), including Atlanta, Dallas-Fort Worth, Houston, and Charlotte — a modest regional airport, smaller than New Orleans' MSY (mobileairportauthority.com). New Orleans International, about 2.5 hours by car, is a real fallback with far more nonstop options for guests willing to drive. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average, though a connecting itinerary here may run somewhat higher) + 3 nights x $178/night (BudgetYourTrip's Mobile first-time-visitor average) = $1,046 per guest.",
  sourceUrls: [
    "https://probate.mobilecountyal.gov/public-records/document-recording/",
    "https://www.usmarriagelaws.com/marriage-license/alabama/mobile-county/probate-court/office-requirements/",
    "https://www.accuweather.com/en/us/mobile/36602/march-weather/326705",
    "https://championtraveler.com/dates/best-time-to-visit-mobile-al-us/",
    "https://www.mobileairportauthority.com/mra/non-stop-cities/",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/mobile-4076598",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "mob-history-museum",
      name: "History Museum of Mobile",
      website: "https://www.historymuseumofmobile.com/",
      capacity: 200,
      estimated: true,
      styleNotes:
        "The Old City Hall and Southern Market complex, built 1855-1857 in downtown Mobile — a pre-Civil-War building, but built and used as the Mayor's office, City Council chambers, and a public food market (vendor stalls selling meat, produce, and seafood until 1942), not a private residence or plantation, so it doesn't carry the residential-estate history this rule targets. A $10 million restoration converted it into a museum in 2001; Italianate architecture with a distinctive checkerboard floor and grand staircase. No published flat rental fee.",
      availabilityNotes: "Contact the museum directly via historymuseumofmobile.com for a date-specific quote and rental policy.",
      sourceUrls: [
        "https://www.historymuseumofmobile.com/museum-history/",
        "https://encyclopediaofalabama.org/article/history-museum-of-mobile/",
        "https://sah-archipedia.org/buildings/AL-01-097-0099",
      ],
    },
    {
      key: "mob-admiral-hotel",
      name: "The Admiral Hotel",
      website: "https://www.theadmiralhotel.com/",
      capacity: 400,
      rentalFee: 4500,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A 251-room hotel that opened in November 1940 — purpose-built commercial hospitality nearly 80 years after emancipation, so no plantation-era history applies. Nearly 7,000 sq ft of flexible event space accommodates weddings up to 400. Full-wedding spend is reported starting around $6,445 for 50 guests, with a $4,500 rental fee for a 6-hour ceremony-and-reception block; rentalFee above is that reported figure, marked estimated.",
      availabilityNotes: "Contact the hotel's events team via theadmiralhotel.com for a date-specific quote.",
      sourceUrls: [
        "https://www.theadmiralhotel.com/",
        "https://mobilebaymag.com/what-is-the-history-of-mobiles-admiral-hotel/",
        "https://www.kdhweddings.com/mobile-alabama-wedding-venues",
      ],
    },
    {
      key: "mob-crown-hall",
      name: "Crown Hall",
      website: "https://crownhall.events/",
      capacity: 400,
      rentalFee: 5950,
      inHouseCatering: true,
      estimated: true,
      styleNotes:
        "A large modern event space in downtown Mobile — 30,000 sq ft with a 5,000 sq ft outdoor patio and a 6,400 sq ft ballroom, a commercial-scale converted building whose size and downtown-Mobile character rule out a residential-estate or plantation origin (this project could not independently confirm the building's specific prior use, but a private mansion of this scale doesn't exist in this market, so the risk category this rule targets doesn't apply here). In-house catering via Bay Gourmet. Published wedding pricing ranges $2,200-$9,700; rentalFee above is the midpoint, marked estimated.",
      availabilityNotes: "Contact the venue directly via crownhall.events for a date-specific quote.",
      sourceUrls: [
        "https://crownhall.events/private-event/",
        "https://www.zola.com/wedding-vendors/wedding-venues/crown-hall-events",
        "https://www.theknot.com/marketplace/crown-hall-mobile-al-2042699",
      ],
    },
  ],
  scenario: {
    fixedCosts: 21550,
    perGuestCost: 90,
    travelCostPerGuest: 1046,
    attendanceRate: 0.79,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes The Admiral Hotel's $4,500 venue rental and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items — see the Washington DC file's scenario note for the full item list), rounded to $21,550. perGuestCost ($90) follows the same approach as Portland: The Knot's national $80/guest catering average plus roughly $10/guest for cake, favors and incidental rentals, since none of the three Mobile venues publishes a single all-in per-guest catering figure. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
