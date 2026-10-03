/**
 * The Jamaica deep dive: what a Jamaica wedding actually costs at each shortlisted venue, the line
 * items a resort package doesn't cover, and the things guests can do so the trip is an experience
 * and not just a ceremony. Feeds the Jamaica page's cost-out calculator and itinerary.
 *
 * Research rules (see the wedding-research skill):
 * - Every number cites a page. Anything derived says `estimated: true` and spells out the math.
 * - No plantations, ever. Jamaica has many estate great houses and resorts built on estate land,
 *   so every venue and attraction was history-checked; the ones left out are listed in
 *   `JAMAICA_EXCLUDED` with the reason, so nobody re-adds them by accident.
 * - The research environment couldn't load most sites directly; each claim was confirmed through
 *   search results scoped to the cited page or operator.
 *
 * Amounts are USD. Rates are 2026 published figures; expect 2028 to run higher.
 */

export type JamaicaArea = "Negril" | "Montego Bay" | "Lucea" | "Falmouth" | "Ocho Rios" | "Treasure Beach" | "Port Antonio" | "Kingston" | "Nine Mile";

export interface JamaicaVenueCost {
  /** Matches the venue's `key` in the Jamaica destination seed. */
  key: string;
  name: string;
  area: JamaicaArea;
  /** One line on the feel of the place. */
  vibe: string;
  allInclusive: boolean;
  /** Adults-only resorts can't host kids (a flower girl, nieces and nephews). */
  adultsOnly: boolean;
  capacity?: number;
  /** The published package this estimate starts from. */
  pkg: {
    name: string;
    price: number;
    includedGuests: number;
    /** Published charge per guest over `includedGuests`. */
    perExtraGuest: number;
    includes: string;
  };
  /**
   * Reception food and drink per guest the package doesn't already cover. Zero at all-inclusives
   * (guests' own stay pays for meals); a real number at boutique hotels.
   */
  receptionPerGuest: number;
  /** What one guest pays per night, assuming two people share a room. */
  guestNightlyPerPerson: number;
  /** Food per guest per day on top of the room, when meals aren't included. */
  guestFoodPerDay: number;
  /** Driving time from Montego Bay airport (MBJ). */
  fromAirport: string;
  /** Room-block rules, minimum stays and other fine print worth knowing before signing. */
  fineprint: string;
  estimated?: boolean;
  /** How any estimated number above was derived. */
  derivation?: string;
  sourceUrls: string[];
  suggestedBy?: "Janel" | "Joshua";
}

export type LineItemBasis = "flat" | "per_guest";

export interface JamaicaLineItem {
  key: string;
  label: string;
  basis: LineItemBasis;
  low: number;
  typical: number;
  high: number;
  /** On by default in the calculator. Optional extras start off. */
  defaultOn: boolean;
  /** "Often in the package" etc. Shown next to the line so it isn't double-counted. */
  note: string;
  estimated?: boolean;
  sourceUrl: string;
}

export type ExperienceCategory = "Water" | "Adventure" | "Culture & music" | "Food" | "Nightlife" | "Chill";

export interface JamaicaExperience {
  key: string;
  name: string;
  area: JamaicaArea;
  category: ExperienceCategory;
  /** Per person; 0 when it's free to go. */
  pricePerPerson: number;
  /** What the price covers, e.g. "entry only" or "$110 per raft of two". */
  priceNote: string;
  duration: string;
  /** Works for a big group without a private booking. */
  groupFriendly: boolean;
  why: string;
  /** Anything history-related a guest should know, when it applies. */
  historyNote?: string;
  sourceUrl: string;
}

export interface JamaicaExclusion {
  name: string;
  kind: "venue" | "attraction";
  reason: string;
  sourceUrl: string;
}

export interface JamaicaOrigin {
  city: string;
  airport: string;
  roundTripFare: number;
  hours: number;
  sourceUrl: string;
}

export interface ItineraryDay {
  day: string;
  title: string;
  /** Experience keys from JAMAICA_EXPERIENCES. */
  experienceKeys: string[];
  plan: string;
}

export interface JamaicaItinerary {
  key: string;
  base: string;
  /** Venue keys this itinerary suits. */
  forVenues: string[];
  days: ItineraryDay[];
}

