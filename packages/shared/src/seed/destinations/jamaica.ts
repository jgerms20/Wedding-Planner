import type { DestinationSeed } from "../types";

/**
 * Jamaica — Montego Bay / Ocho Rios.
 *
 * The lower-friction backup to Brazil: short nonstop flights for most East
 * Coast guests, no US visa requirement, and a mature all-inclusive
 * destination-wedding industry. Numbers below are sourced where a URL is
 * given; anything derived is flagged `estimated: true` with the derivation
 * spelled out in a note.
 */
export const jamaica: DestinationSeed = {
  key: "jamaica",
  name: "Jamaica",
  country: "Jamaica",
  countryCode: "JM",
  region: "Montego Bay, Ocho Rios",
  rank: 2,
  whyHere:
    "A short, often-nonstop flight for nearly every East Coast guest and a deep bench of resorts that run destination weddings every week make Jamaica the easy, lower-friction alternative to Brazil — real turquoise water and a genuine tropical-vacation feel for the couple's ~100 guests, without the visa paperwork or 16-hour travel days.",
  notes:
    "Attendance is estimated at 0.65, the middle of the 60-70% typical destination-wedding range reported by Destify's guest-attendance analysis — reflecting Jamaica's short nonstop flights and visa-free entry for US citizens, offset by the real cost of a multi-night Caribbean resort stay (destify.com).",
  travelCostPerGuestEstimate: 1110,
  flightCostEstimate: 360,
  lodgingPerNightEstimate: 250,
  attendanceRateEstimate: 0.65,
  originFlights: [
    {
      origin: "Atlanta",
      hours: 2.9,
      fareEstimate: 483,
      sourceUrl: "https://www.farecompare.com/flights/Montego_Bay-MBJ/Atlanta-ATL/market.html",
    },
    {
      origin: "Charlotte",
      hours: 3.1,
      fareEstimate: 431,
      sourceUrl: "https://www.farecompare.com/flights/Charlotte-CLT/Montego_Bay-MBJ/market.html",
    },
    {
      origin: "Baltimore",
      hours: 3.6,
      fareEstimate: 567,
      sourceUrl: "https://www.kayak.com/flight-routes/Baltimore-Washington-BWI/Montego-Bay-Sangster-Intl-MBJ",
    },
    { origin: "Los Angeles", hours: 7.4, fareEstimate: 502, sourceUrl: "https://www.momondo.com/flights/los-angeles/montego-bay" },
  ],
  weatherNotes:
    "Jamaica's dry season runs roughly November-April, with March one of the driest months (brief showers only) but also windier, which can chop up the water on north-coast resorts like Montego Bay (101holidays.co.uk; cruisecritic.com). April is the tail end of the dry season; May is one of the wettest months of the year as the wet/hurricane season begins to build. Atlantic hurricane season officially starts June 1, so a March-through-April wedding date sits safely ahead of it, while a May date starts to carry rising rain risk (101holidays.co.uk).",
  legalNotes:
    "Jamaica has no formal residency requirement, but the couple must be physically present in Jamaica at least 24 hours before applying for a marriage license, and the most common route for visitors — the Minister's Licence — typically processes in about one working day. Required documents: both partners' birth certificates (showing father's information), valid passport or photo ID, and — for anyone previously married — a certified final divorce decree or a deceased spouse's death certificate. Any non-English document must be translated by an official translator and certified by the Ministry of Foreign Affairs and the nearest Jamaican mission. The license fee is about J$4,000 (~US$50); the ceremony needs two witnesses (18+) and a licensed Marriage Officer (blog.destinationweddings.com; jm.usembassy.gov; visitjamaica.com). Verify with the local authority or an attorney.",
  seasonNotes:
    "Mid-December through April is Jamaica's dry, cooler, most in-demand season, and it overlaps heavily with US spring break (March-April), which drives up both flight and resort prices and crowds (cruisecritic.com). Easter 2028 (Sunday, April 16) is a Jamaican public holiday weekend (Good Friday through Easter Monday) and will add further demand pressure that week. Aiming for mid-March through early April — after peak spring-break weeks but ahead of Easter and well ahead of hurricane season — balances weather, price and availability; late April into May trades a bit more rain risk for lower rates.",
  travelNotes:
    "Montego Bay's Sangster International (MBJ) has frequent nonstop service from JFK, Newark, Atlanta and other East Coast hubs (JetBlue, Delta, American), at roughly 3.5-4 hours flight time — the simplest logistics of the three finalist destinations for East Coast guests. No visa is required for US citizens for tourist stays (cited limits range 90-180 days depending on source); guests need only a passport valid at entry/exit and a return or onward ticket (entrybrief.com; visitjamaica.com). Ground transfers from MBJ to Montego Bay-area resorts run roughly 15-45 minutes by resort shuttle or taxi; Ocho Rios is about 1.5-2 hours by road. Travel-cost math: ~$360 round-trip airfare (midpoint of cited NYC/Atlanta-Montego Bay 2026 fares) + 3 nights x $250/night resort lodging = $1,110 per guest.",
  sourceUrls: [
    "https://blog.destinationweddings.com/how-to-get-married-in-jamaica",
    "https://jm.usembassy.gov/marriages/",
    "https://www.visitjamaica.com/romantic/wedding-planning/requirements/",
    "https://entrybrief.com/us-passport/jm/",
    "https://www.101holidays.co.uk/best-time-visit-jamaica/",
    "https://www.cruisecritic.com/articles/best-time-to-visit-jamaica",
    "https://www.oneretreatsjamaica.com/blog/jamaica-trip-cost/",
    "https://travorio.com/guides/cheap-all-inclusive-resorts-jamaica",
    "https://paradiseweddings.com/jam/ocho-rios/grand-palladium-jamaica",
    "https://paradiseweddings.com/blog/best-wedding-resorts-jamaica/",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.skyscanner.com/routes/atla/mbj/atlanta-to-montego-bay.html",
    "https://www.expedia.com/lp/flights/jfk/mbj/new-york-to-montego-bay",
  ],
  venues: [
    {
      key: "jamaica-grand-palladium-montego-bay",
      name: "Grand Palladium Jamaica Resort & Spa",
      website:
        "https://www.palladiumhotelgroup.com/en/hotels/jamaica/jamaicamontegobay/grand-palladium-jamaica-resort-spa/weddings-groups",
      capacity: 250,
      rentalFee: 15500,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "All-inclusive beachfront resort near Montego Bay/Lucea; six ceremony venues, five up to 200 guests and one up to 250. The Garden Blooms wedding package is priced at $15,500 for up to 100 guests, plus $90 for each additional guest — one of the few Jamaica venues with a directly published, guest-count-scaled price.",
      availabilityNotes:
        "Package includes ceremony decor, sound system, a welcome dinner, cocktail hour and private reception; since guests' meals are already covered by their own all-inclusive stay, most of this fee is effectively the venue/planner/decor 'fixed cost' rather than a per-guest catering charge.",
      sourceUrls: [
        "https://paradiseweddings.com/jam/ocho-rios/grand-palladium-jamaica",
        "https://www.palladiumhotelgroup.com/en/hotels/jamaica/jamaicamontegobay/grand-palladium-jamaica-resort-spa/weddings-groups",
      ],
    },
    {
      key: "jamaica-secrets-st-james-montego-bay",
      name: "Secrets St. James Montego Bay",
      website: "https://paradiseweddings.com/blog/best-wedding-resorts-jamaica/",
      rentalFee: 13949,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "Adults-only all-inclusive resort; the 'Beyond Memorable' wedding package is quoted at $13,499-$14,399 for 80-100 guests. fbMinimum above is the midpoint of that published range, marked estimated because the exact figure depends on final guest count.",
      availabilityNotes: "Contact the resort's wedding specialist for a guest-count-specific quote.",
      sourceUrls: ["https://paradiseweddings.com/blog/best-wedding-resorts-jamaica/"],
    },
    {
      key: "jamaica-hyatt-ziva-rose-hall",
      name: "Hyatt Ziva Rose Hall",
      website: "https://www.hyatt.com/en-US/hotel/jamaica/hyatt-ziva-rose-hall/mbjif/special-events/weddings",
      capacity: 160,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "All-inclusive Montego Bay resort with six ceremony/reception spaces: an oceanfront walkway-and-gazebo venue for up to 160 for a banquet reception, a smaller gazebo for up to 120, and an East Lawn that scales to very large receptions.",
      availabilityNotes: "No wedding-package price is published; request a group quote.",
      sourceUrls: [
        "https://www.hyatt.com/en-US/hotel/jamaica/hyatt-ziva-rose-hall/mbjif/special-events/weddings",
        "https://destify.com/destinations/jamaica/montego-bay/hyatt-ziva-rose-hall/",
      ],
    },
    {
      key: "jamaica-round-hill-montego-bay",
      name: "Round Hill Hotel & Villas",
      website: "https://www.roundhillweddings.com/",
      capacity: 200,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "Boutique luxury resort; venues range from the 80-guest Hanover Room to ceremony spaces for 60-110, with an overall property capacity up to 200. The published 'Sunset Wedding' package ($12,245, excl. tax/service) is an intimate ceremony-plus-small-dinner package (up to 10 for the seated dinner), not a full 100-guest reception price — a full-scale event needs a custom quote.",
      availabilityNotes: "Contact Round Hill's wedding team for a 100-guest reception quote.",
      sourceUrls: [
        "https://www.roundhill.com/blog/round-hill-hotel-and-villas-unveils-bespoke-proposal-and-destination-wedding-packages-for-memorable-celebrations",
        "https://www.roundhillweddings.com/",
      ],
    },
  ],
  scenario: {
    fixedCosts: 15500,
    perGuestCost: 50,
    travelCostPerGuest: 1110,
    attendanceRate: 0.65,
    notes:
      "fixedCosts uses Grand Palladium Jamaica's published Garden Blooms package price, $15,500 for up to 100 guests (paradiseweddings.com) — chosen because at ~65 expected attendees (100 invited x 65% estimated attendance) the wedding stays under that package's 100-guest cap, so the $90/additional-guest surcharge never applies and the flat fee functions as the fixed venue/planner/decor cost. perGuestCost ($50, estimated) covers the incremental extras an all-inclusive resort wedding still needs per guest — welcome bags/favors and a bar/menu upgrade — since standard meals and drinks are already paid for through each guest's own all-inclusive room rate (reflected in travelCostPerGuest, not here). travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
