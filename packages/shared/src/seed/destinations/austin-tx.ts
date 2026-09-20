import type { DestinationSeed } from "../types";

/**
 * Austin, TX.
 *
 * A domestic Texas Hill Country/Central Texas finalist: live music and food
 * personality in the New Orleans mold, no passport, and one of the
 * best-connected mid-size airports in the country (87+ nonstop destinations
 * in 2026). Austin's own history carries real risk categories (East Texas
 * cotton-belt plantations, antebellum river-bottom estates), so every venue
 * below was checked individually: The Allan House (built 1883 by Scottish
 * immigrant attorney John Allan, 18 years after emancipation) and Hotel
 * Ella/the Goodall Wooten House (built 1900 as a wedding gift, also
 * post-emancipation) both post-date the Civil War and slavery in Texas by
 * a wide enough margin, and neither property's own marketing references
 * enslaved labor, domestic staff quarters, or plantation-era history in any
 * form — both read as ordinary Victorian/Greek Revival family homes turned
 * boutique event venues, the same category New Orleans' Old Ursuline Convent
 * and Charleston's Alhambra Hall fall into. Ranch Austin and Saengerrunde
 * Halle are purpose-built (a modern event ranch and an 1908 German singing-
 * society hall) with no residential or agricultural-estate history at all.
 * Numbers below are sourced where a URL is given; anything derived is
 * flagged `estimated: true` (venues) or explained in a note.
 */
