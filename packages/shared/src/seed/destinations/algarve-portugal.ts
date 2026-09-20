import type { DestinationSeed } from "../types";

/**
 * Algarve, Portugal — Lagos / Quinta do Lago / Porches (western & central
 * Algarve).
 *
 * A cliffside-and-coastline destination in the same visual family as the
 * Amalfi Coast finalist, researched as a notably lower-cost alternative:
 * Portugal is the one European finalist with no legal-marriage residency
 * requirement for a foreign couple, and consistently the cheapest of the
 * five European destinations researched on both venue and travel cost.
 * Portugal does not carry the plantation/enslaved-labor risk category
 * flagged for the US South and the Caribbean, but every quinta and resort
 * named below was checked for real, current bookability rather than
 * invented.
 */
export const algarvePortugal: DestinationSeed = {
  key: "algarve-portugal",
  name: "Algarve, Portugal",
  country: "Portugal",
  countryCode: "PT",
  region: "Lagos / Quinta do Lago / Porches (western & central Algarve)",
  rank: 44,
  whyHere:
    "The Algarve gives the couple coastal cliffs and golden-hour light in the same visual family as the Amalfi Coast finalist, at a noticeably lower price point across venues, catering and guest travel — and Portugal is the most legally straightforward of the five European destinations researched, since it places no residency requirement on a foreign couple marrying there.",
  notes:
    "Attendance is estimated at 0.52, matching Amalfi's figure, reflecting that the Algarve still requires a long-haul flight and, outside the mid-May-to-early-October nonstop window, a connection through Lisbon — real travel friction even though the Algarve is the cheapest of the five European destinations researched on a per-guest basis.",
  travelCostPerGuestEstimate: 1140,
  lodgingPerNightEstimate: 130,
  attendanceRateEstimate: 0.52,
  weatherNotes:
    "The Algarve has the mildest spring climate of the five European destinations researched. March averages a high of about 64°F/18°C with roughly 52mm of rain over 12 days; April warms to 52-68°F/11-20°C with less rain (about 28mm over 8 days) and a visible bump in visitors around Easter; May is genuine beach weather, 59-72°F/15-22°C, with rainfall dropping off sharply by late April. Spring overall trends from about 59°F/15°C to 72°F/22°C with steadily decreasing rain risk (roughguides.com; algarve-tourist.com; portugalgetaways.com).",
  legalNotes:
    "Portugal is the one destination among the five researched here that places no residency requirement on a foreign couple — either partner can be a non-resident and still marry legally at a Portuguese Conservatória do Registo Civil (civil registry office). The tradeoff is lead time and process: the preliminary marriage-license process (habilitação para casamento) runs roughly 2-3 months and requires at least one partner to be present in Portugal to file it, and a local lawyer or solicitor must be engaged to submit the application. Each partner needs a Certificate of No Impediment from the US Embassy in Lisbon (about $50, by appointment), plus a US birth certificate apostilled by the issuing state's Secretary of State and translated into Portuguese, with divorce or death certificates apostilled and translated if either partner was previously married — apostille first, then translation, is the required sequence. Verify with the local authority or an attorney.",
  seasonNotes:
    "Portugal's Freedom Day (April 25) and Labour Day (May 1) — coincidentally the same two dates that bracket Italy's spring holiday bridge — fall a week apart and bring a bump in domestic travel; Easter 2028 (Sunday, April 16) also draws a rise in Algarve visitors as the region's season warms up. Local planners cite May, June and September as the Algarve's wedding sweet spot — 72-82°F/22-28°C, low rainfall, long daylight, and pricing 15-25% below the July-August peak — with May in particular threading the needle between reliable weather and shoulder-season rates, a real value window worth calling out given how much cheaper spring runs than the Algarve's July-August peak.",
  travelNotes:
    "Faro Airport (FAO) is the Algarve's gateway. United operates the only nonstop US route — Newark-Faro — but it's seasonal, resuming mid-May each year (the 2026 restart was May 15, four weekly flights on a 757); a March or April wedding date falls outside that window and requires a one-stop connection, most commonly through Lisbon. Round-trip economy fares run roughly $598-1,268 depending on dates and routing, with $855 cited for September/October 2026 searches; this file uses a $750 midpoint reflecting a blend of shoulder-season one-stop and nonstop fares. Algarve hotel lodging away from the wedding venue runs $100-160/night for a mid-range property in the spring shoulder season, well below the $250-400/night summer luxury-resort rates; this file uses $130/night. Travel-cost math: ~$750 round-trip airfare + 3 nights x $130/night hotel lodging = $1,140 per guest — the lowest travel cost per guest of the five European destinations researched.",
  sourceUrls: [
    "https://pt.usembassy.gov/marriage-in-portugal/",
    "https://translayte.com/blog/how-to-get-married-in-portugal-as-a-foreigner",
    "https://weddingsabroadguide.com/legal-requirements-for-getting-married-in-portugal.html",
    "https://www.roughguides.com/articles/algarve-weather-march-travel-tips/",
    "https://www.algarve-tourist.com/guides/algarve-weather-when-to-visit-best-month.html",
    "https://portugalgetaways.com/en-us/destination/algarve/plan-your-trip/weather-in-algarve",
    "https://en.wikipedia.org/wiki/Public_holidays_in_Portugal",
    "https://theportugalpost.com/posts/united-commits-to-2026-nonstop-newarkfaro-route-promising-algarve-tourism-boom",
    "https://www.momondo.com/flights/new-york-city/faro",
    "https://algarvewedding.eu/portugal-wedding-cost-average-prices-for-50-100-150-guests-2026-2027-guide/",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
  ],
  venues: [
    {
      key: "algarve-quinta-das-oliveiras",
      name: "Quinta Das Oliveiras (QO)",
      website: "https://www.wedinspire.com/wedding-venues/algarve/qo-events/",
      capacity: 250,
      rentalFee: 40000,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A country estate in the hills above Lagos (western Algarve), overlooking the Atlantic and about two minutes from Meia Praia beach. The pool terrace hosts 50-150 guests depending on configuration, with a marquee option on the tennis-court area extending capacity to 250. Published pricing is a bundled package rather than a bare rental: roughly €35,000 for 50 guests covering venue hire, villa accommodation and a full food-and-drinks package. rentalFee above is the direct USD conversion of that 50-guest package; pricing scales with guest count, so a ~100-guest quote from the venue would run meaningfully higher.",
      availabilityNotes: "Contact the venue directly for a guest-count-specific package quote.",
      sourceUrls: ["https://www.wedinspire.com/wedding-venues/algarve/qo-events/", "https://forbetterforworse.co.uk/venue/qo/"],
    },
    {
      key: "algarve-quinta-dos-vales",
      name: "Quinta dos Vales",
      website: "https://quintadosvales.pt/en/wedding-venue-algarve/",
      capacity: 120,
      rentalFee: 11500,
      estimated: true,
      lodgingOnSite: true,
      styleNotes:
        "A 44-hectare working wine estate and sculpture park in the western Algarve, combining a winery, luxury villa accommodation and outdoor event spaces. The terrace seats up to 120 guests, with on-site villa accommodation for up to 100. No public venue-hire rate card was found (only a €200 exclusive-access reservation add-on); rentalFee above is estimated from the Algarve's general exclusive-use quinta fee range (roughly €5,000-15,000 cited across comparable estates), using a rounded midpoint conversion.",
      availabilityNotes: "Contact the estate directly for a guest-count-specific quote.",
      sourceUrls: ["https://quintadosvales.pt/en/wedding-venue-algarve/", "https://quintadosvales.pt/en/event-conditions/"],
    },
    {
      key: "algarve-vila-vita-parc",
      name: "Vila Vita Parc",
      website: "https://vilavitaparc.com/en/celebrations-events/weddings-special-events",
      capacity: 250,
      perGuestCost: 190,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A cliffside luxury resort in Porches with private beach access, lush gardens and nine event venues (including a 2-Michelin-star restaurant), able to host both intimate ceremonies and celebrations up to 250 guests, with luxury rooms and private villas on-site. Published wedding packages start from €164 per person, including flowers, cake, linens, chair covers, staging and a complimentary bridal-suite night; perGuestCost above is the direct USD conversion of that starting package price, marked estimated since more elaborate packages run higher.",
      availabilityNotes: "Contact the resort's wedding planning team directly for a guest-count-specific quote.",
      sourceUrls: [
        "https://vilavitaparc.com/en/celebrations-events/weddings-special-events",
        "https://wanderlustweddings.online/vila-vita-parc-resort-spa-a-luxury-destination-wedding-venue-in-the-heart-of-the-algarve/",
      ],
    },
  ],
  scenario: {
    fixedCosts: 22000,
    perGuestCost: 190,
    travelCostPerGuest: 1140,
    attendanceRate: 0.52,
    notes:
      "fixedCosts is estimated from the researched venues' rental/package fees (roughly $11,500-40,000, several bundling accommodation) plus planner, photo/video and stationery costs typical for an Algarve destination wedding, rounded to $22,000 — the lowest fixedCosts figure among the five European destinations researched, consistent with algarvewedding.eu's guidance that a complete three-day, 70-guest Algarve wedding with full catering, planner, photography, florals, music and guest transport runs €30,000-60,000 all-in (couple-borne costs only, excluding guest travel). perGuestCost ($190) is anchored directly to Vila Vita Parc's published €164/person starting package, converted, and used as a representative figure across the destination's mid-to-upper venues. travelCostPerGuest matches travelCostPerGuestEstimate. Sources: algarvewedding.eu/portugal-wedding-cost-average-prices-for-50-100-150-guests-2026-2027-guide, vilavitaparc.com/en/celebrations-events/weddings-special-events.",
  },
};
