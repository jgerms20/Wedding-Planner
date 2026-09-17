import type { DestinationSeed } from "../types";

/**
 * Columbia, South Carolina.
 *
 * A Southeast option in the Midlands, with a small nonstop-flight airport, a
 * lower cost of living than the coasts, and a cluster of historic-home and
 * riverside venues sized for a ~100-guest wedding. Numbers below are sourced
 * where a URL is given; anything derived is flagged `estimated: true`
 * (venues) or explained in a note.
 */
export const columbiaSc: DestinationSeed = {
  key: "columbia-sc",
  name: "Columbia, SC",
  country: "United States",
  countryCode: "US",
  region: "Midlands region (Columbia, Irmo, West Columbia, Lake Murray)",
  rank: 5,
  whyHere:
    "Columbia is on the list as a possibility if it's close to family roots for Joshua or Janel — a hometown or near-hometown option that could mean built-in local knowledge, family help with logistics, and a lower overall price tag than the coasts or a true destination wedding.",
  notes:
    "Attendance is estimated at 0.82, the middle of the 80-85% 'local wedding' attendance band rather than the 60-70% destination-wedding band, reflecting that Columbia is domestic and drivable from much of the Southeast even though most Northeast/Mid-Atlantic guests would need a flight with a connection (pix.wedding; destify.com).",
  travelCostPerGuestEstimate: 920,
  lodgingPerNightEstimate: 150,
  attendanceRateEstimate: 0.82,
  weatherNotes:
    "Columbia is humid subtropical, and spring warms up fast: average highs run about 66°F in March, 77°F in April and 82°F in May, with afternoon humidity around 76% in March easing to its annual low (~59%) in April before climbing again by May (currentresults.com; weatherspark.com). The bigger planning issue for an outdoor ceremony is pollen, not rain — South Carolina's tree-pollen season starts as early as February and peaks in March-April (oak, hickory, walnut, cedar, ash, mulberry, then pine), with Columbia specifically registering some of the state's highest counts in that window (wyndly.com; alert-pollen.com).",
  legalNotes:
    "Marriage licenses are issued by the county probate court — Richland County Probate Court for Columbia proper. Richland County requires the application to be filed online (not in person) with a valid photo ID and Social Security number (or passport/visa for non-citizens); the fee is $45.24. There is a 24-hour waiting period between application and issuance, and South Carolina no longer requires a blood test. Once issued, the license is valid statewide for 6 months, and neither party needs to be a South Carolina resident. Officiants may be judges (including probate judges), ordained ministers of the Gospel, rabbis, or spiritual leaders of a recognized Native American tribe; South Carolina does not require officiants to register with any state office, and an officiant's own state of residence doesn't affect their authority to perform the ceremony in SC. Verify with the local authority or an attorney.",
  seasonNotes:
    "Spring is a busy local-events season in Columbia: Riverbanks Zoo & Garden's gardens are in full bloom, and the University of South Carolina's spring commencement (mid-May) fills hotels around graduation weekend, so a wedding date near it should expect tighter room-block availability and higher rates. Outside of graduation weekend and Riverbanks' own peak-season food-and-beverage minimums, Columbia's hotel and venue pricing runs well under coastal SC or DC-level rates (riverbanks.org; usmarriagelaws.com pricing context).",
  travelNotes:
    "Columbia Metropolitan Airport (CAE) offers more than 36 daily flights across roughly 8-9 nonstop destinations — Charlotte, Atlanta, Washington (Reagan and Dulles), Philadelphia, New York-LaGuardia, Newark, Chicago, Dallas/Ft. Worth and Miami — so most East Coast guests will connect through one of those hubs rather than flying nonstop from a smaller home airport (experiencecolumbiasc.com; flycae.com). Guests driving from the Southeast (Georgia, North Carolina, coastal SC) have an easy, cheap alternative to flying. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average) + 3 nights x $150/night (a 3-star Columbia hotel average) = $920 per guest.",
  sourceUrls: [
    "https://www.richlandcountysc.gov/Courts-Safety/Probate-Court/Marriage/Marriage-Licenses",
    "https://www.usmarriagelaws.com/marriage-license/sc-south-carolina/richland-county/columbia/",
    "https://katiejaynes.com/blog/south-carolina-marriage-license-wedding-laws-101/",
    "https://www.ulc.org/wedding-laws/south-carolina",
    "https://theamm.org/weddings-by-state/south-carolina/officiant-registration-requirements",
    "https://www.currentresults.com/Weather/South-Carolina/Places/columbia-temperatures-by-month-average.php",
    "https://weatherspark.com/y/17874/Average-Weather-in-Columbia-South-Carolina-United-States-Year-Round",
    "https://www.wyndly.com/blogs/allergy-season/south-carolina",
    "https://alert-pollen.com/en/blog/pollen-count-columbia.html",
    "https://www.experiencecolumbiasc.com/plan-your-trip/getting-here/columbia-metropolitan-airport/",
    "https://flycae.com/",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/columbia-4575352",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "columbia-701-whaley",
      name: "701 Whaley",
      website: "https://701whaley.com/",
      capacity: 300,
      rentalFee: 3100,
      estimated: true,
      styleNotes:
        "A restored 1903 mill-community building in Columbia's Olympia Mill Village — an industrial-chic, budget-friendly reception space. Published reception rental runs $2,600-$3,600 for 12 hours (setup/cleanup included), plus a separate $600 ceremony fee if held on-site; rentalFee above is the midpoint of the reception range, marked estimated since final pricing depends on date and exact package.",
      availabilityNotes: "Contact (803) 771-0101 or 701whaley@gmail.com for date-specific pricing.",
      sourceUrls: [
        "https://701whaley.com/",
        "https://www.wedding-spot.com/venue/6528/701-whaley/",
      ],
    },
    {
      key: "columbia-river-road-jasmine-house",
      name: "The River Road House & The Jasmine House",
      website: "https://riverroadjasmine.net/",
      capacity: 200,
      rentalFee: 7000,
      inHouseCatering: true,
      estimated: true,
      styleNotes:
        "Two connected turn-of-the-century restored houses and gardens on Lake Murray-area N Lake Dr, in business 30+ years as a full-service wedding venue with an included day-of coordinator and support staff. Published full wedding (ceremony + reception) pricing runs $4,000 off-peak to $10,000 peak for up to 200 seated; rentalFee above is the midpoint, marked estimated pending an exact date.",
      availabilityNotes: "Contact info@riverroadjasmine.net or (803) 315-4953.",
      sourceUrls: ["https://riverroadjasmine.net/"],
    },
    {
      key: "columbia-riverbanks-zoo-garden",
      name: "Riverbanks Zoo & Garden",
      website: "https://www.riverbanks.org/plan-your-event/weddings",
      capacity: 500,
      fbMinimum: 5500,
      perGuestCost: 55,
      inHouseCatering: true,
      styleNotes:
        "A working zoo and botanical garden with five distinct reception spaces (Ndoki Lodge, Magnolia Room, Sea Lion Landing, The Birdhouse, and the Aquarium Reptile Conservation Center) and an exclusive in-house caterer. Peak-season pricing requires a food-and-beverage minimum of $55/guest for 100+ guests, or a $5,500 minimum spend, excluding service charge and tax — both figures are published directly by the venue.",
      availabilityNotes: "An all-inclusive elopement package (15 guests or fewer, Mon-Thu, booked 30-45 days out) starts at $1,500.",
      sourceUrls: ["https://www.riverbanks.org/plan-your-event/weddings"],
    },
    {
      key: "columbia-historic-columbia",
      name: "Historic Columbia (Seibels House, Hampton-Preston Gardens, Robert Mills Carriage House, Woodrow Wilson Family Home gardens)",
      website: "https://www.historiccolumbia.org/weddings",
      capacity: 500,
      rentalFee: 1400,
      inHouseCatering: false,
      estimated: true,
      styleNotes:
        "A nonprofit historic-preservation group renting four historic house-and-garden properties downtown as raw ceremony/reception space (couples bring their own caterer and rentals). Published pricing runs from a nominal off-peak rate up to $1,400 for peak dates; rentalFee above uses the peak figure since a spring 2028 date is likely to fall in peak season, marked estimated because the exact off-peak/peak schedule wasn't published in the sources reviewed.",
      availabilityNotes: "Contact rentals@historiccolumbia.org or (803) 252-7742 ext. 11.",
      sourceUrls: ["https://www.historiccolumbia.org/weddings", "https://www.historiccolumbia.org/rentals"],
    },
  ],
  scenario: {
    fixedCosts: 23500,
    perGuestCost: 80,
    travelCostPerGuest: 920,
    attendanceRate: 0.82,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes The River Road & Jasmine House's $7,000 midpoint venue rental and adds a national non-venue, non-catering baseline of ~$16,550 built from The Knot's 2026 Real Weddings Study line items (see the Washington DC file's scenario note for the same build), rounded to $23,500. perGuestCost ($80) starts from Riverbanks Zoo & Garden's published $55/guest food-and-beverage minimum and adds roughly $25/guest for bar upgrade, cake, favors and incidental rentals not covered by that minimum, estimated from national per-guest figures (theknot.com cake/favors averages). travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
