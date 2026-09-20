import type { DestinationSeed } from "../types";

/**
 * Brazil — Trancoso (Bahia), Rio de Janeiro, Búzios, Paraty.
 *
 * Joshua & Janel got engaged in Brazil in September 2026, which makes it the
 * sentimental frontrunner for their spring 2028 (March-May) wedding. Numbers
 * below are sourced where a URL is given; anything derived is flagged
 * `estimated: true` with the derivation spelled out in a note, per the
 * seed-data research standard.
 */
export const brazil: DestinationSeed = {
  key: "brazil",
  name: "Brazil",
  country: "Brazil",
  countryCode: "BR",
  region: "Trancoso (Bahia), Rio de Janeiro, Búzios, Paraty",
  rank: 1,
  whyHere:
    "Brazil is where Joshua got down on one knee in September 2026, so it's the obvious sentimental favorite. Bahia's barefoot-luxury coastline (Trancoso, Itacaré) and Rio's mountains-meet-ocean skyline give the couple everything from a rustic beach pousada to a grand hotel ballroom without leaving the country where their story started.",
  notes:
    "Attendance is estimated at 0.60 (the low end of the 60-70% typical destination-wedding range reported by Destify's guest-attendance analysis) because Brazil is the longest and priciest trip of the three finalists for East Coast guests, and — unlike Jamaica or the Bahamas — the US reinstated a visa requirement for US citizens in April 2025, adding a mandatory paperwork step for every invitee (br.usembassy.gov; vanguardattache.com).",
  travelCostPerGuestEstimate: 1100,
  flightCostEstimate: 650,
  lodgingPerNightEstimate: 150,
  attendanceRateEstimate: 0.6,
  weatherNotes:
    "March-May is Brazilian autumn, and the two candidate coasts behave differently. Bahia (Trancoso/Itacaré): still warm (highs ~83-85°F / 28-30°C); March-May is the region's quiet season tourism-wise, but it also falls inside Bahia's broader wet season (roughly March-August, 150-320mm/month) — expect brief, frequent-ish showers rather than all-day rain, with April typically the wettest of the three months (aventuradobrasil.com; championtraveler.com; worlddata.info). Rio/Búzios/Paraty: March is still summery and humid with real rain (~135mm, 73-85°F); April cools into a reliably drier autumn stretch (71-82°F) that runs through October, making April-May the better weather window for this coast (ripioturismo.com). Paraty's dry season is specifically cited as April-September (yourhappymoments.net).",
  legalNotes:
    "A civil marriage in Brazil requires each partner's passport, a birth certificate certified by a Brazilian consulate, and a Declaration of Civil Status from the couple's home consulate (valid 90 days); anyone previously married needs a final divorce decree or death certificate. Every foreign document must carry a sworn Portuguese translation and be legalized/apostilled. The couple files in person (or by proxy) at the Cartório (Civil Registry) in the state of marriage at least ~30 days ahead for the mandatory public-notice (proclamas) waiting period; the resulting authorization is valid 90 days, and minimum marriage age is 18 (expat.com; oliveiralawyers.com; zsassociados.com). Because of that lead time and paperwork, most US couples marrying in Brazil complete the legal marriage at a courthouse or with an officiant at home beforehand and hold a symbolic ceremony in Brazil for family and friends. Verify with the local authority or an attorney.",
  seasonNotes:
    "Brazilian beach towns peak in the Dec-Feb summer and around Carnival; March-May is shoulder season in Bahia (Trancoso/Búzios), meaning fewer crowds and softer pricing. Carnival 2028 runs Feb 25 - Mar 1 (calendarlabs.com), so the first week or two of March can still carry elevated flight prices and vendor demand as Brazil winds down from the holiday. Easter 2028 falls on Sunday, April 16 (publicholidays.com), a domestic Semana Santa travel holiday that can tighten vendor and flight availability around that week. Rio's own wedding-industry guidance names April, May, June and September as the ideal months there (planrio.com / myoverseaswedding.com). Net recommendation: aim for late March through the first half of April, or late April into May, avoiding the Easter week itself.",
  travelNotes:
    "There are no nonstop flights from the US to any of the candidate airports; every routing connects through São Paulo (GRU) or Rio (GIG), for roughly 13-17 hours total. Trancoso is reached via Porto Seguro (BPS) — round-trip fares from NYC-area airports run roughly $390-$1,167 across aggregators as of 2026, clustering around $600-700 (momondo.com; skyscanner.com; google flights via search) — then a ~45km / ~1hr road or shuttle transfer into town (no airport in Trancoso itself). Rio's Galeão (GIG) serves Rio proper and is the jumping-off point for Búzios (~2.5hr drive) and Paraty (~4hr drive, or via São Paulo's Guarulhos). As of April 10, 2025 Brazil reinstated visa reciprocity with the US: every US citizen guest now needs an e-Visa (apply at brazil.vfsevisa.com, $80.90 government fee, ~5 business-day processing, valid for a 90-day stay) — a real new step to flag to all ~100 invitees well in advance (br.usembassy.gov; vanguardattache.com). Travel-cost math: ~$650 round-trip airfare (midpoint of cited NYC/Newark-Porto Seguro fares) + 3 nights x $150/night lodging = $1,100 per guest.",
  sourceUrls: [
    "https://br.usembassy.gov/message-to-u-s-citizens-new-visitor-visa-requirements-for-u-s-citizens-traveling-to-brazil/",
    "https://vanguardattache.com/en/insights/brazil-visa-requirements-2026",
    "https://www.expat.com/en/guide/south-america/brazil/9233-getting-married-in-brazil.html",
    "https://oliveiralawyers.com/services/notary-services/foreign-marriage-recognized-brazil/",
    "https://zsassociados.com/blog/en-2026-02-08-marrying-foreigner-brazil/",
    "https://www.aventuradobrasil.com/info/brazil-climate/trancoso/",
    "https://championtraveler.com/dates/best-time-to-visit-trancoso-br/",
    "https://ripioturismo.com/travel-guide/brazil/rio-de-janeiro/when-to-go-to-rio-de-janeiro/",
    "https://www.calendarlabs.com/holidays/brazil/carnival.php",
    "https://publicholidays.com/easter/",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://vitor-lindo.com/buzios-brazil-wedding-guide/",
    "https://destify.com/blog/how-much-does-a-destination-wedding-cost/",
    "https://planrio.com/rio-wedding-destination",
    "https://www.momondo.com/flights/united-states/porto-seguro",
    "https://www.skyscanner.com/routes/ewr/bps/new-york-newark-to-porto-seguro.html",
  ],
  venues: [
    {
      key: "brazil-travel-inn-trancoso",
      name: "Travel Inn Pousadas & Beach Club Trancoso",
      website: "https://travelinn.com.br/trancoso/eng/casamento",
      capacity: 300,
      lodgingOnSite: true,
      styleNotes:
        "Beach-club-style property 2.3km from Trancoso's historic center; the inn itself sleeps up to 130 guests and the events area can host up to 300, so it comfortably covers a ~100-guest wedding plus overflow day guests.",
      availabilityNotes:
        "No published rental fee or per-guest catering price; contact the venue directly for a quote.",
      sourceUrls: ["https://travelinn.com.br/trancoso/eng/casamento"],
    },
    {
      key: "brazil-uxua-casa-hotel-trancoso",
      name: "UXUA Casa Hotel & Spa",
      website: "https://uxua.com/",
      capacity: 40,
      estimated: true,
      lodgingOnSite: true,
      styleNotes:
        "Real, well-documented boutique hotel right on Trancoso's historic Quadrado (town square) in Bahia, built by former Diesel creative director Wilbert Das out of a cluster of restored fishermen's houses — individually designed \"casas,\" a rustic-luxury beach lounge, and an organic spa. This is a strong match for the small, off-the-beaten-path, individually-distinct-rooms feel she described. " +
          "Room count varies slightly by listing site (9-13), but the hotel's own site (uxua.com/en/casas) names 13 casas, ranging from 2-person casas up to larger multi-bedroom ones (Casa do Lago sleeps 8 across 3 king beds; Gulab Mahal and Zé e Zilda each sleep 5) — genuine variety in configuration, though nothing marketed in \"single/double\" hotel-room terms since these are freestanding houses, not standard rooms. " +
          "Capacity is estimated at ~40 overnight guests (marked estimated: true) — derived by summing the published per-casa sleeping counts where known and assuming ~2-3 people for the remaining unlisted casas; UXUA does not publish a total property or wedding-guest capacity anywhere found, so this is a floor, not a confirmed number. It is a materially smaller property than Pousada do Sandi and would not comfortably sleep a ~100-guest wedding on-site; guests would need overflow lodging elsewhere in Trancoso town (walkable, since UXUA sits in the town center). " +
          "The hotel does market itself for exclusive events (\"totally private and exclusive... amazingly simple\" for groups staying at the property) and sells wedding packages (welcome caipirinhas, a moonlight dinner at UXUA Quadrado restaurant with a tailor-made menu, couples' massages, custom flowers, horseback rides), but no published minimum-stay or full-buyout policy was found comparable to Sandi's explicit two-day whole-property rule — confirm directly with the hotel. " +
          "Dining is a genuine, if partial, answer to the sushi/seafood complaint: UXUA Quadrado restaurant is run by chef Ju Pedrosa and serves Bahian/Brazilian farm-to-table food (moqueca of lobster and king prawns, escondidinho of dried shredded meat, onion, chives, creamed cassava and coconut milk) rather than a sushi-forward menu, plus homemade fruit ice creams — still seafood-featuring, but Brazilian-regional rather than Japanese, with a meat-based dish on record.",
      availabilityNotes:
        "No published rental fee or per-guest pricing; no published total capacity — contact the hotel directly for both. Geography note: Janel's \"the location right next to Uxua, in Santa Teresa\" does not check out — Santa Teresa is a real neighborhood, but it's in Rio de Janeiro, roughly 500 miles / a domestic flight away from Trancoso, Bahia, where UXUA actually is. No real property was found linking the two (the only overlap found was both appearing, unrelated, in the same boutique-hotel curator's portfolio, welcomebeyond.com — not a sister-property or ownership relationship). This is likely two separate memories/mishearings blending together in dictation; there is no venue actually next to UXUA that is also in Santa Teresa.",
      sourceUrls: [
        "https://uxua.com/",
        "https://uxua.com/en/casas",
        "https://uxua.com/en/cuisine",
        "https://www.venuereport.com/venue/uxua-casa-hotel-spa-1/",
        "https://en.wikipedia.org/wiki/UXUA_Casa_Hotel_%26_Spa",
      ],
    },
    {
      key: "brazil-copacabana-palace-rio",
      name: "Copacabana Palace, A Belmond Hotel",
      website: "https://aisle.wedding/venues/copacabana-palace",
      capacity: 500,
      perGuestCost: 150,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "The 1920s Art Deco flagship on Copacabana beach; the top-of-the-market option for this destination. A classic 60-guest wedding runs roughly R$400,000-800,000 (~$80k-160k) and a full 120-guest luxury weekend runs R$900,000-1,800,000 (~$180k-360k), inclusive of catering, planner (10-15% of budget), photography, music and florals. Published catering runs R$550-950 per person; perGuestCost above ($150) converts that range to USD at the ~5.0 BRL/USD rate implied by the source's own total-budget conversion, so it is marked estimated.",
      availabilityNotes:
        "Belmond names April, May, June and September as the resort's ideal wedding months.",
      sourceUrls: [
        "https://www.myoverseaswedding.com/wedding-destinations/brazil/copacabana-palace-a-belmond-hotel-rio-de-janeiro/reception-venues",
        "https://planrio.com/rio-wedding-destination",
      ],
    },
    {
      key: "brazil-casas-brancas-buzios",
      name: "Casas Brancas Boutique Hotel & Spa",
      website: "https://www.casasbrancas.com.br/",
      capacity: 100,
      estimated: true,
      lodgingOnSite: true,
      styleNotes:
        "Whitewashed boutique hotel perched above Búzios bay with panoramic ocean views; a favorite for luxury Búzios celebrations. Capacity is estimated (not published) based on the property's event-space photos and comparable Búzios boutique-hotel weddings; confirm with the venue.",
      availabilityNotes:
        "No published rental fee; regional benchmark (see destination scenario notes) is mid-range Búzios weddings for 50-100 guests running $15,000-$35,000 all-in.",
      sourceUrls: [
        "https://www.casasbrancas.com.br/",
        "https://vitor-lindo.com/buzios-brazil-wedding-guide/",
      ],
    },
    {
      key: "brazil-pousada-do-sandi-paraty",
      name: "Pousada do Sandi",
      website: "https://sandihotel.com.br/en/events/weddings/",
      capacity: 120,
      lodgingOnSite: true,
      styleNotes:
        "Colonial-era (300-year-old building) boutique hotel in Paraty's historic center, 26 rooms across Standard/Deluxe rooms up through Junior Suites and a Master Suite with its own living room — the mixed room grades (some sources describe it as 21 Deluxe, 4 Junior Suites, 1 Master Suite) do give the single/double/larger-suite variety this couple wants, though it's not literally advertised in \"singles vs. doubles\" terms. Whole property must be booked for at least two days for privacy for a wedding — no sharing with other hotel guests. " +
          "Correction to a prior draft of this file: the venue's own wedding page states weddings run from a 25-guest minimum up to a 120-guest maximum (using the internal restaurant salon plus an external covered garden salon for the larger end) — this file previously listed capacity as 65, which is actually the on-site overnight lodging cap (26 rooms sleeping up to 65 people total), not the event/wedding capacity. Both numbers are real and published, they just answer different questions: up to 65 guests can sleep on property; up to 120 can attend the wedding itself, with the rest needing lodging elsewhere in Paraty. " +
          "Dining: two on-site restaurants — Fugu (Japanese, sushi-focused) and Pupu's (regional Brazilian, seafood, parrilla/grilled meats, and \"non-conventional edible plants\"), plus a poolside bar (snacks, sandwiches, drinks) and the Miracolo ice cream parlor. So it is not *literally* sushi/seafood-only — Pupu's parrilla is a real grilled-meat option — but the on-site food is still weighted toward seafood and Japanese cuisine with no dedicated steakhouse or general international menu; worth calling the hotel directly to confirm a non-seafood plated option for the wedding dinner itself given her dad's preference.",
      availabilityNotes:
        "No published rental fee; contact the hotel for a quote. Minimum 25 / maximum 120 guests and the two-day whole-property requirement are both stated on the venue's own weddings page.",
      sourceUrls: [
        "https://sandihotel.com.br/en/events/weddings/",
        "https://sandihotel.com.br/en/gastronomy/",
        "https://sandihotel.com.br/en/accomodations/",
        "https://www.casamentos.com.br/hotel-casamento/pousada-do-sandi--e145114",
      ],
    },
  ],
  scenario: {
    fixedCosts: 15000,
    perGuestCost: 150,
    travelCostPerGuest: 1100,
    attendanceRate: 0.6,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor, stationery, attire, misc) is derived by taking the Búzios mid-range benchmark of $15,000-$35,000 for a 50-100 guest wedding (midpoint ~$25,000, vitor-lindo.com) and subtracting an estimated ~60 attendees x $150/guest catering-and-bar (see perGuestCost), leaving ~$15,250, rounded to $15,000. perGuestCost ($150) is Destify's cited $114/person international-destination-wedding catering benchmark plus a ~30% open-bar upcharge (destify.com), cross-checked against Copacabana Palace's published R$550-950/person catering range converted to USD (~$110-190). travelCostPerGuest matches travelCostPerGuestEstimate. Sources: vitor-lindo.com/buzios-brazil-wedding-guide, destify.com/blog/how-much-does-a-destination-wedding-cost, myoverseaswedding.com Copacabana Palace pricing, planrio.com Rio budget guide.",
  },
};
