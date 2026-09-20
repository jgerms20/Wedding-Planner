import type { DestinationSeed } from "../types";

/**
 * Galveston, TX.
 *
 * A Gulf Coast domestic finalist with a genuinely different personality from
 * the others on the list: a 19th-century island port city with a beach on
 * one side and a historic downtown (The Strand) on the other, no passport,
 * and Houston's two airports within reach. Galveston's "historic mansion"
 * wedding-venue marketing runs through Gilded Age cotton/banking wealth
 * rather than antebellum plantation wealth, but every candidate was still
 * checked individually per the standing rule in
 * .claude/skills/wedding-research/SKILL.md. The Moody Mansion (built
 * 1893-1895, three decades after Texas emancipation, for the widow of a
 * grocery merchant, later bought by cotton-and-banking magnate W.L. Moody
 * Jr.) was deliberately left off this list even though its construction
 * post-dates slavery and doesn't market any enslaved-labor history on-site:
 * one source reviewed for this file noted the museum's own tour omits any
 * discussion of the postbellum cotton economy's roots in enslaved labor that
 * built the Moody fortune, and per the rule's own guidance — "when history
 * is genuinely unclear after a real check, leave the venue out rather than
 * guess" — a Gilded Age cotton-and-banking mansion built at the edge of the
 * rule's 1890s cutoff was judged not worth forcing in. The four venues below
 * are a purpose-built modern convention center, two hotels that have
 * operated as hotels since they were first built (1911 and 1879, both well
 * after Texas's 1865 emancipation), and a modern waterfront event center —
 * none carry plantation or enslaved-labor history. Numbers below are sourced
 * where a URL is given; anything derived is flagged `estimated: true`
 * (venues) or explained in a note.
 */
