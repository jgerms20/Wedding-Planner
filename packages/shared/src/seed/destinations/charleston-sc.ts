import type { DestinationSeed } from "../types";

/**
 * Charleston, SC.
 *
 * Added at the couple's explicit request: real Lowcountry personality (harbor,
 * historic downtown, real Southern food and hospitality) with domestic
 * simplicity (no passport, a real regional airport). Charleston's wedding
 * market leans hard on converted 1700s-1800s estates whose "historic charm"
 * marketing is, in a lot of cases, plantation or urban-slaveholder history
 * wearing a gentler name — every venue below was individually checked against
 * that (see each venue's styleNotes) before it went in, per the standing rule
 * in .claude/skills/wedding-research/SKILL.md. Several well-known Charleston
 * venues were deliberately left out for exactly that reason: William Aiken
 * House and the Aiken-Rhett House (Gov. William Aiken Jr. was one of South
 * Carolina's largest slaveholders, owning 700-900+ enslaved people, and the
 * Aiken-Rhett property has documented, excavated slave dwellings on-site),
 * the Gadsden House (built by Christopher Gadsden, whose Gadsden's Wharf was
 * one of the largest points of entry for the trans-Atlantic slave trade into
 * North America), and the Historic Rice Mill (a genuine 1861 industrial
 * building rather than a residence, but Charleston's antebellum rice economy
 * it was built to serve ran on enslaved labor start to finish, not a
 * borderline case worth forcing in for the waterfront-industrial aesthetic).
 * Boone Hall, Middleton Place, Magnolia Plantation and Lowndes Grove are
 * literal former plantations and were never considered. Numbers below are
 * sourced where a URL is given; anything derived is flagged `estimated: true`
 * (venues) or explained in a note.
 */
