import type { DestinationSeed } from "../types";

/**
 * Provence, France — Aix-en-Provence / Luberon / Var.
 *
 * Lavender-and-vineyard château country, researched as a distinct
 * alternative to the Italian finalists: a mature multi-day house-party
 * wedding culture, no nonstop flight to the region's real gateway
 * (Marseille), and consistently the most expensive region in France for a
 * destination wedding per the planner sources checked. France also has the
 * strictest civil-marriage residency rule of the destinations researched —
 * worth flagging clearly for the couple. France does not carry the
 * plantation/enslaved-labor risk category flagged for the US South and the
 * Caribbean, but every château named below was checked for real, current
 * bookability rather than invented.
 */
export const provenceFrance: DestinationSeed = {
  key: "provence-france",
  name: "Provence, France",
  country: "France",
  countryCode: "FR",
  region: "Aix-en-Provence / Luberon / Var",
  rank: 43,
  whyHere:
    "Provence offers a different flavor of European estate wedding than the Italian finalists — working vineyard châteaux, olive groves and a wedding culture built around multi-day house parties for the whole guest list — at the cost of being the priciest region researched in France and requiring a connecting flight to reach the region's actual gateway airport (Marseille), rather than the nonstop-to-Nice most flight searches surface first.",
  notes:
    "Attendance is estimated at 0.53, below Tuscany's 0.55 and just above Amalfi's 0.52, reflecting that Provence requires a connecting flight to Marseille (the practical gateway for the region's château country) even though nonstop service exists to nearby Nice, combined with Provence's status as the most expensive French region researched for a destination wedding.",
  travelCostPerGuestEstimate: 1225,
  flightCostEstimate: 670,
  lodgingPerNightEstimate: 185,
  attendanceRateEstimate: 0.53,
  weatherNotes:
    "Provence has a genuine Mediterranean-continental spring, distinct from the Caribbean/Latin America finalists and milder than Tuscany's. March runs 41-61°F (5-16°C) with only about 30mm of rain but the Mistral wind blowing on 8-10 days, which can turn a sunny day sharply cooler; April warms to 46-64°F (8-18°C) as the Mistral recedes, though rainfall rises to about 52mm over 6-7 days of short showers; May reaches a comfortable 61°F (16°C) average with slightly less rain (about 47mm over 5.4 days). Outdoor ceremony risk is real in March because of the Mistral specifically, not just rain — late April into May is the more reliable window (kimkim.com; onlyprovence.com).",
  legalNotes:
    "France requires every marriage to be performed as a civil ceremony by a French civil registrar (officier de l'état civil) at a mairie (town hall) before any religious or symbolic ceremony can take place — and that civil ceremony requires at least one partner (or a parent) to have lived in that commune for a minimum of 30-40 days immediately beforehand, a residency rule that cannot be waived. A couple flying in from the US East Coast for a long weekend cannot realistically meet it, so in practice essentially every American couple marrying in Provence completes their legal marriage in the US beforehand and treats the French ceremony and reception as symbolic. For couples who do pursue the legal French route, required documents include a valid passport, a birth certificate less than 3 months old, and a signed Attestation tenant lieu de certificat de coutumes et de célibat (since the US does not issue a Certificate of No Impediment), plus a minimum of two witnesses (maximum four) at the mairie. Verify with the local authority or an attorney.",
  seasonNotes:
    "French wedding season runs May-October, and Provence is specifically flagged by multiple planner sources as the most expensive region in France for a destination wedding, regardless of season — a rustic farmhouse wedding starts around €50,000 and prestige properties exceed €250,000. May 2028 carries three closely spaced French public holidays — Labour Day (May 1), Victory in Europe Day (May 8) and Ascension Thursday (May 25) — which French couples and vendors often bridge into extended 'pont' weekends, tightening venue and vendor availability around those dates. Because Provence's top châteaux book 12-18 months out for the May-October season regardless of date, a spring date in April, ahead of the region's true June-September peak, is a real value window relative to summer pricing.",
  travelNotes:
    "Marseille Provence Airport (MRS) is the practical gateway for Provence's wedding country — about 25 minutes to Aix-en-Provence and under an hour to most Var and Luberon estates — but no US airline flies nonstop to Marseille; guests connect through a European hub (Paris, Amsterdam, Frankfurt), with round-trip economy fares running roughly $609-730 in current searches. (Nice, on the French Riviera, does have nonstop Delta/United/La Compagnie service from New York, but it's a 2+ hour drive from Aix-en-Provence and not the right gateway for this region's venues.) This file uses a $670 midpoint. Provence hotel lodging away from the wedding venue averages around $185/night for a 3-star property overall, though Aix-en-Provence itself runs closer to $248/night for a double room; this file uses the regional $185/night figure. Travel-cost math: ~$670 round-trip airfare + 3 nights x $185/night hotel lodging = $1,225 per guest.",
  sourceUrls: [
    "https://fr.usembassy.gov/services/marriage-and-civil-partnerships-pacs-in-france/",
    "https://www.frenchweddingstyle.com/planning-a-destination-wedding-in-france/getting-married-legally/",
    "https://vavril.fr/en/legal-requirements-us-citizens-marrying-in-france/",
    "https://www.frenchweddingstyle.com/planning-a-destination-wedding-in-france/provence/",
    "https://www.kimkim.com/c/provence-in-march-travel-tips-weather-more",
    "https://www.onlyprovence.com/temperatures-in-provence/",
    "https://calendarific.com/holidays/2028/FR",
    "https://www.rome2rio.com/s/Marseille-Airport-MRS/Aix-en-Provence",
    "https://www.momondo.com/flights/new-york-city/nice",
    "https://roamrecs.com/france-wedding-venues.html",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
  ],
  venues: [
    {
      key: "provence-le-mas-des-cinq-fontaines",
      name: "Le Mas des Cinq Fontaines",
      website: "https://www.masdescinqfontaines.com/en/le-domaine",
      capacity: 200,
      rentalFee: 14300,
      estimated: true,
      lodgingOnSite: true,
      styleNotes:
        "A five-star estate near Sisteron in the Durance valley (Alpes-de-Haute-Provence), named for its five natural springs, with a 300-square-meter orangery, gardens, pool and spa. Full-privatization pricing for up to 200 guests starts around €10,950 midweek and €13,950 on weekends (2026 rates); on-site accommodation sleeps up to 50 across roughly twenty rooms and suites. rentalFee above uses the midpoint of the published midweek/weekend starting rates, marked estimated since final pricing depends on exact dates and length of stay.",
      availabilityNotes: "Contact the estate directly for a guest-count- and date-specific quote.",
      sourceUrls: [
        "https://www.frenchweddingstyle.com/wedding-venues/le-mas-des-cinq-fontaines/",
        "https://www.sisteron-alpesprovencales.fr/en/equipement/le-mas-des-5-fontaines-location-pour-mariages-et-receptions/",
      ],
    },
    {
      key: "provence-chateau-de-robernier",
      name: "Château de Robernier",
      website: "https://www.frenchweddingstyle.com/wedding-venues/chateau-de-robernier/",
      capacity: 300,
      rentalFee: 12100,
      estimated: true,
      lodgingOnSite: true,
      styleNotes:
        "A 16th-century château in Montfort-sur-Argens (Var), set among vineyards and centuries-old olive groves, with exclusive-use privatization for weddings up to 300 guests and on-site accommodation for 24-26. Published starting price for exclusive venue hire is €10,500; rentalFee above is the direct USD conversion, marked estimated since it is a starting figure and the final quote depends on guest count, season and length of stay.",
      availabilityNotes: "Contact the château directly for a guest-count- and season-specific quote; peak season (June-September) typically requires a longer minimum stay.",
      sourceUrls: [
        "https://www.frenchweddingstyle.com/wedding-venues/chateau-de-robernier/",
        "https://caratsandcake.com/venue/chateau-de-robernier",
      ],
    },
    {
      key: "provence-chateau-la-coste",
      name: "Château La Coste",
      website: "https://chateau-la-coste.com/en/group-events/receptions-weddings.html",
      capacity: 250,
      rentalFee: 40000,
      estimated: true,
      styleNotes:
        "A working vineyard estate near Aix-en-Provence that doubles as a contemporary art park, with installations by Tadao Ando, Frank Gehry, Jean Nouvel and Louise Bourgeois scattered across the grounds — a distinctly different aesthetic from the other two Provence finalists' traditional château settings. Indoor event spaces range from 20 to 250 square meters, with additional outdoor vineyard and garden settings for the ceremony and cocktail hour; the estate publishes no public wedding rate card. rentalFee above is estimated from Provence's general château-venue-hire range (roughly €25,000-55,000 per weekend cited across the region's properties), using a rounded midpoint conversion — request a custom quote from the estate's events team for an accurate figure.",
      availabilityNotes: "Contact the estate's events team directly for a guest-count-specific quote; books well in advance for the May-October season.",
      sourceUrls: [
        "https://chateau-la-coste.com/en/group-events/receptions-weddings.html",
        "https://www.the-international-wedding-planner.com/domaine-chateau-la-coste-get-married-in-the-heart-of-french-provence/",
        "https://www.bleyer-guillaume.com/en/blog/wedding-venues-provence",
      ],
    },
  ],
  scenario: {
    fixedCosts: 35000,
    perGuestCost: 280,
    travelCostPerGuest: 1225,
    attendanceRate: 0.53,
    notes:
      "fixedCosts is estimated from the researched châteaux's rental fees (roughly $12,100-40,000) plus planner, photo/video and stationery costs typical for a French château wedding, rounded to $35,000 — the highest fixedCosts figure among the five European destinations researched, consistent with Provence being repeatedly flagged as the most expensive French region for a destination wedding. perGuestCost ($280) reflects that a mid-range Provence wedding for 80-100 guests runs €83,000-144,000 all-in (frenchweddingstyle.com); after backing out venue/planner/photo costs already captured in fixedCosts, the remaining catering-and-bar spend per guest lands in the same premium tier as Lake Como and Amalfi. travelCostPerGuest matches travelCostPerGuestEstimate. Sources: frenchweddingstyle.com/planning-a-destination-wedding-in-france/provence, frenchweddingstyle.com/planning-a-destination-wedding-in-france/wedding-cost-guide, roamrecs.com/france-wedding-venues.html.",
  },
};