/** Round-trip fares and nonstop-ish flight times to Montego Bay (MBJ) from where most guests live. */
export const JAMAICA_ORIGINS: JamaicaOrigin[] = [
  { city: "Atlanta", airport: "ATL", roundTripFare: 483, hours: 2.9, sourceUrl: "https://www.farecompare.com/flights/Montego_Bay-MBJ/Atlanta-ATL/market.html" },
  { city: "Charlotte", airport: "CLT", roundTripFare: 431, hours: 3.1, sourceUrl: "https://www.farecompare.com/flights/Charlotte-CLT/Montego_Bay-MBJ/market.html" },
  { city: "Baltimore", airport: "BWI", roundTripFare: 567, hours: 3.6, sourceUrl: "https://www.kayak.com/flight-routes/Baltimore-Washington-BWI/Montego-Bay-Sangster-Intl-MBJ" },
  { city: "Los Angeles", airport: "LAX", roundTripFare: 502, hours: 7.4, sourceUrl: "https://www.momondo.com/flights/los-angeles/montego-bay" },
];

/** Shared airport shuttle, each way. Negril pricing; Ocho Rios and Treasure Beach are longer drives. */
export const JAMAICA_TRANSFER_EACH_WAY = {
  amount: 27,
  note: "Shared shuttle from Montego Bay airport, about $25-$27 a person each way to Negril; longer drives (Ocho Rios, Treasure Beach) can cost more.",
  sourceUrl: "https://theabroadguide.com/shuttle-transfer-from-montego-bay-airport-negril/",
};

