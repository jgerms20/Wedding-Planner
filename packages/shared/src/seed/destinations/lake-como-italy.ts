import type { DestinationSeed } from "../types";

/**
 * Lake Como, Italy — Bellagio / Tremezzo / Cernobbio.
 *
 * The third Italian finalist researched, after Tuscany and the Amalfi Coast:
 * grand lakefront villas instead of hilltop vineyards or cliffside terraces,
 * a genuinely easier flight than either (nonstop Milan Malpensa service from
 * New York, no connection or seasonal-only nonstop required), but a price
 * ceiling for the marquee lakefront villas that runs above Tuscany's and
 * rivals Amalfi's, plus a Como-specific wrinkle — most premier venues sit
 * directly on the water and require chartered boat transfers for guests.
 * Italy does not carry the plantation/enslaved-labor risk category flagged
 * for the US South and the Caribbean, but every villa named below was
 * checked for real, current bookability rather than invented.
 */
export const lakeComoItaly: DestinationSeed = {
  key: "lake-como-italy",
  name: "Lake Como, Italy",
  country: "Italy",
  countryCode: "IT",
  region: "Bellagio / Tremezzo / Cernobbio",
  rank: 41,
  whyHere:
    "Lake Como delivers the grand-villa-on-water look — 16th- and 19th-century estates with formal gardens running down to the water — with the easiest flight of any Italian finalist researched: Milan Malpensa has nonstop service from New York, versus Tuscany's connection-only routing and Amalfi's seasonal-nonstop-to-Naples-plus-a-white-knuckle-coastal-drive. The tradeoff is Como's marquee lakefront villas price at or above Amalfi's ceiling, and nearly every top venue requires guests to arrive by chartered boat, an extra logistics and cost layer none of the other Italian finalists have.",
  notes:
    "Attendance is estimated at 0.55, matching Tuscany's figure and at the low end of (and below) the 60-70% typical destination-wedding range reported by Destify's guest-attendance analysis (destify.com). Como's nonstop Milan flight is easier than Tuscany's connection-only routing or Amalfi's seasonal nonstop, which argues for a higher rate than the other two Italian finalists — but the marquee villas' price tier and the added boat-transfer logistics argue for holding the line at Tuscany's number rather than exceeding it.",
  travelCostPerGuestEstimate: 1250,
  lodgingPerNightEstimate: 200,
  attendanceRateEstimate: 0.55,
  weatherNotes:
    "Como has a genuine four-season lake climate, not a Mediterranean coastal one. March is cool and transitional (average ~37-54°F/3-12°C) with around 13 rain days and 47mm of precipitation; April is milder (~45-63°F/7-17°C) with longer days but showers still common; May warms further (~52-70°F/11-21°C) with the landscape in full bloom, though multiple sources flag May as one of the wetter months by rain-day count even as rainfall totals ease — an outdoor lakeside ceremony in May still needs a covered backup plan (climate-data.org; holiday-weather.com; comolake.today).",
  legalNotes:
    "As in the rest of Italy, there's no residency requirement for foreigners to marry, but the paperwork has real lead time. Each partner needs a Nulla Osta (an affidavit of no impediment to marry), obtained in person at the US Consulate General in Milan — the consulate with jurisdiction over Lombardy, including Lake Como — and valid for 6 months, at a cost of about $50 each; full legal names must match exactly across passport, Nulla Osta and any other documents. An Atto Notorio (a sworn two-witness affidavit of no US legal impediment) should be obtained from an Italian Consulate in the US at least four months ahead. A Declaration of Intention to Marry is then filed with the local Ufficiale di Stato Civile (civil registrar) in the lake-town comune where the ceremony will take place. Because of this lead time, many couples marry legally at home beforehand and hold a symbolic ceremony at the villa, or budget several months for the Italian civil process. Verify with the local authority or an attorney.",
  seasonNotes:
    "Italy's wedding season generally runs late April through early October; Easter 2028 falls Sunday, April 16, and Italy sees 'ultra-peak' pricing and crowding around Easter week — worth avoiding. Liberation Day (April 25) and Labour Day (May 1) fall close together and Italians commonly bridge them into an extended holiday week ('ponte'), which can tighten venue and vendor availability in late April, the same dynamic flagged for Tuscany. Como-specific: most of the lake's marquee villas (Villa del Balbianello, Villa Erba) operate on a seasonal calendar and book 12-18+ months out; a first-half-of-May date, after the Liberation Day/Labour Day bridge, again threads the needle between improving weather and before summer's peak pricing and crowding. A cost driver unique to Como versus the other Italian finalists: roughly 80% of premium venues sit directly on the lake and require mandatory boat transfers for guests, running roughly $2,300-$9,200 (€2,000-8,000) depending on guest count and number of legs — budget this as a separate line item.",
  travelNotes:
    "Milan Malpensa (MXP) is Lake Como's gateway, about 45 minutes to an hour by car/transfer to the lake's southwestern towns (Como, Cernobbio) and 1-1.5 hours to Bellagio/Tremezzo on the central lake. Unlike Tuscany (connection-only) or Amalfi (seasonal nonstop only), Milan has year-round nonstop service from New York on multiple carriers (Delta, ITA Airways, United from Newark); round-trip economy fares run roughly $425-800 in current searches, with occasional deals as low as $376; this file uses a $650 midpoint. Lake Como hotel lodging varies enormously by prestige of location — a lakefront address in Como town itself averages roughly $964/night, Bellagio $408/night, while inland or budget-tier options run $90-280/night; this file uses a $200/night estimate for guest lodging away from the most prestigious lakefront addresses. Travel-cost math: ~$650 round-trip airfare + 3 nights x $200/night hotel lodging = $1,250 per guest.",
  sourceUrls: [
    "https://www.weddingplannersitaly.com/get-married-in-italy-legal-requirements-for-american-citizens/",
    "https://www.anamericaninitaly.com/how-to-survive-italian-bureaucracy/documents-required-for-an-american-to-marry-an-italian-in-italy-part-2-the-nulla-osta-etc/",
    "https://roamrecs.com/lake-como-wedding-venues.html",
    "https://www.villeparravicini.com/en/journal/lake-como-wedding-cost",
    "https://www.tourlane.com/europe/italy/travel-cost-lake-como/",
    "https://en.climate-data.org/europe/italy/lake-como-10104/r/march-3/",
    "https://www.holiday-weather.com/lake_como/averages/",
    "https://comolake.today/lake-como-weather-when-to-take-a-journey/",
    "https://en.wikipedia.org/wiki/Liberation_Day_(Italy)",
    "https://www.holidays-info.com/italy/holidays/2028/",
    "https://www.momondo.com/flights/new-york-city/milan",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
  ],
  venues: [
    {
      key: "lake-como-villa-del-balbianello",
      name: "Villa del Balbianello",
      website: "https://fondoambiente.it/luoghi/villa-del-balbianello",
      capacity: 130,
      rentalFee: 35000,
      estimated: true,
      styleNotes:
        "A 18th-century villa on a wooded promontory near Lenno, owned and preserved by the FAI (Italian National Trust) and familiar from Star Wars: Attack of the Clones and Casino Royale. There is no on-site overnight accommodation — it's a museum property, not a hotel. The venue's official 2027 rate sheet prices a tiered menu of formats, from a two-hour ceremony (rental fees starting around €4,200 plus 22% VAT) up to a full event for 130 guests (up to roughly €70,500 plus VAT); rentalFee above uses a rounded midpoint, marked estimated, since the couple's actual format and guest count will set the real quote. All guest and vendor access is by boat only.",
      availabilityNotes: "Books well over a year out; contact the FAI events office directly for a guest-count- and format-specific quote.",
      sourceUrls: [
        "https://www.italianlakeswedding.com/blog/lake-como-weddings/balbianello-villa-official-rental-fees/",
        "https://roamrecs.com/guide/villa-del-balbianello-wedding-guide",
        "https://the-extraordinaire.com/weddings/lake-como/villa-del-balbianello/",
      ],
    },
    {
      key: "lake-como-villa-erba",
      name: "Villa Erba",
      website: "https://www.villaerba.it/en/",
      capacity: 450,
      rentalFee: 32000,
      perGuestCost: 250,
      estimated: true,
      inHouseCatering: true,
      styleNotes:
        "A 19th-century lakefront villa and events complex in Cernobbio (also a major convention/exhibition venue), the largest-capacity option on the lake: up to 450 seated across the ground-floor rooms, or 500 for dancing in the former ballroom. 2027 wedding pricing starts at roughly €26,000-30,000 plus 22% VAT for the venue; catering starts at about €220 plus 10% VAT per person with a 100-guest minimum. rentalFee above is a rounded midpoint conversion, marked estimated.",
      availabilityNotes: "Contact the estate's events office directly for a guest-count-specific quote.",
      sourceUrls: ["https://roamrecs.com/guide/villa-erba-wedding-guide", "https://roamrecs.com/lake-como-wedding-venues.html"],
    },
    {
      key: "lake-como-villa-pizzo",
      name: "Villa Pizzo",
      website: "https://www.villapizzo.it/en/",
      capacity: 160,
      rentalFee: 40000,
      estimated: true,
      styleNotes:
        "A 16th-century lakefront estate in Cernobbio with terraced Italian gardens running to the water; outdoor wedding seating capacity is up to 160. Venue rental (VAT-free) runs roughly €10,000-40,000 depending on guest count and spaces included, with most weddings in the couple's 75-100-guest range landing at the €30,000-40,000 end; rentalFee above uses that higher end, marked estimated.",
      availabilityNotes: "Contact the estate directly for a guest-count-specific quote.",
      sourceUrls: ["https://roamrecs.com/guide/villa-pizzo-wedding-cost-2026", "https://the-extraordinaire.com/weddings/lake-como/villa-pizzo/"],
    },
    {
      key: "lake-como-villa-sola-cabiati",
      name: "Villa Sola Cabiati",
      website: "https://www.grandhoteltremezzo.com/en/rooms-suites/villa-sola-cabiati/",
      capacity: 130,
      rentalFee: 26500,
      estimated: true,
      lodgingOnSite: true,
      styleNotes:
        "A patrician 18th-century lakefront villa in Tremezzo, now operated by the neighboring Grand Hotel Tremezzo; the villa itself seats up to 70 for a formal dinner or holds up to 130 for a standing reception, depending on configuration. Exclusive use starts at €7,700/night with a 2-3 night minimum (open April-October); rentalFee above is estimated from a 3-night minimum stay (3 x €7,700 = €23,100, converted). The villa's six suites sleep up to 12 guests on-site, with wedding-party guests gaining complimentary access to Grand Hotel Tremezzo's pools, spa and private beach across the lake.",
      availabilityNotes: "Contact Grand Hotel Tremezzo's events team directly for a guest-count-specific quote; the property only operates April-October.",
      sourceUrls: [
        "https://alejandrapoupel.com/lake-como-venue-villa-sola-cabiati",
        "https://www.mrandmrssmith.com/villas/grand-hotel-tremezzo-villa-sola-cabiati",
        "https://www.exclusiveitalyweddings.com/weddings-at-villa-sola-cabiati-on-lake-como",
      ],
    },
  ],
  scenario: {
    fixedCosts: 35000,
    perGuestCost: 280,
    travelCostPerGuest: 1250,
    attendanceRate: 0.55,
    notes:
      "fixedCosts is estimated from the lower end of the researched venues' rental fees (roughly $26,500-40,000, several requiring a multi-night minimum) plus the boat-transfer logistics unique to Como (roughly $2,300-9,200 for guest water transfers) plus planner, photo/video and stationery costs typical for an international villa wedding, rounded to $35,000 — slightly above Tuscany's figure and comparable to Amalfi's, reflecting Como's marquee-venue pricing and its added transfer costs. perGuestCost ($280) is drawn from the villas' published per-person catering figures (Villa Erba's ~€220+VAT/person, other lake venues citing €250-400/person), converted and taking a mid-to-upper point consistent with Como's premium tier between Tuscany and Amalfi. travelCostPerGuest matches travelCostPerGuestEstimate. Sources: roamrecs.com/guide/villa-erba-wedding-guide, roamrecs.com/lake-como-wedding-venues.html, villeparravicini.com/en/journal/lake-como-wedding-cost.",
  },
};
