import type { DestinationSeed } from "../types";

/**
 * 30A / Rosemary Beach, FL (Florida Panhandle).
 *
 * A domestic Gulf Coast finalist along Scenic Highway 30A. Like Alabama's
 * Gulf Coast, the Florida Panhandle has real antebellum/plantation history
 * further inland and around the older port towns, which is why this
 * destination was researched with the standing rule in
 * .claude/skills/wedding-research/SKILL.md front of mind. But 30A's
 * beach towns themselves carry essentially none of that risk: Rosemary
 * Beach (founded 1995) and WaterColor (founded 1998) are both recent
 * New Urbanist developments built from raw coastal land, not converted
 * historic estates, so neither the towns nor any venue inside them can
 * carry a plantation or enslaved-labor history — there was no settlement
 * here before the developments themselves. All three venues below (The
 * Pearl Hotel, Cuvee 30A, and WaterColor Inn & Resort) are recent
 * construction with no residential or agricultural-estate history of any
 * kind. Numbers below are sourced where a URL is given; anything derived is
 * flagged `estimated: true` (venues) or explained in a note.
 */
export const thirtyARosemaryBeachFl: DestinationSeed = {
  key: "30a-rosemary-beach-fl",
  name: "30A / Rosemary Beach, FL",
  country: "United States",
  countryCode: "US",
  region: "Rosemary Beach, Alys Beach, WaterColor, Seaside (Scenic Highway 30A, South Walton)",
  rank: 15,
  whyHere:
    "Joshua & Janel asked for 30A as a domestic beach finalist with a distinct, upscale New Urbanist look — pastel cottages, walkable green spaces, sugar-white sand — and a wedding infrastructure genuinely built for events, no passport required, for a ~100-person list mostly on the East Coast.",
  notes:
    "Attendance is estimated at 0.80, the bottom of the 80-85% 'local wedding' attendance band (pix.wedding; destify.com) — domestic and no passport, but 30A's nearest airport (Northwest Florida Beaches International) has a smaller nonstop network than any other US finalist and this is the single most expensive lodging market of the group, both of which weigh against attendance relative to the Texas and Alabama options.",
  travelCostPerGuestEstimate: 1550,
  lodgingPerNightEstimate: 360,
  attendanceRateEstimate: 0.80,
  weatherNotes:
    "30A spring is mild and increasingly warm: March averages a 70°F high / 49°F low, April brings highs around 74°F/lows around 63°F, and May reaches highs near 83°F/lows near 67°F (timeanddate.com; weather-and-climate.com). The whole March-May window sits comfortably before Atlantic hurricane season (June 1-November 30, per NOAA), making spring one of the more reliable stretches for an outdoor beachfront ceremony.",
  legalNotes:
    "Both parties apply together, in person, at the Walton County Clerk of Courts (either the DeFuniak Springs office or the South Walton Courthouse Annex at 31 Coastal Centre Blvd, Santa Rosa Beach, closer to 30A) with valid government-issued photo ID and a Social Security number for each party; no appointment is needed and the process typically takes under 30 minutes. The fee is $86, reduced to $61 with an approved premarital course. Florida imposes a 3-day waiting period between issuance and the ceremony for Florida residents, but it does not apply to out-of-state applicants — since Joshua and Janel would both be non-residents, they can marry the same day the license is issued. The license is valid for 60 days after issuance. Verify with the local authority or an attorney.",
  seasonNotes:
    "March-May is 30A's spring shoulder season — milder rates than the June-August peak, when even modest cottages run $450-700/night and larger homes $700-1,200/night — making it one of the better-value windows to book here, though rates still climb steadily as the season approaches summer (30a.com). There's no major citywide festival inside the March-May window comparable to SXSW or Fiesta San Antonio; the area's main event calendar (art festivals, the 30A Wine Festival) is concentrated in fall and winter, so a spring date mainly needs to be booked early for inventory rather than routed around a specific event.",
  travelNotes:
    "Northwest Florida Beaches International (ECP), about 16 miles northwest of Panama City and roughly 30-40 minutes from Rosemary Beach, offers nonstop service on American, Delta, Southwest, and United to major hubs including Atlanta, Chicago, Dallas, Denver, Houston, and DC, plus seasonal routes to Philadelphia, Nashville, St. Louis, and Baltimore; Destin-Fort Walton Beach (VPS), farther west, is a secondary option for guests coming from cities VPS serves more directly (iflybeaches.com; myscenicstays.com). Neither airport has the nonstop breadth of Austin-Bergstrom or even Pensacola, so more of this guest list will connect through a hub, and a rental car or shuttle is needed for the final leg from either airport. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average domestic round-trip fare, the same national figure used across the other US finalists) + 3 nights x $360/night (near the low end of Rosemary Beach's reported $300-1,500/night vacation-rental range and close to Tripadvisor's cited $359 starting rate for the area's limited boutique-hotel inventory, since 30A has almost no traditional hotel stock and a wedding block here fills vacation-rental homes and condos rather than hotel rooms) = $1,550 per guest, the highest of the five Texas/Gulf Coast finalists and reflecting 30A's position as the most upscale option in this group.",
  sourceUrls: [
    "https://waltonclerkfl.gov/marriage",
    "https://waltonclerkfl.gov/index.asp?SEC=07BB612A-2156-4194-ABBB-AF595D48B9E2&DE=0B014DDC-5319-43CE-9A46-A074CBC94E70",
    "https://www.timeanddate.com/weather/@4172094/climate",
    "https://weather-and-climate.com/santa-rosa-beach-florida-us-March-averages",
    "https://www.noaa.gov/tropical-cyclone-climatology",
    "https://30a.com/rosemary-beach-rentals/",
    "https://www.iflybeaches.com/destinations",
    "https://myscenicstays.com/vacation-blog/getting-here-non-stop-flights-to-pensacola-destin-and-panama-city-beach",
    "https://30a.com/airports/",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://www.tripadvisor.com/Hotels-g2223281-Rosemary_Beach_Florida-Hotels.html",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "30a-the-pearl-hotel",
      name: "The Pearl Hotel",
      website: "https://www.thepearlrb.com/groups/weddings",
      capacity: 100,
      perGuestCost: 290,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A boutique hotel in the heart of Rosemary Beach, a master-planned New Urbanist town founded in 1995 on previously undeveloped coastal land — there is no pre-development history on this site to weigh at all. The rooftop venue seats up to 75 for a ceremony and 100 for a reception, with Gulf views, fireside lounges, and an outdoor bar; the all-inclusive package covers food, beverage, tables, chairs, linens, and cake. Pricing starts at $14,500 for 50 guests with a 50-70 guest minimum depending on date; perGuestCost above ($290) is that starting package divided by 50 guests, marked estimated since the per-guest rate for a 100-guest count wasn't separately published.",
      availabilityNotes: "Contact the venue via Weddings@ThePearlRB.com or (850) 460-9040 for a date-specific quote.",
      sourceUrls: [
        "https://www.thepearlrb.com/groups/weddings",
        "https://www.weddingwire.com/biz/the-pearl-hotel-rosemary-beach/ac70be6dd98a434b.html",
        "https://www.herecomestheguide.com/wedding-venues/florida/the-pearl-hotel",
      ],
    },
    {
      key: "30a-cuvee-30a",
      name: "Cuvee 30A",
      website: "https://www.eventective.com/rosemary-beach-fl/cuvee-30a-678722.html",
      capacity: 100,
      estimated: true,
      styleNotes:
        "An event space in Rosemary Beach, the same recently developed (founded 1995) master-planned town as The Pearl Hotel — no pre-development or residential history to weigh. Capacity of 100 lines up closely with the couple's guest target; published pricing for parties runs $750-4,750 for 50 guests, scaling with guest count, season, and service level.",
      availabilityNotes: "Contact the venue via its Eventective listing or directly for a date-specific quote.",
      sourceUrls: [
        "https://www.eventective.com/rosemary-beach-fl/cuvee-30a-678722.html",
        "https://www.eventective.com/rosemary-beach-fl/wedding-venues/",
      ],
    },
    {
      key: "30a-watercolor-inn",
      name: "WaterColor Inn & Resort",
      website: "https://www.watercolorresort.com/groups/weddings",
      capacity: 200,
      perGuestCost: 800,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A resort at the heart of WaterColor, a master-planned New Urbanist community founded in 1998 on previously undeveloped coastal land along Western Lake — no pre-development or residential history to weigh, and the resort's own name for the space, the WaterColor Lakehouse, reflects its purpose-built, cedar-and-chandelier event-space design rather than a converted historic building. Western Lake Park hosts outdoor weddings up to 200 guests (with a 75-100 guest minimum depending on date), and the all-inclusive package covers ceremony and reception space, food and a 4-hour open bar, a custom cake, tables/chairs, service staff, and a one-night stay for the couple. Pricing starts at $80,000; perGuestCost above is that floor divided by a 100-guest count, marked estimated, and clearly the highest-end option among the three 30A venues here.",
      availabilityNotes: "Contact the resort at WaterColorWedding@stjoe.com or (850) 534-5017 for a date-specific quote.",
      sourceUrls: [
        "https://www.watercolorresort.com/groups/weddings",
        "https://www.zola.com/wedding-vendors/wedding-venues/watercolor-inn-resort",
        "https://www.theknot.com/marketplace/watercolor-inn-and-resort-santa-rosa-beach-fl-820361",
      ],
    },
  ],
  scenario: {
    fixedCosts: 23550,
    perGuestCost: 130,
    travelCostPerGuest: 1550,
    attendanceRate: 0.80,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes Rosemary Beach's published Eastern/Western Green community space rental ($7,000+, a space-only rental distinct from Cuvee 30A's and The Pearl's all-inclusive packages) and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items: planner $2,100, photographer $3,000 + partial videographer allowance, flowers $2,800, DJ $1,800, stationery ~$600, attire+beauty ~$2,900, transportation $1,100, wedding bands ~$1,400), rounded to $23,550. perGuestCost ($130) takes The Knot's national $80/guest catering average and adds roughly $40/guest for 30A's upscale coastal-market premium on catering and bar (reflected in WaterColor's much higher $800/guest all-inclusive package) plus $10/guest for cake and favors — this figure assumes outside catering for a green-space rental, not one of the all-inclusive packages, which would run substantially higher per guest. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