export const JAMAICA_VENUE_COSTS: JamaicaVenueCost[] = [
  {
    key: "jamaica-royalton-negril",
    name: "Royalton Negril",
    area: "Negril",
    vibe: "Big, lively all-inclusive on Seven Mile Beach that welcomes families, so kids can come.",
    allInclusive: true,
    adultsOnly: false,
    pkg: {
      name: "Exclusive Wedding",
      price: 13199,
      includedGuests: 40,
      perExtraGuest: 130,
      includes: "Symbolic ceremony with a solo musician, a 2-hour private BBQ party with open bar, a 4-hour private reception with open bar, a 2-tier cake, a $300 centerpiece credit and a couples massage.",
    },
    receptionPerGuest: 0,
    guestNightlyPerPerson: 239,
    guestFoodPerDay: 0,
    fromAirport: "About 1 hr 15 min",
    fineprint: "75% of the wedding group has to stay at the resort. Rooms from $219-$249 a person a night on the resort's own site. The resort is closed for renovation Nov 2025 to Aug 2026, so confirm it reopened as planned.",
    sourceUrls: [
      "https://paradiseweddings.com/jam/negril/royalton-negril/packages/exclusive-wedding",
      "https://www.royaltonresorts.com/jamaica-negril-allinclusive-family-resort",
    ],
  },
  {
    key: "jamaica-hideaway-royalton-negril",
    name: "Hideaway at Royalton Negril",
    area: "Negril",
    vibe: "The adults-only side of the Royalton: same beach, quieter, more upscale.",
    allInclusive: true,
    adultsOnly: true,
    pkg: {
      name: "Exclusive Wedding",
      price: 13199,
      includedGuests: 30,
      perExtraGuest: 130,
      includes: "Same inclusions as the Royalton's Exclusive package: ceremony, private BBQ party, 4-hour private reception with open bar.",
    },
    receptionPerGuest: 0,
    guestNightlyPerPerson: 275,
    guestFoodPerDay: 0,
    fromAirport: "About 1 hr 15 min",
    fineprint: "Adults only, so no kids in the wedding party. Smaller packages start at $1,099 for 10 guests.",
    estimated: true,
    derivation: "Nightly rate is an estimate: the Hideaway prices above the family Royalton ($219-$249 a person), so about $275 a person a night.",
    sourceUrls: ["https://paradiseweddings.com/jam/negril/hideaway-at-royalton-negril"],
  },
  {
    key: "jamaica-grand-palladium-montego-bay",
    name: "Grand Palladium Jamaica",
    area: "Lucea",
    vibe: "Huge family resort with six ceremony spots and the clearest published price in Jamaica.",
    allInclusive: true,
    adultsOnly: false,
    capacity: 250,
    pkg: {
      name: "Garden Blooms",
      price: 15500,
      includedGuests: 100,
      perExtraGuest: 90,
      includes: "Ceremony decor and sound, a welcome dinner, cocktail hour and a private reception.",
    },
    receptionPerGuest: 0,
    guestNightlyPerPerson: 331,
    guestFoodPerDay: 0,
    fromAirport: "About 40 min",
    fineprint: "The $331 a person is the published Apr-Aug 2026 rate; kids under 18 pay half when sharing. Shares facilities with the sister Lady Hamilton resort next door.",
    sourceUrls: [
      "https://paradiseweddings.com/jam/ocho-rios/grand-palladium-jamaica",
      "https://cmsprod.diamondresorts.com/sites/default/files/GPJ_all_inc_2026_0.pdf",
    ],
  },
  {
    key: "jamaica-secrets-st-james-montego-bay",
    name: "Secrets St. James Montego Bay",
    area: "Montego Bay",
    vibe: "Polished adults-only resort close to the airport.",
    allInclusive: true,
    adultsOnly: true,
    pkg: {
      name: "Beyond Memorable",
      price: 13949,
      includedGuests: 90,
      perExtraGuest: 90,
      includes: "Quoted at $13,499-$14,399 for 80-100 guests; the midpoint is used here.",
    },
    receptionPerGuest: 0,
    guestNightlyPerPerson: 240,
    guestFoodPerDay: 0,
    fromAirport: "About 20 min",
    fineprint: "Adults only. Some Montego Bay resorts charge $1,000+ for each outside vendor, so ask before booking your own photographer.",
    estimated: true,
    derivation: "Package is the midpoint of the published $13,499-$14,399 range for 80-100 guests. Extra-guest charge assumed at $90, in line with similar resorts. Nightly rate is about $479 a room, split between two people.",
    sourceUrls: [
      "https://paradiseweddings.com/blog/best-wedding-resorts-jamaica/",
      "https://www.priceline.com/hotel-deals/en-us/P5000025185/H10411103/secrets-st-james-montego-bay-all-inclusive-adults-only.ssp",
    ],
  },
  {
    key: "jamaica-excellence-oyster-bay",
    name: "Excellence Oyster Bay",
    area: "Falmouth",
    vibe: "Five-star adults-only resort on its own peninsula, near the glowing Luminous Lagoon.",
    allInclusive: true,
    adultsOnly: true,
    pkg: {
      name: "Everlasting Memories",
      price: 4500,
      includedGuests: 20,
      perExtraGuest: 75,
      includes: "Ceremony, cocktail hour and reception for 20 (Thursday-Sunday price; $3,000 Monday-Wednesday). Extra guests $75 each.",
    },
    receptionPerGuest: 0,
    guestNightlyPerPerson: 284,
    guestFoodPerDay: 0,
    fromAirport: "About 30 min",
    fineprint: "Adults only. A smaller package is free with 20 paid room nights. Planners put a full 100-guest wedding here at $29,000-$50,000 all in.",
    estimated: true,
    derivation: "Nightly rate: about $567 a room, split between two people.",
    sourceUrls: [
      "https://destify.com/blog/excellence-oyster-bay-destination-weddings/",
      "https://all-inclusive-guide.com/resorts/excellence-oyster-bay/",
    ],
  },
  {
    key: "jamaica-moon-palace-ocho-rios",
    name: "Moon Palace Jamaica",
    area: "Ocho Rios",
    vibe: "Family-friendly all-inclusive in Ocho Rios, minutes from Dunn's River Falls.",
    allInclusive: true,
    adultsOnly: false,
    pkg: {
      name: "Prestige",
      price: 12000,
      includedGuests: 50,
      perExtraGuest: 90,
      includes: "Prestige package for up to 50 guests, with 3 hours of photo and video. A basic ceremony is free with 10 paid rooms.",
    },
    receptionPerGuest: 0,
    guestNightlyPerPerson: 230,
    guestFoodPerDay: 0,
    fromAirport: "About 1 hr 45 min",
    fineprint: "Room-block perks: a free private cocktail hour at 30 room nights, a 2-hour private event at 60.",
    estimated: true,
    derivation: "Extra-guest charge isn't published; $90 assumed, in line with similar resorts. Nightly rate: about $443-$487 a room, split between two people.",
    sourceUrls: [
      "https://destify.com/destinations/jamaica/ocho-rios/moon-palace-jamaica/",
      "https://jamaica.moonpalace.com/accommodations",
    ],
  },
  {
    key: "jamaica-jamaica-inn-ocho-rios",
    name: "Jamaica Inn",
    area: "Ocho Rios",
    vibe: "A 1950 family-run classic: 52 suites on a private cove beach, old-Hollywood elegant.",
    allInclusive: false,
    adultsOnly: false,
    pkg: {
      name: "Deluxe",
      price: 10000,
      includedGuests: 45,
      perExtraGuest: 220,
      includes: "Private cocktail hour, 3-course dinner and a DJ party for 40-50 guests.",
    },
    receptionPerGuest: 0,
    guestNightlyPerPerson: 265,
    guestFoodPerDay: 75,
    fromAirport: "About 1 hr 45 min",
    fineprint: "Not all-inclusive: guests buy their own meals. Only 52 rooms, so a big group spills into nearby hotels.",
    estimated: true,
    derivation: "Extra guests are priced at the package's own rate ($10,000 / 45 = about $220 a guest). Rooms from $529 a night, split between two. Food is about $75 a person a day, from restaurant entrees of $26-$48 plus casual jerk meals around $10-$15.",
    sourceUrls: [
      "https://allinclusiveweddings.com/resorts/jamaica-inn-ocho-rios-wedding",
      "https://www.jamaicainn.com/rooms/balcony-suite/",
    ],
  },
  {
    key: "jamaica-rockhouse-negril",
    name: "Rockhouse Hotel",
    area: "Negril",
    vibe: "Thatched cottages on the West End cliffs, with ladders straight down into the sea.",
    allInclusive: false,
    adultsOnly: false,
    pkg: {
      name: "Simple Tropical Elegance + reception",
      price: 825,
      includedGuests: 0,
      perExtraGuest: 0,
      includes: "Base package $750 + 10% tax: licence and legal fees, minister, ceremony spot, decor, bouquet and boutonniere. Reception catering is quoted separately.",
    },
    receptionPerGuest: 220,
    guestNightlyPerPerson: 125,
    guestFoodPerDay: 75,
    fromAirport: "About 1 hr 30 min",
    fineprint: "Not all-inclusive. Plans for groups from 1-24 up to 100+, with catering, flowers, photo and music quoted to size.",
    estimated: true,
    derivation: "Reception per guest uses Jamaica Inn's comparable boutique price (about $220 a guest). Rooms $195-$295 a night, split between two. Food is about $75 a person a day (see Jamaica Inn).",
    sourceUrls: [
      "https://www.negrilonestop.com/Negril-Resorts/Cliff-Resorts/Rockhouse-Hotel/Weddings/Details/",
      "https://guide.michelin.com/us/en/hotels-stays/negril/rockhouse-hotel-7149",
    ],
  },
  {
    key: "jamaica-jakes-treasure-beach",
    name: "Jakes",
    area: "Treasure Beach",
    vibe: "Colorful boho cottages on the quiet south coast, no two rooms alike.",
    allInclusive: false,
    adultsOnly: false,
    pkg: {
      name: "Custom (no published package)",
      price: 1500,
      includedGuests: 0,
      perExtraGuest: 0,
      includes: "There's an on-site wedding coordinator, but pricing isn't published. Ceremony, licence and decor are estimated at about Rockhouse's level plus a coordinator.",
    },
    receptionPerGuest: 220,
    guestNightlyPerPerson: 90,
    guestFoodPerDay: 75,
    fromAirport: "About 2 hr",
    fineprint: "49 rooms, so a big group fills Jakes and nearby Treasure Beach villas. The farthest from the airport.",
    estimated: true,
    derivation: "No published pricing. Ceremony base about $1,500 and reception about $220 a guest, by analogy with Rockhouse and Jamaica Inn. Rooms $115-$250 a night, split between two.",
    sourceUrls: ["https://jakeshotel.com/weddings", "https://www.hotels.com/ho211888/jakes-treasure-beach-jamaica/"],
    suggestedBy: "Janel",
  },
];

