import type { DestinationSeed } from "../types";

/**
 * Curaçao — Baoase, near Willemstad.
 *
 * Added because Janel sent one of its venues over (Sept 2026). Researched
 * lightly next to the original destinations: legal, flights and season are
 * sourced; lodging and the scenario are estimates, flagged as such.
 */
export const curacao: DestinationSeed = {
  key: "curacao",
  name: "Curaçao",
  country: "Curaçao",
  countryCode: "CW",
  region: "Willemstad and the south coast",
  rank: 52,
  whyHere:
    "Janel sent Baoase: a Balinese-style hideaway with private beaches and lagoons. Curaçao is below the hurricane belt, and April is dry.",
  notes:
    "Left out on purpose: Avila Beach Hotel, whose core is a 1780 governor's country house (Atlas couldn't confirm its history either way), and the island's 'landhuis' venues, which are former plantation houses. Baoase requires every guest to stay on-site for groups over 12, and a full buyout above 30. It sleeps 78, so it's a smaller-wedding option. Stay away from Curaçao's 'landhuis' venues: they're former plantation houses.",
  travelCostPerGuestEstimate: 1660,
  flightCostEstimate: 550,
  lodgingPerNightEstimate: 370,
  attendanceRateEstimate: 0.5,
  weatherNotes:
    "Curaçao sits outside the hurricane belt. It's dry year-round, and April averages a high of about 88°F with under an inch of rain (curacao.com; caribeez.com).",
  legalNotes:
    "Only civil marriages are legal. Send a written petition to the town hall and get approval from the civil registry at least two months ahead, with birth certificates, proof of marital status, passports and apostilled documents. Many couples marry legally at home and hold a symbolic ceremony on the island (curacao.com; avilabeachhotel.com). Verify with the local authority or an attorney.",
  seasonNotes: "January to April is the best, driest stretch; high season is December to April.",
  travelNotes:
    "Nonstop flights from Miami (about 2 hours 50 minutes, twice daily), JFK (3 times a week) and Charlotte (weekly). Recent round trips from the US ran $227 (Miami) to about $544 (avilabeachhotel.com; momondo.com). Travel-cost math: ~$550 round-trip airfare + 3 nights x $370/night (estimate) = $1,660 per guest.",
  sourceUrls: [
    "https://www.curacao.com/en/questions/weddings-and-honeymoons/requirements-getting-married-in-curacao",
    "https://www.avilabeachhotel.com/plan-your-stay/weddings-ceremonies/legal-pratical-information/",
    "https://www.avilabeachhotel.com/curacao-tips/plan-your-trip/up-to-date-flight-schedules-non-stop-flights-to-curacao-from-usa-canada/",
    "https://www.momondo.com/flights/united-states/curacao",
    "https://www.curacao.com/en/questions/weather/when-is-hurricane-season-in-curacao",
    "https://baoase.com/romance/weddings/",
  ],
  venues: [
    {
      key: "curacao-baoase",
      name: "Baoase Luxury Resort",
      website: "https://baoase.com/romance/weddings/",
      capacity: 78,
      lodgingOnSite: true,
      styleNotes:
        "23 rooms, suites and villas (12 with plunge pools) with Balinese furnishings, private beaches and lagoons. Sleeps up to 78. Rules: weddings of 2-12 need a US$12,000 minimum; over 12 guests, everyone stays at the resort; over 30, it's an all-inclusive full buyout. Rooms run about $737 and up a night.",
      sourceUrls: [
        "https://baoase.com/romance/weddings/",
        "https://www.momondo.com/hotels/willemstad/Baoase-Luxury-Resort.mhd327424.ksp",
      ],
      suggestedBy: "Janel",
      suggestedNote: "Private beach & lagoon vibe",
    },
    {
      key: "curacao-sandals-royal",
      name: "Sandals Royal Curaçao",
      website: "https://www.sandals.com/curacao/weddings/",
      capacity: 100,
      lodgingOnSite: true,
      styleNotes:
        "Found by Atlas as an all-inclusive option: beachfront and garden ceremony spots, weddings up to 100 (the oceanview pavilion seats 48). Adults-only, so it doesn't fit if kids like Promise are coming.",
      sourceUrls: [
        "https://www.sandals.com/curacao/weddings/",
        "https://www.wedding-spot.com/venue/17747/sandals-royal-curacao/",
      ],
    },
    {
      key: "curacao-marriott-beach",
      name: "Curaçao Marriott Beach Resort",
      website: "https://www.marriott.com/en-us/hotels/curpb-curacao-marriott-beach-resort/events/",
      capacity: 450,
      lodgingOnSite: true,
      styleNotes:
        "Found by Atlas as the big-list option: beach or garden ceremonies, a 450-guest ballroom and an 850-capacity beach venue. Packages from $2,500, with a planner included.",
      sourceUrls: [
        "https://www.marriott.com/en-us/hotels/curpb-curacao-marriott-beach-resort/events/",
        "https://www.destinationweddings.com/curacao-marriott-beach-resort",
      ],
    },
  ],
  scenario: {
    fixedCosts: 45000,
    perGuestCost: 250,
    travelCostPerGuest: 1660,
    attendanceRate: 0.5,
    notes:
      "Estimates. Lodging is Baoase's ~$737 entry room rate split two to a room (~$370 a guest-night). fixedCosts (~$45,000) and perGuestCost (~$250) are rough luxury-resort figures, not quotes; a 30+ guest wedding here is an all-inclusive buyout, so ask for that price.",
  },
};
