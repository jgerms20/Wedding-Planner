import type { DestinationSeed } from "../types";

/**
 * Amalfi Coast, Italy — Ravello / Positano / Amalfi.
 *
 * The cliffside, sea-view counterpart to Tuscany: dramatic terraced gardens
 * over the Tyrrhenian Sea, a marquee-name villa-wedding market (Villa
 * Cimbrone, Belmond, Le Sirenuse), and even less forgiving ground logistics
 * than Tuscany — narrow coastal roads, seasonal hotel closures, and a
 * distinctly higher price ceiling. Numbers below are sourced where a URL is
 * given; anything derived is flagged `estimated: true` with the derivation
 * spelled out in a note. Italy does not carry the plantation/enslaved-labor
 * risk category flagged for the US South and the Caribbean, but every
 * historic venue named below (including a former convent) was checked for
 * real, current bookability rather than invented.
 */
export const amalfiCoastItaly: DestinationSeed = {
  key: "amalfi-coast-italy",
  name: "Amalfi Coast, Italy",
  country: "Italy",
  countryCode: "IT",
  region: "Ravello / Positano / Amalfi",
  rank: 40,
  whyHere:
    "For couples who want the single most cinematic sea view of any option on the list — terraced lemon groves and cliffside infinity pools over the Tyrrhenian Sea — the Amalfi Coast delivers it, at the cost of being the priciest and logistically trickiest destination researched: narrow coastal roads, seasonal venue closures and a marquee-name villa market that prices well above every other finalist.",
  notes:
    "Attendance is estimated at 0.52, below the low end of the 60-70% typical destination-wedding range reported by Destify's guest-attendance analysis (destify.com) — a long-haul flight with no reliable nonstop option, the highest per-guest cost of any destination researched, and real ground-logistics friction (narrow, congested coastal roads between the airport and cliffside towns) combine to push expected turnout below even Tuscany's already-below-band estimate.",
  travelCostPerGuestEstimate: 1350,
  lodgingPerNightEstimate: 200,
  attendanceRateEstimate: 0.52,
  weatherNotes:
    "Like Tuscany, the Amalfi Coast has a genuine Mediterranean spring, not a tropical dry/wet pattern. March is still cool and can be rainy (average daytime highs ~59-61°F/15-16°C, sea temperature only ~59-61°F); April is milder (~55-68°F/13-20°C) with wildflowers blooming but still-unpredictable rain showers; May is the strongest bet of the three, mild and pleasant (~59-73°F/15-23°C) with just occasional afternoon showers (roughsguides.com; nomadseason.com). Because many hotels don't reopen until late March or Easter (see season notes), an outdoor cliffside ceremony is meaningfully more reliable in late April or May than in March.",
  legalNotes:
    "As with the rest of Italy, there's no residency requirement, but the same national paperwork applies: each partner needs a Nulla Osta (affidavit of no impediment), obtained in person at a US Consulate in Italy and valid for 6 months (~$50 each), with full legal names matching exactly across all documents. An Atto Notorio (a sworn two-witness affidavit of no US legal impediment) should be obtained from an Italian Consulate in the US at least four months ahead. A Declaration of Intention to Marry is then filed with the local civil registrar (Ufficiale di Stato Civile) in the Amalfi Coast town where the ceremony will take place. Many couples marrying on the Amalfi Coast complete the legal marriage at home beforehand and treat the Italian ceremony as symbolic, given this lead time. Verify with the local authority or an attorney.",
  seasonNotes:
    "This is the biggest planning trap specific to the Amalfi Coast: most hotels in Positano — and many elsewhere on the coast — close for the winter and don't reopen until late March or Easter, meaningfully narrowing venue and vendor options for an early-spring date. Easter 2028 falls Sunday, April 16, and the surrounding week is both a hard opening deadline for many properties and an 'ultra-peak' pricing period nationally, so it's worth avoiding as a wedding date itself even though it marks the season's start. Late April is workable for adventurous couples (mild 64-72°F/18-22°C temperatures, some rain risk, but green hillsides and thinner crowds before the summer rush); Villa Cimbrone and Belmond Hotel Caruso — the coast's two marquee venues — book 18+ months out and should be contacted early regardless of date. Delta's seasonal nonstop JFK-Naples route also resumes in late March each year (2026 restart: March 28), so a date in April or May, rather than early March, keeps that nonstop option available to guests.",
  travelNotes:
    "Naples International (NAP) is the coast's real gateway, about 1-1.5 hours by car/transfer to Sorrento and 1.5-2+ hours (longer in traffic) along the coastal road to Positano or Ravello — the most congested, weather-sensitive ground transfer of any finalist destination. Delta flies nonstop JFK-NAP seasonally (resuming late March each year, ~8h50m flight time, ~7x/week); outside that window, or on other airlines, guests connect through a European hub. Round-trip economy fares from NYC to Naples run roughly $600-900 in current searches depending on dates and airline, with some fares as low as $400 spotted opportunistically; this file uses a $750 midpoint. Amalfi Coast hotel lodging away from the wedding venue runs noticeably above Tuscany's, with Positano/Ravello specifically citing $250-1,000+/night and a broader coast average closer to $150-250/night outside those two towns; this file uses a $200/night estimate. Travel-cost math: ~$750 round-trip airfare + 3 nights x $200/night hotel lodging = $1,350 per guest.",
  sourceUrls: [
    "https://www.weddingplannersitaly.com/get-married-in-italy-legal-requirements-for-american-citizens/",
    "https://cerratolimo.com/en/amalfi-coast-in-winter-december-march",
    "https://italianvenues.com/weddings/destinations/amalfi-coast/",
    "https://www.roughguides.com/articles/amalfi-coast-weather-march-travel-tips/",
    "https://nomadseason.com/weather/italy/campania/amalfi-april.html",
    "https://aviationa2z.com/index.php/2025/07/06/delta-moves-up-dates-of-5-europe-routes-for-summer-2026/",
    "https://www.flightconnections.com/flights-from-jfk-to-nap",
    "https://www.tourlane.com/europe/italy/travel-cost-amalfi-coast/",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
  ],
  venues: [
    {
      key: "amalfi-villa-cimbrone",
      name: "Villa Cimbrone",
      website: "https://www.amalfi-wedding-planner.com/wedding-location/weddings-on-the-amalfi-coast/weddings-in-ravello-2/weddings-in-hotel-caruso/",
      capacity: 120,
      rentalFee: 6500,
      perGuestCost: 290,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A historic clifftop garden estate in Ravello (19 rooms/suites) famous for its 'Terrace of Infinity' sea view; the ceremony space costs about €6,500+VAT for up to 120 guests, with the Infinity Terrace cocktail hour an additional €8,000+VAT. Plated wedding dinners run around €290/person (cocktail hour, four courses, cake, coffee, limoncello). A full two-night property buyout runs roughly €65,000; a 60-guest minimum applies June-September (the couple's spring date would likely fall under a lower off-season minimum, to be confirmed with the venue). Budget a realistic minimum around $250,000+ for an 80-guest wedding all-in.",
      availabilityNotes: "Books 18+ months out; contact the venue's wedding office directly for a spring-2028 quote.",
      sourceUrls: [
        "https://the-extraordinaire.com/weddings/amalfi-coast/villa-cimbrone/",
        "https://italianvenues.com/weddings/journal/villa-cimbrone-wedding-cost/",
        "https://roamrecs.com/amalfi-wedding-venues.html",
      ],
    },
    {
      key: "amalfi-belmond-hotel-caruso",
      name: "Belmond Hotel Caruso",
      website: "https://www.belmond.com/hotels/europe/italy/amalfi-coast/belmond-hotel-caruso/occasions",
      capacity: 150,
      perGuestCost: 400,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "An 11th-century palazzo turned 50-room luxury hotel perched above Ravello; the Wagner Gardens seat 150 for a ceremony and 140 for dinner, with cocktail receptions flowing across gardens, gallery and terraces for up to 180. No rate card is published — every wedding is quoted individually — but comparable 50-guest, 2-3 day weddings with a meaningful room block run roughly $120,000-$260,000 all-in, and per-guest spend across the marquee Amalfi Coast tier (this venue included) runs $250-600. perGuestCost above is the low end of that range, marked estimated.",
      availabilityNotes: "Books 18+ months out; contact the hotel's wedding team directly for a custom quote.",
      sourceUrls: [
        "https://www.amalfi-wedding-planner.com/belmond-caruso-ravello-wedding-cost/",
        "https://italianvenues.com/weddings/journal/belmond-hotel-caruso-wedding-cost/",
        "https://roamrecs.com/amalfi-wedding-venues.html",
      ],
    },
    {
      key: "amalfi-villa-oliviero",
      name: "Villa Oliviero",
      website: "https://www.villaoliviero.it/en/positano-weddings",
      capacity: 150,
      rentalFee: 38000,
      estimated: true,
      lodgingOnSite: true,
      styleNotes:
        "A private six-bedroom cliffside villa above Positano with on-site chef and staff; terraces seat 100 indoors or up to 120-150 outdoors. Booked as a full villa rental rather than a per-guest package: roughly €34,000-€42,000/week in spring/fall (vs. ~€45,000 in summer), plus a ~€4,000 event fee; catering is arranged separately through the villa's own chef. Peak season generally requires a full Saturday-to-Saturday week, but shoulder-season (spring) stays of 3-4 nights may be possible — a real advantage for a spring 2028 date. rentalFee above is the spring/fall weekly midpoint, marked estimated since actual terms depend on exact dates and length of stay.",
      availabilityNotes: "Contact the villa directly to confirm a shorter shoulder-season stay and a guest-count-specific catering quote.",
      sourceUrls: [
        "https://www.villaoliviero.it/en/positano-weddings",
        "https://www.exclusiveitalyweddings.com/positano-weddings-at-villa-oliviero",
        "https://www.kaynorthrupevents.com/blog-posts/wedding-at-villa-oliviero-positano-italy-cost-and-inside-scoop",
      ],
    },
    {
      key: "amalfi-grand-hotel-convento-di-amalfi",
      name: "Anantara Convento di Amalfi Grand Hotel",
      website: "https://www.anantara.com/en/convento-di-amalfi-grand-hotel",
      capacity: 160,
      lodgingOnSite: true,
      inHouseCatering: true,
      estimated: true,
      styleNotes:
        "A former 13th-century Capuchin monastery turned 53-room clifftop hotel above Amalfi town, with several distinct ceremony spaces: the former church (70 guests), a cloister (80), the Monk's Walk (80), and two view terraces (60 each), for an overall property capacity of 160. May, June and September require a minimum of 4 booked room-nights to hold a wedding (vs. 10 nights in the July/August/October peak) — a real cost advantage for a May date. No published wedding-package price was found; capacity is drawn directly from the venue's own materials.",
      availabilityNotes: "Contact the hotel directly for a guest-count- and season-specific quote.",
      sourceUrls: [
        "https://www.exclusiveitalyweddings.com/amalfi-coast-weddings-grand-hotel-convento",
        "https://www.emilianorusso.com/grand-hotel-convento-di-amalfi-wedding/",
      ],
    },
  ],
  scenario: {
    fixedCosts: 35000,
    perGuestCost: 300,
    travelCostPerGuest: 1350,
    attendanceRate: 0.52,
    notes:
      "fixedCosts is estimated from the lower end of the researched venues' ceremony/rental fees (Villa Cimbrone's ~€6,500-14,500 ceremony-plus-terrace fee, Villa Oliviero's ~€34,000+ weekly rental, Anantara Convento's minimum-night requirements) plus planner, photo/video and stationery costs typical for an Amalfi Coast wedding, rounded to $35,000 — the highest fixedCosts figure of any destination researched so far, reflecting the coast's marquee-venue pricing. perGuestCost ($300) sits between Villa Cimbrone's published €290/person dinner and the €250-600/person range cited across the coast's top-tier venues, converted to USD; it is the highest catering figure of any destination researched, consistent with the Amalfi Coast's status as one of the priciest wedding markets in Italy. travelCostPerGuest matches travelCostPerGuestEstimate. Sources: italianvenues.com/weddings/journal/villa-cimbrone-wedding-cost, roamrecs.com/amalfi-wedding-venues.html, villaoliviero.it/en/positano-weddings.",
  },
};
