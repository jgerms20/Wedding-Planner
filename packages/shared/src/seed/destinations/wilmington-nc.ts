import type { DestinationSeed } from "../types";

/**
 * Wilmington, NC.
 *
 * A Cape Fear River port city with a real historic downtown and a modern
 * riverfront event scene — coastal North Carolina personality without the
 * antebellum-mansion market some nearby destinations lean on. Wilmington's
 * own history includes real plantation-era river-port commerce (it was a
 * significant point of departure in the domestic slave trade), so every
 * candidate venue here was checked individually per the standing rule in
 * .claude/skills/wedding-research/SKILL.md rather than assumed safe because
 * it's a "warehouse" or "downtown building" and not a rural estate. All
 * three venues below are purpose-built commercial or municipal buildings —
 * a hotel, a warehouse, and a 1915 firehouse — with no residential-estate
 * history or "historic charm" marketing tied to enslaved labor. Numbers are
 * sourced where a URL is given; anything derived is flagged `estimated: true`
 * (venues) or explained in a note.
 */
export const wilmingtonNc: DestinationSeed = {
  key: "wilmington-nc",
  name: "Wilmington, NC",
  country: "United States",
  countryCode: "US",
  region: "Downtown riverfront, Cape Fear River",
  rank: 21,
  whyHere:
    "Joshua & Janel asked for a river/coastal North Carolina option: a real historic downtown along the Cape Fear River, no passport, and its own commercial airport, without leaning on the antebellum-plantation market that dominates several nearby Southern coastal towns.",
  notes:
    "Attendance is estimated at 0.82, in the middle of the 80-85% 'local wedding' attendance band (pix.wedding; destify.com) — domestic and no passport, but Wilmington International's much smaller route network (about 9-24 nonstop destinations depending on the source) than DC, New Orleans, or Charleston means more East Coast guests will need a connection.",
  travelCostPerGuestEstimate: 1042,
  lodgingPerNightEstimate: 184,
  attendanceRateEstimate: 0.82,
  weatherNotes:
    "Wilmington spring warms steadily and stays comfortable: March averages a 66°F high/44°F low, April climbs to about 74°F/52°F, and May reaches roughly 81°F/60°F, with a modest chance of rain in March easing through the spring (accuweather.com; usclimatedata.com). It's reliable outdoor-ceremony weather for the whole window, ahead of both peak summer humidity and Atlantic hurricane season (June-November).",
  legalNotes:
    "Both parties apply together, in person, at the New Hanover County Register of Deeds (Wilmington) with valid photo ID; the fee is $60. North Carolina has no waiting period, no blood test, and no physical exam requirement, so the license can be used the same day it's issued. Once issued, the license is valid for 60 days. Verify with the local authority or an attorney.",
  seasonNotes:
    "Spring is a genuine shoulder season in Wilmington, ahead of the summer beach-tourism peak (June-August) that drives up hotel rates and crowds along the nearby beaches (Wrightsville, Carolina, Kure). The North Carolina Azalea Festival, a major citywide event, runs in early-to-mid April and draws large crowds downtown — worth checking its exact spring-2028 dates against any date hold, since it noticeably tightens hotel inventory right in the venue-search area.",
  travelNotes:
    "Wilmington International Airport (ILM) has nonstop service to a modest but real set of East Coast destinations — reports range from about 9 to 24 nonstop routes depending on the source and season, via American, Delta, United, Breeze, and Avelo, including Boston, both New York airports, Washington-National, Atlanta, and several Northeast leisure markets (flyilm.com; airportoverview.com). Guests outside those direct routes will connect through Charlotte, Atlanta, or a Northeast hub. There's no realistic drive alternative for most Northeast guests, but Mid-Atlantic guests within a day's drive have that option. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average) + 3 nights x $184/night (BudgetYourTrip's Wilmington-wide hotel average) = $1,042 per guest.",
  sourceUrls: [
    "https://www.nhcgov.com/439/Marriage-Application",
    "https://www.wilmingtonandbeaches.com/groups-and-weddings/faq/",
    "https://www.accuweather.com/en/us/wilmington/28401/march-weather/329819",
    "https://usclimatedata.com/climate/wilmington/north-carolina/united-states/usnc0760",
    "https://flyilm.com/airlines-at-ilm/",
    "https://www.airportoverview.com/routes/ILM",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/wilmington-4499379",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "ilm-hotel-ballast",
      name: "Hotel Ballast Wilmington",
      website: "https://hotelballast.com/weddings/",
      capacity: 500,
      rentalFee: 7777,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A modern full-service hotel directly on the Cape Fear River downtown, with 20,000 sq ft of event space, an 18-foot-ceilinged Grand Ballroom, and river/bridge views — a purpose-operated hotel, not a converted historic residence, so no plantation-era history to weigh. Holds up to 500 for a reception (Cape Fear Ballroom alone seats 400 banquet-style). Full-wedding spend is reported starting around $7,777 for 50 guests; rentalFee above is that reported starting figure, marked estimated.",
      availabilityNotes: "Contact the hotel's events team via hotelballast.com for a date-specific quote.",
      sourceUrls: [
        "https://hotelballast.com/weddings/",
        "https://www.wedding-spot.com/venue/7435/hotel-ballast/",
        "https://www.eventective.com/wilmington-nc/hotel-ballast-wilmington-5355.html",
      ],
    },
    {
      key: "ilm-warehouse-on-water",
      name: "Warehouse on Water",
      website: "https://www.warehouseonwater.com/",
      capacity: 250,
      rentalFee: 3200,
      inHouseCatering: false,
      estimated: true,
      styleNotes:
        "A 6,000 sq ft riverside warehouse in downtown Wilmington, split across two connected levels — an industrial commercial building, not a residence, so no plantation-era history applies. Seats about 150, holds 250+ for a cocktail-style reception. Published rental starts at $3,200; rentalFee above is that reported starting figure, marked estimated. Outside catering/vendor policy applies.",
      availabilityNotes: "Contact the venue directly via warehouseonwater.com for a date-specific quote and vendor policy.",
      sourceUrls: [
        "https://www.warehouseonwater.com/",
        "https://www.wilmingtonandbeaches.com/listing/warehouse-on-water/1796/",
        "https://www.eventective.com/wilmington-nc/warehouse-1856-695323.html",
      ],
    },
    {
      key: "ilm-station-no-2",
      name: "Station No. 2",
      website: "https://stationno2.com/",
      capacity: 99,
      rentalFee: 4050,
      estimated: true,
      styleNotes:
        "A boutique venue in a real 1915 firehouse in the Castle Street Arts District — built and operated by the city fire department from the start, so no plantation or domestic-residence history to weigh at all, just municipal service history. Original floors, exposed brick, and tin ceilings inside, with a walled private garden courtyard for an indoor/outdoor combo, plus an upstairs two-bedroom suite. Capacity runs 80-99 depending on layout — smaller than the other Wilmington venues, worth noting for a ~100-guest target. Published full-building rental with overnight stay runs $1,900-$4,200 (another source cites $2,900-$5,200); rentalFee above is the midpoint of the wider range, marked estimated.",
      availabilityNotes: "Contact the venue directly via stationno2.com for a date-specific quote.",
      sourceUrls: [
        "https://stationno2.com/",
        "https://www.detailedeventvisions.com/blog/how-to-get-married-at-station-no-2-wilmington-wedding-planner/",
        "https://www.theknot.com/marketplace/station-no-2-wilmington-nc-2043374",
      ],
    },
  ],
  scenario: {
    fixedCosts: 20200,
    perGuestCost: 90,
    travelCostPerGuest: 1042,
    attendanceRate: 0.82,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes Warehouse on Water's $3,200 starting venue rental — a mid-market, guest-count-appropriate pick — and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items — see the Washington DC file's scenario note for the full item list), rounded to $20,200. perGuestCost ($90) follows the same approach as Portland: The Knot's national $80/guest catering average plus roughly $10/guest for cake, favors and incidental rentals, since none of the three Wilmington venues publishes a single all-in per-guest catering figure. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
