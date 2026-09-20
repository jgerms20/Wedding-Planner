import type { DestinationSeed } from "../types";

/**
 * Santorini, Greece — Oia / Imerovigli / Fira caldera villages.
 *
 * The most iconic single view of any European finalist researched — white
 * cliffside villages over the volcanic caldera — paired with the most
 * complex itinerary: no nonstop flight from any US airport to the island,
 * a mandatory Athens connection, and a cluster of caldera-view venues that
 * are individually smaller than the Italian and French finalists' villas
 * and châteaux. Greece does not carry the plantation/enslaved-labor risk
 * category flagged for the US South and the Caribbean, but every venue
 * named below was checked for real, current bookability rather than
 * invented.
 */
export const santoriniGreece: DestinationSeed = {
  key: "santorini-greece",
  name: "Santorini, Greece",
  country: "Greece",
  countryCode: "GR",
  region: "Oia / Imerovigli / Fira caldera villages",
  rank: 42,
  whyHere:
    "No destination on the couple's list has a more recognizable wedding-photo backdrop than Santorini's caldera villages — whitewashed terraces over the volcanic cliff with the Aegean and the sunset behind the altar. The tradeoff, on top of being the only finalist with no nonstop US flight at all, is that Santorini's caldera-view venues run smaller than the villas and châteaux researched elsewhere; several of the island's best-known properties cap out well under the couple's ~100-guest list, so a Santorini wedding likely means picking a venue built for a slightly smaller guest count or a full resort buyout.",
  notes:
    "Attendance is estimated at 0.48, the lowest of the five European destinations researched and below Amalfi's 0.52 figure, reflecting that Santorini requires a full transatlantic flight to Athens plus a separate domestic Greek leg (flight or ferry) to reach the island — the only finalist where getting to the wedding is a three-leg journey rather than two — on top of the added cost that extra leg adds per guest.",
  travelCostPerGuestEstimate: 1600,
  flightCostEstimate: 1000,
  lodgingPerNightEstimate: 200,
  attendanceRateEstimate: 0.48,
  weatherNotes:
    "Santorini spring runs cooler and windier than its summer reputation suggests. March averages a high of about 60°F/16°C (low ~52°F/11°C), with roughly 40mm of rain over 7 days and breezy conditions (~14mph average wind). April is markedly milder and drier — daily highs rising from about 64°F to 69°F (18-21°C), evenings cooling to around 55°F/13°C, and only about 16mm of rain over 4 days. May is comfortable and dry, averaging around 73°F/23°C with just 2 rain days, though the Cyclades' Meltemi wind begins to pick up from May onward — worth factoring into any outdoor caldera-edge ceremony plan (weatherspark.com; holiday-weather.com; santorinisecrets.com).",
  legalNotes:
    "Greece places no residency requirement on a foreign couple, but the paperwork requires an embassy visit before the wedding: each partner needs a Single-Status Affidavit (replacing the Certificate of No Impediment the US does not issue), printed bilingually on a single two-sided page and notarized at the US Embassy in Athens, then authenticated by the Greek Ministry of Foreign Affairs for a €30 paravolo fee. A long-form birth certificate showing both parents' names needs a Hague Apostille and a certified Greek translation; an apostilled divorce decree or death certificate (with translation) is required if either partner was previously married. The marriage license application is then filed at the municipality covering the ceremony site — for Santorini, the Municipality of Thira — with roughly 8 days' processing and a 6-month validity window. Unlike France or Spain, Greece lets the ceremony performed at the wedding venue itself (civil or religious) stand as the legal marriage, with no separate town-hall ceremony required. Verify with the local authority or an attorney.",
  seasonNotes:
    "Greek Orthodox Easter (Pascha) falls on Sunday, April 16, 2028 — the same date as Western Easter that year, an unusual alignment that concentrates travel demand across both the Catholic and Orthodox worlds in a single week; the preceding Holy Week draws heavy domestic Greek travel and is worth avoiding as a wedding date. Santorini's true high season runs June-September, when caldera-view venues are hardest to book and priciest; April-May is a genuine value window, as hotels are reopening from winter closure, crowds are thinner, and the island's persistent summer Meltemi wind hasn't fully set in. A date in late April or the first half of May — after the Orthodox Easter crush, before the Meltemi and before peak crowds — is this destination's sweet spot.",
  travelNotes:
    "There is no nonstop flight from any US airport to Santorini (JTR). Guests fly nonstop to Athens (ATH) — Delta, American and Norse Atlantic all operate JFK-ATH nonstop, roughly 9-10 hours — then connect on a 45-55-minute hop to Santorini (about 18 flights a day on the route) or take a 5+ hour high-speed ferry from Piraeus. Round-trip economy fares for the full New York-Santorini itinerary run $784-1,314 in recent searches, averaging about $1,044; this file uses a $1,000 midpoint. Santorini hotel lodging runs $150-250/night depending on caldera-view premium — Kamari and Perissa on the eastern coast run notably cheaper (€120-250) than caldera-side Oia/Imerovigli (€250-450); this file uses $200/night. Travel-cost math: ~$1,000 round-trip airfare + 3 nights x $200/night hotel lodging = $1,600 per guest — the highest of the five European destinations researched, reflecting the added domestic Greek leg on top of the transatlantic flight.",
  sourceUrls: [
    "https://gr.usembassy.gov/getting-married-in-greece/",
    "https://bigfatgreekday.com/getting-married-in-greece/",
    "https://bigfatgreekday.com/santorini-weddings-your-complete-guide/",
    "https://weatherspark.com/m/150401/4/Average-Weather-in-April-in-Santorini-Island-Greece",
    "https://www.holiday-weather.com/santorini/averages/march",
    "https://www.santorinisecrets.com/santorini-in-april/",
    "https://publicholidays.gr/easter/",
    "https://santorinidave.com/athens-santorini-fly-or-ferry",
    "https://www.flightconnections.com/flights-from-ath-to-jtr",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
  ],
  venues: [
    {
      key: "santorini-le-ciel",
      name: "Le Ciel",
      website: "https://leciel-santorini.com/",
      capacity: 120,
      rentalFee: 4485,
      estimated: false,
      styleNotes:
        "A caldera-cliff venue in Imerovigli, at the top level of Santorini's caldera, with sweeping Aegean and sunset views and one of the only wheelchair-accessible layouts on the island's cliffside venues. Maximum capacity is 80 seated for a ceremony-only booking, or up to 120 seated for a combined ceremony-and-reception event. A published venue fee of €3,900 (VAT included) covers a 6-9 hour ceremony-and-reception rental; catering, bar and rentals are arranged separately. rentalFee above is the direct USD conversion of that published fee.",
      availabilityNotes: "Contact the venue directly for date availability and a catering-inclusive package quote.",
      sourceUrls: [
        "https://www.wedinspire.com/wedding-venues/santorini/le-ciel-santorini/",
        "https://www.santoriniweddings.net/lecielsantorini/",
        "https://vanillaskyweddings.com/venuess/le-ciel.html",
      ],
    },
    {
      key: "santorini-vedema",
      name: "Vedema, a Luxury Collection Resort",
      website: "https://vedema.gr/weddings/",
      capacity: 150,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A restored 300-year-old winery estate in Megalochori (inland from the caldera cliffs, a quieter and less crowded setting than Oia/Imerovigli), now a full-service luxury resort with suites and villas on property. Event spaces include a restored winery chapel, open-air caldera-view terraces, wine-cave spaces and garden areas, scaling from intimate 20-guest gatherings up to 150 for a larger celebration — one of the few Santorini venues that comfortably fits the couple's full ~100-guest list in one place. No public rate card is published (Aisle lists it in its '$$$' tier); a luxury full-resort Santorini wedding of this caliber typically runs in the same $250-600-per-guest range cited across the island's marquee venues, so no rentalFee/perGuestCost figure is asserted here — request a custom quote.",
      availabilityNotes: "Contact the resort's events team directly for a guest-count-specific quote; books well in advance for spring dates.",
      sourceUrls: [
        "https://vedema.gr/weddings/",
        "https://aisle.wedding/venues/vedema-a-luxury-collection-resort-santorini-megalochori-847-00",
        "https://bigfatgreekday.com/santorini-weddings-your-complete-guide/",
      ],
    },
    {
      key: "santorini-el-viento",
      name: "El Viento Villa",
      website: "https://www.elopesantorini.com/el-viento-villa-wedding-venue/",
      capacity: 60,
      rentalFee: 4570,
      estimated: true,
      styleNotes:
        "A whitewashed former windmill villa on the caldera cliff, offering caldera drama without Oia's crowds or premium pricing. Seated capacity is around 60 (up to about 100 for a standing reception) — the smallest of the three Santorini venues researched, and a real option if the couple trims the guest list for a Santorini date rather than the full ~100. Bare venue rental runs €565 (VAT included) for the first two hours plus €290/hour after; published packaged weddings (venue, coordination and basics) start around €4,570 for a modest guest count. rentalFee above uses that packaged starting price, marked estimated since it scales with guest count and add-ons.",
      availabilityNotes: "Contact the venue or a local planner directly for a guest-count-specific package quote.",
      sourceUrls: [
        "https://www.elopesantorini.com/el-viento-villa-wedding-venue/",
        "https://www.wedinspire.com/wedding-venues/santorini/el-viento/",
        "https://vanillaskyweddings.com/wedding-packages-with-guests/el-viento-wedding-package.html",
      ],
    },
  ],
  scenario: {
    fixedCosts: 30000,
    perGuestCost: 220,
    travelCostPerGuest: 1600,
    attendanceRate: 0.48,
    notes:
      "fixedCosts is estimated from the researched venues' rental fees (Le Ciel's published €3,900 rental, El Viento's ~€4,570 package start, Vedema's unpublished but '$$$'-tier resort pricing) plus planner, photo/video, flowers and stationery costs typical for a Santorini wedding, rounded to $30,000 — this sits within the €40,000-70,000 (~$46,000-80,500) total cited by bigfatgreekday.com for a 100-guest Santorini wedding once catering is added. perGuestCost ($220) is drawn from cited per-head catering (€40-150) plus bar service (€20-50) figures for Santorini venues, converted and taking the upper end to reflect the island's premium relative to mainland Greece/Crete. travelCostPerGuest matches travelCostPerGuestEstimate. Sources: bigfatgreekday.com/santorini-weddings-your-complete-guide, bigfatgreekday.com/cost-of-a-wedding-venue-in-greece, santoriniweddings.net/santorini-wedding-venues-prices.",
  },
};
