import type { DestinationSeed } from "../types";

/**
 * Marrakech, Morocco — Medina riads / Palmeraie estates.
 *
 * A warm, dry-spring destination unlike anything else on the list:
 * centuries-old riads and garden estates instead of beaches or vineyards,
 * a real day of desert light, and one of the most affordable luxury
 * wedding markets researched relative to its visual drama. Morocco does
 * not carry the plantation/enslaved-labor risk category flagged for the
 * US South and the Caribbean, but every historic property named below —
 * riad, garden estate and grand hotel alike — was checked for its real
 * ownership and construction history, not just current bookability.
 * La Mamounia's grounds trace to an 18th-century royal garden gift and the
 * hotel itself was built in the 1920s by the Moroccan Railway Company;
 * no history of enslaved or forced labor is associated with the property
 * or the other three venues below.
 */
export const marrakechMorocco: DestinationSeed = {
  key: "marrakech-morocco",
  name: "Marrakech, Morocco",
  country: "Morocco",
  countryCode: "MA",
  region: "Medina riads / Palmeraie estates",
  rank: 49,
  whyHere:
    "Marrakech offers a warm, reliably dry spring climate the couple won't find in Scotland or Iceland, centuries-old riad courtyards and Palmeraie garden estates at a noticeably lower price point than the Italian villa finalists, and a mature wedding-planning industry built around exactly this kind of celebration — all balanced against a genuine long-haul flight with a mandatory connection for the couple's East Coast guests.",
  notes:
    "Attendance is estimated at 0.52, below the 60-70% typical destination-wedding range reported by Destify's guest-attendance analysis (destify.com), reflecting the long-haul flight with a required connection and the unfamiliarity of Morocco as a wedding destination for most US guests, offset somewhat by Marrakech's comparatively affordable luxury pricing and reliably good spring weather relative to some of the other long-haul finalists.",
  travelCostPerGuestEstimate: 1350,
  lodgingPerNightEstimate: 200,
  attendanceRateEstimate: 0.52,
  weatherNotes:
    "Marrakech has a warm, dry, highly reliable spring — the most weather-predictable of any finalist besides the Maldives. March opens mild (highs 72-75°F/22-24°C, cooler nights, especially toward the desert); April is widely cited as one of the best months to visit, with warm days (up to ~79°F/26°C), cool nights (~54°F/12°C) and very little rain (~0.67 inches for the month); May continues warming toward 82°F/28°C with sunshine dominant and minimal rainfall throughout. Outdoor riad-courtyard and garden-estate ceremonies are a safe bet on any date in this window, a genuine advantage over the more changeable Highlands/Iceland/Tuscany options (roughguides.com; magnificenttravel.com; visitmarrakech.com).",
  legalNotes:
    "US citizens do not need a visa to enter Morocco for stays up to 90 days, but there is no such thing as a quick civil marriage for foreigners here — Moroccan marriage law follows the Moudawana family code, and getting legally married as two American citizens in Morocco is a genuinely involved, multi-step process. Each partner must obtain a Certificate of Capacity to Marry (Affirmation for Marriage) and an Affidavit of Nationality from the US Consulate in Morocco, a notarized copy of their passport, and — specific to Morocco — a medical certificate of good health issued by a doctor inside Morocco; a male applicant who is not Muslim must also provide a notarized statement of religious denomination. Consulate appointments for these documents can take weeks to months to secure. Because of this real lead time, the overwhelming majority of foreign couples marry legally at home first and treat the Marrakech ceremony as symbolic — exactly the pattern this project has flagged for Bali, Iceland and the Maldives. A Moroccan civil marriage, once completed through the full process, is recognized in the US. Verify with the local authority or an attorney.",
  seasonNotes:
    "Ramadan 2028 is projected to run roughly January 27-February 25, well outside the couple's March-May target window, so the couple's wedding date won't compete with reduced restaurant/vendor hours or the shifted Iftar-driven event schedules that fall during the holy month. Several Marrakech wedding guides describe October-April as the region's higher-demand 'wedding season' overall, with rates 30-50% above summer, so a March or April date still sits inside that broader premium window; May, just past that stated peak, may offer a modest pricing edge as temperatures rise toward summer. No other major date conflicts were found for spring 2028.",
  travelNotes:
    "There is no nonstop flight from any US airport to Marrakech (RAK); every itinerary requires at least one connection, commonly through a European hub (Paris, Madrid, Lisbon, London) via Royal Air Maroc, Air France, TAP or a Norse Atlantic/partner combination, adding real total travel time on top of the ~7-hour transatlantic leg. Round-trip economy fares from JFK run roughly $600-860 depending on route and airline; this file uses a $750 midpoint. Marrakech riad and boutique-hotel lodging away from the wedding venue runs widely, from budget riads under $100/night to $200+/night for a well-located boutique property with pool; this file uses $200/night reflecting a comfortable mid-range stay for wedding guests. Travel-cost math: ~$750 round-trip airfare + 3 nights x $200/night lodging = $1,350 per guest.",
  sourceUrls: [
    "https://ma.usembassy.gov/services/marriage-in-morocco/",
    "https://marriageinmorocco.com/marriage-in-morocco-for-us-citizens/",
    "https://www.roughguides.com/articles/marrakech-weather-april-travel-tips/",
    "https://www.magnificenttravel.com/en/blog/morocco/the-weather-in-morocco-in-april-an-in-depth-guide/",
    "https://aladhan.com/ramadan-calendar/2028",
    "https://www.traveloffpath.com/morocco-entry-requirements-for-us-citizens-the-simple-guide/",
    "https://www.travelocity.com/lp/flights/jfk/rak/john-f-kennedy-intl-to-menara",
    "https://weddingplannermarrakech.com/venues",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
  ],
  venues: [
    {
      key: "marrakech-riad-el-fenn",
      name: "El Fenn",
      website: "https://el-fenn.com/weddings-and-events/",
      capacity: 120,
      rentalFee: 11500,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A cluster of five interconnected 19th-century riads in the Medina, restored into a 41-room boutique hotel with three pools, a cinema and rooftop restaurant; owned by Vanessa Branson. Full-property buyout for exclusive use runs roughly €8,000-15,000/night (~$9,300-17,400) depending on season, with a reception capacity up to about 120 guests — the closest fit among riad-style venues to the couple's ~100-guest list. In-house catering is available alongside outside caterers. rentalFee above uses the converted nightly midpoint, marked estimated since actual terms depend on length of stay and exact dates.",
      availabilityNotes: "Contact the riad's events team directly for a length-of-stay and guest-count quote.",
      sourceUrls: [
        "https://el-fenn.com/weddings-and-events/",
        "https://weddingplannermarrakech.com/venues/riad-el-fenn-wedding-cost",
        "https://weddingplannermarrakech.com/guides/riad-wedding-marrakech-guide",
      ],
    },
    {
      key: "marrakech-la-mamounia",
      name: "La Mamounia",
      website: "https://mamounia.com/en/events/weddings-celebrations.html",
      capacity: 300,
      rentalFee: 8500,
      perGuestCost: 210,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "Marrakech's most famous grand hotel, on gardens gifted by the Alaouite Sultan Mohammed Ben Abdallah to his son in the 18th century and built out as a hotel in 1923 by the Moroccan Railway Company with French architects Henri Prost and Antoine Marchisio; 135 rooms and 71 suites plus several private on-site riads, able to be booked in its entirety. Venue rental starts around 80,000 MAD (~$8,540 at a rounded 9.36 MAD/USD rate); published per-guest dinner costs start around 2,000 MAD (~$214) with cocktail hour and open-bar packages priced separately. A realistic 100-guest all-in budget researched runs roughly 350,000-600,000 MAD (~$37,400-64,100). rentalFee and perGuestCost above use these converted published floors, marked estimated.",
      availabilityNotes: "Contact the hotel's events team directly for a 2028 date and guest-count quote.",
      sourceUrls: [
        "https://mamounia.com/en/since-1923.html",
        "https://weddingplannermarrakech.com/venues/la-mamounia-wedding-cost",
        "https://mamounia.com/en/events/weddings-celebrations.html",
      ],
    },
    {
      key: "marrakech-beldi-country-club",
      name: "Beldi Country Club",
      website: "https://beldicountryclub.com/",
      capacity: 250,
      rentalFee: 20000,
      estimated: true,
      inHouseCatering: false,
      lodgingOnSite: true,
      styleNotes:
        "A 12-hectare garden estate on the edge of the Palmeraie with a rose garden, olive grove and pottery-workshop event spaces, comfortably handling 80-250 seated guests — a strong match for the couple's ~100-guest list. Published pricing runs roughly €18,500-24,050/night (~$21,500-27,900); unusually for a Marrakech venue, Beldi allows couples to bring their own outside caterer, which can meaningfully change total cost versus an in-house-catering-only venue. rentalFee above uses the converted nightly midpoint, marked estimated.",
      availabilityNotes: "Contact the estate directly for a date- and guest-count-specific quote.",
      sourceUrls: [
        "https://weddingplannermarrakech.com/venues/beldi-country-club-wedding-cost",
        "https://beldicountryclub.com/",
        "https://weddingplannermarrakech.com/compare/beldi-country-club-wedding-cost/vs/jnane-tamsna-wedding-cost",
      ],
    },
    {
      key: "marrakech-jnane-tamsna",
      name: "Jnane Tamsna",
      website: "https://weddingplannermarrakech.com/compare/beldi-country-club-wedding-cost/vs/jnane-tamsna-wedding-cost",
      capacity: 120,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A smaller, artist-designed private estate in the Palmeraie with five gardens and 24 rooms, best suited to 40-120 guests and marketed as a relaxed, house-party-style alternative to Marrakech's grander palace hotels. No single published rental-fee figure was found on the property's own channels within this research pass, so no fee is asserted here; capacity and styling are drawn from wedding-planner comparison coverage rather than the property's own site, which should be confirmed directly before relying on it.",
      availabilityNotes: "Contact the estate directly (via a Marrakech wedding planner or its own booking channel) for pricing and 2028 availability.",
      sourceUrls: [
        "https://weddingplannermarrakech.com/compare/beldi-country-club-wedding-cost/vs/jnane-tamsna-wedding-cost",
      ],
    },
  ],
  scenario: {
    fixedCosts: 18000,
    perGuestCost: 190,
    travelCostPerGuest: 1350,
    attendanceRate: 0.52,
    notes:
      "fixedCosts is estimated from the researched venues' nightly rental floors (roughly $8,500-21,500 converted), leaning toward the lower-to-mid end since Marrakech's per-night rental figures already include most staffing and grounds costs, plus a Marrakech-based planner, photographer and stationery, rounded to $18,000. perGuestCost ($190) is a rounded midpoint between La Mamounia's published ~$214/person dinner floor and the broader riad-market benchmark of €80-150/person for external catering (~$93-174), reflecting that Marrakech catering costs meaningfully undercut the Italian villa destinations while still being a genuine luxury-market price. travelCostPerGuest matches travelCostPerGuestEstimate. Sources: mamounia.com/en/events/weddings-celebrations, weddingplannermarrakech.com/venues/la-mamounia-wedding-cost, el-fenn.com/weddings-and-events, weddingplannermarrakech.com/venues.",
  },
};
