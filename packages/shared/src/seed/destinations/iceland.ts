import type { DestinationSeed } from "../types";

/**
 * Iceland — Reykjavík / Golden Circle / South Coast.
 *
 * The one finalist with a genuinely short flight from the East Coast (a
 * nonstop under 6 hours from JFK) but the most volatile, coldest spring
 * weather of any destination researched — glaciers and waterfalls instead
 * of beaches or vineyards. Iceland does not carry the plantation/
 * enslaved-labor risk category flagged for the US South and the
 * Caribbean, but every venue named below was checked for real, current
 * bookability rather than invented.
 */
export const iceland: DestinationSeed = {
  key: "iceland",
  name: "Iceland",
  country: "Iceland",
  countryCode: "IS",
  region: "Reykjavík / Golden Circle / South Coast",
  rank: 48,
  whyHere:
    "Iceland is the outlier on the couple's list: the shortest flight of any international finalist from the East Coast, paired with a genuinely different, dramatic landscape (geothermal lagoons, waterfalls, glacier-fed rivers) instead of a beach or a vineyard — but its cold, unpredictable spring weather and Iceland's famously high cost of everything make it a real trade-off against the tropical and Mediterranean options.",
  notes:
    "Attendance is estimated at 0.50, below the 60-70% typical destination-wedding range reported by Destify's guest-attendance analysis (destify.com). Unlike the other long-haul finalists, Iceland's flight time itself isn't the barrier — JFK to Reykjavík is under 6 hours nonstop, the shortest of any international destination researched. The lower estimate instead reflects Iceland's own specific friction: genuinely cold, wet and unpredictable spring weather that makes an outdoor ceremony a real gamble, the country's high cost of lodging, food and transport relative to guests' expectations for a 'quick' trip, and a wedding-venue market built mostly around small farms, boutique hotels and elopement photographers rather than 100-guest-scale properties — several venues researched cap out well under that number, again pointing toward this working better as a smaller-group wedding than a full ~100-guest one.",
  travelCostPerGuestEstimate: 890,
  flightCostEstimate: 400,
  lodgingPerNightEstimate: 160,
  attendanceRateEstimate: 0.5,
  weatherNotes:
    "Iceland's spring is genuinely cold and unpredictable, not a mild shoulder season — a sharper version of the Highlands' variability. March often stays below freezing with a lingering wintry feel (average around 37°F/3°C, felt colder with wind); April warms only modestly (Reykjavík averages 32-41°F/0-5°C) with rain replacing snow on about 12 days of the month; May is the mildest of the three (32-50°F/0-10°C) but still cool and changeable, even as daylight stretches from about 16 to nearly 21 hours by month's end. Any Iceland wedding date needs a real weatherproof indoor backup — locals treat a dry, calm day as a pleasant surprise at any point in spring, not a baseline expectation (accuweather.com; wakeupreykjavik.com; adventures.is).",
  legalNotes:
    "Iceland has no residency requirement for foreigners to marry and civil ceremonies are quick to arrange through a district (sýslumaður) registrar. Each partner must obtain a certificate of no impediment to marriage — a genuine complication for US citizens, since there is no single federal US authority that issues one; couples typically satisfy this with an affidavit from an attorney or a state-level document, which Icelandic authorities have accepted case by case. All required documents (valid passports, birth certificates, proof of marital status, and the impediment certificate) must be issued no more than eight weeks before the ceremony and submitted to Iceland's National Registry (Þjóðskrá) at least three weeks ahead. An Icelandic marriage certificate is internationally recognized and valid in the US without further legalization. Because the impediment-certificate process has real lead time and case-by-case interpretation, many couples confirm their specific paperwork with a sýslumaður's office or a local wedding planner well before booking a date. Verify with the local authority or an attorney.",
  seasonNotes:
    "Iceland's peak season is June-August, when prices and crowds are highest at marquee sights; spring, including the couple's March-May window, is explicitly cited by wedding planners as a quieter, lower-cost 'best-kept secret' season with easier vendor and venue availability than summer. Easter 2028 (Sunday, April 16) is a five-day family holiday in Iceland (Holy Thursday through Easter Monday) during which many Icelanders travel to see family — worth avoiding for date-specific vendor availability, though it doesn't bring the volume of foreign tourists that summer does. A date in early-to-mid May, after Easter and before summer's price run-up, threads the needle between milder weather and Iceland's lower shoulder-season costs.",
  travelNotes:
    "Icelandair, along with Air France and Virgin Atlantic, flies nonstop from JFK to Keflavík (KEF) in about 5h45m — genuinely the shortest and simplest routing of any international finalist, with no connection required, and Icelandair also serves Boston and Washington-Dulles nonstop, both realistic hubs for the couple's East Coast guest list. Round-trip economy fares from JFK run roughly $370-440 in current searches; this file uses a $400 midpoint. Iceland is one of the most expensive countries in the world for lodging and food, and hotel rates reflect it: a comfortable mid-range hotel away from the wedding venue runs roughly $150-180/night; this file uses $160/night. Travel-cost math: ~$400 round-trip airfare + 3 nights x $160/night lodging = $890 per guest — the lowest of any international finalist researched, despite Iceland's high daily cost of living, because the flight itself is so much shorter and cheaper than the others.",
  sourceUrls: [
    "https://www.accuweather.com/en/is/reykjavik/190390/march-weather/190390",
    "https://wakeupreykjavik.com/iceland-april-expect",
    "https://adventures.is/blog/guide-iceland-spring/",
    "https://is.usembassy.gov/marriage-in-iceland/",
    "https://www.pinkiceland.is/iceland-wedding-faq",
    "https://guidetoiceland.is/best-of-iceland/easter-in-iceland",
    "https://www.skyscanner.com/routes/jfk/reyk/new-york-john-f-kennedy-to-reykjavik.html",
    "https://www.icelandair.com/en-us/flights/flights-to-reykjavik",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.orbitz.com/Destinations-In-Iceland-Wedding-Hotels.0-0-d79-tWeddingHotels.Hotel-Filter-Destinations",
  ],
  venues: [
    {
      key: "iceland-retreat-blue-lagoon",
      name: "The Retreat at Blue Lagoon",
      website: "https://www.bluelagoon.com/accommodation/retreat-hotel",
      capacity: 60,
      rentalFee: 19000,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A 60-suite luxury hotel built into an 800-year-old lava field around the Blue Lagoon's geothermal waters, about 20 minutes from Keflavík airport, with a private lagoon, subterranean spa and Michelin-starred restaurant on site. Wedding pricing starts around $19,000; as a 60-suite property, full on-site accommodation for a ~100-guest wedding would require nearby overflow lodging. rentalFee above uses the published starting price, marked estimated since a guest-count- and date-specific quote would price above this floor.",
      availabilityNotes: "Contact the Retreat's events team directly for a 2028 date and guest-count quote.",
      sourceUrls: [
        "https://www.karibjorn.com/iceland-wedding-venues",
        "https://www.bluelagoon.com/accommodation/retreat-hotel",
        "https://venuereport.com/venue/the-retreat-at-blue-lagoon-iceland",
      ],
    },
    {
      key: "iceland-hotel-ranga",
      name: "Hotel Rangá",
      website: "https://hotelranga.is/weddings/",
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "South Iceland's only 4-star countryside resort, near Hella, known for stargazing/aurora viewing and horseback access to nearby waterfalls (Gluggafoss) and lava caves; the hotel runs three on-site event halls and also hosts ceremonies at off-property natural landmarks nearby. No guest cap or package price is published — every wedding is quoted individually by the hotel's dedicated wedding coordinator based on guest count and season — so no capacity or fee figure is asserted here; this entry is included as a real, verified, currently bookable option rather than a priced one.",
      availabilityNotes: "Email wedding@hotelranga.is directly for a guest-count- and date-specific quote.",
      sourceUrls: [
        "https://hotelranga.is/weddings/ranga-wedding/",
        "https://hotelranga.is/weddings/",
        "https://www.allinclusiveweddings.com/resorts/hotel-ranga",
      ],
    },
    {
      key: "iceland-efra-nes-farm",
      name: "Efra-Nes Farm",
      website: "https://efranes.is/en/brudkaup",
      capacity: 150,
      estimated: true,
      inHouseCatering: false,
      lodgingOnSite: false,
      styleNotes:
        "A working countryside farm about an hour from Reykjavík offering two rustic event spaces — the Barn and the Cowshed — each renovated for events and hosting 130-150 guests, making it one of the few Iceland venues researched with capacity to comfortably match the couple's full ~100-guest list. Couples bring their own caterer and vendors; no rental price is published on the venue's site, which asks couples to inquire directly. No fee figure is asserted here given the lack of a published rate; capacity is drawn directly from the venue's own materials.",
      availabilityNotes: "Contact the farm directly through its website for pricing and 2028 date availability.",
      sourceUrls: [
        "http://efranes.is/en/brudkaup",
        "https://efranes.is/en/adrir-vidburdir",
      ],
    },
  ],
  scenario: {
    fixedCosts: 20000,
    perGuestCost: 150,
    travelCostPerGuest: 890,
    attendanceRate: 0.5,
    notes:
      "fixedCosts is estimated from the Retreat at Blue Lagoon's published $19,000 wedding-pricing floor plus a rounded allowance for an Iceland-based planner, photographer and stationery, landing at $20,000 — the venues with capacity to match the couple's guest count (Efra-Nes) publish no rental fee, so this figure leans on the one priced comparable found. perGuestCost ($150) uses the general Iceland benchmark that wedding reception catering runs around $150 per invited guest, per an Orbitz Iceland-wedding-venue aggregation page, consistent with Iceland's high overall cost of food and service. travelCostPerGuest matches travelCostPerGuestEstimate. Sources: bluelagoon.com/accommodation/retreat-hotel, karibjorn.com/iceland-wedding-venues, hotelranga.is/weddings, orbitz.com Iceland wedding-hotels listing.",
  },
};
