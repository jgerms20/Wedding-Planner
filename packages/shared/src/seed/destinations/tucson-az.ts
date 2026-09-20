import type { DestinationSeed } from "../types";

/**
 * Tucson, AZ.
 *
 * A larger, better-connected Sonoran Desert alternative to Sedona: its own
 * international airport with real nonstop service, a lower cost of living
 * (hotels run roughly half of Sedona's), and a historic-hotel/guest-ranch
 * venue scene rather than a resort-only one. Two of the three venues below
 * are 1920s-30s properties, so each got the ownership/history check the
 * research standard requires for anything built before ~1940 — neither has
 * any link to enslaved or forced labor; see each venue's styleNotes.
 * Numbers are sourced where a URL is given; anything derived is flagged
 * `estimated: true` (venues) or explained in a note.
 */
export const tucsonAz: DestinationSeed = {
  key: "tucson-az",
  name: "Tucson, AZ",
  country: "United States",
  countryCode: "US",
  region: "Central Tucson and the foothills of the Santa Catalina Mountains",
  rank: 28,
  whyHere:
    "Tucson gives Joshua & Janel the same Sonoran Desert, no-passport appeal as Sedona, but with its own international airport (real nonstop options, not a 90-minute-plus drive from Phoenix) and noticeably lower hotel and venue costs — a practical alternative if Sedona's resort pricing or its airport gap is a dealbreaker.",
  notes:
    "Attendance is estimated at 0.78, matching Sedona rather than Portland's 0.80: Tucson International has its own commercial service, which is a real advantage over Sedona, but only one East Coast nonstop (Atlanta), so most East Coast guests will still connect through a hub, offsetting some of that advantage (pix.wedding; destify.com; flightsfrom.com).",
  travelCostPerGuestEstimate: 848,
  lodgingPerNightEstimate: 126,
  attendanceRateEstimate: 0.78,
  weatherNotes:
    "Tucson sits at about 2,400 feet — noticeably lower and warmer than Sedona — with March averaging a 50.7°F low/71.8°F high, and April-May warming further into the low-to-mid 80s°F by day with lows in the upper 50s, almost no rain, and low humidity (weather.gov; championtraveler.com). It's reliable outdoor-ceremony weather for the whole window, warmer than Sedona or Santa Fe and windier by May (average wind speed peaks in May), so a late-May date should plan for a floral/decor setup that can handle some breeze.",
  legalNotes:
    "Arizona has no waiting period and no blood-test requirement, and a license issued by any county clerk in the state is valid for a ceremony anywhere in Arizona for 12 months from issuance. In Tucson, apply in person with both parties present at the Pima County Clerk of the Superior Court (110 W. Congress St., downtown Tucson, Mon-Fri 8am-5pm); bring valid photo ID, and the fee is $98, payable by money order or cashier's check. Verify with the local authority or an attorney.",
  seasonNotes:
    "Like Sedona, spring is Tucson's peak season rather than a shoulder season — the best-weather window (roughly March through May) draws the Tucson Festival of Books (March), the Tucson Folk Festival, the Fourth Avenue Street Fair, the Arizona International Film Festival and the Pima County Fair, all clustered March-April, and hotel rates climb accordingly through the early spring before easing somewhat by late April-May. A wedding aiming for the back half of the window trades a little heat for meaningfully better rates and availability (championtraveler.com; travel.usnews.com).",
  travelNotes:
    "Tucson International Airport (TUS) has its own commercial service — six airlines to 19 nonstop domestic destinations — but only one true East Coast nonstop, Delta's route to Atlanta (about 3.5 hours); other East Coast hubs connect through Atlanta, Dallas, Chicago, Denver or Charlotte via American, United and Southwest. Phoenix Sky Harbor (about 1.5-2 hours north) is a fallback with far more nonstop options for guests who don't mind the drive. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average) + 3 nights x $126/night (Budget Your Trip's Tucson 3-star average) = $848 per guest — meaningfully cheaper than Sedona on both airfare risk and lodging.",
  sourceUrls: [
    "https://www.pima.gov/1840/Marriage-License",
    "https://www.docdraft.ai/legal-guides/getting-married/arizona",
    "https://www.weather.gov/twc/TucsonDailyNormals",
    "https://championtraveler.com/dates/best-time-to-visit-tucson-az-us/",
    "https://travel.usnews.com/Tucson_AZ/When_To_Visit/",
    "https://en.wikipedia.org/wiki/Tucson_International_Airport",
    "https://www.flightsfrom.com/TUS",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/tucson-5318313",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "tucson-hacienda-del-sol",
      name: "Hacienda Del Sol Guest Ranch Resort",
      website: "https://www.haciendadelsol.com/",
      capacity: 220,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "History check (per the research standard, for any property built before ~1940): Hacienda Del Sol was founded in 1929 by Helen and John Murphey as a girls' boarding academy (the 'Hacienda del Sol School'), designed by noted Tucson architect Josias Joesler in Spanish Colonial Revival style; the Murpheys sold it in 1945, and the new owners converted it into a guest-ranch resort in 1948. No plantation or enslaved/forced-labor history of any kind — a 20th-century Arizona boarding school turned resort, not a converted antebellum estate. Four event spaces run from a 60-guest Outer Courtyard micro-wedding up to 220 seated in Casa Luna; the original 1929 building houses the smaller Casa Feliz space. Room rates run $149-$650/night depending on room type and season.",
      availabilityNotes: "Contact the resort directly via haciendadelsol.com for a date-specific wedding quote.",
      sourceUrls: [
        "https://www.haciendadelsol.com/our-history",
        "https://www.historichotels.org/us/hotels-resorts/hacienda-del-sol-guest-ranch-resort/history.php",
        "https://www.partyslate.com/venues/hacienda-del-sol-guest-ranch-resort",
      ],
    },
    {
      key: "tucson-arizona-inn",
      name: "Arizona Inn",
      website: "https://www.arizonainn.com/weddings/",
      capacity: 200,
      rentalFee: 2000,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "History check: built in 1930 by Isabella Greenway (Arizona's first Congresswoman) as a hotel from the start, and still owned and operated by the Greenway family — purpose-built commercial property, no plantation or forced-labor history. Fourteen acres of gardens and lawns host up to 200 guests. Published fees: $1,250 for a ceremony plus $500-$1,000 for a reception (6.5 hours, excluding setup/teardown); rentalFee above combines the ceremony fee and the reception-fee midpoint, marked estimated. Full wedding (ceremony + reception) packages run $8,000 off-peak to $15,000 peak, or from $6,702 for a 50-guest package.",
      availabilityNotes: "Contact the Inn directly via arizonainn.com/weddings for a date-specific quote.",
      sourceUrls: [
        "https://www.arizonainn.com/weddings/",
        "https://www.arizonainn.com/weddings/packages",
        "https://www.wedding-spot.com/venue/2533/arizona-inn/",
      ],
    },
    {
      key: "tucson-saguaro-buttes",
      name: "Saguaro Buttes",
      website: "https://www.tucsonweddingsite.com/",
      capacity: 300,
      perGuestCost: 96,
      inHouseCatering: true,
      estimated: true,
      styleNotes:
        "A modern (not historic), 26-acre purpose-built wedding venue beside Saguaro National Park with a 6,000 sq ft banquet hall, outdoor waterfall ceremony site, and golf-cart guest shuttles. All-inclusive packages — venue, coordination, catering, tables/chairs/linens, and (in larger packages) DJ and bar — start at $96/guest; perGuestCost above uses that published floor, marked estimated since it bundles some of what other venues price as separate fixed costs. A ceremony-only package starts at $1,500+ for up to 200 guests.",
      availabilityNotes: "Contact the venue directly via tucsonweddingsite.com for a date-specific quote.",
      sourceUrls: [
        "https://www.tucsonweddingsite.com/",
        "https://www.herecomestheguide.com/wedding-venues/arizona/saguaro-buttes",
        "https://www.wedding-spot.com/venue/2679/saguaro-buttes/",
      ],
    },
  ],
  scenario: {
    fixedCosts: 18550,
    perGuestCost: 96,
    travelCostPerGuest: 848,
    attendanceRate: 0.78,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes Arizona Inn's $2,000 combined ceremony+reception fee and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items — see the Washington DC file's scenario note for the full item list), rounded to $18,550. perGuestCost ($96) uses Saguaro Buttes's own published all-inclusive package floor as the concrete Tucson catering anchor, since Hacienda Del Sol and Arizona Inn both quote room/space fees rather than a per-guest catering rate; this figure runs slightly higher than a pure catering number because it also covers DJ/coordination at the low end of that package, so it's a conservative (not understated) per-guest estimate. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
