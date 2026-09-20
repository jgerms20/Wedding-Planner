import type { DestinationSeed } from "../types";

/**
 * San Antonio, TX (Riverwalk).
 *
 * A domestic Texas finalist built around the Riverwalk's walkable,
 * water-level hospitality district — a real airport, a compact downtown
 * guests can navigate on foot, and a lower per-guest travel cost than
 * Austin or Fredericksburg. Like Austin, San Antonio's Hill-Country-adjacent
 * settlement history carries lower baseline risk than the Deep South
 * plantation belt, but every venue below was still checked individually:
 * Stable Hall (built 1894 as a brewery's horse stable, not a residence),
 * Hotel Valencia Riverwalk (built new in the 2000s as a boutique hotel), and
 * the InterContinental San Antonio Riverwalk (a modern hotel tower) all
 * carry no residential, agricultural-estate, or enslaved-labor history —
 * none is a converted historic home of the kind this research standard
 * flags for a closer look. Numbers below are sourced where a URL is given;
 * anything derived is flagged `estimated: true` (venues) or explained in a
 * note.
 */
export const sanAntonioTx: DestinationSeed = {
  key: "san-antonio-tx",
  name: "San Antonio, TX",
  country: "United States",
  countryCode: "US",
  region: "Riverwalk/downtown, Pearl District",
  rank: 13,
  whyHere:
    "Joshua & Janel asked for San Antonio as a domestic finalist built around the Riverwalk — a walkable, water-level downtown where the wedding party and out-of-town guests alike can get everywhere on foot — with a real airport and a lower travel cost per guest than some of the other Texas options, for a ~100-person list mostly on the East Coast.",
  notes:
    "Attendance is estimated at 0.84, near the top of the 80-85% 'local wedding' attendance band (pix.wedding; destify.com) — domestic, no passport, and San Antonio International's 46-50 nonstop destinations make it a real regional airport, just short of Austin-Bergstrom's larger network, so it's placed just below Austin on this list.",
  travelCostPerGuestEstimate: 995,
  flightCostEstimate: 470,
  lodgingPerNightEstimate: 175,
  attendanceRateEstimate: 0.84,
  weatherNotes:
    "San Antonio spring warms fast and gets humid: March averages a 77°F high / 53°F low, but by April the average high jumps toward the low-to-mid 80s and May brings the spring's heaviest rain (about 3.5-3.7 inches over 9 days) alongside rising humidity (accuweather.com; currentresults.com; weatherapi.com). March and early April are the most comfortable outdoor-ceremony window; a May date should plan for real heat and a rain contingency.",
  legalNotes:
    "Both parties apply together, in person, at the Bexar County Marriage License Office (Paul Elizondo Tower, 101 W. Nueva St., Suite 120, San Antonio; M-F 8am-5pm, Wed until 5:45pm) with valid photo ID for each party. The fee is $81-82, payable in cash or by the office's accepted methods. Texas imposes a 72-hour waiting period between issuance and the ceremony, waivable with a judge's written order, for active-duty military, or by completing the 'Twogether in Texas' premarital education course (which also reduces the fee), and the license is valid for 90 days after issuance in any Texas county. Verify with the local authority or an attorney.",
  seasonNotes:
    "Fiesta San Antonio is the single biggest seasonal factor: an 11-day citywide festival with 100+ events and over 3 million attendees, held every April (2027 runs April 15-25, so 2028's dates will land somewhere in a similar mid-to-late-April window) — hotel rates spike citywide and Riverwalk-area streets get genuinely crowded for the run of the festival, whether or not the wedding venue is near a parade route (fiestasanantonio.org). A March date, well ahead of Fiesta, or a date in the back half of May after the festival closes, avoids the overlap; worth checking Fiesta's confirmed spring-2028 dates against any date hold.",
  travelNotes:
    "San Antonio International (SAT) offers roughly 46-50 nonstop destinations across the US, Mexico, and Canada via 14 airlines, including new Breeze Airways routes to Memphis, Pensacola, and Raleigh-Durham added in 2026 — fewer routes than Austin-Bergstrom, but a real regional airport with a straightforward ~15-20 minute ride into downtown/the Riverwalk (flysanantonio.com; ksat.com). There's no practical drive or rail alternative for most East Coast guests, so this is a fly-in wedding for nearly everyone, typically a single nonstop hop or one connection. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average domestic round-trip fare, the same national figure used across the other US finalists) + 3 nights x $175/night (blended between BudgetYourTrip's citywide $110 average and Riverwalk-specific hotel rates reported at $134-182/night, since a wedding block concentrates guests in the downtown/Riverwalk hotel corridor rather than the citywide average) = $995 per guest, the lowest of the Texas finalists.",
  sourceUrls: [
    "https://www.bexar.org/2957/Marriage-Licenses",
    "https://www.bexar.org/DocumentCenter/View/25541/Requirements-for-a-Marriage-License-Application",
    "https://www.accuweather.com/en/us/san-antonio/78205/march-weather/351198",
    "https://www.currentresults.com/Weather/Texas/Places/san-antonio-weather-in-march.php",
    "https://fiestasanantonio.org/schedule/",
    "https://www.sanantoniotourist.com/events/fiesta-san-antonio/",
    "https://flysanantonio.com/home/flights/nonstop-destinations/",
    "https://www.ksat.com/news/local/2026/01/28/low-cost-airline-adds-3-nonstop-flight-destinations-from-san-antonio-international-airport/",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/san-antonio-4726206",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "sat-stable-hall",
      name: "Stable Hall at the Pearl",
      website: "https://www.stablehall.com/",
      capacity: 250,
      rentalFee: 5000,
      estimated: true,
      styleNotes:
        "Built in 1894 as the Pearl Brewery's stable for its fleet of draft horses — an industrial/commercial building housing animals and equipment, not a residence, so there's no plantation or domestic-slavery history to weigh at all. Reopened in January 2024 after a three-year renovation, now a state-of-the-art event space with mezzanine seating and six bars inside the historic Pearl District, a short walk from the northern end of the Riverwalk. Full capacity runs up to 1,000 for a standing event; a ~100-guest wedding would use a portion of the space. Pricing starts at $5,000 and up depending on guest count, season, and services; rentalFee above uses that published floor, marked estimated.",
      availabilityNotes: "Contact the venue via stablehall.com's event inquiry form for a date-specific quote.",
      sourceUrls: [
        "https://www.stablehall.com/",
        "https://www.theknot.com/marketplace/stable-hall-san-antonio-tx-2085399",
        "https://sanantonio.wedsociety.com/vendors/stable-hall/",
      ],
    },
    {
      key: "sat-hotel-valencia-riverwalk",
      name: "Hotel Valencia Riverwalk",
      website: "https://www.hotelvalencia-riverwalk.com/weddings.htm",
      capacity: 120,
      rentalFee: 5000,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A Spanish Colonial/Modern Mediterranean-style boutique hotel built new in the 2000s directly on the Riverwalk — no historic-residence history to weigh, since the building itself is recent construction designed as a hotel. A European-style courtyard with a fire-lit waterfall anchors the ceremony/reception space, with in-house catering, complimentary parking, and a complimentary honeymoon suite included in wedding packages; peak season runs March-June. Venue rental starts at $5,000; used above as an estimated starting figure pending a date-specific quote.",
      availabilityNotes: "Contact the hotel's wedding team at weddingsa@valenciagroup.com or (210) 220-3081 for a date-specific quote.",
      sourceUrls: [
        "https://www.hotelvalencia-riverwalk.com/weddings.htm",
        "https://www.zola.com/wedding-vendors/wedding-venues/hotel-valencia-riverwalk",
        "https://sanantonioweddings.com/vendor-profile/hotel-valencia-riverwalk/",
      ],
    },
    {
      key: "sat-intercontinental-riverwalk",
      name: "InterContinental San Antonio Riverwalk",
      website: "https://www.theknot.com/marketplace/intercontinental-san-antonio-riverwalk-san-antonio-tx-2083339",
      capacity: 450,
      rentalFee: 5000,
      perGuestCost: 80,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A modern high-rise hotel directly on the Riverwalk — no historic-building history to weigh at all. Seated capacity up to 450 gives real headroom above the couple's ~100-guest target for a more spacious reception layout. Full wedding (ceremony and reception) pricing starts at $5,000, with in-house catering starting at $80/guest (in line with the national catering average used in the couple's cost model); both figures used above, marked estimated pending a date-specific quote.",
      availabilityNotes: "Contact the hotel's events team via its Riverwalk property page for a date-specific quote.",
      sourceUrls: [
        "https://www.theknot.com/marketplace/intercontinental-san-antonio-riverwalk-san-antonio-tx-2083339",
        "https://www.eventective.com/san-antonio-tx/wedding-venues/",
      ],
    },
  ],
  scenario: {
    fixedCosts: 21550,
    perGuestCost: 90,
    travelCostPerGuest: 995,
    attendanceRate: 0.84,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes Hotel Valencia Riverwalk's $5,000 published starting venue rental and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items: planner $2,100, photographer $3,000 + partial videographer allowance, flowers $2,800, DJ $1,800, stationery ~$600, attire+beauty ~$2,900, transportation $1,100, wedding bands ~$1,400), rounded to $21,550. perGuestCost ($90) takes the InterContinental's own published $80/guest in-house catering floor (which matches The Knot's national catering average almost exactly) and adds roughly $10/guest for cake, favors and incidental rentals. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
