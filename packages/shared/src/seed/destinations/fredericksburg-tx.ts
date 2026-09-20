import type { DestinationSeed } from "../types";

/**
 * Fredericksburg, TX (Texas Hill Country).
 *
 * A smaller-scale, wine-country-flavored domestic finalist: Fredericksburg
 * was founded in 1846 by German immigrants under the Adelsverein society,
 * and the Texas Hill Country German settlements (Fredericksburg, New
 * Braunfels, Comfort) were largely Free-Soil communities whose settlers
 * opposed slavery — a genuinely different settlement history than the
 * East Texas/Deep South cotton-and-plantation belt this research standard
 * is built to screen for. That lower baseline risk doesn't exempt any
 * specific building from a real history check: none of the three venues
 * below is a converted historic residence at all. Cross Mountain Vineyards
 * and 4.0 Cellars are working vineyards with modern event centers built for
 * the purpose, and Hillside at Red Rock opened in 2019 as a purpose-built
 * event venue — none carries any residential, agricultural-estate, or
 * enslaved-labor history to weigh. Numbers below are sourced where a URL is
 * given; anything derived is flagged `estimated: true` (venues) or explained
 * in a note.
 */
export const fredericksburgTx: DestinationSeed = {
  key: "fredericksburg-tx",
  name: "Fredericksburg, TX",
  country: "United States",
  countryCode: "US",
  region: "Texas Hill Country (Gillespie County), Highway 290 wine corridor",
  rank: 12,
  whyHere:
    "Joshua & Janel asked for Fredericksburg as a smaller, wine-country-flavored domestic finalist — Hill Country views, working vineyards, and a walkable German-heritage downtown — without a passport or the size and pace of a big city, for a ~100-person list mostly coming from the East Coast.",
  notes:
    "Attendance is estimated at 0.80, the bottom of the 80-85% 'local wedding' attendance band (pix.wedding; destify.com) — domestic and no passport, but Fredericksburg has no commercial airport of its own, so every flying guest adds a 1-1.5 hour drive from San Antonio or Austin on top of the flight, the extra travel friction that puts it below Austin and San Antonio on this list.",
  travelCostPerGuestEstimate: 1250,
  flightCostEstimate: 470,
  lodgingPerNightEstimate: 260,
  attendanceRateEstimate: 0.80,
  weatherNotes:
    "Fredericksburg spring is generally sunny and mild: March averages a 74°F high / 49°F low, with April and May climbing through the low 70s to mid-80s; May is the wettest spring month, with rain on roughly 16 days and about 3 inches of total precipitation (accuweather.com; usclimatedata.com). An outdoor Hill Country ceremony is a good bet for most of the season, with a simple rain backup worth having for a May date specifically.",
  legalNotes:
    "Both parties apply together, in person, at the Gillespie County Clerk's office (Gillespie County Courthouse, 101 W Main St, Room 109, Fredericksburg; M-F 8:30am-3:30pm) with valid photo ID for each party. The standard fee is $80, rising to $180 if neither applicant can show proof of Texas residency (Joshua and Janel would apply as out-of-state residents, so budget for $180) — completing the 'Twogether in Texas' premarital course drops the fee to $11 regardless of residency. Texas imposes a 72-hour waiting period between issuance and the ceremony, waivable with a judge's written order, for active-duty military, or via the Twogether in Texas course, and the license is valid for 90 days after issuance in any Texas county. Verify with the local authority or an attorney.",
  seasonNotes:
    "Mid-March through late April is Texas Hill Country bluebonnet and wildflower season, peaking in early-to-mid April, and it's the single biggest driver of both crowds and hotel/rental pricing in Fredericksburg — the Fredericksburg Bluebonnet Festival and Wildseed Farms' Wildflower Celebration both fall inside the window, and weekend traffic on Highway 290's wine corridor gets heavy (visitfredericksburgtx.com; texashighways.com). A date in the second half of May, after wildflower season peaks and before Hill Country summer heat sets in, is the best-value spring window; a March or early-April date should expect wine-country weekend crowds and premium lodging pricing regardless of the venue's own availability.",
  travelNotes:
    "Fredericksburg has no commercial airport; the nearest is San Antonio International (SAT), about 57 miles and a 1-hour-15-minute drive via I-10 West, with Austin-Bergstrom (AUS) a secondary option at roughly 84 miles and 1 hour 43 minutes (rome2rio.com). SAT itself serves roughly 46-50 nonstop domestic/Mexico/Canada destinations, fewer than Austin's hub, so most East Coast guests will connect through a larger city before flying into SAT or AUS and then driving; a rental car or shared shuttle is effectively required since there's no rail or transit option for the last leg. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average domestic round-trip fare, the same national figure used across the other US finalists) + 3 nights x $260/night (blended between BudgetYourTrip's $196 all-Fredericksburg hotel average and AirDNA's reported peak-spring short-term-rental rate of $319-334/night, since Fredericksburg has limited traditional hotel inventory and a wedding block here typically fills B&Bs, guesthouses, and vacation-rental cottages rather than budget motels) = $1,250 per guest, the highest travel cost of the Texas finalists once the extra drive-time car rental is factored in qualitatively.",
  sourceUrls: [
    "https://www.gillespiecounty.gov/1230/Vitals---Birth-Death-Marriage",
    "https://www.usmarriagelaws.com/marriage-license/texas/gillespie/county-clerk/office-requirements/",
    "https://www.accuweather.com/en/us/fredericksburg/78624/march-weather/335795",
    "https://usclimatedata.com/climate/fredericksburg/texas/united-states/ustx0482",
    "https://www.visitfredericksburgtx.com/blog/5-tips-for-enjoying-texas-hill-country-wildflowers/",
    "https://texashighways.com/travel-news/celebrate-spring-wildflowers-in-texas-at-these-festivals-and-trails/",
    "https://www.rome2rio.com/s/Nearby-Airports/Fredericksburg-TX-USA",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/fredericksburg-4692279",
    "https://www.airdna.co/vacation-rental-data/app/us/texas/fredericksburg/overview",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "fbg-cross-mountain-vineyards",
      name: "Cross Mountain Vineyards",
      website: "https://www.crossmountainvenue.com/",
      capacity: 120,
      rentalFee: 5900,
      estimated: true,
      styleNotes:
        "A working 33-acre vineyard and farm off Highway 290 just outside downtown Fredericksburg — a modern event venue built for the purpose, not a converted historic residence, so no plantation-era history applies. A rustic-chic event space with white oak high ceilings and sleek black detailing, plus 12 on-site cottages for guest lodging. Weddings start at $5,900, though the figure excludes service fees, taxes, gratuity, and additional rentals, and rises in the April-June peak season; rentalFee above uses the published starting figure, marked estimated.",
      availabilityNotes: "Contact the venue directly via crossmountainvenue.com for a date-specific quote.",
      sourceUrls: [
        "https://www.crossmountainvenue.com/",
        "https://www.theknot.com/marketplace/cross-mountain-vineyards-fredericksburg-tx-2085487",
        "https://www.thewedstay.com/wedding-venues/fredericksburg",
      ],
    },
    {
      key: "fbg-hillside-at-red-rock",
      name: "Hillside at Red Rock",
      website: "https://hillsideatredrock.com/",
      capacity: 100,
      rentalFee: 5150,
      estimated: true,
      styleNotes:
        "Opened in May 2019 as a purpose-built rustic event venue with uninterrupted 30-mile Hill Country wine-country views — no historic building of any kind on the property, so there's no history to weigh at all. The 1,500 sq ft Great Room seats up to 100 for dinner, and the 1,300 sq ft Sky Deck adds an outdoor option with the same views; capacity lines up closely with the couple's guest target. Published pricing is tiered by guest count: a $4,000 base rate for up to 50 guests plus $25/head after that, working out to about $5,150 for 100 guests; used above, marked estimated since exact date/season pricing isn't published.",
      availabilityNotes: "Contact the venue directly via hillsideatredrock.com for a date-specific quote.",
      sourceUrls: [
        "https://hillsideatredrock.com/pricing/",
        "https://hillsideatredrock.com/wedding-events/",
        "https://www.weddingwire.com/biz/hillside-at-red-rock/68e67c4f7fb2590e.html",
      ],
    },
    {
      key: "fbg-4-0-cellars",
      name: "4.0 Cellars (Texas Wine Collective)",
      website: "https://www.txwinecollective.com/",
      capacity: 250,
      estimated: true,
      styleNotes:
        "A winery and event center just east of Fredericksburg on the Highway 290 wine corridor, built as a modern tasting room and event facility rather than a residence — no plantation-era history to weigh. The Event Center seats 50-250 depending on layout, the Pavilion covers 70 guests with room for another 150 uncovered nearby, and the Boardroom offers a smaller indoor option — the most flexible-by-guest-count of the three Fredericksburg venues here. No flat rental fee is published.",
      availabilityNotes: "Contact the venue directly at (830) 997-7470 or via txwinecollective.com for a date-specific quote.",
      sourceUrls: [
        "https://www.herecomestheguide.com/texas/wedding-venues/4-0-cellars",
        "https://www.weddingwire.com/reviews/4-0-cellars-fredericksburg/4d863e49d9e236e6.html",
        "https://www.eventective.com/fredericksburg-tx/4-0-cellars-665084.html",
      ],
    },
  ],
  scenario: {
    fixedCosts: 22450,
    perGuestCost: 100,
    travelCostPerGuest: 1250,
    attendanceRate: 0.80,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes Cross Mountain Vineyards' $5,900 published starting rental and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items: planner $2,100, photographer $3,000 + partial videographer allowance, flowers $2,800, DJ $1,800, stationery ~$600, attire+beauty ~$2,900, transportation $1,100, wedding bands ~$1,400), rounded to $22,450. perGuestCost ($100) takes The Knot's national $80/guest catering average and adds roughly $20/guest for the Hill Country wine-country premium on catering and bar (most vineyard venues here require or strongly prefer an approved caterer list rather than a published F&B minimum). travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
