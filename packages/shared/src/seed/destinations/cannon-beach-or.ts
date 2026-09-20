import type { DestinationSeed } from "../types";

/**
 * Cannon Beach, OR.
 *
 * The Oregon coast option: Haystack Rock and real Pacific-Northwest beach
 * scenery, about 80 miles/90 minutes from Portland's airport rather than
 * its own commercial airport. A small resort-town market — fewer venues at
 * fewer price points than Portland itself, so this reads as a genuine
 * alternative rather than a substitute. No slavery-belt history to weigh
 * (Oregon entered the Union in 1859, a free state from its founding), so
 * venue checks here are the ordinary "is this real and bookable" standard.
 * Numbers are sourced where a URL is given; anything derived is flagged
 * `estimated: true` (venues) or explained in a note.
 */
export const cannonBeachOr: DestinationSeed = {
  key: "cannon-beach-or",
  name: "Cannon Beach, OR",
  country: "United States",
  countryCode: "US",
  region: "Oregon North Coast, near Haystack Rock",
  rank: 30,
  whyHere:
    "Cannon Beach gives Joshua & Janel dramatic Pacific coastline and Haystack Rock as a ceremony backdrop — a genuinely different Oregon experience from Portland's urban/food-cart identity — for couples who want the ocean itself to be the venue's main feature rather than a city skyline or river gorge.",
  notes:
    "Attendance is estimated at 0.78, slightly below Portland's 0.80: Cannon Beach has no airport of its own, so every guest connects through Portland (PDX) and then drives about 90 minutes, adding real friction on top of Portland's own East Coast flight time (pix.wedding; destify.com).",
  travelCostPerGuestEstimate: 1080,
  lodgingPerNightEstimate: 200,
  attendanceRateEstimate: 0.78,
  weatherNotes:
    "Cannon Beach shares Portland's wet-season pattern but runs a few degrees cooler and windier as a coastal town: spring is a transition out of the rainy winter, with March-April still carrying real rain risk and May the driest and mildest of the three months. An outdoor beach ceremony anywhere in this window should plan a tented or indoor backup, and coastal wind is a real factor for décor and hair/makeup regardless of the specific date.",
  legalNotes:
    "Marriage licenses are issued by Oregon county clerks — Cannon Beach is in Clatsop County, whose clerk's office is in Astoria. Both parties must appear in person with valid photo ID and Social Security numbers; the fee is $60 (or $65 to also waive the waiting period). Oregon imposes a 3-day waiting period between purchase and use of the license, waivable for an extra $5 if the ceremony will happen within those 3 days. Once effective, the license is valid for 60 days for a ceremony held anywhere in Oregon. Eligible officiants include judicial officers, county clerks, and clergy or celebrants authorized by a religious or secular organization to solemnize marriages. Verify with the local authority or an attorney.",
  seasonNotes:
    "Cannon Beach's summer (July-August) is its peak season, when the town is genuinely crowded; March-May is real shoulder season with lower rates and easier venue availability, trading some weather certainty for value. There's no major festival inside the March-May window to plan around, though the town does host smaller recurring events (a sandcastle contest, art walks) worth checking against a specific date for room-inventory reasons.",
  travelNotes:
    "Cannon Beach has no commercial airport; every guest flies into Portland International (PDX, the same airport as the Portland destination) and then drives roughly 80 miles/90 minutes west on Highway 26. This adds a real logistics layer beyond Portland itself — a shuttle or rental-car plan for the group is worth budgeting for. Travel-cost math: $470 round-trip domestic airfare into PDX (BTS Q2 2025 average) + 3 nights x $200/night (a coastal-resort-town estimate, above Portland's own $170/night since Cannon Beach's market skews toward oceanfront resort pricing) = $1,080 per guest, plus whatever ground transportation the couple arranges separately.",
  sourceUrls: [
    "https://www.clatsopcounty.gov/countyclerk/page/marriage-licenses",
    "https://www.aclu-or.org/obtaining-marriage-license-oregon-county/",
    "https://theamm.org/weddings-by-state/oregon/officiant-registration-requirements",
    "https://www.cannonbeach.org/meetings-and-weddings/wedding-celebrations-guide/",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "cb-surfsand-resort",
      name: "Surfsand Resort",
      website: "https://www.surfsand.com/meetings-events",
      capacity: 200,
      rentalFee: 16077,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "An oceanfront resort directly on the beach with unobstructed views of Haystack Rock — the town's main full-service wedding venue, with in-house catering through the on-site Wayfarer Restaurant and its own lodging for a wedding block. Flexible from small elopements up to 300 guests, with 200 as the more typical full-wedding capacity. Full-wedding spend is reported starting around $16,077 for 50 guests; a separate beach-ceremony setup fee runs $750-$1,000. rentalFee above reflects the reported starting full-wedding figure, marked estimated pending an exact package and guest count.",
      availabilityNotes: "Contact the resort directly via surfsand.com for a date-specific quote.",
      sourceUrls: [
        "https://www.surfsand.com/meetings-events",
        "https://www.wedding-spot.com/venue/2770/surfsand-resort/",
        "https://www.theknot.com/marketplace/surfsand-resort-cannon-beach-or-263677",
      ],
    },
    {
      key: "cb-hallmark-resort",
      name: "Hallmark Resort & Spa Cannon Beach",
      website: "https://www.hallmarkresortcannonbeach.com/weddings-venues-cannon-beach-oregon",
      capacity: 80,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "An oceanfront resort with an ocean-view ballroom and views of Haystack Rock and the Tillamook Lighthouse, plus an on-site spa and guest-room blocks. Wedding capacity is published at up to 80 guests — noticeably smaller than Surfsand, worth flagging for a ~100-guest target. No detailed wedding-package pricing is published; contact the resort directly.",
      availabilityNotes: "Contact the resort directly via hallmarkresortcannonbeach.com for a date-specific quote and full guest-count confirmation.",
      sourceUrls: [
        "https://www.hallmarkresortcannonbeach.com/weddings-venues-cannon-beach-oregon",
        "https://www.cannonbeach.org/listing/hallmark-resort-%26-spa-cannon-beach/262/",
      ],
    },
    {
      key: "cb-community-hall",
      name: "Cannon Beach Community Hall",
      website: "https://www.wedding-spot.com/venue/11424/cannon-beach-community-hall/",
      capacity: 150,
      rentalFee: 875,
      inHouseCatering: false,
      estimated: true,
      styleNotes:
        "A budget-friendly public community hall a few blocks from the beach — an outside-catering, BYO-vendor space rather than a resort, useful as the value option in this market. 12 hours of event time (excluding setup/cleanup) for a published rental of $750-$1,000; rentalFee above is the midpoint, marked estimated. Reported full-wedding spend (with outside catering/rentals added) starts around $2,825 for 50 guests.",
      availabilityNotes: "Contact the City of Cannon Beach's facilities office for a date-specific quote and outside-vendor policy.",
      sourceUrls: [
        "https://www.wedding-spot.com/venue/11424/cannon-beach-community-hall/",
        "https://www.cannonbeach.org/meetings-and-weddings/wedding-celebrations-guide/",
      ],
    },
  ],
  scenario: {
    fixedCosts: 21000,
    perGuestCost: 100,
    travelCostPerGuest: 1080,
    attendanceRate: 0.78,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes Cannon Beach Community Hall's $875 midpoint venue rental — a value pick appropriate for the couple to layer catering/rentals on top of — plus roughly $3,500 in outside catering/rental setup costs typical for a BYO-vendor hall this size, and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items — see the Washington DC file's scenario note for the full item list), rounded to $21,000. perGuestCost ($100) follows the Portland approach (The Knot's national $80/guest catering average) plus a coastal-resort-market premium of about $20/guest for cake, favors and incidental rentals. travelCostPerGuest matches travelCostPerGuestEstimate and excludes ground transportation from Portland, which isn't a per-guest catering-style cost.",
  },
};
