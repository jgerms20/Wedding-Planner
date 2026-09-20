import type { DestinationSeed } from "../types";

/**
 * Taos, NM.
 *
 * A second, more remote New Mexico option alongside Santa Fe: a smaller
 * mountain art-colony town at the foot of the Sangre de Cristo range, with
 * genuinely different scenery (Rio Grande Gorge, Taos Ski Valley, high
 * mesa) and the same simple New Mexico marriage-license process — but a
 * real step up in travel friction, since there's no commercial airport in
 * town and even Santa Fe is over an hour's drive away. Numbers are sourced
 * where a URL is given; anything derived is flagged `estimated: true`
 * (venues) or explained in a note, per the seed-data research standard.
 */
export const taosNm: DestinationSeed = {
  key: "taos-nm",
  name: "Taos, NM",
  country: "United States",
  countryCode: "US",
  region: "Taos town and Taos Ski Valley, ~19 miles/40 minutes up the mountain",
  rank: 27,
  whyHere:
    "For Joshua & Janel, Taos would be the choice if they want the high-desert, no-passport look of Santa Fe but with a smaller, artsier, more mountain-town feel — think Rio Grande Gorge and ski-valley scenery instead of a state-capital plaza. The trade-off is real: no commercial airport in Taos itself, so it's a longer haul for East Coast guests than Santa Fe, and spring there is genuinely quiet (locally called 'mud season') rather than a wedding-industry shoulder season with venues actively courting couples.",
  notes:
    "Attendance is estimated at 0.75, below both Santa Fe's and Portland's 0.80: Taos has no commercial air service at all, so every guest faces a roughly 2.5-hour drive from Albuquerque (about twice Santa Fe's one-hour hop), which is meaningfully more friction for a guest list concentrated on the East Coast (pix.wedding; destify.com; trippy.com).",
  travelCostPerGuestEstimate: 1115,
  lodgingPerNightEstimate: 215,
  attendanceRateEstimate: 0.75,
  weatherNotes:
    "Taos sits at about 6,970 feet, and spring arrives more slowly than in Santa Fe or Sedona: March mornings are cold (lows averaging around 29°F) with daytime highs climbing from the high-40s to high-50s°F over the month, April averages around 61°F, and May warms to about 70°F (weatherspark.com; taos.org). Locals call the season 'mud season' — many unpaved forest roads stay seasonally closed into May — but the town itself and its paved roads are unaffected; an outdoor ceremony should still plan for cold mornings and layers well into April.",
  legalNotes:
    "Both parties apply together, in person, at the Taos County Clerk's office (105 Albright St., Suite D, Taos), Monday-Friday 8am-4:30pm. Bring valid photo ID with your birthdate and your Social Security card; the fee is $25. New Mexico has no blood test and no waiting period, so the license can be issued and the ceremony held the same day, and it is valid statewide (not just in the issuing county). Verify with the local authority or an attorney.",
  seasonNotes:
    "Spring is genuinely Taos's slow season, not a wedding-industry shoulder season: tourism runs well below peak, accommodation is easier to book and often discounted, and the town is quiet enough to browse the Ledoux Street galleries or the Fechin House without crowds. The main spring event is the two-week Taos Spring Arts festival (exhibitions, art walks, film screenings), plus smaller draws like the Taos Pueblo Artists Showcase in March and the Taos Film Festival in April — none of it is large enough to meaningfully move venue pricing or availability (taos.org; beyondtaos.com).",
  travelNotes:
    "Taos Regional Airport has no scheduled commercial airline service (only limited seasonal charter flights to Denver). Nearly every guest will instead fly into Albuquerque International Sunport (ABQ) — 133-137 miles away, about a 2.5-hour drive via a scenic but two-lane route — which has nonstop service to 30+ destinations including East Coast nonstops to Charlotte, Philadelphia and Washington-Dulles (abqsunport.com). A rental car or a shared shuttle is a must for the ABQ-to-Taos leg; there is no train or bus alternative that beats driving. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average) + 3 nights x $215/night (Budget Your Trip's Taos average) = $1,115 per guest.",
  sourceUrls: [
    "https://www.taoscounty.org/429/Marriage-License",
    "https://www.taoscounty.org/363/Clerks-Office-Fees",
    "https://www.taosnews.com/magazines/taos-wedding/a-license-to-wed/article_2256fc3b-8ad6-5353-9df0-70c3582d299e.html",
    "https://weatherspark.com/y/3513/Average-Weather-in-Taos-New-Mexico-United-States-Year-Round",
    "https://taos.org/discover/spring-in-taos/",
    "https://taos.org/discover/things-to-consider-when-spring-hiking-in-taos/",
    "https://taos.org/events/annual-events/",
    "https://beyondtaos.com/big-annual-events/",
    "https://en.wikipedia.org/wiki/Taos_Regional_Airport",
    "https://www.trippy.com/distance/Taos-NM-to-Albuquerque",
    "https://www.abqsunport.com/wherewefly/",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/taos-5493811",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "taos-hotel-willa",
      name: "Hotel Willa",
      website: "https://www.hotelwilla.com/meetings-events",
      capacity: 200,
      rentalFee: 4000,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A modern mountain-hideaway hotel in central Taos with several event spaces — The Gallery (100 guests), and the outdoor Under the Stars and Stargazers Deck spaces (up to 200 standing, 150 seated) with mountain views. Published full wedding (ceremony + reception) pricing runs $3,000 off-peak to $5,000 peak; rentalFee above is the midpoint, marked estimated. Group room-block rates are available for 10+ rooms.",
      availabilityNotes: "Contact 575-305-7711 or via hotelwilla.com/meetings-events for a date-specific quote.",
      sourceUrls: [
        "https://www.hotelwilla.com/meetings-events",
        "https://www.weddingwire.com/biz/hotel-willa/ba24758993ea01df.html",
        "https://thevendry.com/venue/212004/hotel-willa-taos-nm",
      ],
    },
    {
      key: "taos-el-monte-sagrado",
      name: "El Monte Sagrado",
      website: "https://www.elmontesagrado.com/meeting-weddings/weddings",
      capacity: 400,
      rentalFee: 6756,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A resort built around a natural spring long used by Native Americans (the on-site Sacred Circle), with spaces ranging from an 8-guest Wine Room up to the Rio Grande Ballroom, which can hold up to 400. Weddings are reported starting at $6,756 for 50 guests, with a separate source citing $11,000 as a starting figure; rentalFee above uses the lower reported starting price, marked estimated pending a date-specific quote.",
      availabilityNotes: "Contact the resort directly via elmontesagrado.com for a date-specific quote.",
      sourceUrls: [
        "https://www.elmontesagrado.com/meeting-weddings/weddings",
        "https://www.wedding-spot.com/venue/7262/el-monte-sagrado/",
        "https://www.theknot.com/marketplace/el-monte-sagrado-taos-nm-2029963",
      ],
    },
    {
      key: "taos-ski-valley",
      name: "Taos Ski Valley",
      website: "https://taosskivalley.com/",
      capacity: 200,
      rentalFee: 2000,
      inHouseCatering: true,
      estimated: true,
      styleNotes:
        "A ski resort at 9,300 feet with a mid-mountain wedding site (opened 2019) and the adjacent Phoenix Lodge as a reception space, plated/buffet/family-style in-house catering, and real alpine views rather than desert scenery. The Kachina Basin ceremony platform runs $1,500-$2,500 (tables, chairs, linens, china, parking and setup/teardown included); rentalFee above is the midpoint, marked estimated. Reported average total spend for 100 guests runs $25,000-$45,000. Capacity is up to 200.",
      availabilityNotes: "See taosskivalley.com or contact the resort directly for a date-specific quote.",
      sourceUrls: [
        "https://taosskivalley.com/",
        "https://www.herecomestheguide.com/wedding-venues/new-mexico/taos-ski-valley",
        "https://www.theknot.com/marketplace/taos-ski-valley-taos-ski-valley-nm-556707",
      ],
    },
  ],
  scenario: {
    fixedCosts: 20550,
    perGuestCost: 90,
    travelCostPerGuest: 1115,
    attendanceRate: 0.75,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes Hotel Willa's $4,000 midpoint venue rental and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items — see the Washington DC file's scenario note for the full item list), rounded to $20,550. perGuestCost ($90) follows the same approach as Portland: The Knot's national $80/guest food-and-drink catering average plus roughly $10/guest for cake, favors and incidental rentals, since none of the three Taos venues publishes a single all-in per-guest catering figure (El Monte Sagrado and Taos Ski Valley both quote total-spend or per-space fees rather than a per-guest rate). travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