export const charlestonSc: DestinationSeed = {
  key: "charleston-sc",
  name: "Charleston, SC",
  country: "United States",
  countryCode: "US",
  region: "Downtown peninsula, Sullivan's Island, Isle of Palms, Johns Island",
  rank: 10,
  whyHere:
    "Joshua & Janel asked for Charleston as a domestic finalist with real Lowcountry character — harbor views, historic downtown streets, and a food-and-hospitality scene with a strong sense of place — without the passport, visa, or multi-leg-flight logistics of an international destination.",
  notes:
    "Attendance is estimated at 0.83, near the top of the 80-85% 'local wedding' attendance band (pix.wedding; destify.com) — domestic, no passport, with a real regional airport, though slightly below DC/New Orleans because Charleston International has fewer nonstop routes (50-56 depending on the source) than either of those hubs.",
  travelCostPerGuestEstimate: 1130,
  lodgingPerNightEstimate: 220,
  attendanceRateEstimate: 0.83,
  weatherNotes:
    "Charleston spring warms steadily and is one of the area's best-weather stretches: average highs run about 70°F in March, 76°F in April, and 83°F in May, with lows climbing from the upper 40s to low 60s over the same span (weatherspark.com; pamharringtonexclusives.com). Rain is possible but not the defining risk the way summer thunderstorms are; a spring outdoor ceremony is a reasonable bet with a simple tented backup, and the season runs well ahead of Atlantic hurricane season (June-November).",
  legalNotes:
    "Both parties apply together, in person, at the Charleston County Probate Court (or another SC county's probate court — no SC residency requirement). Bring valid photo ID (driver's license, passport, or certified birth certificate); anyone previously married should bring the final divorce decree or a deceased spouse's death certificate. The fee is $70 by credit card plus a transaction fee, non-refundable. South Carolina imposes a 24-hour waiting period between application and release of the license, and the completed license is typically emailed within two business days of the ceremony being performed. Only ministers of the Gospel, accepted rabbis, and SC notaries may perform the ceremony. Verify with the local authority or an attorney.",
  seasonNotes:
    "March-May is Charleston's peak spring travel season — Historic Garden Week-style azalea/dogwood bloom, mild weather, and the run-up to summer humidity all drive demand, with April hotel rates the highest of the spring months. Charleston also hosts Spoleto Festival USA (late May into early June), a major citywide arts festival that tightens hotel inventory and pushes rates up if a date falls inside or near it — worth checking Spoleto's actual spring-2028 dates against any date hold. Early-to-mid March, before azalea season and well ahead of Spoleto, is the best-value window.",
  travelNotes:
    "Charleston International Airport (CHS) offers nonstop service to roughly 50-56 destinations across the US and into Canada via 11-12 airlines, with the busiest routes running to Atlanta, Charlotte, and New York-JFK (iflychs.com) — a real regional airport, though with fewer nonstop options than DC or New Orleans for guests outside its main corridors. There's no practical rail or drive alternative for most Northeast guests (a drive from New York runs 12+ hours), so this is a fly-in wedding for nearly everyone, typically a single nonstop hop from East Coast hubs. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average domestic round-trip fare, the same national figure used across the other US finalists) + 3 nights x $220/night (a blended spring estimate between BudgetYourTrip's $199 one-night average and Charleston's reported April peak, since a wedding block skews toward 3-star inventory rather than the luxury end) = $1,130 per guest.",
  sourceUrls: [
    "https://www.charlestoncounty.gov/departments/probate/marriage-license.php?r=438",
    "https://www.mobilemarriage.com/how-to-get-married-in-charleston-sc",
    "https://weatherspark.com/s/19488/0/Average-Spring-Weather-in-Charleston-South-Carolina-United-States",
    "https://pamharringtonexclusives.com/blog/charleston-sc-climate/",
    "https://iflychs.com/nonstopdestinations/",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/charleston-4574324",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "chs-gaillard-center",
      name: "Charleston Gaillard Center",
      website: "https://gaillardcenter.org/venue-rental/",
      capacity: 400,
      rentalFee: 30000,
      fbMinimum: 15000,
      inHouseCatering: true,
      estimated: true,
      styleNotes:
        "A purpose-built 2015 performing-arts and civic center in the heart of downtown Charleston — genuinely no residential or plantation-era history to weigh, since the entire building was constructed from the ground up as a public venue. The Grand Ballroom holds a combined ceremony-and-reception layout for up to 400 guests (up to 800-1,000+ for non-wedding events). Published pricing starts around $30,000, with a $15,000 food & beverage minimum reported for the Double Ballroom specifically; a 24% service charge plus tax applies. rentalFee is the published starting figure, marked estimated pending a date-specific quote.",
      availabilityNotes: "Contact the Gaillard Center's private events team via gaillardcenter.org for a date-specific quote.",
      sourceUrls: [
        "https://gaillardcenter.org/venue-rental/",
        "https://gaillardcenter.org/venue-rental/wedding-faqs/",
        "https://www.theknot.com/marketplace/charleston-gaillard-center-charleston-sc-1070237",
      ],
    },
    {
      key: "chs-trinity-hall",
      name: "Trinity Hall",
      website: "https://trinityhallchs.com/weddings",
      capacity: 300,
      rentalFee: 3500,
      estimated: true,
      styleNotes:
        "A brand-new (opened 2021) event hall built by the Greek Orthodox Church of the Holy Trinity to house their long-running Lowcountry festival — a fully modern building, not a converted historic residence, so no plantation-era history applies at all. The 4,981 sq ft Main Hall (high coffered ceilings, floor-to-ceiling windows) seats up to 300 for a meal or 175 with a dance floor, with on-site parking and a restaurant-style catering kitchen. Published wedding packages run $2,000-$5,000; rentalFee above is the midpoint, marked estimated.",
      availabilityNotes: "Contact the venue directly via trinityhallchs.com for a date-specific quote.",
      sourceUrls: [
        "https://trinityhallchs.com/weddings",
        "https://www.theknot.com/marketplace/trinity-hall-charleston-sc-2045135",
      ],
    },
    {
      key: "chs-alhambra-hall",
      name: "Alhambra Hall",
      website: "https://mountpleasantvenues.com/alhambra-hall/",
      capacity: 200,
      rentalFee: 2000,
      estimated: true,
      styleNotes:
        "A 1937 waterfront event hall in Mount Pleasant/Sullivan's Island, built from salvaged timber after the old ferry-wharf buildings it replaced were made obsolete by the 1929 Grace Memorial Bridge — genuine local transportation history, not a residence or agricultural estate, so there's no plantation or domestic-slavery history to weigh. Town-owned and run as a public recreational facility (160+ events a year); features a gabled roof, wraparound porches, a double staircase and a vaulted ceiling, plus a recently added stone patio and harbor views. rentalFee is an estimated starting figure for a municipal event hall of this size, pending a date-specific quote.",
      availabilityNotes: "Contact the Town of Mount Pleasant's events office via mountpleasantvenues.com for a date-specific quote and rental terms.",
      sourceUrls: [
        "https://mountpleasantvenues.com/alhambra-hall/",
        "https://mountpleasantmagazine.com/2025/remembering/history-of-the-newly-renovated-alhambra-hall-a-generational-gem/",
        "https://www.novelaweddings.com/wedding-venues/alhambra-hall-charleston",
      ],
    },
    {
      key: "chs-cedar-room",
      name: "The Cedar Room",
      website: "https://www.thecedarroom.com/weddings/",
      capacity: 550,
      inHouseCatering: false,
      estimated: true,
      styleNotes:
        "A 13,000 sq ft event space inside Charleston's former American Cigar Company factory on East Bay Street along the Cooper River, built around 1880 — an industrial building constructed and operated after the end of slavery in the US, so it carries none of the antebellum-era risk that rules out several other historic Charleston venues. Exposed wood columns, original hardwood floors and floor-to-ceiling windows inside; an open-air courtyard seats another 150-180 outdoors. Holds up to 550 guests overall, 300 for a seated dinner. No rental fee is published; catering is outside/BYO-caterer, which is typical for this venue type.",
      availabilityNotes: "Contact the venue directly via thecedarroom.com for a date-specific quote and approved-caterer list.",
      sourceUrls: [
        "https://www.thecedarroom.com/weddings/",
        "https://www.wedding-spot.com/venue/6788/the-cedar-room/",
        "https://www.charlestoncvb.com/blog/the-cedar-room",
      ],
    },
    {
      key: "chs-harbour-club-westedge",
      name: "Harbour Club at WestEdge",
      website: "https://myharbourclub.com/weddings/",
      capacity: 300,
      estimated: true,
      styleNotes:
        "A 7th-floor event space in the WestEdge development, a modern mixed-use redevelopment on the Charleston peninsula along the Ashley River — the building itself is recent construction, not a historic estate, so no plantation-era history applies. Panoramic Lowcountry and river views from the Rivers Ballroom and an outdoor terrace; holds up to 300 for a reception, 250 seated for a full wedding. No flat rental fee is published — pricing runs through a food & beverage minimum that scales with guest count.",
      availabilityNotes: "Contact the venue directly via myharbourclub.com for a date-specific quote and F&B minimum.",
      sourceUrls: [
        "https://myharbourclub.com/weddings/",
        "https://www.cvent.com/venues/charleston/special-event-venue/harbour-club-at-westedge/venue-b05bf5d3-a698-4a48-8bc1-7e0d18a54d59",
        "https://weddingvenuescharleston.com/venues/harbour-club/",
      ],
    },
    {
      key: "chs-parcel-32",
      name: "Parcel 32",
      website: "https://www.pphgcharleston.com/venues/parcel-32/",
      capacity: 75,
      fbMinimum: 5500,
      inHouseCatering: true,
      estimated: true,
      styleNotes:
        "A restored 1837 Charleston single house on Upper King Street whose real, documented history is commercial, not residential-plantation: the building housed the peninsula's highest-volume bakery, run by the Amme family, for 75 years. A courtyard, living room, parlor, bar, sunroom and second-floor open-air piazza make it a genuine indoor/outdoor combo at an intimate scale (up to 75 guests) — noticeably smaller than the other venues on this list, worth flagging for a ~100-guest target. Friday-Sunday food & beverage minimum runs $5,000-$6,000; fbMinimum above is the midpoint, marked estimated.",
      availabilityNotes: "Contact PPHG's events team via pphgcharleston.com for a date-specific quote and weekday minimums.",
      sourceUrls: [
        "https://www.pphgcharleston.com/venues/parcel-32/",
        "https://www.herecomestheguide.com/wedding-venues/south-carolina/parcel-32",
        "https://www.spellboundevents.com/blog/2021/06/16/charleston-wedding-venue-highlight-parcel-32",
      ],
    },
    {
      key: "chs-charleston-distilling-co",
      name: "Charleston Distilling Co.",
      website: "https://charlestondistilling.com/event-space-rental",
      capacity: 100,
      rentalFee: 2000,
      estimated: true,
      styleNotes:
        "A working craft distillery on Johns Island (founded 2011) in a 10,000 sq ft facility built to produce spirits, not as a residence — no plantation-era history to weigh. The 2,100 sq ft tasting room centers on a 45-foot copper still; a grassy lawn accommodates a large tent and a back patio has lakeside views and a fire pit. Capacity of 100 lines up closely with the couple's guest target. Published pricing starts at $2,000; rentalFee above is that starting figure, marked estimated pending guest count and package.",
      availabilityNotes: "Contact the venue directly via charlestondistilling.com for a date-specific quote.",
      sourceUrls: [
        "https://charlestondistilling.com/event-space-rental",
        "https://www.zola.com/wedding-vendors/wedding-venues/charleston-distilling-co",
      ],
    },
    {
      key: "chs-carolina-girl-yacht",
      name: "The Carolina Girl Yacht",
      website: "https://carolinagirlevents.com/weddings-2/",
      capacity: 110,
      rentalFee: 13000,
      estimated: true,
      styleNotes:
        "A 100-foot luxury yacht permanently docked in Charleston Harbor — a boat, so there's no land-based history to weigh at all, and it offers a genuinely different reception personality (moving or stationary harbor views, enclosed rooms plus open decks) than any fixed venue on this list. Comfortable capacity is reported in the 85-110 range depending on layout (one source cites up to 125, another up to 150 for a standing event). Reported spend for most weddings runs $13,000-$18,000, with smaller weddings starting around $7,720 for 50 guests; rentalFee above is the low end of the typical-spend range, marked estimated.",
      availabilityNotes: "Contact the venue directly via carolinagirlevents.com for a date-specific quote and guest-count-based pricing.",
      sourceUrls: [
        "https://carolinagirlevents.com/pricing-plans/",
        "https://www.wedding-spot.com/venue/6975/the-carolina-girl-yacht/",
        "https://charlestonweddingsmag.com/feature/smooth_sailing",
      ],
    },
    {
      key: "chs-wild-dunes-resort",
      name: "Wild Dunes Resort — Sweetgrass Inn Rooftop",
      website: "https://www.wilddunesresort.com/gather/weddings/venues/",
      capacity: 500,
      perGuestCost: 115,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A modern beachfront resort on Isle of Palms — no historic-estate history to weigh, since Wild Dunes was built and developed as a golf-and-beach resort community, not a converted plantation. The Sweetgrass Inn rooftop offers floor-to-ceiling windows and panoramic Atlantic Ocean and marsh views over a 6,764 sq ft ballroom plus 2,200 sq ft of oceanfront outdoor space — a real indoor/outdoor combo directly on the water. Fifteen private event spaces total, with beach and Grand Pavilion ceremony options as alternatives. Published brunch-wedding packages start at $115/guest (35-guest minimum, 10:30am ceremony + 3-hour reception); perGuestCost above uses that published floor, marked estimated since full evening packages aren't published.",
      availabilityNotes: "Contact the resort directly via wilddunesresort.com for a date-specific quote and evening-package pricing.",
      sourceUrls: [
        "https://www.wilddunesresort.com/gather/weddings/venues/",
        "https://www.theknot.com/marketplace/wild-dunes-resort-isle-of-palms-sc-740055",
        "https://www.hyatt.com/destination-by-hyatt/en-US/wilddunes-charleston-island-resort/meetings-weddings/weddings",
      ],
    },
  ],
  scenario: {
    fixedCosts: 20750,
    perGuestCost: 130,
    travelCostPerGuest: 1130,
    attendanceRate: 0.83,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes Trinity Hall's $3,500 midpoint venue rental — a mid-market, guest-count-appropriate pick rather than the Gaillard Center's much larger $30,000 figure — and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items: planner $2,100, photographer $3,000 + partial videographer allowance, flowers $2,800, DJ $1,800, stationery ~$600, attire+beauty ~$2,900, transportation $1,100, wedding bands ~$1,400), rounded to $20,750. perGuestCost ($130) blends The Knot's national $80/guest catering average upward to reflect Charleston's food-forward market and Wild Dunes' own $115/guest published package floor, plus roughly $10/guest for cake, favors and incidental rentals. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
