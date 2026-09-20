import type { DestinationSeed } from "../types";

/**
 * Beaufort, SC.
 *
 * A Lowcountry river town with real historic-downtown and marina character,
 * about an hour south of Charleston. Beaufort's wedding-venue market leans
 * even harder on converted antebellum Sea Island cotton-planter mansions
 * than Charleston's does, so this destination required unusually heavy
 * diligence per the standing rule in .claude/skills/wedding-research/SKILL.md.
 * Two well-known Beaufort venues were excluded outright after a real history
 * check: **Anchorage 1770 Inn** — its own published history states it was
 * "originally built as a summer home for a wealthy cotton planter and
 * politician, William Elliott," and that "early Beaufort was built on the
 * backs of enslaved people... as a wealthy cotton planter's home, the
 * original property would have been part of this economy." **Tabby Place**
 * (a large event space at The Beaufort Inn) was also excluded: independent
 * sourcing describes the building as "a Federal Period two-story home... built
 * in the early 1800s" — squarely in the risk window for a wealthy Beaufort
 * residence, and the venue's own marketing doesn't resolve that history, so
 * per the rule's "when in doubt, leave it out" standard it's left off this
 * list even though its current marketing frames it as a converted grocery
 * store. **Old Bay Marketplace** (also at The Beaufort Inn) was left out for
 * the same reason: its construction date and original use couldn't be
 * confirmed with confidence. **Woodside Plantation** was never considered —
 * disqualified by name alone. What's below are the venues that cleared a
 * real check: The Beaufort Inn's own 1897 Main Inn building (built as a
 * post-emancipation family summer retreat, no enslaved-labor history in its
 * own telling), a city-owned public waterfront park, and a private country
 * club whose golf course opened in 1985. Numbers are sourced where a URL is
 * given; anything derived is flagged `estimated: true` (venues) or explained
 * in a note.
 */
