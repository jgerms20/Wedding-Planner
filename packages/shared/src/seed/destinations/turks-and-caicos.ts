import type { DestinationSeed } from "../types";

/**
 * Turks and Caicos — Providenciales (Grace Bay).
 *
 * The upscale Caribbean finalist: some of the region's best beaches (Grace
 * Bay routinely tops "best beach in the world" lists), abundant nonstop
 * flights, and no US-citizen visa requirement, traded off against the
 * highest per-night resort rates of the Caribbean options researched so far.
 * Numbers below are sourced where a URL is given; anything derived is
 * flagged `estimated: true` with the derivation spelled out in a note. TCI's
 * own colonial economy included Loyalist-era cotton plantations and a
 * salt-raking industry built on enslaved labor (Middle Caicos, Salt Cay,
 * Grand Turk); none of those sites are wedding venues and none appear below —
 * every venue here is a purpose-built modern resort on Providenciales with no
 * plantation-era structure on site.
 */
export const turksAndCaicos: DestinationSeed = {
  key: "turks-and-caicos",
  name: "Turks and Caicos",
  country: "Turks and Caicos Islands",
  countryCode: "TC",
  region: "Providenciales (Grace Bay)",
  rank: 37,
  whyHere:
    "Grace Bay's calm, powder-white sand is about as close to a postcard as the Caribbean gets, and Providenciales' resort scene (Beaches, Grace Bay Club, Wymara) runs weddings every week with abundant nonstop flights from the East Coast and no visa paperwork for guests — a premium, lower-friction alternative to Brazil that trades some of Jamaica's or the Bahamas' affordability for a noticeably higher-end look and feel.",
  notes:
    "Attendance is estimated at 0.63, near the middle of the 60-70% typical destination-wedding range reported by Destify's guest-attendance analysis (destify.com) — short nonstop flights and visa-free entry support turnout, but Turks and Caicos' resort rates (average nightly rates cited around $400-600 for a mid-range room, well above Jamaica's or the Bahamas') are a real drag on how many of the couple's ~100 invited guests would commit to the trip.",
  travelCostPerGuestEstimate: 1750,
  flightCostEstimate: 400,
  lodgingPerNightEstimate: 450,
  attendanceRateEstimate: 0.63,
  originFlights: [
    {
      origin: "Atlanta",
      hours: 2.9,
      fareEstimate: 924,
      sourceUrl: "https://www.farecompare.com/flights/Atlanta-ATL/Providenciales-PLS/market.html",
    },
    {
      origin: "Charlotte",
      hours: 3.0,
      fareEstimate: 625,
      sourceUrl: "https://www.kayak.com/flight-routes/Charlotte-Douglas-CLT/Providenciales-PLS",
    },
    {
      origin: "Baltimore",
      hours: 6.6,
      fareEstimate: 490,
      sourceUrl: "https://www.rome2rio.com/s/Baltimore-Airport-BWI/Providenciales-Airport-PLS",
    },
    {
      origin: "Los Angeles",
      hours: 7.7,
      fareEstimate: 740,
      sourceUrl: "https://www.rome2rio.com/s/Los-Angeles-Airport-LAX/Providenciales-Airport-PLS",
    },
  ],
  weatherNotes:
    "The dry season runs January through April, with March (~82°F, minimal rain) and April (~84°F, one of the driest months, ~1.3 rainy days) the strongest weather bets. May is noticeably wetter (~5.8 rainy days, average 81°F) as the transition toward wet season begins, though rainfall stays light overall (~1.7 inches across ~13 short showers) and many guides still call late April-May the best-kept-secret shoulder window: thinner crowds, lower rates, still-excellent weather (bigbluecollective.com; whitevillas.net).",
  legalNotes:
    "Either partner must be physically present in the Turks and Caicos Islands at least 48 hours before applying for a standard marriage license (cruise-ship passengers are exempt and can apply same-day). Required documents: valid passports, original birth certificates, an affidavit of single status, and — for anyone previously married — a certified divorce decree or the deceased spouse's death certificate; all copies must be notarized and sealed, and any non-English document needs an advance certified translation. The license fee is roughly $50 (some sources cite higher expedited fees), and standard processing takes about 2-3 business days; licenses are issued through the Registrar's office in Providenciales. Marriages performed in TCI are fully recognized in the US (visittci.com; turksandcaicostourism.com). Verify with the local authority or an attorney.",
  seasonNotes:
    "December through April is TCI's dry, high-demand season, and prices run 30-50% above low season in that window; March in particular overlaps with US spring break, adding crowds on top of the seasonal peak. Late April into May is the better-value shoulder window cited by multiple guides — still dry, still warm, but past the spring-break crush and with resort rates coming down from their winter peak. A handful of small local events fall in this window (a traditional Salt Cay spring fete in late April; a South Caicos yacht regatta over the last weekend of May) but neither is large enough to meaningfully affect Providenciales resort pricing or availability (visittci.com).",
  travelNotes:
    "Providenciales International (PLS) has frequent nonstop service from New York (American, Delta, JetBlue; ~3h15m) and Miami (American; ~2h07m), the simplest routing of the pricier Caribbean options (flightconnections.com). No visa is required for US citizens for stays up to 90 days; guests need a valid passport and a return/onward ticket (bigbluecollective.com). Ground transfers from PLS to the Grace Bay resort strip run about 10-15 minutes. Round-trip economy fares from NYC cluster around $400-430 in current searches (kayak.com; skyscanner.com), while mid-range Providenciales resort rooms run $400-600/night in season (tcvillas.com-adjacent sourcing). Travel-cost math: ~$400 round-trip airfare + 3 nights x $450/night resort lodging = $1,750 per guest.",
  sourceUrls: [
    "https://www.visittci.com/romance/weddings/legal-requirements",
    "https://turksandcaicostourism.com/wp-content/uploads/2020/06/marriage-license-requirements.pdf",
    "https://www.visittci.com/travel-info/entry-requirements",
    "https://bigbluecollective.com/blog/turks-and-caicos-weather-in-march/",
    "https://whitevillas.net/blog/turks-and-caicos/turks-and-caicos-weather-by-month/",
    "https://www.visittci.com/travel-info/useful-info/vacation-prices",
    "https://www.flightconnections.com/flights-from-jfk-to-pls",
    "https://www.flightconnections.com/flights-from-mia-to-pls",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.visittci.com/events/major-events",
  ],
  venues: [
    {
      key: "tci-beaches-turks-and-caicos",
      name: "Beaches Turks & Caicos Resort Villages & Spa",
      website: "https://www.beaches.com/turks-caicos/weddings/",
      capacity: 400,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "Large all-inclusive family resort in Grace Bay with multiple named wedding venues: Oceanview Beachfront ceremonies up to 300, a Sky Terrace cocktail space up to 150, a Garden Gazebo up to 100, and an indoor Main Ballroom for 400+ guest receptions. Complimentary and upgraded wedding-package tiers run roughly $2,500-$5,000, with a minimum 6-night stay required for the free package. Capacity above (400) reflects the ballroom's published figure and is marked estimated only insofar as the couple's actual usable capacity depends on which specific venue and package they book.",
      availabilityNotes: "Contact the Beaches Wedding Team (1-877-BEACHES) for a guest-count-specific quote.",
      sourceUrls: [
        "https://www.beaches.com/turks-caicos/weddings/",
        "https://pixiehoneymoons.com/beaches-turks-and-caicos-wedding-packages-best-time-and-legal-options/",
      ],
    },
    {
      key: "tci-grace-bay-club",
      name: "Grace Bay Club",
      website: "https://www.gracebayclub.com/",
      capacity: 120,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "Boutique beachfront resort directly on Grace Bay beach; wedding capacity ranges from elopement-sized ceremonies up to 120 guests depending on the venue selected. A minimum of 10 booked rooms is required to hold a wedding at the property.",
      availabilityNotes:
        "No published flat wedding-package price; additional charges include a $150 chef fee (2 hrs) and $200 bartender fee (2 hrs), plus 12% government tax, 10% service charge and 8% gratuity on event pricing.",
      sourceUrls: [
        "https://www.venuereport.com/venue/grace-bay-club/",
        "https://www.destinationweddings.com/grace-bay-club",
        "https://www.allinclusiveweddings.com/resorts/grace-bay-club-turks-and-caicos-wedding-packages",
      ],
    },
    {
      key: "tci-wymara-resort-villas",
      name: "Wymara Resort + Villas",
      website: "https://www.wymara.com/weddings",
      capacity: 200,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "Grace Bay luxury resort with multiple wedding venue sizes: the lawn/beach area holds up to 200 guests, the Villas + Beach Club up to 150, the Ocean Pool Deck 50-80, and the Sunset Cove Beach Club courtyard 20-25. The property is also bookable as a full buyout for groups up to ~190.",
      availabilityNotes: "No published wedding-package price; contact the resort for a guest-count-specific quote.",
      sourceUrls: ["https://www.wymara.com/weddings", "https://www.wymara.com/meetings_and_celebrations"],
    },
    {
      key: "tci-the-shore-club",
      name: "The Shore Club Turks and Caicos",
      website: "https://theshoreclubtc.com/weddings/",
      lodgingOnSite: true,
      inHouseCatering: true,
      estimated: true,
      styleNotes:
        "Luxury resort on Long Bay Beach, a quieter and more private stretch of Providenciales a short drive from Grace Bay's town center; markets beach ceremonies with a dedicated on-site wedding planner. No published capacity figure was found — the property's scale (several beachfront buildings, multiple pools) suggests it can handle a ~100-guest wedding, but this is an estimate, not a confirmed number.",
      availabilityNotes: "No published capacity or pricing; contact the resort's wedding planner directly.",
      sourceUrls: ["https://theshoreclubtc.com/weddings/"],
    },
  ],
  scenario: {
    fixedCosts: 15000,
    perGuestCost: 60,
    travelCostPerGuest: 1750,
    attendanceRate: 0.63,
    notes:
      "fixedCosts is estimated from Beaches Turks & Caicos' published upgraded wedding-package range of $2,500-$5,000 (pixiehoneymoons.com) plus TCI's typical private-venue rental range implied by Grace Bay Club's and Wymara's a-la-carte event fees, rounded to a $15,000 planner/decor/photo/venue-rental estimate consistent with the fixed-cost figures used for the Bahamas and Jamaica files. perGuestCost ($60, estimated) covers incremental catering/bar extras beyond what's already included in an all-inclusive guest's own stay (captured in travelCostPerGuest), set slightly above Jamaica's and the Bahamas' figures to reflect TCI's generally higher food-and-beverage cost level. travelCostPerGuest matches travelCostPerGuestEstimate. Sources: beaches.com/turks-caicos/weddings, gracebayclub.com, wymara.com/weddings, visittci.com/travel-info/useful-info/vacation-prices.",
  },
};