export const JAMAICA_LINE_ITEMS: JamaicaLineItem[] = [
  {
    key: "licence",
    label: "Marriage licence & legal paperwork",
    basis: "flat",
    low: 50,
    typical: 250,
    high: 300,
    defaultOn: true,
    note: "The government stamp duty is about J$4,000 (~$50). Resorts add a processing fee of about $250.",
    sourceUrl: "https://www.couplesresortswedding.com/jamaica-wedding-packages",
  },
  {
    key: "officiant",
    label: "Marriage officer",
    basis: "flat",
    low: 50,
    typical: 150,
    high: 250,
    defaultOn: false,
    note: "Usually included in resort packages. Book one yourselves only for a boutique or off-site ceremony.",
    sourceUrl: "https://marriageofficerja.com/cost-to-get-married-jamaica/",
  },
  {
    key: "photographer",
    label: "Photographer",
    basis: "flat",
    low: 2500,
    typical: 3800,
    high: 5000,
    defaultOn: true,
    note: "4-6 hours runs $2,500-$3,800; a full day (8+ hours) runs $3,800-$5,000.",
    sourceUrl: "https://www.lensbytheo.com/blog/jamaica-wedding-photographer-prices-explained/",
  },
  {
    key: "vendor-fee",
    label: "Outside-vendor fees",
    basis: "flat",
    low: 200,
    typical: 500,
    high: 1000,
    defaultOn: true,
    note: "Resorts charge $200-$1,000+ for each vendor you bring in (photographer, DJ, hair). Skip this line if you book through the resort.",
    sourceUrl: "https://blog.destinationweddings.com/average-cost-destination-wedding-in-jamaica",
  },
  {
    key: "dj",
    label: "DJ for the reception",
    basis: "flat",
    low: 1000,
    typical: 1250,
    high: 1500,
    defaultOn: true,
    note: "Montego Bay wedding DJs start around $1,000-$1,500.",
    sourceUrl: "https://www.weddingwire.com/c/jm-jamaica/wedding-djs/7-sca.html",
  },
  {
    key: "band",
    label: "Reggae band or steel pan (cocktail hour)",
    basis: "flat",
    low: 500,
    typical: 850,
    high: 1200,
    defaultOn: true,
    note: "A steel drum player or reggae band runs $500-$1,200 for a cocktail-hour set.",
    sourceUrl: "https://blog.destinationweddings.com/average-cost-destination-wedding-in-jamaica",
  },
  {
    key: "florals",
    label: "Flowers & decor upgrades",
    basis: "flat",
    low: 1500,
    typical: 4000,
    high: 8000,
    defaultOn: true,
    note: "Bouquet and boutonniere $200-$500, a ceremony arch $2,000-$5,000, centerpieces $150-$400 a table. Local in-season flowers cost much less.",
    estimated: true,
    sourceUrl: "https://wezoree.com/inspiration/jamaica-wedding-cost-budget-guide-package-prices/",
  },
  {
    key: "beauty",
    label: "Hair & makeup (bride + 4)",
    basis: "flat",
    low: 600,
    typical: 950,
    high: 1300,
    defaultOn: true,
    note: "Bridal $200-$500, plus $100-$200 for each person in the party; four are assumed here.",
    estimated: true,
    sourceUrl: "https://wezoree.com/inspiration/jamaica-wedding-cost-budget-guide-package-prices/",
  },
  {
    key: "welcome-party",
    label: "Welcome party (private, per guest)",
    basis: "per_guest",
    low: 50,
    typical: 100,
    high: 150,
    defaultOn: true,
    note: "Turning a resort dinner into a private event adds $50-$150 a guest. Royalton's and Palladium's packages already include one.",
    sourceUrl: "https://blog.destinationweddings.com/average-cost-destination-wedding-in-jamaica",
  },
  {
    key: "catamaran",
    label: "Private catamaran day (41-50 people)",
    basis: "flat",
    low: 4500,
    typical: 10427,
    high: 12152,
    defaultOn: false,
    note: "A private open-bar and snorkel charter for 41-50 people is $10,427 ($12,152 for 51-60). A smaller 40-guest power cat starts around $4,500.",
    sourceUrl: "https://www.getmyboat.com/trips/qK01QOmN/",
  },
];

