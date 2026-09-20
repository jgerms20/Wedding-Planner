import type { DestinationSeed } from "../types";

/**
 * Tuscany, Italy — Chianti / Florence countryside.
 *
 * A very different kind of destination wedding from the Caribbean and Costa
 * Rica finalists: rolling vineyard estates and Renaissance villas instead of
 * beaches, a genuine long-haul flight with no nonstop option from any East
 * Coast hub, and a mature high-end villa-wedding industry. Numbers below are
 * sourced where a URL is given; anything derived is flagged `estimated: true`
 * with the derivation spelled out in a note. Italy does not carry the
 * plantation/enslaved-labor risk category flagged for the US South and the
 * Caribbean, but every historic villa named below was checked for real,
 * current bookability rather than invented.
 */
export const tuscanyItaly: DestinationSeed = {
  key: "tuscany-italy",
  name: "Tuscany, Italy",
  country: "Italy",
  countryCode: "IT",
  region: "Chianti / Florence countryside",
  rank: 39,
  whyHere:
    "Tuscany offers something none of the beach destinations can — centuries-old vineyard estates, olive groves and Renaissance villas near Florence — for couples willing to trade a nonstop flight for a genuinely different look and feel; it's the furthest and priciest of the finalists for the couple's ~100 East Coast guests, but also the one with the deepest bench of historic, exclusive-use wedding venues.",
  notes:
    "Attendance is estimated at 0.55, at the low end of (and below) the 60-70% typical destination-wedding range reported by Destify's guest-attendance analysis (destify.com), reflecting that Tuscany requires a genuine transatlantic flight with no nonstop option from any East Coast hub, on top of Italy's higher per-night lodging and villa-wedding costs relative to the Caribbean and Costa Rica finalists.",
  travelCostPerGuestEstimate: 1150,
  lodgingPerNightEstimate: 150,
  attendanceRateEstimate: 0.55,
  weatherNotes:
    "Tuscan spring is a real four-season climate, not a tropical dry/wet cycle — a genuinely different pattern from the Caribbean and Costa Rica finalists. March is cool and unpredictable (highs ~59°F/15°C, lows ~46°F/8°C), with locals calling the variable weather 'pazzarello' ('a little crazy'); April is one of the best months to visit but is also the rainiest spring month (~7-9 rain days); May is pleasant and warms toward the high 70s°F/24°C with greener landscapes and fewer showers than April (kimkim.com; ourescapeclause.com). Outdoor ceremonies in March carry real rain/cold risk; late April into May is the more reliable window for an outdoor Tuscan wedding.",
  legalNotes:
    "Italy has no residency requirement for foreigners to marry, but the paperwork has real lead time. Each partner needs a Nulla Osta (an affidavit of no impediment to marry), obtained in person at the US Consulate in Italy (Florence, Milan, Rome, etc.) and valid for 6 months, at a cost of about $50 each; full legal names must match exactly across passport, Nulla Osta and any other documents. An Atto Notorio — a sworn affidavit signed by two witnesses attesting there's no legal impediment under US law — should be obtained from an Italian Consulate in the US at least four months before the wedding. A Declaration of Intention to Marry is then filed with the local Ufficiale di Stato Civile (civil registrar) in the town where the wedding will take place, typically a few days before the ceremony. Because of this lead time, many couples marry legally at home beforehand and hold a purely symbolic ceremony at the Tuscan venue, or budget several months for the Italian civil process. Verify with the local authority or an attorney.",
  seasonNotes:
    "Italy's wedding season generally runs late April through early October, with late May, June and September cited as the true sweet spot for weather and lower rain risk than early spring. Easter 2028 falls Sunday, April 16, and Italy sees 'ultra-peak' pricing and crowding around Easter week, Ferragosto (August 15, outside this window) and other major holidays — worth avoiding. Liberation Day (April 25) and Labour Day (May 1) fall close together and Italians commonly bridge them into an extended holiday week ('ponte'), which can tighten venue and vendor availability in late April. A wedding date in the first half of May, after the Liberation Day/Labour Day bridge, threads the needle between spring's still-improving weather and summer's peak-season pricing.",
  travelNotes:
    "No US airline flies nonstop to Florence (FLR) or Pisa (PSA) outside a summer-only Delta seasonal Pisa route; year-round, guests connect through a European hub (London, Paris, Amsterdam, Frankfurt) via carriers like SWISS, Lufthansa or Air France, or fly nonstop from NYC to Rome (FCO, ~8.5 hours) and take a 1.5-hour high-speed train or ~3-hour drive north to Florence/Chianti. Round-trip economy fares from NYC to Florence run roughly $650-800 in March searches across airlines (SWISS, Lufthansa), with some listings as low as $500-600; this file uses a $700 midpoint. Average Tuscany hotel lodging away from the wedding venue itself runs about $150/night (median $128, average $150 per budgetyourtrip.com-style aggregator data), which is the guest-lodging figure used here — separate from the couple's own villa-rental cost, which is captured in the venue/fixedCosts figures below. Travel-cost math: ~$700 round-trip airfare + 3 nights x $150/night hotel lodging = $1,150 per guest.",
  sourceUrls: [
    "https://www.weddingplannersitaly.com/get-married-in-italy-legal-requirements-for-american-citizens/",
    "https://www.anamericaninitaly.com/how-to-survive-italian-bureaucracy/documents-required-for-an-american-to-marry-an-italian-in-italy-part-2-the-nulla-osta-etc/",
    "https://www.kimkim.com/c/tuscany-in-march-travel-tips-weather-more",
    "https://www.ourescapeclause.com/spring-in-tuscany/",
    "https://www.dansauerphotography.com/journals/2024/11/28/the-best-seasons-for-a-wedding-in-italy-pros-and-cons",
    "https://en.wikipedia.org/wiki/Liberation_Day_(Italy)",
    "https://www.holidays-info.com/italy/holidays/2028/",
    "https://www.swiss.com/lhg/us/en/o-d/cy-cy/new-york-florence",
    "https://www.lufthansa.com/lhg/us/en/o-d/cy-cy/new-york-florence",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
  ],
  venues: [
    {
      key: "tuscany-il-borro",
      name: "Il Borro Relais & Château",
      website: "https://www.ilborro.it/en/events/",
      capacity: 300,
      rentalFee: 18500,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A restored medieval village and wine estate in the Arezzo countryside, owned by the Ferragamo family; ceremony/reception spaces scale from 100 up to 300 guests depending on the area chosen, with the Orangery or gardens handling up to 250 for a seated reception. On-site accommodation sleeps up to 191, and the estate requires 100% of wedding guests to stay on property for the duration — a real fit for a smaller guest list, tighter for the couple's full ~100. Nightly exclusive-use rates run €15,000-€22,000 (~$16,000-$24,000); rentalFee above uses the midpoint, marked estimated since final pricing depends on dates and length of stay.",
      availabilityNotes: "Contact the estate directly for a guest-count-specific, multi-night quote.",
      sourceUrls: [
        "https://www.ilborro.it/en/events/",
        "https://the-extraordinaire.com/weddings/tuscany/il-borro/",
        "https://distinctiveitalyweddings.com/italian-wedding-locations/tuscany-weddings/weddings-in-arezzo/arezzo-venues/il-borro-relais.html",
      ],
    },
    {
      key: "tuscany-borgo-di-vignamaggio",
      name: "Il Borgo di Vignamaggio",
      website: "https://www.exclusiveitalyweddings.com/il-borgo-di-vignamaggio-for-weddings-in-the-chianti-region",
      capacity: 250,
      rentalFee: 29000,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A Renaissance-era wine estate in the heart of Chianti (its vineyard and villa date to the 1400s and are tied to the traditional site of Mona Lisa's birthplace legend). Outdoor Vineyard Terrace seats up to 200 or holds 250 standing; indoor backup spaces (Salone dei Banchetti, La Serra) each hold up to 150. Nightly exclusive-use rates run €23,000-€35,000+VAT (~$25,000-$38,000) for a minimum 2-3 night stay; rentalFee above uses a rounded midpoint, marked estimated.",
      availabilityNotes: "Contact the estate directly for a guest-count-specific, multi-night quote.",
      sourceUrls: [
        "https://www.exclusiveitalyweddings.com/il-borgo-di-vignamaggio-for-weddings-in-the-chianti-region",
        "https://www.fbalzan.com/blog-content/borgo-di-vignamaggio-luxury-hospitality-in-chianti",
      ],
    },
    {
      key: "tuscany-villa-medicea-di-lilliano",
      name: "Villa Medicea di Lilliano",
      website: "https://www.medicivilla.com/destination-weddings-socials-elopments.html",
      capacity: 250,
      rentalFee: 35000,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A working wine estate just outside Florence with Medici-family history; cocktail capacity up to 230, the indoor Limonaia hall up to 150. On-site private accommodation covers 44 guests, with the estate able to arrange nearby overflow lodging for up to 92 more. A published 2027 weekend package (3-night stay, 16 suites for 32 guests, plus the event day) runs €32,816 (low season) to €37,752 (high season) VAT included; rentalFee above uses a rounded midpoint converted to USD, marked estimated since the couple's actual guest count and season will change the quote.",
      availabilityNotes: "Contact the estate directly for a guest-count-specific quote.",
      sourceUrls: [
        "https://www.medicivilla.com/destination-weddings-socials-elopments.html",
        "https://www.fbalzan.com/blog-content/villa-medicea-di-lilliano-tuscany-historic-florence-wedding-venue",
        "https://italianvenues.com/weddings/venues/villa-medicea-di-lilliano/",
      ],
    },
  ],
  scenario: {
    fixedCosts: 30000,
    perGuestCost: 220,
    travelCostPerGuest: 1150,
    attendanceRate: 0.55,
    notes:
      "fixedCosts is estimated as the low end of the three venues' published multi-night exclusive-use rental rates (roughly €15,000-€35,000/night, midpoint ~$25,000, converted at a rounded ~1.08 EUR/USD rate) plus planner, photo/video and stationery costs typical for an international villa wedding, rounded to $30,000 — Tuscany's venue rental already bundles most fixed costs that a Caribbean resort would separate out as a flat wedding-package fee. perGuestCost ($220) reflects Tuscany's cited per-person catering/dinner benchmarks for villa weddings (roughly €150-290/person for wine, multi-course dinners at comparable Tuscan estates), converted to USD; it runs well above the Caribbean/Costa Rica all-inclusive figures because Tuscan villa weddings are fully à la carte for food, wine and service rather than bundled into a resort stay. travelCostPerGuest matches travelCostPerGuestEstimate. Sources: ilborro.it/en/events, exclusiveitalyweddings.com/il-borgo-di-vignamaggio, giorgiafantinborghi.com/en/tuscany-wedding-cost.",
  },
};
