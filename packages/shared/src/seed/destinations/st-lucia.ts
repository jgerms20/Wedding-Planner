import type { DestinationSeed } from "../types";

/**
 * St. Lucia — Rodney Bay / Castries, Soufrière.
 *
 * A Caribbean finalist with real nonstop flights from the couple's East Coast
 * hubs and a deep, modern all-inclusive-resort wedding market (Sandals,
 * Royalton, Secrets, Windjammer) built around Rodney Bay and the dramatic
 * Piton peaks near Soufrière. Numbers below are sourced where a URL is given;
 * anything derived is flagged `estimated: true` with the derivation spelled
 * out in a note. Several of St. Lucia's inland "estates" (Balenbouche, Morne
 * Coubaril, Fond Doux) are former sugar/cocoa plantations with documented
 * enslaved-labor histories and are excluded from consideration per the
 * project's ethical-history rule — every venue below is a purpose-built,
 * beachfront resort with no plantation-era structure on site.
 */
export const stLucia: DestinationSeed = {
  key: "st-lucia",
  name: "St. Lucia",
  country: "St. Lucia",
  countryCode: "LC",
  region: "Rodney Bay / Castries, Soufrière",
  rank: 36,
  whyHere:
    "St. Lucia pairs a mature, resort-dense wedding industry around Rodney Bay with one of the Caribbean's most dramatic backdrops — the twin Piton peaks near Soufrière — and nonstop flights from both New York and Atlanta, giving the couple's ~100 East Coast guests an easy, photogenic option without Brazil's visa paperwork or long flights.",
  notes:
    "Attendance is estimated at 0.62, near the middle of the 60-70% typical destination-wedding range reported by Destify's guest-attendance analysis (destify.com) — nonstop flights and no US-citizen visa requirement help turnout, offset by St. Lucia's resort rates running above Jamaica's and the Bahamas' (per-person nightly rates cited at $250-600, per stluciataxi.com-adjacent market sources).",
  travelCostPerGuestEstimate: 1350,
  flightCostEstimate: 450,
  lodgingPerNightEstimate: 300,
  attendanceRateEstimate: 0.62,
  weatherNotes:
    "St. Lucia's cool, dry season runs January through mid-April, and March-April are prime: highs around 86-88°F, lows near 73-77°F, low humidity and only ~50-55mm of rain a month (eastwinds.com; thingstodoinsaintlucia.com). May is a genuine transition month — afternoon showers start returning as the wet season approaches, though it hasn't fully arrived — so early-to-mid May still offers good odds while late May starts to trend wetter (eastwinds.com).",
  legalNotes:
    "There is no residency period for a regular marriage license, but the couple must be physically present in St. Lucia at least two days before the wedding to apply (a same-day license is available for an extra fee if the couple is present at least 24 hours ahead). Required documents: valid passports and birth certificates for both partners; anyone previously divorced needs the decree, anyone widowed needs the former spouse's marriage and death certificates; anyone under 18 needs a notarized sworn affidavit of parental consent. Any document not in English needs an authenticated translation. The marriage license fee is EC$335 (~US$124) for regular processing or EC$540 (~US$200) for same-day processing (stlucia.org; blog.destinationweddings.com). Most resorts have an in-house wedding coordinator who handles the paperwork with the local registrar. Verify with the local authority or an attorney.",
  seasonNotes:
    "December through mid-April is St. Lucia's dry, high-demand season, so a March or early-April date will run into peak resort pricing and the heaviest crowds of the year. The Saint Lucia Jazz & Arts Festival typically runs roughly the last week of April into the first two weeks of May (2026 dates were April 30-May 10) and pulls extra visitors and higher rates into that specific window — worth avoiding if the wedding date might overlap. Easter 2028 falls Sunday, April 16, and the Good Friday-Easter Monday stretch is a widely observed St. Lucian holiday weekend that will tighten vendor and flight availability further. St. Lucia's own Carnival is in mid-July, so it doesn't conflict with a spring date. Net recommendation: aim for late April into the first half of May, after the Easter rush and ideally clear of the Jazz Festival's peak week, for a good balance of dry weather and slightly softer demand.",
  travelNotes:
    "Hewanorra International (UVF) in the south is the main port of entry for international flights and is roughly a 1-1.5 hour transfer to the Rodney Bay resort cluster in the north; George F.L. Charles Airport (SLU) near Castries handles regional/inter-island traffic only. American Airlines and JetBlue fly nonstop from New York (~4.5 hours) and Delta flies nonstop from Atlanta (~4.3 hours), each about 7x/week (flightconnections.com). No visa is required for US citizens for a tourist stay. Round-trip economy fares from NYC cluster around $450-500 in current searches (momondo.com; skyscanner.com), and resort per-person nightly rates run $250-600 depending on tier (stluciataxi.com-adjacent sourcing); this file uses a $300/night mid-tier estimate. Travel-cost math: ~$450 round-trip airfare + 3 nights x $300/night resort lodging = $1,350 per guest.",
  sourceUrls: [
    "https://www.stlucia.org/en/experiences/weddings-honeymoons/wedding-requirements/",
    "https://blog.destinationweddings.com/average-cost-destination-wedding-in-st-lucia",
    "https://eastwinds.com/blog/what-is-the-best-time-of-year-to-go-to-saint-lucia/",
    "https://thingstodoinsaintlucia.com/when-to-visit/",
    "https://www.saintluciajazzandartsfestival.com/",
    "https://carnivalsaintlucia.com/",
    "https://www.flightconnections.com/flights-from-jfk-to-uvf",
    "https://www.flightconnections.com/flights-from-atl-to-uvf",
    "https://www.momondo.com/flights/new-york-city/saint-lucia",
    "https://www.skyscanner.com/routes/uvf/nyca/st-lucia-hewanorra-to-new-york.html",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.balenbouche.com/history/",
    "https://mornecoubarilestate.com/estate/",
    "https://islandstudiesjournal.org/article/147415-a-rusting-metal-behemoth-within-the-crumbling-masonry-of-empire-addressing-sugar-plantations-as-sites-of-forgetting-on-the-island-of-saint-lucia",
  ],
  venues: [
    {
      key: "st-lucia-sandals-grande-st-lucian",
      name: "Sandals Grande St. Lucian Spa & Beach Resort",
      website: "https://www.sandals.com/saint-lucia/weddings/",
      capacity: 280,
      rentalFee: 750,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "All-inclusive resort on its own peninsula in Rodney Bay with Pigeon Island views; venues span an over-the-water chapel (standard capacity ~40, up to 200 for a ceremony using the surrounding deck), garden gazebos and beachfront. The overwater chapel carries a flat $750 fee; wedding packages otherwise range roughly $1,000-$15,000 depending on tier and add-ons. Important caveat: Sandals resorts are couples-only — every guest staying on property must be part of a romantic couple, so single relatives or friends in the ~100-person guest list would need to book elsewhere (a nearby sister property or hotel), which the couple should factor in before choosing this venue.",
      availabilityNotes: "Contact the resort's wedding team for a guest-count-specific quote.",
      sourceUrls: [
        "https://www.sandals.com/saint-lucia/weddings/",
        "https://www.wedding-spot.com/venue/15851/sandals-grande-st-lucian/",
        "https://pixiehoneymoons.com/sandals-wedding-packages/",
      ],
    },
    {
      key: "st-lucia-royalton-hideaway-sky-terrace",
      name: "Hideaway at Royalton Saint Lucia — Sky Terrace",
      website: "https://www.royaltonresorts.com/resorts/hideaway-st-lucia/special-occasions/weddings",
      capacity: 120,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "All-inclusive resort near Castries; the elevated, oceanfront Sky Terrace is the marquee wedding venue with capacity up to 120 guests, alongside Complimentary, Refined and Exclusive package tiers.",
      availabilityNotes: "No published wedding-package price; contact the resort for a guest-count-specific quote.",
      sourceUrls: [
        "https://www.royaltonresorts.com/resorts/hideaway-st-lucia/special-occasions/weddings",
        "https://destify.com/destinations/caribbean-islands/st-lucia/hideaway-at-royalton-saint-lucia/?venue=sky-terrace",
      ],
    },
    {
      key: "st-lucia-secrets-st-lucia",
      name: "Secrets St. Lucia Resort & Spa",
      website:
        "https://www.hyattinclusivecollection.com/en/resorts-hotels/secrets/st-lucia/st-lucia-resort-spa/events/weddings-honeymoons/wedding-packages/",
      capacity: 100,
      fbMinimum: 13949,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "Adults-only all-inclusive resort; the beachfront ceremony venue accommodates up to 100 guests. The published 'Beyond Memorable' package is $13,949+ and covers up to 79 guests staying a cumulative minimum of 75 paid room nights (extra guests cost more), and includes a welcome cocktail party, rehearsal dinner, ceremony and a three-hour private reception with open bar. Being adults-only, this venue would need a separate arrangement for any children in the couple's guest list.",
      availabilityNotes:
        "Booking requires at least one year's advance notice for the Beyond Memorable package; contact the resort for a guest-count-specific quote.",
      sourceUrls: [
        "https://www.hyattinclusivecollection.com/en/resorts-hotels/secrets/st-lucia/st-lucia-resort-spa/events/weddings-honeymoons/wedding-packages/",
        "https://paradiseweddings.com/saint-lucia/castries/secrets-st-lucia/packages/beyond-memorable",
        "https://paradiseweddings.com/saint-lucia/castries/secrets-st-lucia/packages/eternal-love",
      ],
    },
    {
      key: "st-lucia-windjammer-landing",
      name: "Windjammer Landing Villa Beach Resort",
      website: "https://www.windjammer-landing.com/",
      capacity: 100,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "60-acre villa-style beach resort in Labrelotte Bay, northwest coast, with 64,000 sq ft of beach frontage. Two named wedding venues — Barefoot on the Beach and Gazebo by the Sea — both accommodate up to 100 guests; the smaller Hilltop Garden holds up to 50. Unlike Sandals or Secrets, this is a family-friendly (not adults-only or couples-only) resort, a real option if the couple wants children or non-coupled guests to be able to stay on site.",
      availabilityNotes:
        "No published flat wedding-package price; pricing is quoted per room/guest count, plus 10% VAT and 10% service charge.",
      sourceUrls: [
        "https://www.windjammer-landing.com/",
        "https://www.bookyourweddingday.com/easyconsole.cfm/page/venue/vid/761",
        "https://www.weddingwire.com/biz/windjammer-landing-villa-beach-resort-castries-saint-lucia/a75f4c382b54d00f.html",
      ],
    },
  ],
  scenario: {
    fixedCosts: 13949,
    perGuestCost: 50,
    travelCostPerGuest: 1350,
    attendanceRate: 0.62,
    notes:
      "fixedCosts uses Secrets St. Lucia's published Beyond Memorable package price, $13,949 for up to 79 guests (paradiseweddings.com) — chosen because at ~62 expected attendees (100 invited x 62% estimated attendance) the wedding stays under that package's guest cap, so the flat package fee functions as the venue/planner/decor fixed cost, mirroring the same pattern used for Jamaica's Secrets-brand benchmark. perGuestCost ($50, estimated) covers incremental extras (favors, a bar/menu upgrade) beyond what's already included in each guest's own all-inclusive stay, which is reflected in travelCostPerGuest rather than here. travelCostPerGuest matches travelCostPerGuestEstimate. Sources: paradiseweddings.com/saint-lucia/castries/secrets-st-lucia, blog.destinationweddings.com/average-cost-destination-wedding-in-st-lucia.",
  },
};
