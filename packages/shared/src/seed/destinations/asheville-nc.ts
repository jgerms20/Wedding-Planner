import type { DestinationSeed } from "../types";

/**
 * Asheville, NC.
 *
 * A Southern Appalachian domestic finalist: a walkable arts-and-food downtown
 * ringed by the Blue Ridge Mountains, no passport, and a real regional
 * airport. Western North Carolina has real plantation and enslaved-labor
 * history in the broader region, and Asheville itself predates the Civil War
 * (unlike the purely post-war resort towns of Highlands and Cashiers further
 * south), so every candidate venue below was checked individually against the
 * standing rule in .claude/skills/wedding-research/SKILL.md rather than
 * assumed safe just for being "in the mountains." All four venues below
 * turned out to be purpose-built commercial or industrial buildings (a 1929
 * Art Deco cafeteria, a former steel foundry, a LEED-certified modern office
 * building, and a modern hotel) rather than converted plantation-era
 * residences, so none carry the disqualifying history the rule targets.
 * Asheville is also still rebuilding tourism infrastructure after Hurricane
 * Helene (September 2024); by spring 2028 the region is expected to be well
 * into recovery, but it's worth confirming venue status closer to the date.
 * Numbers below are sourced where a URL is given; anything derived is
 * flagged `estimated: true` (venues) or explained in a note.
 */
