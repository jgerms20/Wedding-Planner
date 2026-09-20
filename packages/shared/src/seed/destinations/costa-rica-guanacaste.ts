import type { DestinationSeed } from "../types";

/**
 * Costa Rica — Guanacaste (Papagayo Peninsula, Tamarindo).
 *
 * A Pacific-coast alternative to the Caribbean finalists: nonstop flights
 * from NYC and Atlanta, no US-citizen visa requirement, a straightforward
 * legal-marriage process, and a resort market that mixes ultra-luxury
 * (Four Seasons) with mainstream all-inclusive brands (JW Marriott, Secrets),
 * all inside a rainforest-meets-Pacific-beach setting rather than a classic
 * turquoise-water look. Numbers below are sourced where a URL is given;
 * anything derived is flagged `estimated: true` with the derivation spelled
 * out in a note.
 */
export const costaRicaGuanacaste: DestinationSeed = {
  key: "costa-rica-guanacaste",
  name: "Costa Rica (Guanacaste)",
  country: "Costa Rica",
  countryCode: "CR",
  region: "Guanacaste (Papagayo Peninsula, Tamarindo)",
  rank: 38,
  whyHere:
    "Guanacaste offers something none of the Caribbean finalists do — a rainforest-and-cliff backdrop behind the beach — plus nonstop flights from the East Coast, no visa requirement, and one of the simpler legal-marriage processes researched so far, all without Brazil's long-haul flights or new visa paperwork.",
  notes:
    "Attendance is estimated at 0.65, near the middle of the 60-70% typical destination-wedding range reported by Destify's guest-attendance analysis (destify.com) — nonstop flights, no visa requirement and a lower average resort cost than Turks and Caicos or St. Lucia support a solid turnout among the couple's ~100 East Coast guests.",
  travelCostPerGuestEstimate: 1060,
  lodgingPerNightEstimate: 220,
  attendanceRateEstimate: 0.65,
  weatherNotes:
    "Guanacaste's dry season runs December through April, and March sits squarely in the middle of it: near-zero rainfall (~5mm for the month), low humidity and the hottest, sunniest stretch of the year on Costa Rica's Pacific side. April is the hottest month (highs to 95°F/35°C) and still mostly dry (~20mm) but marks the start of the transition, with occasional showers appearing by month's end. May is the real turning point — rains set in for the wet season and monthly rainfall jumps to roughly 160mm (worldlyadventurer.com; villafirenzecr.com). A March or April date is the safer bet for guaranteed dry, sunny weather; May carries real rain risk by comparison to the Caribbean/Costa Rica dry-season months.",
  legalNotes:
    "Costa Rica has no residency requirement and, unlike most of the other finalists, generally does not require an apostilled birth certificate for a civil marriage — a valid passport plus a sworn statement of single status (declaración jurada) is typically sufficient, and the ceremony is legally performed and registered on the spot by a licensed Costa Rican attorney-notary (notario público) rather than at a government registry office. Anyone previously married must present an apostilled divorce decree or death certificate from their home country. Any document not already in Spanish needs a certified Costa Rican translation (roughly $150-200 per document). Two witnesses over 18, unrelated within the third degree, are required and must present valid passports (expat.com; crissorama.com). Verify with the local authority or an attorney.",
  seasonNotes:
    "December-April is Costa Rica's dry, high-demand tourist season, so a spring date will run into peak resort pricing. Semana Santa (Holy Week, the week before Easter — April 9-16 in 2028) is the single biggest domestic travel period of the year: banks, some government offices and many local businesses close, beach towns fill with Costa Rican vacationers, and accommodation/flight prices and demand peak; couples should book 8-12 months ahead if targeting that week, or plan around it entirely (weddingsnosara.com). Outside that specific week, March and early April remain good, less-frenetic options within the dry season.",
  travelNotes:
    "Liberia's Guanacaste Airport (LIR), about 7 miles from Liberia and roughly 30-45 minutes from the Papagayo Peninsula resorts (longer, ~1-1.5hr, to Tamarindo), has nonstop service from New York (American, JetBlue, United; ~5h20m) and Atlanta (Delta; ~4h) (flightconnections.com). No visa is required for US citizens for stays up to 90 days; guests need a valid passport and proof of onward travel (visitcostarica.com). Round-trip economy fares from NYC cluster around $400 in current searches (expedia.com; kayak.com), and mid-tier Guanacaste resort rooms average roughly $200-245/night (a 4-star-hotel average of $243/night is the closest comparable, per booking-aggregator data). Travel-cost math: ~$400 round-trip airfare + 3 nights x $220/night resort lodging = $1,060 per guest.",
  sourceUrls: [
    "https://www.expat.com/en/guide/central-america/costa-rica/37121-getting-married-in-costa-rica-formalities-for-expats.html",
    "https://crissorama.com/blog/legal-requirements-for-getting-married-in-costa-rica/",
    "https://www.visitcostarica.com/planning-your-trip/entry-requirements",
    "https://worldlyadventurer.com/best-time-visit-guanacaste/",
    "https://villafirenzecr.com/best-times-to-visit-guanacaste-weather-and-seasons/",
    "https://www.weddingsnosara.com/guidance-blog/choosing-a-wedding-date",
    "https://www.flightconnections.com/flights-from-jfk-to-lir",
    "https://www.flightconnections.com/flights-from-atl-to-lir",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
  ],
  venues: [
    {
      key: "cr-four-seasons-papagayo",
      name: "Four Seasons Resort Costa Rica at Peninsula Papagayo",
      website: "https://www.fourseasons.com/costarica/weddings/",
      capacity: 450,
      perGuestCost: 200,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "Clifftop luxury resort on the Papagayo Peninsula; venues range from the Armadillo Pavilion (up to 450 seated) down to smaller spaces capped at 250 and 200 guests. Published wedding-package tiers run $6,550-$14,300; perGuestCost above is estimated from that range plus typical Four Seasons catering markups, not a directly published per-person figure. Requires a minimum of 10 rooms booked for 3 nights to hold the wedding.",
      availabilityNotes: "Contact the resort's wedding team for a guest-count-specific quote.",
      sourceUrls: [
        "https://www.fourseasons.com/costarica/weddings/",
        "https://www.destinationweddings.com/four-seasons-resort-costa-rica-at-peninsula-papagayo",
        "https://crissorama.com/blog/costa-rica-wedding-packages-all-inclusive/",
      ],
    },
    {
      key: "cr-jw-marriott-guanacaste",
      name: "JW Marriott Guanacaste Resort & Spa",
      website: "https://www.marriott.com/en-us/hotels/sjojw-jw-marriott-guanacaste-resort-and-spa/events/",
      capacity: 600,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "Large beachfront resort with eight outdoor event areas plus a grand ballroom; the largest space (Mahogany Beach) is listed at up to 600 guests, well beyond the couple's ~100-guest target with room to spare. All-inclusive-style wedding packages bundle planning, rentals, setup/cleanup, bar and catering.",
      availabilityNotes: "No published flat wedding-package price; contact sjojw.fbconcierge@r-hr.com for a quote.",
      sourceUrls: [
        "https://www.marriott.com/en-us/hotels/sjojw-jw-marriott-guanacaste-resort-and-spa/events/",
        "https://www.weddingwire.com/biz/jw-marriott-guanacaste-resort-spa-guanacaste/6d57214b128e4de8.html",
      ],
    },
    {
      key: "cr-secrets-papagayo",
      name: "Secrets Papagayo Costa Rica",
      website:
        "https://www.hyattinclusivecollection.com/en/resorts-hotels/secrets/costa-rica/papagayo-costa-rica/events/weddings-honeymoons/wedding-packages/",
      capacity: 240,
      fbMinimum: 13949,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "Adults-only all-inclusive resort on the Papagayo Peninsula; ceremony space holds up to 100, with cocktail-hour and reception space up to 240. As at its sister property in St. Lucia, the 'Beyond Memorable' package is $13,949+ for up to 79 guests staying a cumulative minimum of 75 paid room nights. Being adults-only, this venue would need a separate arrangement for any children in the couple's guest list.",
      availabilityNotes: "Contact the resort for a guest-count-specific quote.",
      sourceUrls: [
        "https://www.hyattinclusivecollection.com/en/resorts-hotels/secrets/costa-rica/papagayo-costa-rica/events/weddings-honeymoons/wedding-packages/",
        "https://paradiseweddings.com/costa-rica/papagayo/secrets-papagayo-costa-rica",
      ],
    },
    {
      key: "cr-w-costa-rica-reserva-conchal",
      name: "W Costa Rica - Reserva Conchal",
      website: "https://www.marriott.com/en-us/hotels/lirwh-w-costa-rica-reserva-conchal/events/",
      capacity: 150,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "Beachfront resort near Tamarindo with nearly 8,000 sq ft of event space; per-event capacity ranges 20 to roughly 150 guests, spanning an outdoor lawn venue ('The Lawn') to an indoor ballroom. Capacity is drawn from the venue's own published range, marked estimated since no single wedding-specific maximum was published.",
      availabilityNotes: "No published wedding-package price; contact the resort for a guest-count-specific quote.",
      sourceUrls: ["https://www.marriott.com/en-us/hotels/lirwh-w-costa-rica-reserva-conchal/events/"],
    },
  ],
  scenario: {
    fixedCosts: 13949,
    perGuestCost: 55,
    travelCostPerGuest: 1060,
    attendanceRate: 0.65,
    notes:
      "fixedCosts uses Secrets Papagayo's published Beyond Memorable package price, $13,949 for up to 79 guests (paradiseweddings.com) — chosen because at ~65 expected attendees (100 invited x 65% estimated attendance) the wedding stays under that package's guest cap, mirroring the same benchmark used for the St. Lucia and Jamaica Secrets-brand properties. perGuestCost ($55, estimated) covers incremental catering/bar extras beyond what's already included in each guest's own all-inclusive stay (captured in travelCostPerGuest), in line with the Jamaica and St. Lucia figures. travelCostPerGuest matches travelCostPerGuestEstimate. Sources: paradiseweddings.com/costa-rica/papagayo/secrets-papagayo-costa-rica, fourseasons.com/costarica/weddings.",
  },
};
