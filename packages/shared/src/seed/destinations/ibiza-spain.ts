import type { DestinationSeed } from "../types";

/**
 * Ibiza, Spain — Santa Eulària / Sant Josep / Sant Antoni (rural fincas and
 * agroturismo estates).
 *
 * The fifth and last European finalist researched: bohemian-luxe finca
 * weddings and caldera-free but still spectacular sunset views, in a
 * livelier, more nightlife-adjacent setting than the other four. Ibiza has
 * no nonstop US flight at all, a uniquely inflated hotel market even by
 * Mediterranean standards, and — like France — a marriage-law quirk that
 * effectively rules out a legally binding ceremony on the island for a
 * couple with no Spanish residency. Spain does not carry the
 * plantation/enslaved-labor risk category flagged for the US South and the
 * Caribbean, but every finca and estate named below was checked for real,
 * current bookability rather than invented.
 */
export const ibizaSpain: DestinationSeed = {
  key: "ibiza-spain",
  name: "Ibiza, Spain",
  country: "Spain",
  countryCode: "ES",
  region: "Santa Eulària / Sant Josep / Sant Antoni (rural fincas & agroturismo estates)",
  rank: 45,
  whyHere:
    "Ibiza offers a distinctly different mood from the other four European finalists — restored 300-year-old fincas turned boutique agroturismo hotels, bohemian-luxe styling, and an island with a livelier, more nightlife-adjacent social scene for guests who stay a few extra days. It's also the most logistically demanding of the five: no nonstop flight from the US at all, a mandatory Madrid or Barcelona connection, and a hotel market that runs surprisingly expensive even outside summer.",
  notes:
    "Attendance is estimated at 0.50, below Amalfi's 0.52 figure and the second-lowest of the five European destinations researched (after Santorini's 0.48), reflecting that Ibiza requires a mandatory one-stop connection through Madrid or Barcelona with no nonstop alternative, combined with a hotel-lodging market that runs unusually high for the island's size even in the spring shoulder season.",
  travelCostPerGuestEstimate: 1450,
  flightCostEstimate: 850,
  lodgingPerNightEstimate: 200,
  attendanceRateEstimate: 0.5,
  weatherNotes:
    "Ibiza's spring is reliably mild and increasingly dry as the season progresses, well ahead of the island's real summer heat. March averages 56-64°F/13-18°C with about 40mm of rain over 6 days; April is drier still, 52-66°F/11-19°C with only 4 rain days; May reaches 57-72°F/14-22°C with just 2 rain days on average. Unlike the island's peak-season crowds, spring weather itself poses little risk to an outdoor finca ceremony, particularly from mid-April onward (climatestotravel.com; nomadseason.com; weather-and-climate.com).",
  legalNotes:
    "Spain's civil-marriage route requires that at least one partner either be a Spanish citizen or have held legal residency in Spain for a minimum of two consecutive years — a bar that rules out a legally binding civil ceremony in Ibiza for two American non-residents. The overwhelming majority of American couples marrying in Ibiza instead complete their legal marriage in the US beforehand and hold a symbolic (humanist or religious-in-form) ceremony at the island venue, which sidesteps the Spanish civil-registry residency requirement entirely and gives full freedom over format and officiant. For a couple who wanted to pursue the legal route regardless, the US Embassy in Madrid can issue a sworn statement of civil status in place of the Certificate of No Impediment the US doesn't provide, and Spain additionally requires apostilled, Spanish-translated birth certificates. Verify with the local authority or an attorney.",
  seasonNotes:
    "Ibiza's club and hotel season restarts each spring — most headline venues (Pacha, Ushuaïa, Hï, Amnesia, DC10) hold opening parties clustered from late April into early May — so a wedding dated much before mid-to-late April lands before the island's full seasonal infrastructure is back online, while a date right at the openings competes with the first wave of arriving visitors. Spain's Semana Santa (Holy Week), April 11-17 in 2028, drives a national spike in domestic travel and flight/hotel pricing that reaches the Balearics even though Ibiza itself has no major Holy Week processions — worth avoiding for that reason alone. Ibiza's true peak (and highest pricing) runs June-September; the back half of May, after Semana Santa and the season-opening crush but well ahead of summer pricing, is this destination's clearest spring value window.",
  travelNotes:
    "No airline flies nonstop from any US airport to Ibiza (IBZ); every guest connects through a European hub, most commonly Madrid (MAD, roughly 65% of one-stop itineraries, a 1-1.5 hour connecting flight) or Barcelona (BCN, about 14%, the shortest average layover). Round-trip economy fares for the full New York-Ibiza itinerary run roughly $553-1,074 in recent searches; this file uses an $850 midpoint reflecting typical shoulder-season pricing above the cheapest months. Ibiza hotel lodging runs unusually high for the island's size even off-season — nightlife-driven demand keeps citywide averages elevated well beyond comparable Mediterranean islands, with $574-792/night averages cited for summer; this file uses $200/night as a spring (pre-peak) estimate. Travel-cost math: ~$850 round-trip airfare + 3 nights x $200/night hotel lodging = $1,450 per guest.",
  sourceUrls: [
    "https://es.usembassy.gov/marriage/",
    "https://esim.holafly.com/travel-tips/getting-married-in-spain/",
    "https://www.immigrationspain.es/en/marriage-between-foreigner-and-spanish-citizen/",
    "https://www.climatestotravel.com/climate/spain/ibiza",
    "https://nomadseason.com/weather/spain/balearic-islands/ibiza-march.html",
    "https://en.wikipedia.org/wiki/Holy_Week_in_Spain",
    "https://ticketsibiza.com/ibiza-opening-parties/",
    "https://www.kayak.com/flight-routes/New-York-John-F-Kennedy-Intl-JFK/Ibiza-IBZ",
    "https://www.budgetyourtrip.com/hotels/spain/ibiza-2516479",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
  ],
  venues: [
    {
      key: "ibiza-kazamor",
      name: "Kazamor Ibiza",
      website: "https://kazamoribiza.com/weddings/",
      capacity: 100,
      rentalFee: 5460,
      estimated: true,
      styleNotes:
        "An exclusive-hire private estate on Ibiza's southwest coast, with panoramic mountain and Mediterranean views, offered as a bare venue rental so the couple can bring in their own theme, caterer and vendors. Capacity is up to 100 guests — a good fit for the couple's full guest list. Published full-day rental starts at €4,750, date-dependent; rentalFee above is the direct USD conversion, marked estimated since final pricing varies by date.",
      availabilityNotes: "Contact the venue directly for date-specific pricing.",
      sourceUrls: ["https://kazamoribiza.com/weddings/", "https://www.wedinspire.com/wedding-venues/ibiza/kazamor-ibiza/"],
    },
    {
      key: "ibiza-ca-na-xica",
      name: "Ca Na Xica",
      website: "https://white-ibiza.com/weddings/ca-na-xica/",
      capacity: 240,
      perGuestCost: 195,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A rustic-luxe restored finca in the island's quieter north, with 23 suites and a late-night dancefloor. Capacity ranges from intimate gatherings of 90 up to 240 for a larger celebration. The estate requires exclusive hire with a mandatory three-night minimum (the night before, the wedding night, and the night after), with all hotel areas exclusive to the wedding party on the event day itself. Catering is charged separately and averages €170/guest; perGuestCost above is the direct USD conversion of that published catering figure.",
      availabilityNotes: "Contact the venue directly for a guest-count-specific package quote; the three-night minimum applies regardless of guest count.",
      sourceUrls: [
        "https://white-ibiza.com/weddings/ca-na-xica/",
        "https://www.wedinspire.com/wedding-venues/ibiza/ca-na-xica/",
        "https://thewhiteedit.com/find-a-venue/ca-na-xica-ibiza-balearic-islands-wedding-venue/",
      ],
    },
    {
      key: "ibiza-can-lluc",
      name: "Can Lluc",
      website: "https://www.canlluc.com/en/events-and-weddings",
      capacity: 100,
      rentalFee: 25000,
      estimated: true,
      lodgingOnSite: true,
      styleNotes:
        "A restored 300-year-old finca in Sant Rafel, one of the island's most established boutique event hotels, with gardens filled with carob and olive trees and an outdoor capacity of around 100 guests — a genuinely rural, traditional-Ibiza counterpoint to Kazamor's and Ca Na Xica's more polished production styling. No public venue-hire rate card was found; rentalFee above is estimated from Ibiza's typical mid-to-upper venue fee range for an 80-120-guest wedding (roughly €15,000-35,000 cited across comparable venues), using a rounded midpoint conversion.",
      availabilityNotes: "Contact the venue directly for a guest-count-specific quote.",
      sourceUrls: ["https://www.canlluc.com/en/events-and-weddings", "https://super-weddings.com/advice/best-ibiza-wedding-venues/"],
    },
  ],
  scenario: {
    fixedCosts: 30000,
    perGuestCost: 220,
    travelCostPerGuest: 1450,
    attendanceRate: 0.5,
    notes:
      "fixedCosts is estimated from the researched venues' rental fees (roughly $5,460-25,000, several requiring a multi-night exclusive-hire minimum) plus planner, photo/video and stationery costs typical for an Ibiza finca wedding, rounded to $30,000 — Ibiza's DJ/production-heavy wedding culture tends to add costs beyond a comparably priced venue in Provence or the Algarve, which the higher planner/production component here reflects. perGuestCost ($220) is anchored to Ca Na Xica's published €170/guest catering figure plus typical Ibiza bar-service costs, converted and rounded, consistent with the €150-300/person range cited across the island's mid-to-upper venues. travelCostPerGuest matches travelCostPerGuestEstimate. Sources: white-ibiza.com/weddings/ca-na-xica, super-weddings.com/advice/best-ibiza-wedding-venues, wezoree.com/inspiration/the-real-ibiza-wedding-cost.",
  },
};