export const austinTx: DestinationSeed = {
  key: "austin-tx",
  name: "Austin, TX",
  country: "United States",
  countryCode: "US",
  region: "Downtown/Rainey Street, South Congress, Dripping Springs Hill Country fringe",
  rank: 11,
  whyHere:
    "Joshua & Janel asked for Austin as a domestic finalist with a distinct live-music-and-food identity rather than a generic hotel ballroom, no passport required, and one of the most nonstop-connected mid-size airports in the country — a real advantage for a ~100-person list scattered across the East Coast.",
  notes:
    "Attendance is estimated at 0.85, the top of the 80-85% 'local wedding' attendance band (pix.wedding; destify.com) — domestic, no passport, and Austin-Bergstrom's 87+ nonstop destinations in 2026 (more than New Orleans' 54-56) make it the best-connected of the Texas/Gulf Coast finalists, so it sits at the top of the band alongside DC.",
  travelCostPerGuestEstimate: 1070,
  flightCostEstimate: 470,
  lodgingPerNightEstimate: 200,
  attendanceRateEstimate: 0.85,
  weatherNotes:
    "Austin spring warms quickly: March averages a 75°F high / 51°F low, April climbs to about 80°F/59°F, and May reaches roughly 87°F/67°F with the year's heaviest rainfall (about 5 inches) (accuweather.com; currentresults.com; wanderlog.com). An outdoor ceremony is a good bet in March or early April; a May date should plan a tented or indoor backup for afternoon storms, and by late May Texas heat and humidity are both climbing toward summer levels.",
  legalNotes:
    "Both parties apply together, in person, at the Travis County Clerk's office (Civil Family Courthouse, 1700 Guadalupe St, 4th Floor, Austin; M-F 8am-4:30pm) with a valid photo ID and Social Security number for each party; anyone previously married should bring the final divorce decree or a death certificate. The standard fee is $81 ($20 with a completed 'Twogether in Texas' premarital education course); starting April 1, 2026, Travis County adds a $100 surcharge if neither applicant can show proof of Texas residency — since Joshua and Janel would be applying as out-of-state residents, budget for $181 total unless one of them can document Texas residency. Texas imposes a 72-hour waiting period between issuance and the ceremony, waivable with a judge's written order, for active-duty military, or by completing the Twogether in Texas course (which also drops the fee to $20). The license is valid for 90 days after issuance in any Texas county, so apply within that window of the ceremony date, not earlier. Verify with the local authority or an attorney.",
  seasonNotes:
    "March is the one month to actively plan around: South by Southwest (SXSW) runs in mid-March most years (2027 is set for March 15-21) and fills downtown hotels, spikes rates citywide, and clogs downtown traffic and rideshare availability, whether or not the wedding venue is anywhere near the conference itself — worth checking SXSW's actual spring-2028 dates against any date hold (sxsw.com). April and early May, after SXSW closes and before peak summer heat, are Austin's best-value spring weeks; Austin City Limits Festival falls in October and doesn't overlap the couple's March-May window at all.",
  travelNotes:
    "Austin-Bergstrom International (AUS) is a genuinely strong hub for this guest list: roughly 87-104 nonstop destinations as of mid-2026 across the US, Mexico, Canada, and a new Southwest route to San José, Costa Rica, with year-round nonstop service to major East Coast/Mid-Atlantic cities including both New York airports, Boston, Washington DC, and Charlotte (flyaustin.com; directflights.com). There's no realistic drive or rail alternative for most Northeast or Mid-Atlantic guests, but the flight itself is typically a single nonstop hop for the bulk of the list. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average domestic round-trip fare, the same national figure used across the other US finalists) + 3 nights x $200/night (rounded from GetCostIdea's projected $199 Austin-wide average for 2026, close to the GSA's $173-187 federal per-diem range and above the $181 three-star average, since a wedding block skews slightly upscale) = $1,070 per guest.",
  sourceUrls: [
    "https://countyclerk.traviscountytx.gov/departments/recording/marriage-license/",
    "https://countyclerk.traviscountytx.gov/departments/recording/non-texas-residents/",
    "https://marriagesignals.com/blog/complete-guide-marriage-licenses-texas",
    "https://cadenzacounseling.org/why-texas-makes-you-wait-72-hours-to-get-married/",
    "https://www.accuweather.com/en/us/austin/78701/march-weather/351193",
    "https://www.currentresults.com/Weather/Texas/Places/austin-weather-in-march.php",
    "https://wanderlog.com/weather/58163/3/austin-weather-in-march",
    "https://sxsw.com/2026/south-by-southwest-2027-dates-announced/",
    "https://www.flyaustin.com/nonstop-flights-out-aus",
    "https://www.directflights.com/AUS",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://getcostidea.com/average-hotel-cost-per-night-austin-texas-price-guide/",
    "https://www.federalpay.org/perdiem/2026/texas/austin",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "atx-ranch-austin",
      name: "Ranch Austin",
      website: "https://www.ranchaustin.com/",
      capacity: 160,
      rentalFee: 5000,
      estimated: true,
      styleNotes:
        "A modern, purpose-built event ranch on 25 acres in southwest Austin, 15 minutes from downtown — no historic residence or agricultural-estate history to weigh, since the venue was built as a wedding facility. An elegant indoor banquet hall with a 10,000 sq ft outdoor patio; seating up to 200 is possible but the venue itself recommends 160 and below. Rental runs $3,500-$6,500 for a 12-hour block including setup/breakdown, tables, chairs, a ceremony arch, and audio equipment; rentalFee above is the midpoint, marked estimated.",
      availabilityNotes: "Contact the venue directly via ranchaustin.com for a date-specific quote.",
      sourceUrls: [
        "https://www.ranchaustin.com/reserved-dates",
        "https://www.theknot.com/marketplace/ranch-austin-austin-tx-760455",
        "https://theorchidlist.com/wedding-vendors/ranch-austin",
      ],
    },
    {
      key: "atx-saengerrunde-halle",
      name: "Saengerrunde Halle",
      website: "https://www.austinsaengerrunde.org/",
      capacity: 400,
      rentalFee: 2000,
      estimated: true,
      styleNotes:
        "A National Historic Site hall built in 1908 for the Austin Saengerrunde German singing society (founded 1879) — a purpose-built cultural/social hall, not a residence or estate, so there's no plantation or domestic-slavery history to weigh. Original iron chandelier and 1800s photos inside; the main hall holds up to 400 standing/250 seated, with an additional ~100-person terrace. A BYO-alcohol policy and sound system/dance floor are included. Older pricing cites $2,000 for a Friday/Saturday rental; used above as an estimated starting figure pending a current quote.",
      availabilityNotes: "Contact the Saengerrunde directly at (512) 478-1411 for current rates and a date-specific quote.",
      sourceUrls: [
        "https://www.theknot.com/marketplace/austin-saengerrunde-austin-tx-804501",
        "https://www.weddingwire.com/biz/austin-saengerrunde-austin/328baf073cb616b7.html",
        "https://thevendry.com/venue/119697/saengerrunde-hall-austin-tx",
      ],
    },
    {
      key: "atx-hotel-ella",
      name: "Hotel Ella",
      website: "https://www.hotelella.com/weddings",
      capacity: 200,
      rentalFee: 10500,
      perGuestCost: 130,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "The historic Goodall Wooten House, a Greek Revival mansion built in 1900 as a wedding gift, later a dormitory, sorority house, and rehab center before its 2013 renovation into a 47-room boutique hotel — built 35 years after emancipation and with no plantation-era or enslaved-labor history referenced anywhere in its own telling of the property's past. A wraparound veranda, cabana-lined pool, and a recently renovated Grand Ballroom that opens onto the veranda. Full ceremony-and-reception pricing starts at $10,500 for off-peak dates ($25,000 peak) with on-site catering at $130/guest off-peak; both figures used above, marked estimated since a spring-2028 date's exact tier isn't yet known.",
      availabilityNotes: "Contact the hotel's events team via hotelella.com for a date-specific quote and peak/off-peak pricing.",
      sourceUrls: [
        "https://www.hotelella.com/weddings",
        "https://www.hotelella.com/weddings-gatherings",
        "https://www.herecomestheguide.com/wedding-venues/texas/hotel-ella",
      ],
    },
    {
      key: "atx-allan-house",
      name: "The Allan House",
      website: "https://allanhouse.com/events/weddings/",
      capacity: 200,
      rentalFee: 6000,
      estimated: true,
      styleNotes:
        "A Victorian mansion built in 1883 by Scottish immigrant John Allan (an attorney and public servant), three blocks from the Texas Capitol — built 18 years after emancipation, later used as a girls' school and boarding facility rather than a working residence with staff quarters, and the venue's own history page makes no reference to enslaved or domestic-servant labor. Century-old oak trees and a landscaped courtyard for an indoor/outdoor combo. Capacity is tiered: indoor receptions hold up to 60, the veranda up to 50, and the courtyard up to 200 seated — worth confirming the courtyard is included for a ~100-guest count, since the indoor-only capacity is well below that. Rental starts at $6,000 for low-season, non-Saturday dates; used above as an estimated starting figure.",
      availabilityNotes: "Contact the venue directly via allanhouse.com for a date-specific quote.",
      sourceUrls: [
        "https://allanhouse.com/story/",
        "https://allanhouse.com/events/weddings/",
        "https://www.myweddingscout.com/venues/allan-house/",
      ],
    },
  ],
  scenario: {
    fixedCosts: 21550,
    perGuestCost: 140,
    travelCostPerGuest: 1070,
    attendanceRate: 0.85,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes Ranch Austin's $5,000 midpoint venue rental — a mid-market, guest-count-appropriate pick — and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items: planner $2,100, photographer $3,000 + partial videographer allowance, flowers $2,800, DJ $1,800, stationery ~$600, attire+beauty ~$2,900, transportation $1,100, wedding bands ~$1,400), rounded to $21,550. perGuestCost ($140) blends The Knot's national $80/guest catering average upward toward Hotel Ella's own $130/guest published off-peak catering floor, plus roughly $10/guest for cake, favors and incidental rentals. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
