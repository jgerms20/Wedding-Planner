import type { DestinationSeed } from "../types";

/**
 * Memphis, TN.
 *
 * A Mississippi River city with real music, food, and civil-rights history —
 * Beale Street, Stax, Sun Studio, the National Civil Rights Museum — and a
 * genuinely different Southern personality from the plantation-belt river
 * towns further south. Memphis grew as a cotton-trading and railroad city
 * rather than a plantation-agriculture center itself, but individual
 * candidate venues still got a real history check per the standing rule in
 * .claude/skills/wedding-research/SKILL.md rather than being cleared by the
 * city's general character. All three venues below are purpose-built
 * commercial buildings (a modern riverfront hotel, a hotel operating since
 * 1869, and a 1914 train terminal) — none residential, none marketed around
 * enslaved labor. Numbers are sourced where a URL is given; anything derived
 * is flagged `estimated: true` (venues) or explained in a note.
 */
export const memphisTn: DestinationSeed = {
  key: "memphis-tn",
  name: "Memphis, TN",
  country: "United States",
  countryCode: "US",
  region: "Downtown riverfront, South Main Arts District",
  rank: 24,
  whyHere:
    "Memphis gives Joshua & Janel real Mississippi River personality with a music-and-food identity all its own — Beale Street, Southern barbecue, genuine live-music culture — plus one of the better-connected mid-size airports among this round's new Southern destinations.",
  notes:
    "Attendance is estimated at 0.83, in the middle of the 80-85% 'local wedding' attendance band (pix.wedding; destify.com) — domestic, no passport, and Memphis International's real nonstop network (38 domestic destinations) is stronger than Baton Rouge's or Wilmington's, though still below New Orleans or DC.",
  travelCostPerGuestEstimate: 833,
  lodgingPerNightEstimate: 121,
  attendanceRateEstimate: 0.83,
  weatherNotes:
    "Memphis spring warms unevenly with real rain chances throughout: March averages a 64°F high/44°F low with about 9 rainy days, April brings 73°F/53°F with about 8 rainy days, and May reaches 81°F/62°F with a similar rain frequency (accuweather.com; wanderlog.com). An outdoor ceremony anywhere in this window should plan a real indoor or tented backup rather than treat rain as unlikely.",
  legalNotes:
    "Both parties apply together, in person, at the Shelby County Clerk's office (150 Washington Avenue, the 'Hall of Records,' or 1075 Mullins Station Road) with valid photo ID; the fee is $97.50 (reduced with a completed premarital course, as in several other Southern states). Tennessee has no waiting period, so the license can be used the same day it's issued. Verify with the local authority or an attorney.",
  seasonNotes:
    "Memphis in May, a month-long citywide festival (including the Beale Street Music Festival and the World Championship Barbecue Cooking Contest), draws large crowds and tightens hotel inventory throughout May — worth checking its exact spring-2028 dates against any date hold. March and April, ahead of that festival season, are the better-value spring weeks for both rates and availability.",
  travelNotes:
    "Memphis International Airport (MEM, officially the Frederick W. Smith International Airport) has nonstop service to about 38 domestic destinations across 22 states, including Atlanta, Boston, Charlotte, Chicago, Dallas, New York, and other East Coast hubs, with roughly 71 daily departures (flymemphis.com). This is a real regional hub, stronger than several other new Southern destinations in this round, though still smaller than New Orleans or DC. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average) + 3 nights x $121/night (BudgetYourTrip's Memphis-wide hotel average) = $833 per guest.",
  sourceUrls: [
    "https://www.shelbycountytn.gov/574/Marriage-Licenses",
    "https://www.usmarriagelaws.com/marriage-license/tennessee/shelby/county-clerk/office-requirements/",
    "https://www.accuweather.com/en/us/memphis/38103/march-weather/351089",
    "https://wanderlog.com/weather/58224/3/memphis-weather-in-march",
    "https://flymemphis.com/nonstop-destinations-list/",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/memphis-4641239",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "mem-river-hall-river-inn",
      name: "River Hall at the River Inn",
      website: "https://riverhallmemphis.com/events/",
      capacity: 200,
      rentalFee: 650,
      fbMinimum: 2500,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A modern riverside hotel and event hall in Harbor Town, on Mud Island in the Mississippi — a purpose-built contemporary property, no residential or plantation-era history to weigh. Courtyard ceremony space seats up to 120 (standing reception up to 200), with the interior River Hall seating 80. Rental fee for a 7-hour ceremony-and-reception block runs $200-$1,100; a Friday/Saturday food & beverage minimum of $2,500 (or $25/guest) applies. rentalFee above is the range's midpoint, marked estimated.",
      availabilityNotes: "Contact the venue directly via riverhallmemphis.com for a date-specific quote.",
      sourceUrls: [
        "https://riverhallmemphis.com/events/",
        "https://www.wedding-spot.com/venue/7971/river-hall-at-the-river-inn/",
        "https://www.herecomestheguide.com/wedding-venues/tennessee/river-hall-at-river-inn",
      ],
    },
    {
      key: "mem-peabody-hotel",
      name: "The Peabody Memphis",
      website: "https://www.historichotels.org/us/hotels-resorts/the-peabody-memphis/weddings.php",
      capacity: 400,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "An iconic downtown hotel that has operated continuously as a hotel since 1869 (the current 1925 building replaced the original one on a different site) — purpose-built and purpose-operated commercial hospitality from its founding, three years after the Civil War ended, not a converted private residence, so there's no plantation-era history to weigh the way there would be for a wealthy family estate. Grand ballroom and mezzanine spaces host weddings up to several hundred guests; the hotel has hosted weddings since its first year in 1869. No flat rental fee is published; pricing is quoted per event.",
      availabilityNotes: "Contact the hotel's events team via historichotels.org/us/hotels-resorts/the-peabody-memphis for a date-specific quote.",
      sourceUrls: [
        "https://www.historichotels.org/us/hotels-resorts/the-peabody-memphis/weddings.php",
        "https://www.weddingstylemagazine.com/wedding-ideas/wedding-destinations/the-peabody-memphis-an-iconic-southern-hotel-celebrates-153-years-of-history",
        "https://styleblueprint.com/memphis/everyday/memphis-wedding-peabody-hotel/",
      ],
    },
    {
      key: "mem-central-station",
      name: "The Central Station Memphis",
      website: "https://centralstationmemphis.com/events",
      capacity: 200,
      rentalFee: 8000,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A restored 1914 train terminal in the South Main Arts District, once the Illinois Central Railroad's Memphis hub, converted into a boutique Curio Collection hotel after a 1995 renovation — purpose-built railroad infrastructure, not a residence, so no plantation-era history applies. The Grand Hall (the former waiting room) is 6,576 sq ft with 33-foot ceilings and the original Arrival/Departure board, holding up to 200 guests. Published wedding pricing runs $6,000-$10,000+; rentalFee above is the midpoint of that range, marked estimated.",
      availabilityNotes: "Contact the hotel's events team via centralstationmemphis.com for a date-specific quote.",
      sourceUrls: [
        "https://centralstationmemphis.com/events",
        "https://connorandco.com/wedding-tips-blog/central-station-hotel",
        "https://www.hilton.com/en/hotels/memcuqq-the-central-station-memphis/",
      ],
    },
  ],
  scenario: {
    fixedCosts: 17200,
    perGuestCost: 85,
    travelCostPerGuest: 833,
    attendanceRate: 0.83,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes River Hall's $650 midpoint venue rental (a value pick, with its $2,500 F&B minimum accounted for separately in perGuestCost) and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items — see the Washington DC file's scenario note for the full item list), rounded to $17,200. perGuestCost ($85) blends The Knot's national $80/guest catering average with River Hall's own $25/guest Friday/Saturday F&B-minimum rate. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
