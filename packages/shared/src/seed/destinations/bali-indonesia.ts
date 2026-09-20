import type { DestinationSeed } from "../types";

/**
 * Bali, Indonesia — Uluwatu / Jimbaran clifftops.
 *
 * The couple's first true Asia-Pacific option: cliffside chapels over the
 * Indian Ocean and a wedding industry built almost entirely around
 * destination weddings, at the cost of being the single longest flight of
 * any finalist except the Maldives — no nonstop from any US airport, a
 * genuine 20+ hour door-to-door trip from the East Coast, and a full day
 * lost to the international date line each way. Indonesia does not carry
 * the plantation/enslaved-labor risk category flagged for the US South and
 * the Caribbean, but every venue named below was checked for real, current
 * bookability rather than invented.
 */
export const baliIndonesia: DestinationSeed = {
  key: "bali-indonesia",
  name: "Bali, Indonesia",
  country: "Indonesia",
  countryCode: "ID",
  region: "Uluwatu / Jimbaran clifftops",
  rank: 46,
  whyHere:
    "Bali has the deepest, most turnkey destination-wedding industry researched anywhere on the list — purpose-built clifftop chapels, all-inclusive packages and wedding planners who do this every week — for couples willing to accept the longest, most exhausting trip of any option besides the Maldives for their ~100 East Coast guests.",
  notes:
    "Attendance is estimated at 0.45, well below the 60-70% typical destination-wedding range reported by Destify's guest-attendance analysis (destify.com). A Bali wedding means a 20+ hour door-to-door trip with at least one long connection, a full day lost each way to time-zone shift and jet lag, and a much higher bar to clear than a same-hemisphere destination — realistically this functions as a smaller-group or elopement-style destination for this couple rather than a full ~100-guest wedding, and the couple should plan around a meaningfully smaller in-person guest list if they choose it.",
  travelCostPerGuestEstimate: 1550,
  flightCostEstimate: 1000,
  lodgingPerNightEstimate: 150,
  attendanceRateEstimate: 0.45,
  weatherNotes:
    "Bali's spring is a genuine dry/wet transition, not a four-season climate — a different pattern from both the Caribbean and the Mediterranean finalists. March is the tail end of the wet season: rain on roughly 12-16 days, with heavy afternoon showers common but increasingly sunny mornings, and highs around 86-88°F/30-31°C. April is the transition month, with rainfall dropping off noticeably (still ~12-14 rain days but shorter, more scattered bursts) and mostly sunny skies. May is squarely dry season — minimal rain, clear skies, and slightly less humid heat — making it the most weather-reliable of the three months for an outdoor cliffside ceremony (bali.com; baliholidaysecrets.com; kuoni.co.uk).",
  legalNotes:
    "A wedding ceremony held at a Bali venue is not, by itself, a legal marriage recognized by Indonesia or the US. To legally marry as foreigners in Indonesia, both partners need a Certificate of No Impediment to Marriage (CNI) issued by the couple's home consulate in Indonesia, and Indonesian law requires the marriage to be solemnized according to the religious law of the couple's stated religion (Christian, Catholic, Hindu, Buddhist or Muslim) before it can be civilly registered — a meaningfully more involved process than a simple civil ceremony. All documents must be translated into Indonesian by a certified sworn translator. Because of this, the large majority of foreign couples marrying legally at home beforehand and holding a purely symbolic ceremony and reception at the Bali venue, which is what nearly every Bali wedding package (Tirtha, AYANA, The Edge, etc.) is actually built around. Indonesia's Visa on Arrival for US citizens (30 days, extendable once) covers a wedding trip's length without issue. Verify with the local authority or an attorney.",
  seasonNotes:
    "Nyepi (Bali's Hindu New Year 'Day of Silence') falls on March 26, 2028: the island's only international airport closes completely for 24 hours, all travel and activity islandwide is prohibited by custom, and hotels ask guests to stay indoors — a hard no-go date that also constrains flight scheduling in the days immediately around it. A late-April or May date avoids Nyepi entirely and lands in Bali's more reliable dry-season shoulder, before the July-August/New Year 'high season' surcharge windows that several resorts (AYANA among them) explicitly price around. May 1 and Indonesia's national holidays can add modest local crowding but nothing close to Nyepi's disruption.",
  travelNotes:
    "No airline flies nonstop from any US city to Bali's Ngurah Rai International Airport (DPS); every itinerary from the East Coast requires at least one long connection, commonly through Seoul (Incheon), Tokyo (Narita/Haneda), Doha, or a domestic US hub, with 24-30+ hours of total travel time door to door. Round-trip economy fares from JFK run roughly $850-1,300 depending on route and season, with occasional deals near $600-800; this file uses a $1,000 midpoint reflecting typical fares booked with reasonable lead time. Bali hotel/villa lodging away from the wedding venue itself runs roughly $100-200/night for a comfortable mid-range stay in the Uluwatu/Jimbaran area; this file uses $150/night. Travel-cost math: ~$1,000 round-trip airfare + 3 nights x $150/night lodging = $1,550 per guest — before the Bali Tourist Tax (IDR 150,000, ~$10/person, required of every international arrival since 2024) and the 30-day Visa on Arrival fee each guest also owes on entry.",
  sourceUrls: [
    "https://en.wikipedia.org/wiki/Nyepi",
    "https://traveltradejournal.com/bali-to-observe-nyepi-day-on-march-29-no-travel-airport-closure-and-island-wide-silence/",
    "https://bali.com/bali/weather/",
    "https://www.baliholidaysecrets.com/bali-in-april/",
    "https://yourbaliwedding.com.au/bali-marriage-laws/",
    "https://amorabaliweddings.com/how-to-get-legally-married-in-bali-as-a-foreigner-australians-americans-british-citizens-more/",
    "https://www.skyscanner.com/routes/jfk/dps/new-york-john-f-kennedy-to-bali-denpasar.html",
    "https://investinasia.id/blog/bali-visa-for-us-citizens/",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
  ],
  venues: [
    {
      key: "bali-the-edge",
      name: "The Edge Bali",
      website: "https://theedgebali.com/",
      capacity: 250,
      rentalFee: 9700,
      perGuestCost: 150,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A cliffside collection of private villas on the Uluwatu clifftops with glass-bottom sky pools over the Indian Ocean; wedding packages scale from an intimate $9,700 package for 30 guests up to a full buyout quoted at USD 53,703 net (IDR 725,000,000) for larger groups, with additional guests billed at roughly IDR 2,000,000 (~$130) each on top of a base package. rentalFee above is the smallest published package price, marked estimated for a ~100-guest scenario since the couple's actual quote would fall well above the 30-guest base.",
      availabilityNotes: "Contact the resort directly for a guest-count-specific package quote.",
      sourceUrls: [
        "https://www.baliweddingsolutions.com/the-edge-wedding-package-promo/",
        "https://www.myoverseaswedding.com/wedding-destinations/bali/the-edge-bali",
        "https://theedgebali.com/",
      ],
    },
    {
      key: "bali-ayana-resort",
      name: "AYANA Resort & Spa Bali",
      website: "https://www.ayana.com/",
      capacity: 250,
      rentalFee: 30000,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A 90-hectare clifftop resort above Jimbaran Bay with 15 distinct wedding venues, from the intimate SKY platform (up to 80) to the SKY Amphitheatre's tiered clifftop seating (up to 250) and the glass Tresna Chapel. Published guidance cites $8,000-15,000 for a ceremony-only package for up to 30 guests, and $20,000-40,000 for a full ceremony-and-reception package for 50-70 guests; rentalFee above is a rounded midpoint scaled toward the couple's larger ~100-guest count, marked estimated. High-season and 'auspicious date' surcharges apply on specific 2025 dates per the resort's published rate sheet, a pattern likely to recur in 2028.",
      availabilityNotes: "Contact the resort's wedding team for a 2028 guest-count-specific quote.",
      sourceUrls: [
        "https://www.easyweddings.com.au/destination-weddings/package/ayana-resort-bali/",
        "https://www.happybaliwedding.com/ayana-bali-wedding-package/",
        "https://www.ayana.com/",
      ],
    },
    {
      key: "bali-tirtha-uluwatu",
      name: "Tirtha Uluwatu",
      website: "https://tirtha.com/venues/tirtha-uluwatu/",
      capacity: 250,
      rentalFee: 11700,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: false,
      styleNotes:
        "Bali's original purpose-built, stand-alone wedding resort (opened 2003) on the southern Uluwatu clifftops, run by a team that does nothing but destination weddings. Six packages run from roughly IDR 240,000,000 to IDR 304,000,000 (~$16,000-20,500); the Chapel and Glass House hold up to 150 guests, while the Heaven, Earth and Cliffside Garden spaces scale to 300. rentalFee above uses the published package floor, marked estimated since a ~100-guest package with full catering and open bar would price above the base package.",
      availabilityNotes: "Contact Tirtha directly for a guest-count- and date-specific package quote.",
      sourceUrls: [
        "https://www.bridesvenues.com/venues/tirtha-uluwatu",
        "https://tirtha.com/wedding-packages/",
        "https://www.happybaliwedding.com/venue/tirtha-uluwatu-all-inclusive-package/",
      ],
    },
  ],
  scenario: {
    fixedCosts: 15000,
    perGuestCost: 130,
    travelCostPerGuest: 1550,
    attendanceRate: 0.45,
    notes:
      "fixedCosts is estimated from the low-to-mid end of the three venues' published package/rental floors (roughly $9,700-30,000) plus a Bali-based wedding planner, photo/video and stationery costs, rounded to $15,000 — lower than the Italian villa destinations because Bali's all-inclusive wedding-package model bundles far more of the fixed spend (florals, basic catering infrastructure, day-of coordination) into a single resort quote than a bare villa rental does. perGuestCost ($130) reflects the general Bali benchmark that a 100-guest luxury wedding runs $55,000-90,000 all-in with catering around $80-180/guest (bridesvenues.com), using a rounded midpoint. travelCostPerGuest matches travelCostPerGuestEstimate. Sources: theedgebali.com, easyweddings.com.au/destination-weddings/package/ayana-resort-bali, bridesvenues.com/how-much-does-a-bali-wedding-cost.",
  },
};