export const JAMAICA_EXPERIENCES: JamaicaExperience[] = [
  {
    key: "dunns-river",
    name: "Climb Dunn's River Falls",
    area: "Ocho Rios",
    category: "Adventure",
    pricePerPerson: 25,
    priceNote: "Non-resident entry, guided climb and beach included",
    duration: "2-3 hours",
    groupFriendly: true,
    why: "The famous one: everyone holds hands and climbs the terraced falls straight up from the sea. A great group bonding morning.",
    sourceUrl: "https://www.heyjamaica.com/dunns-river-falls-jamaica",
  },
  {
    key: "blue-hole",
    name: "Blue Hole (Island Gully Falls)",
    area: "Ocho Rios",
    category: "Water",
    pricePerPerson: 25,
    priceNote: "Entry; local guides at the gate charge $15-$25",
    duration: "2-3 hours",
    groupFriendly: true,
    why: "Turquoise pools, rope swings and cliff jumps in the hills above Ocho Rios. Less crowded than Dunn's River.",
    sourceUrl: "https://arecahomes.com/blue-hole-ocho-rios-jamaica-guide/",
  },
  {
    key: "mystic-mountain",
    name: "Mystic Mountain bobsled + zipline",
    area: "Ocho Rios",
    category: "Adventure",
    pricePerPerson: 69,
    priceNote: "Bobsled and zipline; $137 with the chairlift",
    duration: "3-4 hours",
    groupFriendly: true,
    why: "A rainforest bobsled ride (a nod to Cool Runnings) and ziplines over the canopy.",
    sourceUrl: "https://explore.villaontherocksja.com/mystic-mountain-ocho-rios",
  },
  {
    key: "luminous-lagoon",
    name: "Luminous Lagoon night boat",
    area: "Falmouth",
    category: "Water",
    pricePerPerson: 25,
    priceNote: "Entry and boat ride at the Glistening Waters marina",
    duration: "1-2 hours, after dark",
    groupFriendly: true,
    why: "The water glows when you move through it. You can swim in it. A magical after-dinner outing.",
    sourceUrl: "https://www.glisteningwaters.com/product-category/tickets/",
  },
  {
    key: "martha-brae",
    name: "Bamboo raft on the Martha Brae",
    area: "Falmouth",
    category: "Chill",
    pricePerPerson: 55,
    priceNote: "$110 per raft of two",
    duration: "About 1.5 hours on the river",
    groupFriendly: true,
    why: "A slow, quiet float down a jungle river with a raft captain poling. Good for parents and grandparents.",
    historyNote: "The rafting village itself is a park, not an estate, but this river once carried sugar from Trelawny estates down to Falmouth. Some tour combos pair it with a great-house visit; skip those.",
    sourceUrl: "https://www.visitjamaica.com/listing/rafting-on-the-martha-brae/53/",
  },
  {
    key: "rio-grande",
    name: "Rio Grande rafting",
    area: "Port Antonio",
    category: "Chill",
    pricePerPerson: 50,
    priceNote: "$100 per raft (2 adults + a small child), transport extra",
    duration: "About 2.5 hours",
    groupFriendly: true,
    why: "The original Jamaican bamboo-raft trip, through the lush east. Pairs with a day at the Blue Lagoon.",
    sourceUrl: "https://www.moonjamaica.com/listing/rio-grande-rafting",
  },
  {
    key: "ricks-cafe",
    name: "Sunset and cliff jumping at Rick's Café",
    area: "Negril",
    category: "Nightlife",
    pricePerPerson: 0,
    priceNote: "No cover; entrees $26-$48",
    duration: "An evening",
    groupFriendly: true,
    why: "Live reggae, cliff divers and the best sunset on the island. Brave guests can jump too.",
    sourceUrl: "https://discovernegril.com/ricks-cafe-negril/",
  },
  {
    key: "negril-catamaran",
    name: "Sunset catamaran to Rick's",
    area: "Negril",
    category: "Water",
    pricePerPerson: 87,
    priceNote: "Shared cruise with snorkel stop and open bar",
    duration: "4 hours",
    groupFriendly: true,
    why: "Sail down Seven Mile Beach, snorkel, then pull up to Rick's for sunset.",
    sourceUrl: "https://www.tripadvisor.com/AttractionProductReview-g147313-d13999968-NEGRIL_CATAMARAN_CRUISE_Sunset_Ricks_Cafe_ALL_HOTELS-Negril_Westmoreland_Parish_Ja.html",
  },
  {
    key: "pelican-bar",
    name: "Floyd's Pelican Bar",
    area: "Treasure Beach",
    category: "Food",
    pricePerPerson: 25,
    priceNote: "Boat ride $20-$35; food and drinks extra",
    duration: "Half a day",
    groupFriendly: false,
    why: "A driftwood shack on stilts a mile out at sea. Fresh fish, cold Red Stripe, unforgettable photos.",
    sourceUrl: "https://www.gettingstamped.com/floyds-pelican-bar-jamaica/",
  },
  {
    key: "black-river",
    name: "Black River crocodile safari",
    area: "Treasure Beach",
    category: "Adventure",
    pricePerPerson: 20,
    priceNote: "Boat tour at the dock",
    duration: "1.5 hours",
    groupFriendly: true,
    why: "Mangroves, crocodiles and birds on Jamaica's longest river. Pairs with Pelican Bar for a south-coast day.",
    sourceUrl: "https://www.islandbaskingtravel.com/attractions/eco-tourism/black-river-safari-tour-jamaica/",
  },
  {
    key: "nine-mile",
    name: "Bob Marley's Nine Mile",
    area: "Nine Mile",
    category: "Culture & music",
    pricePerPerson: 35,
    priceNote: "Admission; about $95 with a shuttle from the resort",
    duration: "Half a day",
    groupFriendly: true,
    why: "Bob's birthplace and resting place in the St. Ann hills, guided by Rastafarian locals.",
    sourceUrl: "https://theabroadguide.com/bob-marley-9-mile-tour-admission/",
  },
  {
    key: "marley-museum",
    name: "Bob Marley Museum",
    area: "Kingston",
    category: "Culture & music",
    pricePerPerson: 25,
    priceNote: "Admission with a 75-minute tour",
    duration: "Half a day, plus the drive",
    groupFriendly: true,
    why: "His Kingston home and Tuff Gong studio. Worth it if anyone stays on for a Kingston night.",
    sourceUrl: "https://travel.usnews.com/Jamaica/Things_To_Do/Bob_Marley_s_Mausoleum_52774/",
  },
  {
    key: "carnival",
    name: "Jamaica Carnival road march",
    area: "Kingston",
    category: "Culture & music",
    pricePerPerson: 0,
    priceNote: "Free to watch; costumes and fetes extra",
    duration: "A full day",
    groupFriendly: true,
    why: "Held in Kingston the week after Easter. With Easter on April 16, 2028, the road march would likely land around April 23: a huge send-off if you two stay a week.",
    sourceUrl: "https://en.wikipedia.org/wiki/Jamaica_Carnival",
  },
  {
    key: "scotchies",
    name: "Jerk at Scotchies",
    area: "Montego Bay",
    category: "Food",
    pricePerPerson: 15,
    priceNote: "A full plate with a beer, roughly",
    duration: "An hour",
    groupFriendly: true,
    why: "Pimento-wood jerk chicken and pork, festival and roast breadfruit. A first stop straight from the airport.",
    sourceUrl: "https://www.uncommoncaribbean.com/jamaica/scotchies-montego-bay/",
  },
  {
    key: "doctors-cave",
    name: "Doctor's Cave Beach",
    area: "Montego Bay",
    category: "Chill",
    pricePerPerson: 8,
    priceNote: "Entry; chairs and umbrellas $7 each",
    duration: "Half a day",
    groupFriendly: true,
    why: "Calm, clear water on the Hip Strip, an easy day-after beach for everyone.",
    sourceUrl: "https://doctorscavebathingclub.com/general-admission/",
  },
];

