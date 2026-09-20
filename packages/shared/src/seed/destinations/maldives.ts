import type { DestinationSeed } from "../types";

/**
 * Maldives — South Male / Ari Atoll resort islands.
 *
 * The most tropical-postcard option researched — overwater villas and
 * private sandbanks — and also the single most expensive and logistically
 * demanding destination on the whole list: every resort sits on its own
 * island, reachable only by a further seaplane or speedboat transfer after
 * a 20+ hour flight, and no legal marriage is possible here for foreigners
 * at all. The Maldives does not carry the plantation/enslaved-labor risk
 * category flagged for the US South and the Caribbean, but every resort
 * named below was checked for real, current bookability rather than
 * invented.
 */
export const maldives: DestinationSeed = {
  key: "maldives",
  name: "Maldives",
  country: "Maldives",
  countryCode: "MV",
  region: "South Male / Ari Atoll resort islands",
  rank: 50,
  whyHere:
    "For a couple weighing an all-in tropical-luxury option against Brazil, the Maldives is the single most photogenic choice researched — private islands, overwater villas, lagoon ceremonies — but it is also the most expensive and hardest-to-reach destination on the entire list, realistically suited to a small inner circle rather than the couple's full ~100-guest East Coast list.",
  notes:
    "Attendance is estimated at 0.40, at the very bottom of (and well below) the 60-70% typical destination-wedding range reported by Destify's guest-attendance analysis (destify.com). This is the most logistically demanding destination researched for the couple's East Coast guests: a 20+ hour door-to-door trip with a mandatory long connection, followed by a further speedboat or seaplane transfer that can add hours and hundreds of dollars per person on top of the international flight, at some of the highest resort nightly rates of any destination on the list. Realistically, the Maldives works far better as an elopement or small-inner-circle destination (family and closest friends only) than as a venue for the couple's full ~100-guest wedding, and the couple should plan around that smaller in-person count if they choose it.",
  travelCostPerGuestEstimate: 2500,
  flightCostEstimate: 1100,
  lodgingPerNightEstimate: 400,
  attendanceRateEstimate: 0.4,
  weatherNotes:
    "The Maldives has a genuinely tropical, two-monsoon climate, distinct from every other finalist's spring pattern. January through March is the dry, northeast-monsoon season: low humidity, minimal rain, and 10-11 hours of daily sunshine, with temperatures in the 82-86°F/28-30°C range — the most reliably good-weather stretch of the whole window. April is a transitional month, still mostly dry and often the hottest of the year (up to 90°F/32°C) with rising humidity as the shift toward the wet season begins. May marks the start of the full southwest monsoon (wet season): more consistent rain, higher humidity and the beginning of surf season, though temperatures stay warm (around 82°F/28°C) throughout. A March or early-April date is the safer bet for an outdoor overwater or beach ceremony; May carries real rain risk (climatestotravel.com; enchantingtravels.com; skylarktours.com).",
  legalNotes:
    "Foreigners cannot legally marry in the Maldives at all — Maldivian marriage law is governed by Islamic Sharia and civil marriage is reserved for Maldivian citizens. A small number of foreign embassies in Malé can perform a civil marriage for their own citizens, but this is not standard and depends entirely on the couple's nationality and that embassy's capacity; the US Embassy does not perform marriages for US citizens abroad in general. The standard, well-established path is to complete the legal marriage at home in the US, either before or after the trip, and treat the Maldives resort wedding purely as a symbolic ceremony — vows, rings, a certificate with no legal force — which is exactly what every resort's 'wedding package' (Anantara, Conrad, Kandima, etc.) is designed around. US citizens receive a free 30-day visa on arrival with no advance application, easily covering a wedding trip. Verify with the local authority or an attorney.",
  seasonNotes:
    "December-April is the Maldives' dry-season peak tourist and wedding period, and resorts explicitly recommend booking weddings 6-12 months ahead for this window versus 3-6 months for wet-season or smaller groups — meaning a March or April 2028 date should be locked in well before 2027 ends. No major religious or national holiday conflicts specific to spring 2028 were found for the Maldives; the main planning driver in this window is simply that peak-season resort rates and room availability are already at their highest by March-April, on top of the destination's baseline high cost.",
  travelNotes:
    "There is no nonstop flight from any US airport to Malé (MLE); every itinerary from the East Coast requires at least one long connection, most commonly through Doha (Qatar Airways) or Dubai (Emirates), with total door-to-door travel commonly exceeding 20 hours each way. Round-trip economy fares from JFK run roughly $900-1,340 depending on route and airline; this file uses a $1,100 midpoint. After landing at Malé, guests still need a further resort transfer — a shared speedboat ($150-400 round trip per person) for resorts close to the airport (like South Male Atoll's Anantara Dhigu), or a seaplane ($450-1,000+ round trip per person, daylight hours only) for more remote atolls like Ari or Dhaalu — a real added cost with no equivalent at any other destination researched. Maldives resort lodging is also the most expensive of any destination on this list: mid-range resort rooms average roughly $330-660/night depending on season, and this file uses $400/night as a representative mid-range figure. A mandatory Green Tax of $12/person/night (as of January 2025) applies on top of room rates. Travel-cost math: ~$1,100 round-trip airfare + 3 nights x $400/night lodging ($1,200) + ~$200 round-trip inter-island speedboat transfer = $2,500 per guest — by a wide margin the highest per-guest travel cost of any destination researched.",
  sourceUrls: [
    "https://www.climatestotravel.com/climate/maldives",
    "https://www.enchantingtravels.com/destinations/asia/maldives/best-time-to-visit-maldives/",
    "https://7.agency/blog/read/getting-legally-married-in-the-maldives",
    "https://www.yourhappymoments.net/legal-requirements-for-weddings-in-addu-atoll-your-dream-maldives-ceremony-explained/",
    "https://visago.dev/visa/maldives/from-united-states/",
    "https://travelocity.com/lp/flight-routes/qatar-airways-from-john-f-kennedy-intl-to-velana-intl/qr/jfk/mle",
    "https://resortlife.travel/insights/maldives-transfers-speedboat-seaplane-domestic-flights",
    "https://www.budgetyourtrip.com/hotels/maldives-MV",
    "https://mira.gov.mv/Pages/View/FAQ_GreenTax",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
  ],
  venues: [
    {
      key: "maldives-anantara-dhigu",
      name: "Anantara Dhigu Maldives Resort",
      website: "https://www.anantara.com/en/dhigu-maldives/weddings",
      capacity: 100,
      rentalFee: 23800,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A South Male Atoll resort reachable by a roughly 30-40 minute speedboat transfer from Malé airport — the shortest, least expensive transfer of any resort researched, a real logistical advantage over the more remote atoll properties. Its private Gulhifushi Island venue accommodates celebrations up to 100 guests, the closest exact match to the couple's guest count found anywhere in this research pass, with the main beach able to host up to 150. Published base wedding-package pricing is $23,800 for 30 guests (excluding taxes, service charge, green tax, accommodation and meal plans); rentalFee above uses this base package figure, marked estimated since a 100-guest package would price well above it.",
      availabilityNotes: "Contact the resort's wedding specialists directly for a guest-count- and date-specific quote; a minimum two-night stay is required before the ceremony date.",
      sourceUrls: [
        "https://www.anantara.com/en/dhigu-maldives/weddings",
        "https://www.myoverseaswedding.com/wedding-destinations/maldives/anantara-dhigu-resort-spa/reception-venues",
      ],
    },
    {
      key: "maldives-conrad-rangali",
      name: "Conrad Maldives Rangali Island",
      website: "https://www.conradmaldives.com/gather/",
      capacity: 150,
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A marquee Ari Atoll resort, reachable by domestic flight plus speedboat transfer from Malé (a longer, costlier connection than South Male Atoll properties), famous for the Ithaa Undersea Restaurant (ceremonies for up to 14 guests, five meters below the surface). Larger-group options scale from Sunken Beach Dining (4-40 guests) and Beach Barbecue (40-100) up to the Deluxe Beach space (up to 150) — a workable fit for the couple's full guest list if attendance runs toward the lower end of the estimate. No package price is published; every wedding is quoted individually by the resort's events team, so no fee figure is asserted here.",
      availabilityNotes: "Email the resort's events team directly for a guest-count- and date-specific quote.",
      sourceUrls: [
        "https://www.conradmaldives.com/gather/",
        "https://www.hilton.com/en/hotels/mlehici-conrad-maldives-rangali-island/events/weddings/",
      ],
    },
    {
      key: "maldives-kandima",
      name: "Kandima Maldives",
      website: "https://kandima.com/en/kool-things/weddings",
      estimated: true,
      inHouseCatering: true,
      lodgingOnSite: true,
      styleNotes:
        "A Dhaalu Atoll resort (domestic flight plus speedboat transfer from Malé) with an overwater ceremony platform just offshore and an in-house 'Kool' wedding-planning team; the resort is positioned as a more design-forward, lifestyle-brand alternative to the traditional ultra-luxury Maldives resorts. No guest cap or package price is published on the resort's own wedding page, so no capacity or fee figure is asserted here; this entry is included as a real, verified, currently bookable option rather than a priced one.",
      availabilityNotes: "Contact the resort's wedding team directly through kandima.com for pricing and 2028 availability.",
      sourceUrls: [
        "https://kandima.com/en/kool-things/weddings",
        "https://hoteliermaldives.com/kandima-maldives-destination-wedding-photo-packages/",
      ],
    },
  ],
  scenario: {
    fixedCosts: 25000,
    perGuestCost: 220,
    travelCostPerGuest: 2500,
    attendanceRate: 0.4,
    notes:
      "fixedCosts is estimated from Anantara Dhigu's published $23,800 base wedding-package price (for 30 guests, before scaling up), rounded up modestly to $25,000 to allow for a Maldives-based planner and photographer/videographer travel costs, which run higher here than at any other destination given the remote-island logistics every vendor also has to absorb. perGuestCost ($220) is estimated from the general pattern across affordable-to-mid-tier Maldives wedding packages researched (roughly $230-410 per guest once scaled beyond the smallest 10-guest packages), toward the lower end since Anantara Dhigu's per-guest add-on cost for the couple's ~100-guest scenario was not separately published. travelCostPerGuest matches travelCostPerGuestEstimate and is, by a wide margin, the highest of any destination on this list once the mandatory inter-island transfer is included. Sources: anantara.com/en/dhigu-maldives/weddings, myoverseaswedding.com/wedding-packages/maldives, resortlife.travel/insights/maldives-transfers-speedboat-seaplane-domestic-flights.",
  },
};
