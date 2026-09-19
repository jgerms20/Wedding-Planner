import type { DestinationSeed } from "../types";

/**
 * New Orleans, LA.
 *
 * Added at the couple's explicit request as another domestic option: no
 * passport, a deep bench of nonstop flights from Northeast/Mid-Atlantic/
 * Southern hubs, and a city with real food-and-music personality rather than
 * a generic hotel ballroom. New Orleans' wedding-venue market prices
 * differently than DC or Charlottesville — many venues are all-inclusive
 * per-event packages rather than rental + separate catering — which the
 * venue notes below call out. Numbers are sourced where a URL is given;
 * anything derived is flagged `estimated: true` (venues) or explained in a
 * note, per the seed-data research standard.
 */
export const newOrleans: DestinationSeed = {
  key: "new-orleans-la",
  name: "New Orleans, LA",
  country: "United States",
  countryCode: "US",
  region: "French Quarter, Garden District, Uptown, and Central Business District",
  rank: 8,
  whyHere:
    "Joshua & Janel asked for New Orleans as a domestic finalist with real personality: live music, food, and architecture that doesn't feel like a generic ballroom, no passport required, and enough nonstop flights from Northeast, Mid-Atlantic, and Southern hubs that most of their ~100-person list can get there in a single hop.",
  notes:
    "Attendance is estimated at 0.84, near the top of the 80-85% 'local wedding' attendance band (pix.wedding; destify.com) — domestic and no passport, with one of the densest nonstop flight networks of any US finalist (54+ nonstop destinations from Louis Armstrong International), but placed just below DC's 0.85 because, unlike DC, there's no realistic drive-or-train fallback for Northeast guests if a flight falls through.",
  travelCostPerGuestEstimate: 1010,
  lodgingPerNightEstimate: 180,
  attendanceRateEstimate: 0.84,
  weatherNotes:
    "New Orleans spring runs warm and increasingly humid: March averages a 70.7°F high / 58.3°F low with highs pushing into the mid-70s and occasionally past 82°F later in the month; by April-May, average daily highs climb from about 70°F to 89°F, with lows in the low-50s to upper-70s and periodic showers (freetoursbyfoot.com; weatherspark.com). The upside for a spring date: the whole March-May window falls before the Atlantic hurricane season, which officially runs June 1-November 30 (noaa.gov).",
  legalNotes:
    "Both parties apply together, in person, at the Orleans Parish Marriage License Office (Benson Tower, 1450 Poydras Street, Suite 407, 8:15am-3:15pm weekdays) or at Second City Court in Algiers (225 Morgan Street, 9am-3pm weekdays). Bring a current driver's license, state ID, or passport, a certified birth certificate, and a Social Security number for each party; if either has been married before, bring the divorce decree or a death certificate. The fee is $27.50, cash/check/money order only (no cards), plus $5 for each certified copy of the certificate. Louisiana imposes a 24-hour waiting period between issuance and the ceremony — waivable by a First or Second City Court judge for Louisiana residents, or, if both parties live outside Louisiana and the ceremony will be performed in Orleans Parish by a registered Orleans officiant, waivable by that officiant. Once issued, the license expires 30 days later, so apply within a month of the ceremony date, not earlier. Verify with the local authority or an attorney.",
  seasonNotes:
    "March-May is New Orleans' peak spring wedding season, and two recurring citywide festivals fall squarely inside it: French Quarter Festival (mid-April; 2026's dates are April 16-19) and Jazz Fest (late April into early May; 2026 runs April 23-May 3 at the Fair Grounds). Both draw large crowds, tighten hotel inventory, and push rates up citywide, whether or not the wedding itself is anywhere near the French Quarter or the Fair Grounds — worth checking both festivals' actual spring-2028 dates against any date hold (frenchquarterfest.org; musicfestivalwizard.com; neworleans.com). A date in the first half of March, or after Jazz Fest closes in early May, avoids the biggest overlap.",
  travelNotes:
    "Louis Armstrong New Orleans International (MSY) is a genuine hub for this guest list: roughly 54-56 nonstop destinations across 28 states plus international routes to Paris, London-Heathrow, Toronto, and seasonal Cancún, with nonstop domestic service including Atlanta, Baltimore, Boston, Charlotte, and both New York airports among others (flymsy.com). There's no practical drive or rail alternative for most Northeast or Mid-Atlantic guests (a drive from New York runs well over 18 hours), so this is a fly-in wedding for nearly everyone, but the flight itself is typically a single nonstop hop. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average domestic round-trip fare, the same national figure used for the DC and Portland finalists) + 3 nights x $180/night (blended between BudgetYourTrip's $132 all-New Orleans hotel average and The Hotel Guru's ~$194 French Quarter-specific average, since a wedding block skews toward the pricier French Quarter/CBD hotels) = $1,010 per guest.",
  sourceUrls: [
    "https://ldh.la.gov/page/how-to-obtain-an-orleans-parish-marriage-license",
    "https://ldh.la.gov/assets/oph/center-rs/vitalrec/requirementsforobtainingamarriagelicense.pdf",
    "https://www.myneworleans.com/marriage-license-101/",
    "https://www.ulc.org/wedding-laws/louisiana",
    "https://freetoursbyfoot.com/new-orleans-weather-in-march/",
    "https://weatherspark.com/s/11799/0/Average-Spring-Weather-in-New-Orleans-Louisiana-United-States",
    "https://www.noaa.gov/tropical-cyclone-climatology",
    "https://frenchquarterfest.org/",
    "https://www.musicfestivalwizard.com/festivals/french-quarter-fest-2026/",
    "https://www.neworleans.com/events/seasons/spring-festivals/",
    "https://flymsy.com/nonstop-flights/",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/new-orleans-4335045",
    "https://www.thehotelguru.com/en-us/best-hotels/united-states-of-america/new-orleans/affordable-hotels",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "no-board-of-trade",
      name: "New Orleans Board of Trade",
      website: "https://www.boardoftradenola.com/",
      capacity: 250,
      rentalFee: 4750,
      fbMinimum: 20000,
      estimated: true,
      styleNotes:
        "An 1880 Renaissance Revival trading hall in the CBD with an eight-sectioned mural dome and multiple outdoor courtyards; up to 500 guests reception-style or 250 seated. The venue's own pricing sheet lists a $4,000-$5,500 rental fee for a 3-hour reception window (excluding setup/breakdown) — rentalFee above is the midpoint, marked estimated — plus a $20,000 food & beverage minimum on Saturdays.",
      availabilityNotes: "See the venue's published wedding pricing sheet for a date-specific quote.",
      sourceUrls: [
        "https://www.boardoftradenola.com/wp-content/uploads/2025/01/Weddings-1225.pdf",
        "https://www.theknot.com/marketplace/new-orleans-board-of-trade-new-orleans-la-270021",
        "https://www.wedding-spot.com/venue/7305/new-orleans-board-of-trade/",
      ],
    },
    {
      key: "no-race-and-religious",
      name: "Race & Religious",
      website: "https://www.raceandreligious.com/",
      capacity: 275,
      rentalFee: 5500,
      estimated: true,
      styleNotes:
        "Three individually restored 1830s Creole cottages and brick courtyards in the Lower Garden District — an intimate, plant-filled alternative to New Orleans' bigger mansion venues. Directories list capacity up to 275 guests (a couple of sources cite a tighter 90-seated/200-cocktail split for a single layout), and full wedding packages start at $5,500 — rentalFee above is that starting figure, marked estimated pending a specific date and package.",
      availabilityNotes: "Contact info@raceandreligious.com or 504-523-0890 for a date-specific quote.",
      sourceUrls: [
        "https://www.raceandreligious.com/",
        "https://www.theknot.com/marketplace/race-and-religious-new-orleans-la-372955",
        "https://www.herecomestheguide.com/wedding-venues/louisiana/race-religious",
        "https://zola.com/wedding-vendors/wedding-venues/race-and-religious",
      ],
    },
    {
      key: "no-southern-oaks",
      name: "Southern Oaks",
      website: "https://www.southernoaksweddings.com/",
      capacity: 350,
      perGuestCost: 251,
      inHouseCatering: true,
      estimated: true,
      styleNotes:
        "A restored antebellum-style mansion on nine acres nine miles from the French Quarter, with a live-oak-lined front lawn for ceremonies. Unlike Board of Trade or Race & Religious, Southern Oaks prices as an all-inclusive 3-hour reception package (80+ hand-passed hors d'oeuvres, open bar, DJ, coordination, security, candlelit centerpieces) rather than a bare rental fee — published at $22,000-$28,200 depending on year and day; perGuestCost above is that range's midpoint divided by 100 guests, marked estimated since the package isn't priced strictly per head. A separate ceremony add-on runs $2,500-$3,000. Capacity runs 100-350 depending on package.",
      availabilityNotes: "See southernoaksweddings.com/pricing for the current package sheet.",
      sourceUrls: [
        "https://www.southernoaksweddings.com/pricing",
        "https://www.theknot.com/marketplace/southern-oaks-new-orleans-la-280081",
        "https://www.magnolia-weddings.com/blog/how-much-does-a-wedding-venue-in-new-orleans-cost",
        "https://www.eventective.com/new-orleans-la/southern-oaks-616961.html",
      ],
    },
  ],
  scenario: {
    fixedCosts: 21300,
    perGuestCost: 200,
    travelCostPerGuest: 1010,
    attendanceRate: 0.84,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes New Orleans Board of Trade's $4,750 midpoint venue rental and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items: planner $2,100, photographer $3,000 + partial videographer allowance, flowers $2,800, DJ $1,800, stationery ~$600, attire+beauty ~$2,900, transportation $1,100, wedding bands ~$1,400), rounded to $21,300. perGuestCost ($200) is Board of Trade's own $20,000 Saturday food & beverage minimum divided by 100 guests — a direct, sourced floor rather than a national average, since NOLA catering commonly runs through venue-set F&B minimums. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
