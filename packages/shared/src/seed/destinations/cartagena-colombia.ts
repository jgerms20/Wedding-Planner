import type { DestinationSeed } from "../types";

/**
 * Cartagena, Colombia.
 *
 * A colonial walled city on the Caribbean rather than a resort strip — real
 * cultural texture (UNESCO Old Town, colorful balconies, a working port) for
 * a couple who liked Brazil's mix of history and coastline. Numbers below
 * are sourced where a URL is given; anything derived is flagged
 * `estimated: true` with the derivation spelled out in a note.
 *
 * History check (see .claude/skills/wedding-research, rule 7): Cartagena was
 * one of the principal ports of entry for the trans-Atlantic slave trade
 * into Spanish South America, and its Old Town's colonial "casas" were often
 * built by families who profited from that trade or from the port's colonial
 * commerce. Two well-known walled-city mansion-hotels were researched and
 * deliberately left out of this file rather than guessed into it: Casa
 * Pestagua (built by an 18th-century "shipping magnate" who was later
 * granted the title Conde de Pestagua — a plausible but unconfirmed link to
 * Cartagena's slave-trade-era shipping economy) and Hotel Casa San Agustín
 * (three 17th-century private colonial houses with no confirmed original-
 * owner history found). Every venue actually included below is either a
 * purpose-built former convent (a category the research standard calls out
 * as lower-risk) or a modern, purpose-built hotel with no colonial-era
 * structure at all.
 */
