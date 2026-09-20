import type { DestinationSeed } from "../types";

/**
 * Seattle, WA.
 *
 * The Pacific Northwest's biggest city and best-connected airport of the PNW
 * options — real Puget Sound waterfront personality without Portland's food-
 * cart-forward identity or the extra Gorge/Mount-Hood drive. No slavery-belt
 * history to weigh here at all (Washington entered the Union in 1889, well
 * after slavery was abolished, and never had a plantation economy), so this
 * file's venue checks are the ordinary "is this a real, bookable place"
 * standard rather than the heightened Southern-destination history check.
 * Numbers are sourced where a URL is given; anything derived is flagged
 * `estimated: true` (venues) or explained in a note.
 */
export const seattleWa: DestinationSeed = {
  key: "seattle-wa",
  name: "Seattle, WA",
  country: "United States",
  countryCode: "US",
  region: "Downtown/Belltown waterfront, Lake Union, Ballard",
  rank: 29,
  whyHere:
    "Seattle gives Joshua & Janel real Puget Sound and Pacific Northwest character — waterfront views, a genuine skyline, and the Olympic Mountains as a backdrop — with the best airport connectivity of any PNW option, a real advantage over Portland for a guest list scattered across the East Coast.",
  notes:
    "Attendance is estimated at 0.79, just below Portland's 0.80: Sea-Tac's much larger route network (140 nonstop destinations vs. Portland's 60+) is a real edge, but Seattle is still the longest flight and biggest time-zone shift among the Southern/Mid-Atlantic-leaning finalists, and its higher hotel costs than Portland offset some of the airport advantage (pix.wedding; destify.com).",
  travelCostPerGuestEstimate: 1022,
  lodgingPerNightEstimate: 184,
  attendanceRateEstimate: 0.79,
  weatherNotes:
    "Seattle's spring is a real transition out of its wet season rather than reliably dry: March averages a 51°F high/37°F low with a 47% chance of rain on a given day; April warms to about 58°F/42°F with roughly 14 rainy days averaging 2.68in total; May continues drying out to about 2.7in for the month, the lightest of the three (accuweather.com; nomadseason.com; currentresults.com). A March or April outdoor ceremony should plan a real indoor/tented backup; May meaningfully improves the odds.",
  legalNotes:
    "Both parties apply together (in person or online with in-person pickup) through the King County Recorder's Office (201 S. Jackson Street, Seattle) with valid government-issued photo ID; the fee is $169. Washington imposes a mandatory 3-day waiting period between issuance and the ceremony that cannot be waived under any circumstances, including by court order — plan the license application at least 3 days ahead of the date. Once issued, the license is valid for 60 days (a 3-to-63-day ceremony window from application). No blood test is required. Verify with the local authority or an attorney.",
  seasonNotes:
    "Spring is a shoulder season in Seattle rather than a peak one — the true high season is summer (July-September), when the city is famously dry and sunny — so a March-May date should find comparatively favorable venue and hotel availability. There's no major citywide festival that collides with the March-May window the way SXSW or Jazz Fest do elsewhere, though it's worth checking the exact spring-2028 dates against any Seattle Center or waterfront events before finalizing a date.",
  travelNotes:
    "Seattle-Tacoma International (SEA) is the best-connected PNW airport by a wide margin — nonstop service to roughly 140 destinations (about 101 domestic, ~39 international) across US and Canadian carriers, including strong nonstop coverage from East Coast hubs (portseattle.org; seattlemet.com). There's no realistic drive or rail alternative for East Coast guests, but the flight itself is typically a single nonstop hop, unlike some other PNW options that require a connection. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average) + 3 nights x $184/night (BudgetYourTrip's Seattle-wide hotel average) = $1,022 per guest.",
  sourceUrls: [
    "https://kingcounty.gov/en/dept/executive-services/certificates-permits-licenses/records-licensing/recorders-office/marriage-licensing",
    "https://www.docdraft.ai/legal-guides/getting-married/washington",
    "https://www.accuweather.com/en/us/seattle/98104/march-weather/351409",
    "https://nomadseason.com/weather/united-states/washington/seattle-april.html",
    "https://www.currentresults.com/Weather/Washington/Places/seattle-weather-in-march.php",
    "https://www.portseattle.org/page/nonstop-domestic-routes",
    "https://www.portseattle.org/page/nonstop-international-routes",
    "https://www.seattlemet.com/travel-and-outdoors/nonstop-direct-flights-from-sea-seattle-tacoma-international-airport",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/seattle-5809844",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "sea-edgewater-hotel",
      name: "The Edgewater Hotel",
      website: "https://www.edgewaterhotel.com/gather/weddings/",
      capacity: 220,
      rentalFee: 6445,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A waterfront hotel built out over Elliott Bay in 1962, framed by Puget Sound and the Seattle skyline — modern construction with no historic-residence angle. Three tiered event spaces: the Forest Room (up to 24), the Alki Room (25-60), and the Olympic Ballroom (70-220), giving real flexibility for a ~100-guest wedding. Reported full-wedding spend starts around $6,445 for 50 guests, typically running $10,000-$25,000+ once catering and bar are included; rentalFee above is the reported starting figure, marked estimated.",
      availabilityNotes: "Contact the hotel's events team via edgewaterhotel.com for a date-specific quote.",
      sourceUrls: [
        "https://www.edgewaterhotel.com/gather/weddings/",
        "https://www.wedding-spot.com/venue/3584/edgewater-hotel-seattle/",
        "https://www.herecomestheguide.com/wedding-venues/washington/the-edgewater-hotel",
      ],
    },
    {
      key: "sea-mv-skansonia",
      name: "MV Skansonia",
      website: "https://landmarkeventco.com/venues/mv-skansonia/",
      capacity: 300,
      rentalFee: 5375,
      fbMinimum: 9000,
      estimated: true,
      styleNotes:
        "A historic 1929 ferry boat permanently docked on Lake Union — genuinely different from a fixed venue (ceremony on the open-air deck, cocktail hour and reception indoors on the boat itself), with no residential-estate history since it's a working vessel, not a piece of land. Seated capacity is 175, standing up to 200-300 depending on layout. Rental runs $2,250-$8,500 depending on date, with a food & beverage minimum of $5,000-$13,000; rentalFee and fbMinimum above are each range's midpoint, marked estimated.",
      availabilityNotes: "Contact Landmark Event Co. via landmarkeventco.com for a date-specific quote.",
      sourceUrls: [
        "https://landmarkeventco.com/venues/mv-skansonia/",
        "https://www.theknot.com/marketplace/the-mv-skansonia-by-landmark-event-co-seattle-wa-290187",
        "https://www.herecomestheguide.com/wedding-venues/washington/mv-skansonia",
      ],
    },
    {
      key: "sea-sunset-bay-lodge",
      name: "Sunset Bay Lodge at the Ballard Elks",
      website: "https://www.sunsetbaylodgeballard.com/venue",
      capacity: 300,
      rentalFee: 6000,
      estimated: true,
      styleNotes:
        "A modern lodge-style event space near the Ballard Locks with views of Puget Sound and the Olympic Mountains — a 20th-century fraternal-lodge building (Elks Lodge), not a converted historic residence. 13,000 sq ft of flexible indoor/outdoor space; a full-venue wedding (ceremony + reception) holds up to 190, with the downstairs banquet room alone handling up to 100 and the full facility up to 300-600 for a standing reception. Rental runs $1,500-$10,000 depending on space and season; rentalFee above is a mid-range estimate for a full-venue peak-season booking.",
      availabilityNotes: "Contact the venue directly via sunsetbaylodgeballard.com for a date-specific quote.",
      sourceUrls: [
        "https://www.sunsetbaylodgeballard.com/venue",
        "https://www.sunsetbaylodgeballard.com/about",
        "https://thevendry.com/venue/168588/sunset-bay-lodge-at-the-ballard-elks-seattle-wa/space/63379",
      ],
    },
  ],
  scenario: {
    fixedCosts: 23000,
    perGuestCost: 95,
    travelCostPerGuest: 1022,
    attendanceRate: 0.79,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes MV Skansonia's $5,375 midpoint venue rental (a mid-market, guest-count-appropriate pick) and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items — see the Washington DC file's scenario note for the full item list), plus MV Skansonia's own $9,000 midpoint food & beverage minimum folded partly into fixed costs since it's a venue-set minimum rather than a pure per-guest rate, rounded to $23,000. perGuestCost ($95) follows the Portland approach: The Knot's national $80/guest catering average plus roughly $15/guest for cake, favors and incidental rentals, reflecting Seattle's slightly higher cost of living. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
