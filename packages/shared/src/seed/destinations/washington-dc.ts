import type { DestinationSeed } from "../types";

/**
 * Washington, D.C.
 *
 * The East Coast "everyone can get there" option: no passport, a short drive
 * or nonstop flight for most Northeast/Mid-Atlantic guests, and Amtrak as a
 * no-fly backup for the Northeast Corridor. Numbers below are sourced where a
 * URL is given; anything derived is flagged `estimated: true` (venues) or
 * explained in a note, per the seed-data research standard.
 */
export const washingtonDc: DestinationSeed = {
  key: "washington-dc",
  name: "Washington, D.C.",
  country: "United States",
  countryCode: "US",
  region: "District of Columbia (hotel-block overflow in Arlington/Alexandria, VA or Bethesda, MD)",
  rank: 4,
  whyHere:
    "DC could be the East Coast hub for Joshua & Janel's people — if most of their ~100 invited guests are clustered in the Northeast and Mid-Atlantic, this may be the one finalist a large share of the list can reach by car or a short nonstop flight instead of a multi-leg international trip. It's also a possibility if either of them has close friends or family who live in or near the city.",
  notes:
    "Attendance is estimated at 0.85, the top of the 80-85% 'local wedding' attendance band reported by wedding-industry guest-attendance analyses, rather than the 60-70% destination-wedding band — because DC is domestic, requires no passport, and is drivable for much of a Northeast/Mid-Atlantic-heavy guest list (pix.wedding; destify.com).",
  travelCostPerGuestEstimate: 1370,
  lodgingPerNightEstimate: 300,
  attendanceRateEstimate: 0.85,
  weatherNotes:
    "March-May is genuine spring in DC: mild and increasingly warm, but the headline variable is the cherry blossoms. Peak bloom lands in late March to early April but shifts year to year — March 17 in 2024, March 28 in 2025, March 26 in 2026 — so a fixed spring-2028 date can't be guaranteed to hit it (cherryblossomwatch.com). Blossoms hold for only 7-10 days after peak, shorter if it's windy. The National Cherry Blossom Festival draws over 1.5 million visitors and roughly $200M in economic impact to the district over its multi-week run, which means dense crowds at the Tidal Basin and a citywide hotel-rate spike for any date inside that window, whether or not the wedding itself touches the blossoms (thehotelwashington.com; washingtonian.com).",
  legalNotes:
    "Both parties apply in person (or online, with in-person pickup) at the DC Courts Marriage Bureau (Moultrie Courthouse) with valid government-issued photo ID; both must be at least 18. The fee is $45 total ($35 application + $10 for the certificate of marriage; the $35 portion is waived if converting an existing DC domestic partnership). There is no waiting period — the license can be issued and the ceremony held the same day — and, unlike most states, a DC marriage license does not expire once issued, though the officiant must return the signed license to the court within 10 days of the ceremony. Both the couple and the officiant must be physically present in the District at the time of the ceremony; the Marriage Bureau separately authorizes religious and civil celebrants to perform the ceremony. Verify with the local authority or an attorney.",
  seasonNotes:
    "Cherry blossom season (roughly the last two weeks of March into the first week of April) is DC's highest-demand, highest-price stretch of spring: some hotel cherry-blossom packages run from ~$200/night up into the thousands, and citywide inventory tightens against 1.5M+ visitors (washingtonian.com; thehotelwashington.com). DC wedding venues also book unusually far ahead — one venue-cost analysis puts average advance booking at about 454 days (roughly 15 months) for popular dates, which for a spring 2028 wedding means shortlisting and touring venues well before spring 2027 (jennaleighphotography.net). Late April into May, after the blossom crowds clear and before summer conference/tourist season fully ramps, is the better-value shoulder window.",
  travelNotes:
    "Two airports serve the region: Reagan National (DCA), inside the city and Metro-connected, but capped by the 1,250-mile perimeter rule to shorter-haul domestic routes (101 domestic destinations); and Dulles (IAD), farther out but open to long-haul domestic and international nonstops (74 domestic, 61 international) (flyreagan.com; mwaa.com). For the Northeast Corridor specifically, Amtrak's Union Station is a realistic no-fly option for guests coming from New York, Philadelphia, or Baltimore, and many Mid-Atlantic guests can simply drive. Travel-cost math for a flying guest: $470 round-trip domestic airfare (Bureau of Transportation Statistics Q2 2025 average domestic round-trip fare) + 3 nights x $300/night (spring hotel average, trending toward the ~$331/night May figure during in-season weeks) = $1,370 per guest — with the caveat that a large share of this guest list may drive for the cost of gas and tolls instead.",
  sourceUrls: [
    "https://www.dccourts.gov/superior-court/superior-court-divisions/family-court-operations-division/marriage/marriage-license-application",
    "https://os.dc.gov/sites/default/files/dc/sites/os/page_content/attachments/OS%20--%20Marriage%20License%20Issuance%20FAQ%20(Final%20-%2010-10-25).pdf",
    "https://www.thedcmarriageknot.com/dc-marriages-faq/",
    "https://marriagelaws.org/dc-marriage-license",
    "https://cherryblossomwatch.com/peak-bloom-forecast/",
    "https://washingtonian.com/2026/03/13/15-dc-hotel-packages-for-cherry-blossom-season/",
    "https://www.thehotelwashington.com/washington-dc-travel-guide/dc-cherry-blossoms-peak-bloom-2026",
    "https://www.flyreagan.com/nonstop-destinations",
    "https://www.mwaa.com/nonstop-destinations",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://getcostidea.com/average-hotel-cost-per-night-washington-dc-price-guide/",
    "https://www.jennaleighphotography.net/blog/top-25-dc-wedding-venues-cost-comparison-september-2025/",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "dc-josephine-butler-parks-center",
      name: "Josephine Butler Parks Center",
      website: "https://www.washingtonparks.net/",
      capacity: 200,
      rentalFee: 5000,
      estimated: true,
      styleNotes:
        "An 18,000 sq ft Renaissance Revival mansion overlooking Meridian Hill/Malcolm X Park, run by the nonprofit Washington Parks & People — the budget end of the DC range. Listed capacity varies by source (up to 200 seated on some booking platforms, up to 300 standing on others); rentalFee is a starting price pulled from third-party listings rather than the venue's own published rate sheet, so it's marked estimated. Catering is bring-your-own-licensed-caterer, so food/beverage cost is separate from the rental fee.",
      availabilityNotes: "Contact events@washingtonparks.net or 202-462-7275 for a date-specific quote.",
      sourceUrls: [
        "https://www.tagvenue.com/us/venues/washington/51785/josephine-butler-parks-center",
        "https://www.perfectdj.net/blog/washington-dc-affordable-wedding-venues",
        "https://www.washingtonparks.net/assets/2026Weddings.pdf",
      ],
    },
    {
      key: "dc-meridian-house",
      name: "Meridian House",
      website: "https://meridian.org/rental/",
      capacity: 150,
      rentalFee: 16000,
      perGuestCost: 150,
      inHouseCatering: false,
      estimated: true,
      styleNotes:
        "A John Russell Pope-designed French-style estate in Kalorama with manicured gardens and a grove of Spanish linden trees; the Drawing Room alone holds up to 100. Venue rental runs $14,000-$18,000 depending on season (peak: May, June, September, October) for a 10-hour rental — rentalFee above is the midpoint, marked estimated. Pricing is venue-rental-only; catering is à la carte through approved caterers starting around $150/guest, which is the source for perGuestCost.",
      availabilityNotes: "A full 150-guest wedding at Meridian House commonly totals $60,000-$70,000 all-in once catering, décor and planning are added.",
      sourceUrls: [
        "https://meridian.org/rental/",
        "https://bellwetherevents.com/lessons-learned/meridian-house-dc-wedding-cost/",
        "https://www.jennaleighphotography.net/blog/top-25-dc-wedding-venues-cost-comparison-september-2025/",
      ],
    },
    {
      key: "dc-hay-adams-top-of-the-hay",
      name: "The Hay-Adams — Top of the Hay",
      website: "https://www.hayadams.com/weddings/top-of-the-hay",
      capacity: 250,
      rentalFee: 15000,
      perGuestCost: 227,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "Luxury rooftop venue across from the White House, 6,350 sq ft with panoramic city views; the top of the DC price range. Rental for the rooftop room starts near $15,000 for a peak Saturday (roughly $7,000 on Sundays/weekdays). All-in per-guest pricing (venue + catering + service) is published at $180-275/guest depending on package — perGuestCost above is the midpoint, marked estimated. Prices exclude a 21% service charge and 10% DC sales tax.",
      availabilityNotes: "Overall Hay-Adams weddings start at roughly $43,275 for 50 guests (~$865/guest) at the smallest package size.",
      sourceUrls: [
        "https://www.hayadams.com/weddings/top-of-the-hay",
        "https://www.wedding-spot.com/venue/16655/the-hay-adams/",
        "https://cdn0.weddingpro.com/vendor_pricing_sheet/62422/74401065ae903a60201_2024-Wedding-Packages.pdf",
      ],
    },
  ],
  scenario: {
    fixedCosts: 32500,
    perGuestCost: 150,
    travelCostPerGuest: 1370,
    attendanceRate: 0.85,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes Meridian House's $16,000 midpoint venue rental and adds a national non-venue, non-catering baseline of ~$16,550 built from The Knot's 2026 Real Weddings Study line items — planner $2,100, photographer $3,000 + a partial videographer allowance, flowers $2,800, DJ $1,800, stationery ~$600, attire+beauty ~$2,900, transportation $1,100, wedding bands ~$1,400 (theknot.com average-cost-* series; loveweddingbands.com) — rounded to $32,500. perGuestCost ($150) is Meridian House's own published starting catering rate for a comparable DC historic-venue wedding, used as the concrete Mid-Atlantic anchor since The Knot's national catering figure ($80/guest) is explicitly lower than Mid-Atlantic pricing in that same study. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