export const beaufortSc: DestinationSeed = {
  key: "beaufort-sc",
  name: "Beaufort, SC",
  country: "United States",
  countryCode: "US",
  region: "Historic downtown, Beaufort River waterfront",
  rank: 22,
  whyHere:
    "Beaufort gives Joshua & Janel a smaller, quieter Lowcountry river town than Charleston — a real historic downtown and marina setting an hour south — for a couple who wants Lowcountry character without Charleston's scale or price point.",
  notes:
    "Attendance is estimated at 0.80, at the bottom of the 80-85% 'local wedding' attendance band (pix.wedding; destify.com): Beaufort has no full-service airport of its own, so every guest routes through Savannah/Hilton Head International (SAV, about 40 minutes away) or Charleston, adding real friction versus Charleston itself.",
  travelCostPerGuestEstimate: 1070,
  lodgingPerNightEstimate: 200,
  attendanceRateEstimate: 0.8,
  weatherNotes:
    "Beaufort's spring closely tracks Charleston's, a bit warmer given its slightly more southern, marsh-sheltered location: mild in March, warming through April, and reliably warm by May, with rain possible but not the defining risk the way summer thunderstorms are. A spring outdoor ceremony is a reasonable bet with a simple tented backup, well ahead of Atlantic hurricane season (June-November).",
  legalNotes:
    "Both parties apply together, in person, by appointment at the Beaufort County Probate Court (102 Ribaut Road, Beaufort, or the County Government Center South on Hilton Head Island), 9am-3pm. Bring valid photo ID; the fee is $50 for Beaufort County residents, $75 for other South Carolina residents, or $95 for out-of-state applicants — paid in exact cash. As in the rest of South Carolina, there is a 24-hour waiting period before the license is released. Only ministers of the Gospel or accepted rabbis and South Carolina notaries may perform the ceremony. Verify with the local authority or an attorney.",
  seasonNotes:
    "Spring is Beaufort's peak season alongside fall, drawing garden and home tours (the Beaufort Fall Festival of Houses & Gardens runs in October, outside this window, but spring tourism is still real) and steady demand from nearby Hilton Head's own high season. There's no single dominant citywide festival inside the March-May window the way Charleston has Spoleto, but hotel inventory in this small town is genuinely limited, so booking well ahead matters more here than in a bigger city.",
  travelNotes:
    "Beaufort has no full-service commercial airport; the nearest is Savannah/Hilton Head International (SAV), about 40 minutes away, with nonstop service to roughly 36-38 domestic destinations via Delta, American, United, jetBlue, Southwest, Breeze, Allegiant, Avelo, and Sun Country (savannahairport.com). Charleston International (about 70 minutes north) is a fallback with more nonstop options for guests willing to drive a bit farther. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average) + 3 nights x $200/night (a blended Beaufort hotel estimate, between BudgetYourTrip's ~$160/night weekly average and its $219/night weekend-trip average, since a wedding weekend skews toward weekend rates) = $1,070 per guest.",
  sourceUrls: [
    "https://www.beaufortcountysc.gov/probate-court/marriage-licenses.html",
    "https://www.hiltonheadisland.org/weddings/planning-resources/legal-requirements",
    "https://savannahairport.com/flights/airlines-nonstop-destinations/",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://www.budgetyourtrip.com/hotels/united-states-of-america/beaufort-4570284",
    "https://anchorage1770.com/history/",
    "https://www.beaufortinn.com/history/",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "bft-beaufort-inn-main",
      name: "The Beaufort Inn",
      website: "https://www.beaufortinn.com/wedding-venues-in-beaufort-sc",
      capacity: 100,
      rentalFee: 3529,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "The Inn's Main Inn building, built in 1897 by lawyer and state representative William Sidney Smith as a summer retreat for his family — post-emancipation by more than three decades, with no enslaved-labor or plantation history in the property's own telling (unlike the same inn's separately-marketed Tabby Place and Old Bay Marketplace spaces, both excluded from this list — see the file's own doc comment). Victorian-style architecture with heart-pine floors, gardens, courtyards, and verandas in the Historic Landmark District, walking distance to Waterfront Park. Full-wedding spend is reported starting around $3,529 for 50 guests; rentalFee above is that reported starting figure, marked estimated.",
      availabilityNotes: "Contact the Inn directly via beaufortinn.com and specifically confirm which building/space is being booked, given the property's other spaces' excluded history.",
      sourceUrls: [
        "https://www.beaufortinn.com/history/",
        "https://www.beaufortinn.com/wedding-venues-in-beaufort-sc",
        "https://www.wedding-spot.com/venue/12707/the-beaufort-inn/",
      ],
    },
    {
      key: "bft-waterfront-park",
      name: "Henry C. Chambers Waterfront Park",
      website: "https://www.cityofbeaufort.org/448/Reserve-A-City-Park",
      capacity: 200,
      estimated: true,
      styleNotes:
        "A city-owned public park directly on the Beaufort River, framed by the Woods Memorial Bridge and downtown's restaurants and shops — a purpose-built civic park, not a residence, so there's no plantation-era history to weigh at all. Hosts weddings and receptions regularly via city reservation, with a pavilion for events. No published flat rental fee; the city's park-reservation process sets a permit fee based on the specific space and event size.",
      availabilityNotes: "Contact the City of Beaufort's Events & Tour Operations Coordinator (rcarey@cityofbeaufort.org, 843-379-7063) for a date-specific reservation and fee.",
      sourceUrls: [
        "https://www.cityofbeaufort.org/448/Reserve-A-City-Park",
        "https://www.beaufort.com/henry-c-chambers-waterfront-park/",
        "https://www.alowcountrywed.com/blog/2018/henry-c-chambers-waterfront-park-wedding-in-beaufort-sc",
      ],
    },
    {
      key: "bft-cat-island-club",
      name: "Cat Island Club",
      website: "https://catislandclub.com/private-events/",
      capacity: 200,
      rentalFee: 4000,
      inHouseCatering: true,
      estimated: true,
      styleNotes:
        "A private country club on Lady's Island whose golf course (designed by George Cobb, completed by John LaFoy) opened in 1985 — a modern club facility, not a converted historic estate, so no plantation-era history to weigh. Modern event spaces accommodate groups of varying sizes; membership is not required to book an event here. No flat rental fee is published; rentalFee above is a rough estimate for a country-club event space of this type, marked estimated pending a direct quote.",
      availabilityNotes: "Contact the club directly via catislandclub.com for a date-specific quote and full capacity confirmation.",
      sourceUrls: [
        "https://catislandclub.com/private-events/",
        "https://catislandclub.com/",
        "https://www.weddingwire.com/biz/cat-island/750350f5ea5d2bc1.html",
      ],
    },
  ],
  scenario: {
    fixedCosts: 20100,
    perGuestCost: 90,
    travelCostPerGuest: 1070,
    attendanceRate: 0.8,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes The Beaufort Inn's $3,529 reported starting venue rental and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items — see the Washington DC file's scenario note for the full item list), rounded to $20,100. perGuestCost ($90) follows the same approach as Portland: The Knot's national $80/guest catering average plus roughly $10/guest for cake, favors and incidental rentals, since none of the three Beaufort venues publishes a single all-in per-guest catering figure. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
