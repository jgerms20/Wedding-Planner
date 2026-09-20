import type { DestinationSeed } from "../types";

/**
 * Chattanooga, TN.
 *
 * A river city at the foot of Lookout Mountain with a genuinely
 * post-industrial-turned-outdoorsy downtown (the Tennessee Riverwalk, the
 * Aquarium, a converted rail terminal), no passport, and a real regional
 * airport with useful East Coast nonstops. Chattanooga has real antebellum
 * and Civil War-era history — it was fought over directly in 1863 — so every
 * candidate venue below was checked individually against the standing rule
 * in .claude/skills/wedding-research/SKILL.md rather than assumed safe.
 * All four venues below turned out to be purpose-built commercial buildings
 * (a hotel built new in 1872 on a burned-down predecessor's lot, a modern
 * hotel, a 1909 train terminal, and a 1920s warehouse) with no plantation or
 * residential-slavery history to weigh; two well-known "historic venue"
 * candidates outside city limits (a converted farm venue in Athens, TN, and
 * a rustic venue on Sand Mountain, GA) were left off this list simply for
 * not actually being in Chattanooga, not for any history concern. Numbers
 * below are sourced where a URL is given; anything derived is flagged
 * `estimated: true` (venues) or explained in a note.
 */
export const chattanoogaTn: DestinationSeed = {
  key: "chattanooga-tn",
  name: "Chattanooga, TN",
  country: "United States",
  countryCode: "US",
  region: "Downtown Chattanooga, Southside, North Shore",
  rank: 20,
  whyHere:
    "Joshua & Janel wanted a river-and-mountain option with a genuinely revitalized downtown — the Riverwalk, the Aquarium, a walkable Southside — rather than a purely rural mountain retreat, still fully domestic with a regional airport that reaches Washington and New York nonstop.",
  notes:
    "Attendance is estimated at 0.82, in the middle of the 80-85% 'local wedding' attendance band (pix.wedding; destify.com) — domestic and no passport, and Chattanooga's small airport still manages nonstop service to both Washington-DCA and New York (helpful for the couple's East Coast-heavy list), which offsets its otherwise thin 15-destination network relative to the bigger hubs on this list.",
  travelCostPerGuestEstimate: 845,
  flightCostEstimate: 470,
  lodgingPerNightEstimate: 125,
  attendanceRateEstimate: 0.82,
  weatherNotes:
    "Chattanooga spring warms steadily: March highs run 59-68°F with lows near 39-43°F, April averages about 67°F/48°F, and May reaches about 75°F with lows in the upper 50s (weather.gov; currentresults.com). Spring is also the wetter end of the year, with 3.6-4.6in of rain typical across the season, so an outdoor ceremony is a reasonable bet with a real tented or indoor backup rather than a bare lawn plan.",
  legalNotes:
    "Both parties apply together, in person, at the Hamilton County Clerk's office (625 Georgia Avenue, Room 201, Chattanooga). Bring valid photo ID for each party; anyone previously married should bring the final divorce decree or a deceased spouse's death certificate. The fee is $102.50, reduced to $40 if both parties completed a premarital counseling course. Tennessee imposes no waiting period between issuance and the ceremony, so a same-day wedding is legally possible, and the license is valid for 30 days from issuance. Verify with the local authority or an attorney.",
  seasonNotes:
    "Chattanooga's spring calendar leans toward food-and-market events rather than one dominant citywide festival: the 4 Bridges Art Festival, Chattanooga Burger Week, a May Strawberry Festival, and the weekly Chattanooga Market (Sundays) and River Market (Saturdays) all fall inside March-May (visitchattanooga.com). None of these are reported to meaningfully move hotel rates citywide the way New Orleans' Jazz Fest or Galveston's spring break do, making March-May a comparatively low-friction booking window, though it's still worth checking the specific spring-2028 calendar against any date hold.",
  travelNotes:
    "Chattanooga Metropolitan Airport (CHA) offers nonstop service to 15 destinations across five airlines (American, Delta, Spirit, Allegiant, United), including direct routes to Washington-DCA and New York (via American and Delta respectively) alongside Atlanta, Charlotte, Chicago, and Dallas (timesfreepress.com; flightsfrom.com). That's a thinner network than the bigger hubs on this list, but the DCA and New York nonstops directly cover two of the couple's biggest East Coast guest clusters. There's no practical drive alternative for most of the list (a drive from the Northeast runs 12+ hours), so this is a fly-in wedding for nearly everyone, with a connection through Atlanta or Charlotte likely for guests outside CHA's small nonstop map. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average domestic round-trip fare, the same national figure used across the other US finalists) + 3 nights x $125/night (BudgetYourTrip's mid-range-hotel average for Chattanooga, since a wedding block skews toward mid-range inventory over the $75 budget-hotel average) = $845 per guest.",
  sourceUrls: [
    "https://marriagelicense.hamiltontn.gov/",
    "https://www.countyclerkanytime.com/marriage/marriage18.aspx",
    "https://www.weather.gov/mrx/chamarch",
    "https://www.currentresults.com/Weather/Tennessee/Places/chattanooga-temperatures-by-month-average.php",
    "https://www.visitchattanooga.com/spring/events/",
    "https://www.timesfreepress.com/news/2026/aug/02/direct-flights/",
    "https://www.flightsfrom.com/CHA",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/chattanooga-4612862",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "cha-read-house",
      name: "The Read House Hotel",
      website: "https://www.thereadhousehotel.com/weddings/",
      capacity: 240,
      rentalFee: 9500,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "The longest continuously operating hotel in the Southeast: a Georgian-style building constructed new in 1871-72 by a group of Chattanooga businessmen, on the lot of the earlier Crutchfield House hotel after it flooded and burned in the late 1860s. The building itself dates entirely from after the Civil War and was purpose-built as a hotel from day one, so there's no plantation-era residential history to weigh. The Silver Ballroom and several named rooms (Green Room, Centennial Room, Chestnut Room, Crutchfield Room) hold up to roughly 210-240 seated depending on setup, plus a landscaped garden for outdoor ceremonies. Wedding packages start at $9,500 during off-peak season; rentalFee above is that published starting figure, marked estimated.",
      availabilityNotes: "Contact the hotel's events team via thereadhousehotel.com for a date-specific quote.",
      sourceUrls: [
        "https://www.thereadhousehotel.com/weddings/",
        "https://www.thereadhousehotel.com/history/",
        "https://en.wikipedia.org/wiki/The_Read_House_Hotel",
      ],
    },
    {
      key: "cha-chattanoogan-hotel",
      name: "The Chattanoogan Hotel",
      website: "https://www.thechattanoogan.com/",
      capacity: 500,
      rentalFee: 4351,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A modern full-service hotel in downtown Chattanooga with views of Lookout Mountain — no historic-estate history to weigh, since it was built and operated as a hotel from the outset. Indoor/outdoor wedding space scales from an intimate event up to the Chattanooga Ballroom's 500-guest capacity. Wedding Spot reports weddings starting at $4,351 for 50 guests, with a broader published range of $1,550-$15,000 depending on package; rentalFee above is that 50-guest starting figure, marked estimated.",
      availabilityNotes: "Contact the hotel's events team via thechattanoogan.com for a date-specific, guest-count-based quote.",
      sourceUrls: [
        "https://www.wedding-spot.com/venue/4835/the-chattanoogan-hotel/",
        "https://www.theknot.com/marketplace/the-chattanoogan-hotel-chattanooga-tn-824477",
        "https://www.herecomestheguide.com/wedding-venues/tennessee/the-chattanoogan",
      ],
    },
    {
      key: "cha-the-signal-choo-choo",
      name: "The Signal at the Chattanooga Choo Choo",
      website: "https://choochoo.com/",
      capacity: 500,
      rentalFee: 5250,
      estimated: true,
      styleNotes:
        "A venue inside the historic Terminal Station complex, a Beaux Arts train station built in 1906-1909 for the Southern Railway System and converted into the Chattanooga Choo Choo hotel-and-entertainment complex in 1973 after the station closed in 1970 — a purpose-built rail terminal, not a residence, so there's no plantation-era history to weigh. The Ballroom holds up to 500 on its own, or up to 2,000 combined with the adjoining Concert Hall, alongside train-yard-adjacent outdoor space and a restored vintage caboose bar elsewhere on the complex. Reported wedding pricing runs $3,500-$7,000; rentalFee above is the midpoint, marked estimated.",
      availabilityNotes: "Contact the Choo Choo's events team via choochoo.com for a date-specific quote.",
      sourceUrls: [
        "https://www.eventective.com/chattanooga-tn/the-signal-716397.html",
        "https://choochoo.com/history/",
        "https://en.wikipedia.org/wiki/Chattanooga_Choo-Choo_Hotel",
      ],
    },
    {
      key: "cha-turnbull-building",
      name: "The Turnbull Building",
      website: "https://www.theturnbull.com/",
      capacity: 250,
      rentalFee: 5600,
      estimated: true,
      styleNotes:
        "A 1920s warehouse in downtown Chattanooga originally home to the Turnbull Ice Cream Cone & Machine Company, on the National Register of Historic Places — a purpose-built industrial building, not a residence, so there's no plantation-era history to weigh. The 3rd and 4th floors (10,000 sq ft combined) hold a 150-guest seated reception on the third floor or up to 300 on the sun-filled fourth-floor loft; tables and chairs are included in the rental. Published Saturday rental is $5,600 (Monday-Thursday runs $1,750); rentalFee above uses the Saturday figure as the realistic price for an actual wedding date, marked estimated.",
      availabilityNotes: "Contact the venue directly via theturnbull.com for a date-specific quote.",
      sourceUrls: [
        "https://www.theturnbull.com/rates-page",
        "https://www.weddingwire.com/biz/the-turnbull-building-chattanooga/88f5b2d5211010c6.html",
        "https://okcrowe.com/modern-industrial-chic-wedding-turnbull-building-chattanooga/",
      ],
    },
  ],
  scenario: {
    fixedCosts: 22150,
    perGuestCost: 90,
    travelCostPerGuest: 845,
    attendanceRate: 0.82,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes The Turnbull Building's $5,600 published Saturday rental — a guest-count-appropriate industrial-loft pick over the larger hotel ballrooms — and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items: planner $2,100, photographer $3,000 + partial videographer allowance, flowers $2,800, DJ $1,800, stationery ~$600, attire+beauty ~$2,900, transportation $1,100, wedding bands ~$1,400), for $22,150. perGuestCost ($90) uses The Knot's national $80/guest catering average plus roughly $10/guest for cake, favors, and incidental rentals, since no venue-published F&B minimum was found for a BYO-caterer venue like Turnbull. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
