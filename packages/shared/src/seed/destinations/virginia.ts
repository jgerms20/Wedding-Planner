import type { DestinationSeed } from "../types";

/**
 * Charlottesville, VA — Blue Ridge wine country.
 *
 * Added after the couple asked for more domestic options beyond DC. Northern
 * Virginia would mostly duplicate the DC finalist (same airports, same
 * suburban feel); Charlottesville's vineyard-wedding market has a genuinely
 * different look (mountains and vineyards) and, unusually for a smaller city,
 * a deep bench of published venue rate sheets to cite. Numbers are sourced
 * where a URL is given; anything derived is flagged `estimated: true`
 * (venues) or explained in a note, per the seed-data research standard.
 */
export const charlottesvilleVa: DestinationSeed = {
  key: "charlottesville-va",
  name: "Charlottesville, VA",
  country: "United States",
  countryCode: "US",
  region: "Charlottesville & the Blue Ridge wine country (Albemarle/Greene/Madison counties)",
  rank: 7,
  whyHere:
    "A wine-country vineyard wedding a 2-hour drive from DC and a single connection for the rest of the East Coast — a genuinely different look and feel from the DC finalist (mountains and vineyards instead of a city), without asking anyone to get a passport or book a long-haul flight.",
  notes:
    "Attendance is estimated at 0.82 — in the same 80-85% 'local wedding' band DC uses (pix.wedding; destify.com), toward the lower end of that band since Charlottesville's own airport (CHO) is small and a longer haul than DC for guests outside the Mid-Atlantic.",
  travelCostPerGuestEstimate: 1130,
  flightCostEstimate: 470,
  lodgingPerNightEstimate: 220,
  attendanceRateEstimate: 0.82,
  weatherNotes:
    "March-May runs cool to warm: March highs 54-64°F with roughly 11 rainy days; April averages around 69°F with about 94mm of rain; May reaches roughly 77°F by day and 53°F at night with about 124mm of rain, the wettest spring month. Worth a rain-plan tent for any outdoor vineyard ceremony (weatherspark.com).",
  legalNotes:
    "Marriage licenses are issued by any Circuit Court Clerk in Virginia (e.g. Charlottesville's Circuit Court Clerk, 315 East High Street) and are valid for a ceremony anywhere in the state — you don't have to apply in the county where the venue sits. The fee is $30 (cash or check), both parties appear in person with valid government photo ID, there's no blood test and no waiting period (a same-day ceremony is allowed), and the license must be used within 60 days of issuance. Verify with the local authority or an attorney.",
  seasonNotes:
    "Charlottesville's wine-country wedding market peaks May-October, but April is unusually busy and pricey locally thanks to three recurring events that fill area hotels: Historic Garden Week (late April), the Foxfield Spring Races (late April), and UVA's Final Exercises/graduation weekend (mid-to-late May, with family travel and move-out traffic). Check UVA's published finals-weekend and Garden Week dates against any spring-2028 hold, and shortlist venues early — spring Saturdays book many months out (gcvirginia.org; wineandcountrylife.com; majorevents.virginia.edu).",
  travelNotes:
    "Charlottesville Albemarle Airport (CHO) has daily nonstop service (American/Delta/United) to Atlanta, Charlotte, Chicago, New York-LaGuardia, Philadelphia, and Washington-Dulles, plus seasonal service to Tallahassee — but it's a small field with limited competition, so fares likely run above the national average used below. Many guests will do better flying into Dulles or Reagan National and driving. Driving times: DC is about 116 miles (~2h18m); New York City about 342 miles (~6h12m); Atlanta about 511 miles (~7h53m). No passport needed (gocho.com; travelmath.com; wanderlog.com).",
  sourceUrls: [
    "https://www.charlottesville.gov/177/Marriage-License-Information",
    "https://marriagelaws.org/va/city-of-charlottesville",
    "https://www.weddingvendors.com/marriage-license-laws/united-states/virginia",
    "https://weatherspark.com/y/20225/Average-Weather-in-Charlottesville-Virginia-United-States-Year-Round",
    "https://www.budgetyourtrip.com/hotels/united-states/charlottesville-4752031",
    "https://gocho.com/flight-info/direct-flight-destinations",
    "https://www.gcvirginia.org/historic-garden-week",
    "https://www.wineandcountrylife.com/events/foxfield-spring-races-2026",
    "https://majorevents.virginia.edu/finals/general-information",
  ],
  venues: [
    {
      key: "va-pippin-hill-farm",
      name: "Pippin Hill Farm & Vineyard",
      website: "https://www.pippinhillfarm.com/",
      capacity: 200,
      rentalFee: 7000,
      perGuestCost: 200,
      inHouseCatering: true,
      estimated: true,
      styleNotes:
        "A refined working vineyard/farm venue with Blue Ridge views, one of the most design-forward and frequently featured Virginia wedding venues. Rental starts near $7,000, ranging to about $8,450 by season. All catering and bar service is in-house (cake is bring-your-own); the venue's own published all-in per-guest rate runs $150 (low season) to $255 (high season) — perGuestCost above is the midpoint, marked estimated.",
      sourceUrls: ["https://www.pippinhillfarm.com/", "https://www.theknot.com/marketplace/pippin-hill-farm-and-vineyards-north-garden-va", "https://www.zola.com/wedding-vendors/wedding-venues/pippin-hill-farm-vineyards"],
    },
    {
      key: "va-king-family-vineyards",
      name: "King Family Vineyards",
      website: "https://kingfamilyvineyards.com/vineyard-wedding",
      capacity: 200,
      rentalFee: 12000,
      inHouseCatering: false,
      styleNotes:
        "An iconic Blue Ridge Mountain backdrop with an on-site polo field; a classic barn plus open-lawn ceremony space. Published Saturday rate for peak April-June is $12,000; Friday/Sunday and March/July/August dates run $5,000-$11,000. A caterer must be chosen from the venue's approved list.",
      sourceUrls: ["https://www.theknot.com/marketplace/king-family-vineyards-crozet-va", "https://www.weddingwire.com/biz/king-family-vineyards-crozet/0e6b1e2f8b1e5f5e.html", "https://www.eventective.com/crozet/wedding/king-family-vineyards-262369.html"],
    },
    {
      key: "va-early-mountain-vineyards",
      name: "Early Mountain Vineyards",
      website: "https://earlymountain.com/weddings",
      capacity: 200,
      rentalFee: 8000,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A 305-acre working vineyard about 30 minutes from Charlottesville, with an event hall, great lawn, terrace, lounge, gallery, and kitchen serving farm-to-table in-house dining; a honeymoon cottage is included in the venue fee. Published off-peak starting rate is $8,000, rising to about $11,500 on peak Saturdays. In-house catering is required except for the cake.",
      sourceUrls: ["https://earlymountain.com/weddings", "https://earlymountain.com/weddings/faq", "https://www.weddingwire.com/biz/early-mountain-vineyards-madison/"],
    },
  ],
  scenario: {
    fixedCosts: 28500,
    perGuestCost: 150,
    travelCostPerGuest: 1130,
    attendanceRate: 0.82,
    notes:
      "fixedCosts uses King Family's published Saturday April-June venue rental ($12,000) plus the same national non-venue baseline used for DC (about $16,550: planner $2,100, photo + partial video $3,000+, flowers $2,800, DJ $1,800, stationery $600, attire + beauty $2,900, transportation $1,100, band $1,400 — The Knot's 2026 Real Weddings Study; loveweddingbands.com), rounded to $28,500. perGuestCost uses Pippin Hill's own published low-season starting all-in per-guest rate ($150), the same anchor method DC used (Meridian House's $150/guest). travelCostPerGuest matches travelCostPerGuestEstimate: BTS Q1 2026 average domestic round-trip fare ($470) plus 3 nights at Charlottesville's blended average nightly rate (~$220) = $1,130.",
  },
};
