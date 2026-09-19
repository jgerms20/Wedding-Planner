import type { DestinationSeed } from "../types";

/**
 * Gulf Shores / Orange Beach, AL.
 *
 * A domestic Gulf Coast beach finalist. Alabama has real, documented
 * plantation history (the Black Belt and the Mobile Bay/Tensaw River
 * corridor in particular), which is exactly why this destination was
 * researched with the standing rule in .claude/skills/wedding-research/
 * SKILL.md front of mind — but Gulf Shores and Orange Beach themselves are a
 * 20th-century beach-resort market, not part of that antebellum corridor,
 * and the market leans hard toward modern condo-resorts anyway. All three
 * venues below were built as beach resorts (Caribe Resort, a 2000s
 * condo-resort; The Beach Club Resort & Spa, a purpose-built resort village;
 * The Lodge at Gulf State Park, opened 2018 as a Hilton-flagged, storm-
 * resilient rebuild of the state park's former lodge) with no residential,
 * plantation, or enslaved-labor history of any kind. The historic Point
 * Clear/Mobile Bay properties (e.g., the Grand Hotel, built 1847) were
 * deliberately not considered for this destination precisely because that
 * older Mobile Bay corridor carries the antebellum-estate risk this
 * destination was chosen to avoid. Numbers below are sourced where a URL is
 * given; anything derived is flagged `estimated: true` (venues) or explained
 * in a note.
 */