export const galvestonTx: DestinationSeed = {
  key: "galveston-tx",
  name: "Galveston, TX",
  country: "United States",
  countryCode: "US",
  region: "The Strand Historic District, Seawall Boulevard, East End Historic District",
  rank: 17,
  whyHere:
    "Joshua & Janel wanted a Texas Gulf Coast option with genuine 19th-century port-city character — The Strand's cast-iron storefronts, a working beach and seawall, and a real regional airport nearby in Houston — as a domestic, no-passport alternative with a different personality than the Southeast finalists.",
  notes:
    "Attendance is estimated at 0.80, at the bottom of the 80-85% 'local wedding' attendance band (pix.wedding; destify.com) — domestic and no passport, but Galveston has no commercial airport of its own: every guest flies into Houston (Hobby or Bush Intercontinental) and then drives or shuttles 40-70 miles to the island, adding a real second leg most other US finalists on this list don't require.",
  travelCostPerGuestEstimate: 1055,
  flightCostEstimate: 470,
  lodgingPerNightEstimate: 195,
  attendanceRateEstimate: 0.80,
  weatherNotes:
    "Galveston spring is mild and breezy: March averages a 69°F high / 60°F low with average wind around 16 mph, April runs about 71°F/59°F, and May warms further with 318 hours of average sunshine (weatherspark.com; nomadseason.com; climatestotravel.com). The whole March-May window falls before the Atlantic hurricane season (June 1-November 30), avoiding the storm-season risk that shadows a Gulf Coast wedding later in the year.",
  legalNotes:
    "Both parties apply together, in person, at the Galveston County Clerk's office (no Texas residency requirement — any Texas county clerk can issue the license). Bring a valid government-issued photo ID for each party; anyone previously married should bring the final divorce decree or a deceased spouse's death certificate. The fee is $81, reduced to $21 if both parties completed a state-approved premarital education course. Texas imposes a 72-hour waiting period between issuance and the ceremony, waived for couples who complete the premarital course or for an applicant on active military duty. The license expires if the ceremony doesn't happen within 90 days of issuance. Verify with the local authority or an attorney.",
  seasonNotes:
    "The single biggest scheduling risk in this window is Texas spring break: the island can draw 200,000-300,000 visitors in the peak week (historically March 9-20), with heavy traffic, packed beaches, and law enforcement closing some beach access points to manage crowds (houstonpublicmedia.org; fox26houston.com). A date should avoid that window entirely — April is described as 'a pretty mellow month' between spring break and the Memorial Day run-up to summer crowds, making it the better bet inside the March-May range (sandnsea.com).",
  travelNotes:
    "Galveston has no commercial airport; the nearest is William P. Hobby Airport (HOU) in Houston, about 40 miles/under an hour away with mostly domestic nonstop service via Southwest, American, and Delta, while George Bush Intercontinental (IAH), about 70 miles/80+ minutes away, is a larger international hub with nonstop service from 50+ cities and better odds of a direct flight from further-flung East Coast markets (staybeachbox.com; royalgalvestonshuttle.com). Either way, guests land in Houston and then need a shuttle, rental car, or car service for the final leg to the island — a genuine second leg that the other US finalists on this list don't require. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average domestic round-trip fare, the same national figure used across the other US finalists) + 3 nights x $195/night (blended between BudgetYourTrip's $229 all-Galveston average, which skews high from luxury beachfront rentals, and its $159 three-star average, since a wedding hotel block runs through standard hotel inventory rather than beach houses) = $1,055 per guest.",
  sourceUrls: [
    "https://www.galvestoncountytx.gov/our-county/county-clerk/marriage-license-information",
    "https://www.usmarriagelaws.com/marriage-license/texas/galveston/county-clerk/office-requirements/",
    "https://weatherspark.com/m/9621/3/Average-Weather-in-March-in-Galveston-United-States",
    "https://nomadseason.com/weather/united-states/texas/galveston-march.html",
    "https://www.climatestotravel.com/climate/united-states/galveston",
    "https://www.houstonpublicmedia.org/articles/news/local/galveston/2026/03/06/545447/galveston-spring-break-houston-texas-vacation/",
    "https://www.fox26houston.com/news/galveston-spring-break-beach-closures-2026-march",
    "https://www.sandnsea.com/blog/april-in-galveston/",
    "https://staybeachbox.com/blog/closest-airport-to-galveston-tx-our-honest-take-on-the-best-way-in/",
    "https://royalgalvestonshuttle.com/closest-airport-to-galveston-tx/",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/galveston-4692883",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "gls-convention-center",
      name: "Galveston Island Convention Center at The San Luis Resort",
      website: "https://www.galveston.com/meet-galveston/galveston-island-convention-center/",
      capacity: 430,
      perGuestCost: 67,
      inHouseCatering: true,
      estimated: true,
      styleNotes:
        "A purpose-built 140,000 sq ft convention center on Galveston's Seawall Boulevard — no residential or historic-estate history to weigh at all, since the building was constructed from the ground up as a public event facility. A 15,500 sq ft grand ballroom and floor-to-ceiling Gulf views; overall capacity runs up to 430 seated or 1,500 standing across the property. No separate rental fee is charged for a reception, but a food & beverage minimum applies; Wedding Spot's instant quote reports weddings starting at $3,329 for 50 guests, which perGuestCost above treats as a per-guest floor (~$67/guest), marked estimated.",
      availabilityNotes: "Contact the venue directly via galveston.com or Wedding Spot for a date-specific, guest-count-based quote.",
      sourceUrls: [
        "https://www.galveston.com/meet-galveston/galveston-island-convention-center/",
        "https://www.wedding-spot.com/venue/7275/the-galveston-island-convention-center/",
        "https://www.cvent.com/venues/galveston/convention-center/galveston-island-convention-center/venue-a7c1754f-a39d-48b7-bc51-d03aab6079fa",
      ],
    },
    {
      key: "gls-grand-galvez",
      name: "Grand Galvez",
      website: "https://grandgalvez.com/",
      capacity: 300,
      perGuestCost: 45,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "The 'Queen of the Gulf' — a six-story Spanish Colonial Revival hotel that opened in 1911, built along Galveston's new seawall as part of the city's tourism rebuild after the 1900 hurricane. It has operated as a hotel since the day it opened, decades after Texas's 1865 emancipation, so there's no plantation or residential-slavery history to weigh. The oldest historic beachfront hotel on the Texas coast, with ballroom and lawn spaces for up to 300 guests and on-site lodging for the wedding party and guests. A per-person food & beverage minimum of $45 is reported; perGuestCost above uses that figure, marked estimated pending a date-specific quote.",
      availabilityNotes: "Contact the hotel's events team via grandgalvez.com for a date-specific quote.",
      sourceUrls: [
        "https://grandgalvez.com/history/",
        "https://en.wikipedia.org/wiki/Hotel_Galvez",
        "https://www.weddingsinhouston.com/vendor/Grand-Galvez/",
      ],
    },
    {
      key: "gls-tremont-house",
      name: "The Tremont House, a Tribute Portfolio Hotel",
      website: "https://www.marriott.com/en-us/hotels/hougt-the-tremont-house-a-tribute-portfolio-hotel/overview/",
      capacity: 500,
      rentalFee: 6000,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A boutique hotel in a restored 1879 landmark building in the heart of The Strand Historic District — built and operated as a hotel from the start, 14 years after Texas emancipation, so there's no plantation or residential-slavery history to weigh. A European-style property with eight-plus event spaces holding up to 500 guests, recently renovated (2022, $22M) as part of Marriott's Tribute Portfolio. Wedding pricing is reported starting at $6,000, plus a separate $500 ceremony fee and a $250-$350 setup fee; rentalFee above is that published starting figure, marked estimated.",
      availabilityNotes: "Contact the hotel's events team for a date-specific quote.",
      sourceUrls: [
        "https://www.weddingsinhouston.com/blog/say-i-do-at-the-tremont-house-a-one-of-a-kind-wedding-venue-in-galvestons-strand-district/",
        "https://www.wyndhamhotels.com/content/dam/property-assets/en-us/gr/us/tx/galveston/18121/other/18121_weddings_wedding_menu.pdf",
        "https://www.theknot.com/marketplace/the-tremont-house-a-tribute-portfolio-hotel-by-marriott-galveston-tx-2056553",
      ],
    },
    {
      key: "gls-bayside-event-center",
      name: "Bayside Event Center",
      website: "https://baysideeventcenter.com/weddings/",
      capacity: 150,
      rentalFee: 10000,
      estimated: true,
      styleNotes:
        "A modern waterfront event center and lodge built over the water on Offatt's Bayou — a purpose-built event venue with no historic-estate history to weigh. Galveston's only private over-water venue, voted the island's #1 wedding venue by GalvestonCom in 2023 and 2024; the Grand Ballroom, a covered bar deck, and an open-air ceremony deck hold up to 150 guests, with an on-site 3,800 sq ft lodge sleeping 20. Packages start at $5,500, with a full ceremony-and-reception wedding starting at $10,000; rentalFee above is that full-wedding starting figure, marked estimated.",
      availabilityNotes: "Contact the venue directly via baysideeventcenter.com for a date-specific quote.",
      sourceUrls: [
        "https://baysideeventcenter.com/weddings/",
        "https://www.theknot.com/marketplace/bayside-event-center-galveston-tx-665137",
        "https://www.weddingwire.com/biz/waterfront-event-center-galveston-galveston/b8cc3a72294b3262.html",
      ],
    },
  ],
  scenario: {
    fixedCosts: 22550,
    perGuestCost: 100,
    travelCostPerGuest: 1055,
    attendanceRate: 0.80,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes The Tremont House's $6,000 starting wedding price as the venue-rental component — a mid-market, guest-count-appropriate pick over Grand Galvez's much larger property — and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items: planner $2,100, photographer $3,000 + partial videographer allowance, flowers $2,800, DJ $1,800, stationery ~$600, attire+beauty ~$2,900, transportation $1,100, wedding bands ~$1,400), for $22,550. perGuestCost ($100) is Bayside Event Center's own $10,000 full-wedding starting price divided by 100 guests — a direct, sourced floor rather than a national average, the same method used for New Orleans' Board of Trade F&B minimum. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