export const cartagenaColombia: DestinationSeed = {
  key: "cartagena-colombia",
  name: "Cartagena",
  country: "Colombia",
  countryCode: "CO",
  region: "Cartagena de Indias, Bolívar",
  rank: 34,
  whyHere:
    "Cartagena gives Joshua & Janel a walled-city-and-Caribbean-coastline combination with the kind of centuries-deep history and color they responded to in Brazil, plus a visa-free entry for US guests and a genuine luxury-hotel scene inside the Old Town and on the beach resorts just offshore.",
  notes:
    "Attendance is estimated at 0.60 — the low end of the 60-70% typical destination-wedding range reported by Destify's guest-attendance analysis — because Cartagena has meaningfully thinner nonstop air service from the US East Coast than the Mexican or Caribbean-island options (seasonal-only JFK service, Miami as the more reliable nonstop hub) and is a less familiar, more city-and-culture-oriented trip for guests used to beach-resort destination weddings (destify.com; flightconnections.com).",
  travelCostPerGuestEstimate: 1290,
  flightCostEstimate: 540,
  lodgingPerNightEstimate: 250,
  attendanceRateEstimate: 0.6,
  weatherNotes:
    "March sits at the tail of Cartagena's dry season: warm (75-86°F/24-30°C) with virtually no rainfall, though humidity is already building. April is a shoulder month — hot (up to 90°F/32°C) and increasingly humid as the dry-to-wet transition begins. By May, Cartagena is fully into its wet season (through November): still hot (up to 90°F/32°C) but with roughly 10 rainy days and about 100mm of rain for the month. Net: March is the most reliably dry of the three target months, with April a reasonable but warmer/humider shoulder option and May carrying real rain risk (roughguides.com; weather2travel.com; weather-and-climate.com).",
  legalNotes:
    "Colombia does not require a religious ceremony — a civil marriage performed before a Colombian notary (notaría) is the standard legal route, and requirements can vary somewhat by notary office, so the couple should confirm specifics directly once a notary is chosen. Neither partner needs to be a Colombian resident. Required documents for each US partner: a valid passport, an apostilled birth certificate with a certified Spanish translation, and — for anyone previously married — a divorce decree or deceased spouse's death certificate, also apostilled and translated. Each partner also needs a sworn declaration of single/eligible-to-marry status (in the US, typically a county clerk's Certificate of No Impediment, or a notarized affidavit); if sworn before a US notary rather than a Colombian consulate, it must be legalized at the nearest Colombian consulate before use. Minimum marriage age is 18. The most common real-world approach for US couples is a legal courthouse marriage at home beforehand and a symbolic ceremony in Cartagena for guests, which avoids the apostille/translation lead time entirely. Verify with the local authority or an attorney.",
  seasonNotes:
    "December-April is Cartagena's dry season and its peak tourism period, with the highest hotel rates of the year in December specifically (average nightly rate roughly $447 vs. an October low of $192). Semana Santa (Holy Week) is a major Colombian domestic travel holiday that drives added demand in the Old Town; in a comparable 2026 calendar it runs March 29-April 5, and Easter Sunday 2028 falls April 16 (publicholidays.com). The Cartagena International Film Festival (FICCI), Latin America's oldest, runs annually in mid-April (April 14-19 in the 2026 edition) and can add both cultural draw and hotel demand if a date overlaps it. April also hosts smaller cultural programming (Festival ConCuerda in early March; Hay Festival Cartagena, typically late January, falls outside the couple's window). Net recommendation: a March date (ahead of Semana Santa and FICCI) offers the driest weather and avoids the two biggest event-driven demand spikes in the window (gotripzi.com; colombia.travel; hayfestival.com).",
  travelNotes:
    "Rafael Núñez International Airport (CTG) sits a short 15-20 minute drive from both the walled city and the Bocagrande hotel strip. Nonstop US service is thinner than Mexico or the Caribbean: American Airlines and Avianca fly nonstop to Miami (about 3 hours, 8 flights/week), while JetBlue runs year-round nonstop service from New York-JFK and Avianca adds seasonal JFK service — meaning guests connecting through Atlanta or other non-Miami/NYC hubs will typically make one stop. No visa is required for US citizens for tourist stays. Travel-cost math: round-trip fares are not as thoroughly benchmarked as the Mexican/Caribbean routes in available sources, so this uses a reasoned estimate (marked in the scenario notes) of ~$540 round-trip (a Miami- or JFK-nonstop fare, in line with comparable ~3-4 hour Caribbean-basin routes) + 3 nights lodging at $250/night (Cartagena's cited overall average nightly rate) = $1,290 per guest.",
  sourceUrls: [
    "https://co.usembassy.gov/marriage-in-colombia/",
    "https://nexo.legal/marriage-in-colombia-guide-2025/",
    "https://medellinlawyer.com/how-to-get-married-in-colombia/",
    "https://colombiamove.com/blog/getting-married-colombia-foreigner-legal-guide/",
    "https://www.roughguides.com/articles/cartagena-colombia-weather-march-travel-tips/",
    "https://www.weather2travel.com/colombia/cartagena/climate/",
    "https://weather-and-climate.com/average-monthly-Rainfall-Temperature-Sunshine,cartagena-de-indias,Colombia",
    "https://gotripzi.com/destinations/cartagena-co/cost",
    "https://colombia.travel/en/fairs-and-festivals/hay-festival-cartagena",
    "https://www.hayfestival.com/cartagena/home",
    "https://publicholidays.com/easter/",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.flightconnections.com/flights-from-ctg-to-mia",
    "https://en.wikipedia.org/wiki/Rafael_N%C3%BA%C3%B1ez_International_Airport",
    "https://colombiaone.com/2025/09/08/colombia-colonial-houses-cartagena-de-indias/",
    "https://en.wikipedia.org/wiki/Cartagena,_Colombia",
  ],
  venues: [
    {
      key: "cartagena-colombia-sofitel-santa-clara",
      name: "Sofitel Legend Santa Clara Cartagena",
      website: "https://www.sofitellegendsantaclara.com/weddings/",
      capacity: 300,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "A 17th-century former convent in the walled city, converted to a hotel decades ago; its wedding venues include the former convent chapel (now the Santa Clara Ballroom, capacity up to 300 for the largest configuration, up to 200 for other wedding-specific setups) and El Claustro, a colonial-arched courtyard garden. Convents are a purpose-built religious-institution category, not a private residence, and no marketing tying the property to enslaved labor was found in research — the lower-risk category the research standard calls for. No published rental fee or per-guest catering price was found; capacity marked estimated pending a wedding-specific (vs. general banquet) confirmation from the hotel.",
      availabilityNotes: "Contact the hotel's wedding planners directly for pricing; a wedding brochure is referenced on the venue's site but not reproduced with prices in available search results.",
      sourceUrls: [
        "https://www.sofitellegendsantaclara.com/weddings/",
        "https://www.sofitellegendsantaclara.com/weddings/weddings-venues/santa-clara-ballroom/",
        "https://www.historichotels.org/hotels-resorts/sofitel-legend-santa-clara-cartagena/meetings.php",
      ],
    },
    {
      key: "cartagena-colombia-sofitel-baru",
      name: "Sofitel Barú Calablanca Beach Resort",
      website: "https://www.sofitelbarucartagena.com/weddings/",
      capacity: 270,
      rentalFee: 16700,
      lodgingOnSite: true,
      styleNotes:
        "Modern, purpose-built beach resort on Isla Barú (a ~40-minute boat trip from Cartagena) with a private beach and multiple venues: the Kalamarí Ballroom (up to 270), La Pérgola rooftop for cocktail receptions, Calablanca Beach for ceremonies, and a Presidential Suite terrace for intimate ceremonies. Published pricing: $16,700 venue rental plus $7,500 for rental/production add-ons.",
      availabilityNotes: "Contact the resort's wedding coordinator (erika.ospino@sofitel.com) for guest-count-specific quotes.",
      sourceUrls: [
        "https://www.sofitelbarucartagena.com/weddings/",
        "https://sofitel.accor.com/en/hotels/B0P5/weddings.html",
        "https://www.wedaways.com/dest-wedding-guides/sofitel-baru-calablanca/",
      ],
    },
    {
      key: "cartagena-colombia-hyatt-regency",
      name: "Hyatt Regency Cartagena",
      website: "https://www.hyatt.com/en-US/hotel/colombia/hyatt-regency-cartagena/ctgrc/special-events/weddings",
      capacity: 300,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "Modern beachfront hotel in the Bocagrande district (no colonial-era structure); 1,200 square meters of event space across six venues including a divisible ballroom. A dedicated wedding planner is included with bookings. Capacity marked estimated based on the ballroom's general event capacity; no wedding-specific maximum or price was published in available sources.",
      availabilityNotes: "Contact the hotel's events team for pricing and a wedding-specific capacity by space.",
      sourceUrls: [
        "https://www.hyatt.com/en-US/hotel/colombia/hyatt-regency-cartagena/ctgrc/special-events/weddings",
        "https://www.cvent.com/venues/cartagena/hotel/hyatt-regency-cartagena/venue-21f9e2ca-be02-4bb2-868d-f573798a3018",
      ],
    },
    {
      key: "cartagena-colombia-intercontinental",
      name: "InterContinental Cartagena de Indias",
      website: "https://www.iccartagenameetings.com/en/event-hall-cartagena",
      capacity: 700,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "Modern high-rise resort hotel in Bocagrande (no colonial-era structure); 14 event spaces highlighted by the Grand Aguamarina Ballroom, which holds up to 700 in a theater layout and 310 for a seated banquet — comfortably oversized for the couple's ~100-guest count with room for a larger welcome party or after-party in the same space. No wedding package price was published in available sources; capacity marked estimated for the banquet (vs. theater) configuration most relevant to a wedding reception.",
      availabilityNotes: "Contact the hotel's events team directly for a wedding-specific proposal.",
      sourceUrls: [
        "https://www.iccartagenameetings.com/en/event-hall-cartagena",
        "https://www.cvent.com/venues/cartagena/luxury-hotel/intercontinental-cartagena-de-indias-hotel/venue-2940a3d9-1133-4db8-99a6-4c1c507032c1",
      ],
    },
  ],
  scenario: {
    fixedCosts: 20000,
    perGuestCost: 120,
    travelCostPerGuest: 1290,
    attendanceRate: 0.6,
    notes:
      "fixedCosts is derived from the general Cartagena boutique-hotel wedding benchmark of $60,000-$120,000 all-in for 40-60 guests (colombialuxuryservices.com), backing out an estimated ~60 attendees x $120/guest catering (~$7,200-$36,000 depending on where in that F&B band) and landing near $20,000 for venue/planner/photo/decor/attire/misc at the lower end of that all-in range, appropriate for a couple choosing a modern resort (Sofitel Barú, Hyatt Regency) rather than the priciest private walled-city villa buyouts. perGuestCost ($120) is estimated from Cartagena's cited per-person catering benchmark of $15-35/person for budget venues scaled up toward a full open-bar resort wedding, cross-checked loosely against Mexican/Caribbean resort per-guest ranges in this same file set. travelCostPerGuest matches travelCostPerGuestEstimate (itself partly estimated; see travelNotes). Sources: colombialuxuryservices.com/insider/cartagena-private-wedding-venues, nupcii.com/en/blog/affordable-wedding-venues-in-cartagena.",
  },
};