export const JAMAICA_EXCLUDED: JamaicaExclusion[] = [
  {
    name: "Hyatt Ziva Rose Hall",
    kind: "venue",
    reason: "Built on the grounds of the 18th-century Rose Hall estate, a former sugar plantation.",
    sourceUrl: "https://www.audleytravel.com/us/jamaica/accommodation/hyatt-ziva-rose-hall",
  },
  {
    name: "Round Hill Hotel & Villas",
    kind: "venue",
    reason: "The peninsula was part of Lord Monson's Round Hill Estate, which grew sugarcane, coconuts and pimento.",
    sourceUrl: "https://roundhill.com/about-us/legacy-history",
  },
  {
    name: "Rose Hall Great House",
    kind: "attraction",
    reason: "A 1770s plantation house where hundreds of people were enslaved.",
    sourceUrl: "https://history.barnard.edu/news/jamaicas-rose-hall-plantation",
  },
  {
    name: "Half Moon",
    kind: "venue",
    reason: "Its 400 acres were part of a sugar plantation, and the bay was Rose Hall's sugar loading dock. Its restaurant displays the Rose Hall sugar mill's water wheel.",
    sourceUrl: "https://www.historichotels.org/hotels-resorts/half-moon-jamaica/history.php",
  },
  {
    name: "Other resorts in the Rose Hall district",
    kind: "venue",
    reason: "Rose Hall is the old estate's name. Any resort branded with it gets its history checked before it goes on the list.",
    sourceUrl: "https://en.wikipedia.org/wiki/Rose_Hall,_Montego_Bay",
  },
  {
    name: "YS Falls",
    kind: "attraction",
    reason: "On the YS Estate, which was a cane farm with a working sugar factory.",
    sourceUrl: "https://ysfalls.com/about-us/",
  },
  {
    name: "Appleton Estate rum tour",
    kind: "attraction",
    reason: "A sugar and rum estate since around 1749, built on enslaved labor.",
    sourceUrl: "https://www.jamrockmuseum.com/education/appleton-estate-a-legacy-of-rum-resistance-and-remembrance/",
  },
];

