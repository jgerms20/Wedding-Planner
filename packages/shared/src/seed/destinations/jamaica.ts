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
    "The front-runner: a short, often-nonstop flight for nearly every East Coast guest, no visa paperwork, and a deep bench of venues from big family all-inclusives on Seven Mile Beach to cliffside cottages in Negril and boho Treasure Beach. Real turquoise water, falls, rafts and jerk make it a long weekend, not just a ceremony. The Jamaica page costs out every venue.",
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
    "https://paradiseweddings.com/jam/negril/royalton-negril/packages/exclusive-wedding",
    "https://destify.com/blog/excellence-oyster-bay-destination-weddings/",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.skyscanner.com/routes/atla/mbj/atlanta-to-montego-bay.html",
    "https://www.expedia.com/lp/flights/jfk/mbj/new-york-to-montego-bay",
  ],
  venues: [
    {
      key: "jamaica-jakes-treasure-beach",
      name: "Jakes",
      website: "https://jakeshotel.com/weddings",
      lodgingOnSite: true,
      styleNotes: "A 49-room boho hotel on Jamaica's quiet south coast at Treasure Beach: colorful oceanfront cottages and villas, no two rooms alike, with an on-site wedding coordinator for small or large groups. Farther from Montego Bay's airport than the north-coast resorts. Capacity and pricing aren't published.",
      sourceUrls: ["https://jakeshotel.com/weddings", "https://www.destinationweddings.com/jakes-hotel-treasure-beach"],
      suggestedBy: "Janel",
      suggestedNote: "Boho beachfront & villa vibe",
    },
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
      key: "jamaica-royalton-negril",
      name: "Royalton Negril",
      website: "https://www.royaltonresorts.com/jamaica-negril-allinclusive-family-resort",
      rentalFee: 13199,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "Family-friendly all-inclusive on Seven Mile Beach, so kids can come. The Exclusive Wedding package is $13,199 for 40 guests plus $130 for each extra guest. It includes a symbolic ceremony with a solo musician, a 2-hour private BBQ party, and a 4-hour private reception with open bar.",
      availabilityNotes: "75% of the wedding group must stay at the resort. Closed for renovation Nov 2025 to Aug 2026; confirm it reopened.",
      sourceUrls: [
        "https://paradiseweddings.com/jam/negril/royalton-negril/packages/exclusive-wedding",
        "https://www.royaltonresorts.com/jamaica-negril-allinclusive-family-resort",
      ],
    },
    {
      key: "jamaica-hideaway-royalton-negril",
      name: "Hideaway at Royalton Negril",
      website: "https://all-inclusive.marriott.com/hideaway-royalton-negril/weddings/packages",
      rentalFee: 13199,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "The adults-only side of the Royalton on the same beach. Packages run from $1,099 for 10 guests to the $13,199 Exclusive Wedding for 30 guests, plus $130 for each extra guest. Adults only, so no kids in the wedding party.",
      sourceUrls: ["https://paradiseweddings.com/jam/negril/hideaway-at-royalton-negril"],
    },
    {
      key: "jamaica-excellence-oyster-bay",
      name: "Excellence Oyster Bay",
      website: "https://www.excellenceresorts.com/montego-bay/excellence-oyster-bay/jamaica-destination-wedding/",
      rentalFee: 4500,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "Five-star adults-only resort on a peninsula near Falmouth and the Luminous Lagoon. The Everlasting Memories package is $3,000 (Mon-Wed) or $4,500 (Thu-Sun) for 20 guests, plus $75 for each extra guest. Planners put a full 100-guest wedding here at $29,000-$50,000 all in.",
      sourceUrls: ["https://destify.com/blog/excellence-oyster-bay-destination-weddings/"],
    },
    {
      key: "jamaica-moon-palace-ocho-rios",
      name: "Moon Palace Jamaica",
      website: "https://destify.com/destinations/jamaica/ocho-rios/moon-palace-jamaica/",
      rentalFee: 12000,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "Family-friendly all-inclusive in Ocho Rios, near Dunn's River Falls. A basic ceremony is free with 10 paid rooms; the Prestige package is $12,000+ for up to 50 guests with 3 hours of photo and video. Room-block perks add a private cocktail hour at 30 room nights.",
      sourceUrls: ["https://destify.com/destinations/jamaica/ocho-rios/moon-palace-jamaica/"],
    },
    {
      key: "jamaica-jamaica-inn-ocho-rios",
      name: "Jamaica Inn",
      website: "https://www.jamaicainn.com/weddings-events/weddings/",
      capacity: 50,
      rentalFee: 10000,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A family-run classic that opened in 1950: 52 suites on a private 700-foot cove beach. The Deluxe package (~$10,000) covers a private cocktail hour, a 3-course dinner and a DJ party for 40-50 guests. Not all-inclusive, so guests pay for their own meals.",
      sourceUrls: ["https://allinclusiveweddings.com/resorts/jamaica-inn-ocho-rios-wedding", "https://jamaicahotelhistory.com/jamaicainn.htm"],
    },
    {
      key: "jamaica-rockhouse-negril",
      name: "Rockhouse Hotel",
      website: "https://www.destinationweddings.com/rockhouse-hotel-spa",
      rentalFee: 825,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "Thatched cottages on Negril's West End cliffs. The base package is $750 + 10% tax and covers the licence, minister, ceremony spot, decor, bouquet and boutonniere. Catering, flowers, photo and music are quoted to size, for groups from 1-24 up to 100+.",
      sourceUrls: ["https://www.negrilonestop.com/Negril-Resorts/Cliff-Resorts/Rockhouse-Hotel/Weddings/Details/"],
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