export const ashevilleNc: DestinationSeed = {
  key: "asheville-nc",
  name: "Asheville, NC",
  country: "United States",
  countryCode: "US",
  region: "Downtown Asheville, River Arts District, Biltmore Village",
  rank: 18,
  whyHere:
    "Joshua & Janel wanted a mountain option with a real arts-and-food scene rather than a generic lodge — downtown Asheville's breweries, galleries, and restaurants plus Blue Ridge views nearby — fully domestic, with a real regional airport, and priced well below the coastal finalists.",
  notes:
    "Attendance is estimated at 0.83, in the upper-middle of the 80-85% 'local wedding' attendance band (pix.wedding; destify.com) — domestic, no passport, and Asheville is a genuinely popular tourist draw that guests are likely to be enthusiastic about, but Asheville Regional's 26 nonstop destinations is a mid-sized network (fewer one-hop options than New Orleans or DC) and the region's post-Hurricane-Helene rebuilding is worth a status check closer to the date.",
  travelCostPerGuestEstimate: 1010,
  flightCostEstimate: 470,
  lodgingPerNightEstimate: 180,
  attendanceRateEstimate: 0.83,
  weatherNotes:
    "Asheville spring warms steadily from a cool start: March averages a high in the mid-to-upper 50s°F with lows in the upper 30s, climbing through the 60s in April to highs near 80°F by late May, with lows rising in step (accuweather.com; weatherspark.com). There's roughly a 41% chance of rain on an average March day (about 0.42in), and afternoon mountain showers are common through spring, but they're typically brief — worth a tented backup for any outdoor ceremony rather than a full indoor plan.",
  legalNotes:
    "Both parties apply together, in person, at the Buncombe County Register of Deeds office (205 College Street), completing the online application before arriving. Bring valid photo ID and Social Security cards for each party. The fee is $60. North Carolina imposes no waiting period between issuance and the ceremony, and the license is valid for 60 days from issuance, usable anywhere in the state. Verify with the local authority or an attorney.",
  seasonNotes:
    "Asheville's spring calendar is full of smaller festivals rather than one single citywide draw: Holi Hai (color festival), Asheville BuskerFest, the NC Arboretum's Orchid Festival, the Asheville Herb Festival, and the long-running Asheville Shakespeare Festival's season opener all fall inside March-May, alongside Asheville Symphony Masterworks dates in March, April, and May (exploreasheville.com). None carries New Orleans-Jazz-Fest-scale crowds or citywide hotel-rate spikes, but it's worth checking the actual spring-2028 festival calendar against any date hold, especially for a downtown venue. The region's peak tourist season is fall (leaf season), not spring, so March-May generally runs at lower demand and pricing than October.",
  travelNotes:
    "Asheville Regional Airport (AVL) offers nonstop service to 26 destinations via Allegiant, American, Delta, Sun Country, and United, with Atlanta, Charlotte, and Chicago as the busiest routes and nonstop service to New York (American, Delta) and Newark (Allegiant, United) covering two of the biggest Northeast hubs (avltoday.6amcity.com). Most other East Coast guests would connect through Atlanta or Charlotte rather than fly nonstop. There's no practical drive alternative for most of the list (a drive from the Northeast runs well over 10 hours), so this is a fly-in wedding for nearly everyone. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average domestic round-trip fare, the same national figure used across the other US finalists) + 3 nights x $180/night (close to BudgetYourTrip's $182 mid-range-hotel average for Asheville, since a wedding block skews toward mid-range inventory) = $1,010 per guest.",
  sourceUrls: [
    "https://www.buncombenc.gov/502/Apply-for-a-Marriage-License",
    "https://www.accuweather.com/en/us/asheville/28801/march-weather/329813",
    "https://weatherspark.com/m/17114/3/Average-Weather-in-March-in-Asheville-North-Carolina-United-States",
    "https://www.exploreasheville.com/article/top-spring-events-and-festivals-asheville",
    "https://www.exploreasheville.com/article/how-asheville-doing-one-year-after-helene",
    "https://avltoday.6amcity.com/nonstop-flights-asheville-nc",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/asheville-4453066",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "avl-circa-29",
      name: "Circa 29",
      website: "https://www.circa29avl.com/",
      capacity: 150,
      rentalFee: 4000,
      estimated: true,
      styleNotes:
        "A speakeasy-style event space in the lower level of the historic S&W Building, an Art Deco cafeteria building designed by Douglas Ellington and completed in 1929 — a purpose-built commercial cafeteria on the National Register of Historic Places, not a residence, so there's no plantation-era history to weigh. A flexible lounge-style layout for 25-150 guests with built-in furnishings, a bar, and a stage. Published rental rates run $3,000-$4,000 Monday-Thursday/Sunday and $4,000-$5,000 Friday-Saturday, including AV, furniture, and glassware; rentalFee above is the overall range's midpoint, marked estimated.",
      availabilityNotes: "Contact the venue directly via circa29avl.com for a date-specific quote.",
      sourceUrls: [
        "https://www.circa29avl.com/about-us",
        "https://www.romanticasheville.com/listing/wedding/circa-29.htm",
        "https://swmarketavl.com/downtown-asheville-event-venue-circa-29/",
      ],
    },
    {
      key: "avl-foundry-hotel",
      name: "The Foundry Hotel Asheville",
      website: "https://www.foundryasheville.com/wedding-venues-asheville-nc",
      capacity: 100,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A luxury boutique hotel in a transformed early-20th-century steel foundry and woodworking shop (the original Asheville Foundry and Supply Company) in downtown Asheville — a purpose-built industrial building, not a residence, so there's no plantation-era history to weigh. Industrial-chic exposed brick and windows throughout; the Savoy Ballroom seats up to 100, with a bocce lawn and garden available for ceremonies, plus on-site luxury lodging for the wedding party. No published wedding package price was found; contact the hotel directly for a quote.",
      availabilityNotes: "Contact the hotel's events team via foundryasheville.com for a date-specific quote.",
      sourceUrls: [
        "https://www.foundryasheville.com/wedding-venues-asheville-nc",
        "https://www.hilton.com/en/hotels/avlcuqq-the-foundry-hotel-asheville/events/",
        "https://www.weddingwire.com/biz/the-foundry-hotel-asheville/89aeb342f2c213bc.html",
      ],
    },
    {
      key: "avl-the-collider",
      name: "The Collider",
      website: "https://www.exploreasheville.com/meetings/asheville/listing/unique-venues/collider",
      capacity: 200,
      estimated: true,
      styleNotes:
        "A LEED-certified modern event and office space in downtown Asheville with an Overlook Lounge offering 270-degree mountain and city views — built as a climate-focused innovation hub, not a residence, so there's no plantation-era history to weigh at all. Configurable theater-style space holds up to 190-200. Reported event pricing runs $650-$2,500 per event, which appears to reflect shorter meeting-style bookings rather than a full wedding-day rental; treat as a starting reference pending a wedding-specific quote, marked estimated.",
      availabilityNotes: "Contact the venue directly via its Explore Asheville listing or Cvent page for a date-specific, wedding-day quote.",
      sourceUrls: [
        "https://www.exploreasheville.com/meetings/asheville/listing/unique-venues/collider",
        "https://www.cvent.com/venues/asheville/special-event-venue/the-collider/venue-c445152f-224a-4a96-a54d-56fb17337b3c",
        "https://www.uniquevenues.com/venue/the-collider-asheville/",
      ],
    },
    {
      key: "avl-hilton-biltmore-park",
      name: "Hilton Asheville Biltmore Park",
      website: "https://www.hilton.com/en/hotels/avlbphf-hilton-asheville-biltmore-park/events/",
      capacity: 200,
      rentalFee: 6500,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A modern full-service hotel in the Biltmore Park Town Square development south of downtown — no historic-estate history to weigh, since it was built and operated as a hotel from the outset. The Pisgah Ballroom hosts 50-200 guests, with additional outdoor space and on-site lodging for the wedding party and guests. Reported wedding pricing runs $1,000-$12,000 depending on package and guest count; rentalFee above is the midpoint, marked estimated.",
      availabilityNotes: "Contact the hotel's events team via hilton.com for a date-specific quote.",
      sourceUrls: [
        "https://www.hilton.com/en/hotels/avlbphf-hilton-asheville-biltmore-park/events/",
        "https://www.romanticasheville.com/listing/wedding/hilton-biltmore-park-weddings-asheville.htm",
        "https://www.eventective.com/asheville-nc/hilton-asheville-biltmore-park-507581.html",
      ],
    },
  ],
  scenario: {
    fixedCosts: 20550,
    perGuestCost: 100,
    travelCostPerGuest: 1010,
    attendanceRate: 0.83,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes Circa 29's $4,000 midpoint venue rental — a guest-count-appropriate downtown pick over the larger hotel venues — and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items: planner $2,100, photographer $3,000 + partial videographer allowance, flowers $2,800, DJ $1,800, stationery ~$600, attire+beauty ~$2,900, transportation $1,100, wedding bands ~$1,400), for $20,550. perGuestCost ($100) blends The Knot's national $80/guest catering average with a modest premium for Asheville's food-forward restaurant scene, plus roughly $10-15/guest for cake, favors, and incidental rentals, since no venue-published F&B minimum was found for a guest-count-appropriate Asheville venue. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