export const JAMAICA_ITINERARIES: JamaicaItinerary[] = [
  {
    key: "negril",
    base: "Negril & the West End",
    forVenues: ["jamaica-royalton-negril", "jamaica-hideaway-royalton-negril", "jamaica-rockhouse-negril", "jamaica-grand-palladium-montego-bay"],
    days: [
      { day: "Thursday", title: "Land, jerk, sunset", experienceKeys: ["scotchies"], plan: "Shuttles from MBJ, with a Scotchies stop on the way. Welcome party on the beach at night." },
      { day: "Friday", title: "Out on the water", experienceKeys: ["negril-catamaran", "ricks-cafe"], plan: "Beach morning, then the sunset catamaran down Seven Mile Beach that ends at Rick's." },
      { day: "Saturday", title: "The wedding", experienceKeys: [], plan: "A slow morning: spa, pool, getting ready. Sunset ceremony, then the reception until late." },
      { day: "Sunday", title: "Recovery day", experienceKeys: ["luminous-lagoon"], plan: "Brunch and beach. Anyone with energy left takes an evening trip to the glowing lagoon." },
      { day: "Monday", title: "Home", experienceKeys: [], plan: "Late checkout and shuttles to MBJ." },
    ],
  },
  {
    key: "north-coast",
    base: "Ocho Rios & the north coast",
    forVenues: ["jamaica-moon-palace-ocho-rios", "jamaica-jamaica-inn-ocho-rios", "jamaica-excellence-oyster-bay", "jamaica-secrets-st-james-montego-bay"],
    days: [
      { day: "Thursday", title: "Land and settle in", experienceKeys: ["scotchies"], plan: "Shuttles along the coast from MBJ. Welcome party with a steel pan." },
      { day: "Friday", title: "Falls day", experienceKeys: ["dunns-river", "blue-hole", "mystic-mountain"], plan: "Climb Dunn's River in the morning. The adventurous do Blue Hole or the bobsled; everyone else takes the pool." },
      { day: "Saturday", title: "The wedding", experienceKeys: [], plan: "Ceremony by the water, then the reception." },
      { day: "Sunday", title: "Culture & calm", experienceKeys: ["nine-mile", "martha-brae", "luminous-lagoon"], plan: "Nine Mile for the music lovers, a river raft for the grandparents, the glowing lagoon at night." },
      { day: "Monday", title: "Home", experienceKeys: [], plan: "Shuttles to MBJ (allow two hours from Ocho Rios)." },
    ],
  },
  {
    key: "south-coast",
    base: "Treasure Beach & the south coast",
    forVenues: ["jamaica-jakes-treasure-beach"],
    days: [
      { day: "Thursday", title: "The long scenic drive", experienceKeys: ["scotchies"], plan: "About two hours south from MBJ through the countryside. Fish fry welcome night in the village." },
      { day: "Friday", title: "River and sea", experienceKeys: ["black-river", "pelican-bar"], plan: "Morning crocodile safari, afternoon boat out to Pelican Bar." },
      { day: "Saturday", title: "The wedding", experienceKeys: [], plan: "Barefoot ceremony on the rocks at Jakes, then dinner and dancing under the stars." },
      { day: "Sunday", title: "Do nothing, well", experienceKeys: [], plan: "Treasure Beach is for hammocks, bikes and long lunches." },
      { day: "Monday", title: "Home", experienceKeys: [], plan: "Early shuttles back to MBJ." },
    ],
  },
];

