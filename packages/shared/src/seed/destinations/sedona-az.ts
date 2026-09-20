import type { DestinationSeed } from "../types";

/**
 * Sedona, AZ.
 *
 * A red-rock desert backdrop that reads completely differently from every
 * other Southwest option on the list — Santa Fe's adobe downtown, Taos's
 * high-mountain art colony — and from the Pacific Northwest options too:
 * red sandstone buttes, resort-heavy infrastructure, and no historic
 * downtown to plan around. No passport, easy Arizona paperwork, but the
 * farthest of the AZ/NM options from a full-service airport. Numbers are
 * sourced where a URL is given; anything derived is flagged `estimated: true`
 * (venues) or explained in a note, per the seed-data research standard.
 */
export const sedonaAz: DestinationSeed = {
  key: "sedona-az",
  name: "Sedona, AZ",
  country: "United States",
  countryCode: "US",
  region: "Sedona proper (Uptown, West Sedona, Village of Oak Creek) and Boynton Canyon/Oak Creek Canyon just outside it",
  rank: 26,
  whyHere:
    "If Joshua & Janel want a Southwest desert backdrop but a genuinely different look from Santa Fe's adobe downtown — red-rock buttes, resort-style venues, and a spa-and-hiking vacation feel for guests — Sedona is worth a look. No passport needed and Arizona's marriage-license process is about as simple as it gets, but it's a longer drive from the nearest big airport than either Santa Fe or Taos, which is worth weighing against how much the scenery is worth to them.",
  notes:
    "Attendance is estimated at 0.78, a touch below Portland's 0.80 baseline for a domestic, no-passport wedding: Sedona has no commercial airport of its own, so nearly every guest faces either a 1.5-2 hour drive from Phoenix Sky Harbor or a shorter but much-more-limited connection through Flagstaff, which is more transfer friction than Santa Fe's roughly one-hour hop from Albuquerque (pix.wedding; destify.com; shakaguide.com).",
  travelCostPerGuestEstimate: 1154,
  flightCostEstimate: 470,
  lodgingPerNightEstimate: 228,
  attendanceRateEstimate: 0.78,
  weatherNotes:
    "Sedona sits at about 4,500 feet, which keeps spring notably milder than Flagstaff or the high mountains around Taos: March averages a 38°F low/65°F high, April climbs to a 44°F low/73°F high, and May reaches a 51°F low/82°F high, with little humidity (sedonamonthly.com; national-park.com). It's close to ideal outdoor-ceremony weather for the whole March-May window, with warm, sunny days and cool evenings — a light layer for guests after sunset is the main accommodation to plan for.",
  legalNotes:
    "Arizona has no waiting period and no blood-test requirement, and a license issued by any county clerk in the state is valid for a ceremony anywhere in Arizona for 12 months from issuance. The most convenient option for a Sedona wedding is the Coconino County Clerk of the Superior Court in Flagstaff (200 N. San Francisco St.), about a 30-45 minute drive from Sedona; both parties must appear together in person with valid photo ID, and the fee is $98 (cash, cashier's check, or money order; the Flagstaff office also accepts card). Verify with the local authority or an attorney.",
  seasonNotes:
    "Unlike Santa Fe or Portland, spring is not Sedona's shoulder season — it's one of the two busiest, most expensive stretches of the year (alongside fall), when trailhead parking lots fill before sunrise and hotel rates run at or near their annual peak. A Sedona wedding in the March-May window should expect resort pricing and book well ahead rather than count on off-season rates. The two dedicated local events in the window are minor by comparison: the Celebration of Spring family festival in early April (Posse Grounds Park) and the one-day Sedona Music Festival in May, both of which mostly affect weekend crowds at those specific venues rather than citywide pricing (sedonaaz.gov; sedona.net; avantstay.com).",
  travelNotes:
    "Sedona Airport (SEZ) has no scheduled commercial service — it's private/charter/general-aviation only. Guests have two realistic options: Flagstaff Pulliam (FLG), about 26 miles/45 minutes away but with only limited regional-jet service, or Phoenix Sky Harbor International (PHX), a major hub with 24 airlines serving 130+ domestic destinations (including East Coast nonstops to Atlanta, Boston, Baltimore and Buffalo) but a 1.5-2.5 hour drive depending on route and traffic. Shuttle operators (Groome Transportation and others) run scheduled and door-to-door service between PHX and Sedona for guests who'd rather not rent a car. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average) + 3 nights x $228/night (Budget Your Trip's Sedona 3-star average) = $1,154 per guest.",
  sourceUrls: [
    "https://www.coconino.az.gov/134/Marriage-Licenses",
    "https://azcourthelp.org/topics/marriage/marriage-license",
    "https://www.docdraft.ai/legal-guides/getting-married/arizona",
    "https://heartcraftweddingfilms.com/post/arizona-marriage-license-cost-rules-how-to-get-one",
    "https://sedonamonthly.com/2026/best-time-to-visit-sedona/",
    "https://www.national-park.com/sedona-weather-by-month/",
    "https://avantstay.com/blog/best-time-to-visit-sedona/",
    "https://www.sedonaaz.gov/your-government/departments-and-programs/parks-recreation/events/celebration-of-spring-2026",
    "https://www.sedona.net/festivals",
    "https://www.shakaguide.com/article/sedona/airport-for-sedona-az",
    "https://www.skyharbor.com/flights/where-we-fly/",
    "https://airportshuttleofphoenix.com/blog/phoenix-airport-to-sedona-shuttle-guide",
    "https://groometransportation.com/sedona/",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/sedona-5313667",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "sedona-agave-of-sedona",
      name: "Agave of Sedona",
      website: "https://agaveofsedona.com/weddings",
      capacity: 200,
      rentalFee: 12200,
      inHouseCatering: false,
      estimated: true,
      styleNotes:
        "Sedona's dedicated private wedding venue: over 10,000 sq ft with a ceremony terrace, red-rock views, and the Montage Ballroom for the reception, plus on-site villas offering guests a stay-and-celebrate option. Couples source their own alcohol (a real cost saver) and bring in outside catering. Published packages run: ceremony-only $3,950-$7,950; reception-only $8,250-$17,050; ceremony+reception (no vendors) $12,200-$25,000; with vendors, $14,375-$35,750. rentalFee above is the ceremony+reception (no-vendor) package's low end, marked estimated since exact pricing depends on date and season. Seated capacity runs up to 200.",
      availabilityNotes: "Contact the venue directly through agaveofsedona.com/weddings for a date-specific quote.",
      sourceUrls: [
        "https://agaveofsedona.com/weddings",
        "https://www.theknot.com/marketplace/agave-of-sedona-wedding-and-event-center-sedona-az-349596",
        "https://www.wedding-spot.com/venue/2509/agave-of-sedona/",
        "https://www.weddingwire.com/vendor/pricing/file/64e5b709-66fc-49d4-b8e2-5d980354982d/4ef6beba-6f8c-485e-8d32-b701ecd0500d/Agave-Packages-Pricing-Weddings.pdf",
      ],
    },
    {
      key: "sedona-lauberge-de-sedona",
      name: "L'Auberge de Sedona",
      website: "https://www.lauberge.com/gatherings/weddings/",
      capacity: 150,
      rentalFee: 6250,
      perGuestCost: 175,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A creekside luxury resort along Oak Creek with multiple outdoor ceremony sites framed by red-rock formations and the Garden Ballroom (floor-to-ceiling windows, a wood-burning fireplace) as the largest indoor reception space. Published venue-rental pricing for ceremony plus reception runs $2,500-$10,000 (rentalFee above is the midpoint, marked estimated); in-house catering packages run $175-$250/guest, and perGuestCost above uses the low end. Capacity for a full wedding is up to 150.",
      availabilityNotes: "Contact sales@lauberge.com for a date-specific quote.",
      sourceUrls: [
        "https://www.lauberge.com/gatherings/weddings/",
        "https://www.herecomestheguide.com/wedding-venues/arizona/lauberge-de-sedona",
        "https://www.weddingwire.com/biz/l-auberge-de-sedona-sedona/a6c5fe29ad795ac2.html",
      ],
    },
    {
      key: "sedona-enchantment-resort",
      name: "Enchantment Resort",
      website: "https://www.enchantmentresort.com/sedona-event-venues/weddings/",
      capacity: 320,
      rentalFee: 22250,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A modern (1980s-built) resort at the base of Boynton Canyon, walled in on three sides by towering red-rock formations, with 218 casita-style rooms across 70 acres. Three indoor ballrooms plus an outdoor Village Terrace welcome up to 320 guests. A third-party planner-cost aggregator cites $22,250 as a representative full-wedding figure for this venue; rentalFee above uses that number, marked estimated pending a direct quote.",
      availabilityNotes: "Contact weddings@enchantment.com or 928-204-6190 for a date-specific quote.",
      sourceUrls: [
        "https://www.enchantmentresort.com/sedona-event-venues/weddings/",
        "https://www.eventective.com/sedona-az/enchantment-resort-682774.html",
        "https://www.weddingwire.com/biz/enchantment-resort/6c9b3ea8b5569ff4.html",
      ],
    },
  ],
  scenario: {
    fixedCosts: 22800,
    perGuestCost: 175,
    travelCostPerGuest: 1154,
    attendanceRate: 0.78,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes L'Auberge de Sedona's $6,250 midpoint venue-rental figure and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items — see the Washington DC file's scenario note for the full item list), rounded to $22,800. perGuestCost ($175) uses L'Auberge's own published in-house catering package floor, a concrete Sedona anchor since Agave of Sedona (the other full-capacity venue) is a BYO-alcohol, outside-catering space with no catering price of its own. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