export const gulfShoresOrangeBeachAl: DestinationSeed = {
  key: "gulf-shores-orange-beach-al",
  name: "Gulf Shores / Orange Beach, AL",
  country: "United States",
  countryCode: "US",
  region: "Gulf Shores, Orange Beach, Fort Morgan Peninsula",
  rank: 14,
  whyHere:
    "Joshua & Janel asked for Gulf Shores/Orange Beach as a domestic beach finalist — white-sand Gulf coastline and a real resort infrastructure built for weddings and group travel, no passport required, for a ~100-person list mostly on the East Coast.",
  notes:
    "Attendance is estimated at 0.81, in the lower half of the 80-85% 'local wedding' attendance band (pix.wedding; destify.com) — domestic and no passport, but Pensacola International's ~20 nonstop destinations is a noticeably smaller network than any of the Texas finalists, and it still requires an additional ~1-hour drive from the airport to the beach, which together push it below the Texas cities on this list.",
  travelCostPerGuestEstimate: 1010,
  lodgingPerNightEstimate: 180,
  attendanceRateEstimate: 0.81,
  weatherNotes:
    "Gulf Shores spring warms gradually and stays comfortable: March averages highs in the upper 60s to low 70s°F with lows in the mid-50s, April brings highs near 74°F/lows near 63°F, and May reaches highs around 81°F/lows near 70°F (weatherspark.com; gulfshores.com). The whole March-May window falls before Atlantic hurricane season (June 1-November 30, per NOAA) and before the region's hottest, most humid summer stretch, making spring one of the more comfortable times for an outdoor beach ceremony.",
  legalNotes:
    "Alabama has not issued traditional marriage licenses since Act 2019-340 took effect on August 29, 2019: there is no license, no officiant requirement, and no ceremony required by law. Instead, both parties complete a Marriage Certificate form and Affidavit (available from the county Probate Office or Alabama Department of Public Health), each signs their affidavit before an Alabama notary public, and the completed, notarized form is filed with any Alabama county's Probate Court (Baldwin County's is in Bay Minette, Foley, or Fairhope) within 30 days for the marriage to be legally recorded — no residency requirement and no waiting period. Baldwin County's fee is approximately $75. Couples who still want a ceremony (as Joshua and Janel presumably do) can have one performed by a friend, family member, or officiant of their choosing for the personal/ceremonial side, since it carries no separate legal weight under this system — but the legal paperwork itself must still be signed, notarized, and filed exactly as described above. Verify with the local authority or an attorney.",
  seasonNotes:
    "March-May sits in Gulf Shores/Orange Beach's spring shoulder season: lower rates and crowds than the June-August peak or the October National Shrimp Festival (which alone draws 300,000+ people, well outside this window), but March specifically overlaps college spring break, which brings crowds and a public-beach alcohol ban from March 1-April 28 (a public-beach rule, not one that reaches private resort event space) (gulfshores.com). The Hangout Music Festival, normally held in May, is not scheduled for 2026 and is expected to return in 2027 — worth checking whether a 2028 edition is announced and its dates before finalizing a May date, since it would tighten hotel and condo inventory across both towns if it falls nearby.",
  travelNotes:
    "Pensacola International (PNS), about 38 miles/roughly 1 hour from Gulf Shores via FL-292 W and AL-182 W, is the closest airport with meaningful nonstop service — around 20 nonstop destinations including Atlanta, Dallas, Denver, and Orlando via multiple carriers (national-park.com; ifly.com). There's no rail alternative and no realistic drive option for most East Coast guests, so this is a fly-plus-drive wedding for the whole list: a connection through a Southeast hub is likely for anyone not near a PNS nonstop city, followed by a rental car or shuttle for the last hour. Travel-cost math: $470 round-trip domestic airfare (BTS Q2 2025 average domestic round-trip fare, the same national figure used across the other US finalists) + 3 nights x $180/night (blended between Orange Beach hotel starting rates of roughly $124-150/night and the area's much higher overall short-term-rental average, weighted toward the hotel end since March-May is shoulder season well before the Memorial Day-Labor Day peak that drives condo/vacation-rental rates up) = $1,010 per guest.",
  sourceUrls: [
    "https://www.alabamapublichealth.gov/blog/2019/08/20.html",
    "https://www.agricolalaw.com/blog/2019/10/alabamas-new-marriage-license-law-and-how-it-impacts-your-wedding-plans/",
    "https://baldwincountyal.gov/government/probate-office/licenses/marriage-license",
    "https://weatherspark.com/m/13854/3/Average-Weather-in-March-in-Gulf-Shores-Alabama-United-States",
    "https://www.gulfshores.com/plan/weather/",
    "https://www.noaa.gov/tropical-cyclone-climatology",
    "https://www.gulfshores.com/blog/things-to-do/things-to-do-in-gulf-shores-in-march/",
    "https://www.gulfshores.com/events-calendar/annual-events-and-festivals/the-annual-national-shrimp-festival/",
    "https://www.national-park.com/the-4-closest-airports-to-gulf-shores-alabama/",
    "https://www.ifly.com/airports/pensacola-regional-airport/closest-airports",
    "https://www.bts.gov/newsroom/second-quarter-2025-average-air-fare-decreases-38-first-quarter-2025",
    "https://destify.com/blog/what-percentage-of-invited-guests-attend-a-destination-wedding/",
    "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
  ],
  venues: [
    {
      key: "gsob-caribe-resort",
      name: "Caribe Resort",
      website: "https://cariberesort.com/weddings/",
      capacity: 150,
      rentalFee: 6750,
      perGuestCost: 28,
      estimated: true,
      styleNotes:
        "A five-star condo-resort spread across 30 acres of the peninsula between the Gulf and the Intracoastal Waterway in Orange Beach — built as a resort development, no residential or plantation-era history to weigh. Event spaces include the B-C Breezeway, the Lazy River Deck, two pool decks, and an indoor space (D-100); an 11-hour rental includes tables, 150-250 white chairs, linens, and trolley transportation between condo buildings. The venue fee runs $3,000-$10,500 depending on space and date, plus $24-32/person for food — rentalFee above is the fee-range midpoint and perGuestCost the food-charge midpoint, both marked estimated. Weddings run mid-August through mid-May only (i.e., a spring 2028 date is within season), and the wedding party must book a minimum of 7 condos through Caribe Realty.",
      availabilityNotes: "Contact the venue directly via cariberesort.com for a date-specific quote and condo-block requirements.",
      sourceUrls: [
        "https://cariberesort.com/weddings/",
        "https://www.wedding-spot.com/venue/12860/caribe-resort/",
        "https://www.herecomestheguide.com/wedding-venues/alabama/caribe-resort",
      ],
    },
    {
      key: "gsob-the-beach-club",
      name: "The Beach Club Resort & Spa",
      website: "https://thebeachclub.spectrumresorts.com/",
      capacity: 150,
      inHouseCatering: true,
      estimated: true,
      styleNotes:
        "A secluded, purpose-built beach resort on 86 acres in Gulf Shores, designed around a village concept — no historic-residence or plantation-era history to weigh. Both indoor and outdoor event spaces accommodate 30-150 guests, comfortably fitting the couple's ~100-guest target. In-house planning, catering, and bar service are included, along with tables, chairs, and serving pieces, and the resort offers group hotel rates for wedding guests. No flat rental fee or per-guest catering figure is published.",
      availabilityNotes: "Contact the resort directly via thebeachclub.spectrumresorts.com for a date-specific quote.",
      sourceUrls: [
        "https://thebeachclub.spectrumresorts.com/",
        "https://www.weddingwire.com/biz/the-beach-club-gulf-shores/7d6ca88573b1380b.html",
      ],
    },
    {
      key: "gsob-the-lodge-gulf-state-park",
      name: "The Lodge at Gulf State Park, a Hilton Hotel",
      website: "https://lodgeatgulfstatepark.com/meetings-events/",
      capacity: 500,
      inHouseCatering: true,
      lodgingOnSite: true,
      estimated: true,
      styleNotes:
        "Opened in 2018 as a storm-resilient, Hilton-flagged rebuild of Gulf State Park's former lodge, on state parkland directly on the beach — a genuinely new building with no plantation-era or residential history of any kind. 40,000 sq ft of indoor/outdoor event space includes a 12,000 sq ft ballroom with floor-to-ceiling Gulf views, outdoor terraces, and a beach ceremony option, with total event capacity up to 500 — well above the couple's ~100-guest target, giving room for a spacious layout. No published wedding-specific package pricing was found; the hotel's events team quotes custom packages directly.",
      availabilityNotes: "Contact the hotel's events team at sales@lodgegsp.com or (251) 923-2918 for a date-specific quote.",
      sourceUrls: [
        "https://lodgeatgulfstatepark.com/meetings-events/",
        "https://www.hilton.com/en/hotels/pnslghh-the-lodge-at-gulf-state-park/events/",
        "https://www.cvent.com/venues/gulf-shores/hotel/the-lodge-at-gulf-state-park-a-hilton-hotel/venue-2a702850-3f9d-4d96-9d30-dcd4af0f8724",
      ],
    },
  ],
  scenario: {
    fixedCosts: 23300,
    perGuestCost: 115,
    travelCostPerGuest: 1010,
    attendanceRate: 0.81,
    notes:
      "fixedCosts (venue rental, planner, photo/video, music, decor/flowers, stationery, attire, misc for a ~100-guest wedding) takes Caribe Resort's $6,750 fee-range midpoint and adds the same national non-venue, non-catering baseline used across the other US finalists (~$16,550, built from The Knot's 2026 Real Weddings Study line items: planner $2,100, photographer $3,000 + partial videographer allowance, flowers $2,800, DJ $1,800, stationery ~$600, attire+beauty ~$2,900, transportation $1,100, wedding bands ~$1,400), rounded to $23,300. perGuestCost ($115) takes The Knot's national $80/guest catering average and adds Caribe's own $28/guest published per-head food charge (a beach-resort venue fee structure distinct from a flat catering price) plus roughly $10/guest for cake and favors. travelCostPerGuest matches travelCostPerGuestEstimate.",
  },
};