/** Things to know about the date that change the cost. */
export const JAMAICA_DATE_NOTES = [
  {
    text: "April 15, 2028 is Easter Saturday. Good Friday through Easter Monday are Jamaican public holidays, so that week books up and prices go up. Mid-March to early April is the sweet spot.",
    sourceUrl: "https://www.cruisecritic.com/articles/best-time-to-visit-jamaica",
  },
  {
    text: "Dry season runs through April; May starts the rains, and hurricane season begins June 1.",
    sourceUrl: "https://www.101holidays.co.uk/best-time-visit-jamaica/",
  },
];

/** The couple's wedding cost at one venue for a given headcount, before line items. */
export function jamaicaVenueCost(venue: JamaicaVenueCost, guests: number): number {
  const extra = Math.max(0, guests - venue.pkg.includedGuests);
  return venue.pkg.price + extra * venue.pkg.perExtraGuest + guests * venue.receptionPerGuest;
}

/** What one guest pays to come: flight, transfers both ways, and nights at the venue's rate. */
export function jamaicaGuestTripCost(venue: JamaicaVenueCost, nights: number, fare: number): number {
  return fare + JAMAICA_TRANSFER_EACH_WAY.amount * 2 + nights * (venue.guestNightlyPerPerson + venue.guestFoodPerDay);
}

export function jamaicaLineItemCost(item: JamaicaLineItem, level: "low" | "typical" | "high", guests: number): number {
  const amount = item[level];
  return item.basis === "per_guest" ? amount * guests : amount;
}
