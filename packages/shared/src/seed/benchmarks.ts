import type { CostBenchmarks } from "./types";

/**
 * National cost benchmarks for the budget module: headline averages, a
 * 12-category percent-of-budget breakdown, sub-event cost ranges, and
 * planner/couple-sourced tips. Numbers are sourced where a URL is given;
 * anything derived from a percentage-guidance range rather than a single
 * published figure says so in its own note, per the seed-data research
 * standard.
 *
 * Reddit access note: this research pass ran in a sandboxed environment
 * where outbound fetches to reddit.com/old.reddit.com (and in fact every
 * external domain tested via the page-fetch tool) were blocked by network
 * egress policy, and web searches scoped to site:reddit.com returned no
 * indexed Reddit results. The `tips` below therefore draw on WeddingWire's
 * user-submitted forum threads (the closest available analog to a Reddit
 * Q&A thread — real couples asking and answering each other) plus
 * planner/couple-bylined articles, several of which explicitly summarize
 * real Reddit threads (cited inline), rather than a direct reddit.com URL.
 */
export const benchmarks: CostBenchmarks = {
  averageUsWeddingCost: 34000,
  averageDestinationWeddingCost: 39000,
  averageGuestCount: 117,
  perGuestCateringUs: 80,
  categories: [
    {
      category: "Venue & catering",
      key: "venue_catering",
      percent: 43,
      percentLow: 45,
      percentHigh: 55,
      sortOrder: 1,
      note:
        "Planner guidance puts venue+catering at 45-55% of total spend; we use 43% here so the other 11 required categories (several of which The Knot's own per-item averages push above typical planner ranges) still sum to exactly 100%. The Knot's 2026 Real Weddings Study puts the average venue alone at $12,900 and average catering at $80/guest.",
      sourceUrls: [
        "https://giftlist.com/blog/wedding-budget-breakdown-by-percentage",
        "https://rosevow.com/planning/wedding-budget-breakdown-percentages",
        "https://www.theknot.com/content/average-cost-reception-venue",
        "https://www.theknot.com/content/average-cost-wedding-catering",
      ],
    },
    {
      category: "Photo & video",
      key: "photo_video",
      percent: 10,
      percentLow: 10,
      percentHigh: 12,
      sortOrder: 2,
      note:
        "The Knot's 2026 Real Weddings Study puts the average photographer at $3,000 and average videographer at $2,300 (37% of couples book one); blended, that's close to the 10-12% of budget that planner guidance assigns this category.",
      sourceUrls: [
        "https://www.theknot.com/content/average-cost-wedding-photographer",
        "https://www.theknot.com/content/average-cost-wedding-videographer",
        "https://giftlist.com/blog/wedding-budget-breakdown-by-percentage",
      ],
    },
    {
      category: "Attire & beauty",
      key: "attire_beauty",
      percent: 6,
      percentLow: 5,
      percentHigh: 8,
      sortOrder: 3,
      note:
        "The Knot's average wedding dress is $2,100 and average hair+makeup is about $480 (78% of brides hire a pro); combined with groom's attire this tracks the low-mid end of planner guidance's 5-8% range.",
      sourceUrls: [
        "https://www.theknot.com/content/average-cost-of-wedding-dress",
        "https://www.theknot.com/content/average-cost-wedding-hair-makeup",
      ],
    },
    {
      category: "Flowers & decor",
      key: "flowers_decor",
      percent: 8,
      percentLow: 8,
      percentHigh: 10,
      sortOrder: 4,
      note:
        "The Knot's 2026 Real Weddings Study puts average wedding flowers at $2,800, and the Study itself states most couples dedicate 8-10% of total budget to florals — we use the low end of that self-reported range.",
      sourceUrls: ["https://www.theknot.com/content/average-cost-wedding-flowers"],
    },
    {
      category: "Music & entertainment",
      key: "music_entertainment",
      percent: 6,
      percentLow: 5,
      percentHigh: 10,
      sortOrder: 5,
      note:
        "71% of couples book a DJ (The Knot 2026 average: $1,800) versus 12% who book a live band (average $4,500); the DJ figure, as the majority choice, anchors this category near the low end of planner guidance's 5-10% range.",
      sourceUrls: ["https://www.theknot.com/content/average-cost-wedding-band-dj"],
    },
    {
      category: "Stationery & postage",
      key: "stationery_postage",
      percent: 2,
      percentLow: 2,
      percentHigh: 3,
      sortOrder: 6,
      note:
        "The Knot's average stationery spend is $518-$530 for invitations; adding postage for ~100 guests (budgeted at a minimum of $1.50/invite per wedding-budget-mistake guidance) brings the category to roughly $650-700, in line with planner guidance's 2-3% range.",
      sourceUrls: [
        "https://www.theknot.com/content/average-cost-of-wedding-invitations",
        "https://www.bridalguide.com/planning/getting-started/budget/wedding-budget-mistakes",
      ],
    },
    {
      category: "Cake & desserts",
      key: "cake_desserts",
      percent: 2,
      sortOrder: 7,
      note: "The Knot's 2026 Real Weddings Study puts the average wedding cake at $540, about 1.6% of the $34,000 average total; rounded up slightly to account for a dessert bar or favors-adjacent sweets add-on.",
      sourceUrls: ["https://www.theknot.com/content/average-wedding-cost"],
    },
    {
      category: "Transportation",
      key: "transportation",
      percent: 3,
      sortOrder: 8,
      note: "The Knot's 2026 Real Weddings Study puts average wedding transportation at $1,100, about 3.2% of the $34,000 average total.",
      sourceUrls: ["https://www.theknot.com/content/average-wedding-cost"],
    },
    {
      category: "Rings",
      key: "rings",
      percent: 4,
      sortOrder: 9,
      note:
        "This is the wedding-day budget for the couple's wedding bands (not the engagement ring, which is typically a pre-engagement, separately tracked purchase) — industry survey data puts a his-and-hers band pair at roughly $1,100-$1,500, about 4% of the $34,000 average total.",
      sourceUrls: ["https://loveweddingbands.com/blogs/news/average-cost-his-and-hers-wedding-bands-2026"],
    },
    {
      category: "Planner & coordination",
      key: "planner_coordination",
      percent: 6,
      sortOrder: 10,
      note:
        "The Knot's 2026 Real Weddings Study reports a blended average of $2,100 across all planning-service tiers (day-of coordinator through full-service), about 6.2% of the $34,000 average total; a full-service planner alone averages $3,800-$5,500.",
      sourceUrls: [
        "https://www.theknot.com/content/how-much-do-wedding-planners-charge",
        "https://brite.co/blog/average-cost-of-wedding-planner/",
      ],
    },
    {
      category: "Gifts & favors",
      key: "gifts_favors",
      percent: 2,
      sortOrder: 11,
      note: "The Knot's 2026 Real Weddings Study puts average wedding favors/gifts at $460 per couple, about 1.4% of the $34,000 average total; rounded up slightly to include wedding-party thank-you gifts.",
      sourceUrls: ["https://www.theknot.com/content/average-cost-wedding-favors"],
    },
    {
      category: "Contingency",
      key: "contingency",
      percent: 8,
      percentLow: 5,
      percentHigh: 15,
      sortOrder: 12,
      note: "Planner guidance recommends holding 5-15% of total budget as an unallocated contingency reserve for surprises; 8% sits in the middle of that range once the 11 named categories above are set.",
      sourceUrls: [
        "https://giftlist.com/blog/wedding-budget-breakdown-by-percentage",
        "https://withjoy.com/blog/wedding-budget-breakdown-by-percentage-2/",
      ],
    },
  ],
  subEventEstimates: [
    {
      kind: "engagement_party",
      low: 800,
      high: 5000,
      note:
        "A small at-home or restaurant gathering runs $500-$1,500; a catered event at a rented venue runs $2,000-$5,000+. Guests aren't expected to bring a gift.",
      sourceUrls: [
        "https://paperlust.co/blog/how-to-plan-an-engagement-party/",
        "https://www.theknot.com/content/who-pays-for-engagement-party",
      ],
    },
    {
      kind: "bridal_shower",
      low: 300,
      high: 2000,
      note:
        "Hosting at home for simple refreshments runs as low as $10-15/guest; a venue-based shower runs $50-100/guest. For a mid-size guest list (15-25 close family/friends, not the full ~100-person wedding list) that spans roughly $300-2,000 total.",
      sourceUrls: [
        "https://www.ohsofancyparty.com/blogs/lets-get-fancy-tips-tricks-for-the-perfect-party/how-much-should-you-budget-for-a-bridal-shower",
        "https://weddings.costhelper.com/bridal-shower.html",
      ],
    },
    {
      kind: "groom_shower",
      low: 200,
      high: 1000,
      note:
        "No dedicated national cost dataset exists for a groom's/'man' shower; planners describe it as a casual, informal event (grilling, drinks, gift exchange) typically hosted at home or a groomsman's place, so this range is estimated by scaling the low end of the bridal-shower range down to reflect that lower-formality, no-venue-rental format.",
      sourceUrls: ["https://themanregistry.com/groom-101/man-showers-wedding-shower-just-for-the-groom/"],
    },
    {
      kind: "bachelor",
      low: 700,
      high: 2000,
      note:
        "Per-person trip cost. A local celebration averages about $738/person; a destination trip requiring flights averages roughly $1,500-2,000/person (and can run higher for a multi-day trip to a major party city).",
      sourceUrls: [
        "https://thegroomclub.com/how-much-does-an-average-bachelor-party-cost/",
        "https://www.theknot.com/content/bachelorette-party-weekend-cost",
      ],
    },
    {
      kind: "bachelorette",
      low: 750,
      high: 2000,
      note:
        "Per-person trip cost. The 2025 average across all trip types is about $1,300/person; a 1-2 day trip averages $1,135/person and a 3-4 day trip averages $1,630/person, while flying (versus driving) to the destination roughly doubles the per-person cost.",
      sourceUrls: [
        "https://withjoy.com/blog/bachelorette-party-budget-reality-check-what-you-actually-need/",
        "https://www.theknot.com/content/bachelorette-party-weekend-cost",
      ],
    },
    {
      kind: "joint_bachelor_bachelorette",
      low: 1100,
      high: 1600,
      note:
        "No dedicated dataset exists for a combined co-ed bachelor/bachelorette trip; estimated by blending the 2026 solo-trip averages (bachelorette ~$1,300/person, bachelor ~$1,500/person) and discounting roughly 10-15% for the group-size and shared-lodging savings planner sources describe for joint trips.",
      sourceUrls: [
        "https://withjoy.com/blog/bachelor-vs-bachelorette-parties-hidden-costs-traditions-revealed/",
        "https://letsbatch.com/blog/planning-a-joint-bachelor-and-bachelorette-party",
      ],
    },
    {
      kind: "premarital_counseling",
      low: 350,
      high: 900,
      note: "A typical 4-8 session package runs $90-175/hour; a 5-session package commonly totals $600-875, whether secular or faith-based (e.g. Pre-Cana).",
      sourceUrls: ["https://www.thumbtack.com/p/premarital-counseling-cost", "https://www.estestherapy.com/average-cost-of-premarital-counseling"],
    },
    {
      kind: "rehearsal_dinner",
      low: 1630,
      high: 4500,
      note:
        "The Knot's 2026 Real Weddings Study reports couples hosting 50 or fewer guests average $1,630, while those hosting 100+ guests average $3,139; per-person cost typically runs $55-150/head at a restaurant, which is why the top of this range extends past the reported guest-count averages for a larger or more upscale event.",
      sourceUrls: [
        "https://www.theknot.com/content/average-cost-rehearsal-dinner",
        "https://rockytopcatering.com/wedding-rehearsal-costs/",
      ],
    },
    {
      kind: "welcome_party",
      low: 2000,
      high: 6000,
      note:
        "A 2026 trend is hosting a larger, all-out-of-town-guest welcome party instead of a private rehearsal dinner, spreading a similar total budget across more heads at a lower per-head format — e.g. a $40/head appetizer reception for 80 guests (~$3,200) versus an $85/head plated dinner for 35. Scaled toward a ~100-guest welcome party, that implies roughly $2,000-6,000 depending on format and bar service.",
      sourceUrls: ["https://www.greatevent.com/wedding-venue-cost-2026-guide/"],
    },
    {
      kind: "after_party",
      low: 1000,
      high: 3500,
      note:
        "No dedicated dataset exists for a late-night post-reception event; estimated by scaling the published welcome-party light-apps-and-drinks rate ($20-50/head) to a smaller late-night headcount (roughly 40-70 of ~100 guests typically stay), plus a $700-1,400 DJ time-extension add-on.",
      sourceUrls: [
        "https://www.greatevent.com/wedding-venue-cost-2026-guide/",
        "https://liventgroup.com/cost-of-dj-for-wedding/",
      ],
    },
    {
      kind: "brunch",
      low: 1000,
      high: 4000,
      note:
        "A lunch/brunch event typically runs about 30% cheaper per person than an equivalent evening dinner event; for a smaller post-wedding guest list (family and out-of-town guests staying an extra day, not the full ~100-person list) that puts a catered brunch in roughly the $1,000-4,000 range depending on venue and headcount.",
      sourceUrls: ["https://www.zola.com/expert-advice/how-much-does-a-rehearsal-dinner-cost"],
    },
    {
      kind: "second_reception",
      low: 25000,
      high: 40000,
      note:
        "A full reception-scale event (minus the ceremony) held at home for guests who couldn't travel to a destination wedding — planner guidance is to budget it like a full wedding day, not a small party.",
      sourceUrls: ["https://www.theknot.com/content/throwing-a-second-party-back-home"],
    },
    {
      kind: "sangeet",
      low: 5000,
      high: 20000,
      note:
        "A pre-wedding music-and-dance celebration, a South Asian wedding tradition, hosted by either or both families. Published venue costs run $50-300+/guest with a commonly cited ~$15,000 typical spend, but that figure assumes the 200-800-guest scale common to this tradition; scaled down here for a couple planning around 100 guests overall.",
      sourceUrls: ["https://melamatch.com/budget/sangeet"],
    },
  ],
  tips: [
    {
      text: "Send save-the-dates 10-12 months out for a destination wedding (longer for an international or long-haul destination) so guests can lock in flights and request time off before prices climb.",
      sourceUrl: "https://paperlust.co/blog/when-to-send-save-the-dates/",
      category: "Timeline",
    },
    {
      text: "Negotiate a hotel room block 9-12 months ahead for roughly 20-30% of the expected guest count — hotels typically discount 10-25% off the standard rate for a committed block, but unfilled blocks get released back to the public, so early guest commitment matters.",
      sourceUrl: "https://withjoy.com/blog/how-to-book-a-hotel-room-block-for-your-wedding-2026-guide/",
      category: "Guests & travel",
    },
    {
      text: "Budget the guest list around a realistic RSVP-yes-and-show rate, not the invite count: local weddings run 80-85% attendance, but travel weddings see decline rates of 30-40% versus 15-20% for a local wedding, and even confirmed 'yes' guests have a 5-10% last-minute drop-off.",
      sourceUrl: "https://www.pix.wedding/what-percentage-of-wedding-guests-actually-attend",
      category: "Guests & travel",
    },
    {
      text: "For a wedding abroad, get legally married at the courthouse at home before or after the trip and treat the destination ceremony as symbolic — this is what most US couples marrying overseas actually do, since it sidesteps foreign residency waits, translated-document requirements, and paperwork most people don't discover until they're deep into planning.",
      sourceUrl: "https://www.sincerelypete.com/sincerelypeteblog/get-legally-married-in-the-us-before-or-after-your-destination-wedding",
      category: "Legal",
    },
    {
      text: "Consider a welcome party open to every out-of-town guest instead of a rehearsal dinner limited to the wedding party — it spreads a similar total budget across more people at a lower per-head format (e.g. a $40/head appetizer reception for 80 versus an $85/head plated dinner for 35).",
      sourceUrl: "https://www.greatevent.com/wedding-venue-cost-2026-guide/",
      category: "Budget",
    },
    {
      text: "Rehearsal dinner cost scales hard with guest count — couples hosting 50 or fewer guests spend about $1,630 on average, while those with 100+ guests average $3,139 — so decide that guest list deliberately rather than defaulting to 'everyone from the wedding.'",
      sourceUrl: "https://www.theknot.com/content/average-cost-rehearsal-dinner",
      category: "Budget",
    },
    {
      text: "Budget postage as its own line item: figure at least $1.50 per outgoing wedding invitation once the outer envelope, inserts, and a stamped RSVP card are all accounted for, and expect more for an oversized or international mailing.",
      sourceUrl: "https://www.bridalguide.com/planning/getting-started/budget/wedding-budget-mistakes",
      category: "Budget",
    },
    {
      text: "Give any vendor quote over $5,000 a full month of 'cooling off' between the meeting and the signature — decisions made in the first weeks of planning, in the excitement of getting engaged, often look different a month later.",
      sourceUrl: "https://www.bridalguide.com/planning/getting-started/budget/wedding-budget-mistakes",
      category: "Vendors",
    },
    {
      text: "Flowers are the single most common post-wedding budget regret among real brides — they look incredible for a few hours and are gone (torn down, composted) by the next morning — so couples who keep florals modest and splurge elsewhere tend not to regret it.",
      sourceUrl: "https://www.womangettingmarried.com/brides-wedding-budget-regrets/",
      category: "Budget",
    },
    {
      text: "Book and secure venues and key vendors early for a spring date: Washington DC-area venues alone book about 454 days (roughly 15 months) out on average for popular spring dates, and that lead time only gets longer for a destination wedding.",
      sourceUrl: "https://www.jennaleighphotography.net/blog/top-25-dc-wedding-venues-cost-comparison-september-2025/",
      category: "Timeline",
    },
    {
      text: "Before assuming guests will just 'figure out' travel, know what you're actually asking: one groomsman's real account described nearly $4,000 in flights and hotel costs to attend a single destination wedding — a useful gut-check for how a smaller travel ask (or a travel subsidy) changes who can say yes.",
      sourceUrl: "https://www.aol.com/groomsman-struggles-tell-friend-cant-210531761.html",
      category: "Guests & travel",
    },
    {
      text: "If guests are also expected to pay to attend wedding-weekend events (a welcome party, an activity day), expect real pushback — wedding-forum consensus is that this reads as 'tacky' on top of the travel cost guests are already covering, and it's worth budgeting those events as hosted, not ticketed.",
      sourceUrl: "https://www.aol.com/lifestyle/bride-groom-charging-guests-attend-095000039.html",
      category: "Guests & travel",
    },
    {
      text: "Set fare alerts and encourage guests to book flights the moment save-the-dates go out: domestic round-trip fares average $470-520 nationally, but that number swings by hundreds of dollars depending on how far in advance guests book.",
      sourceUrl: "https://www.bts.gov/newsroom/first-quarter-2026-average-air-fare-increases-47-fourth-quarter-2025",
      category: "Guests & travel",
    },
    {
      text: "A day-of coordinator is one of the cheapest ways to buy back stress on the wedding day: the blended national average across all planning-service tiers is about $2,100, well below the $3,800-5,500 a full-service planner runs, but it still means someone besides the couple or their parents is managing the timeline.",
      sourceUrl: "https://www.theknot.com/content/how-much-do-wedding-planners-charge",
      category: "Vendors",
    },
    {
      text: "Flag expected wedding-party costs (travel, attire, a bachelor/bachelorette trip) when asking someone to be in the wedding, not after — bridesmaid dresses alone average $128-140 each in the Northeast/Mid-Atlantic, on top of any destination travel.",
      sourceUrl: "https://www.theknot.com/content/average-bridesmaid-dress-cost",
      category: "Budget",
    },
    {
      text: "Around Washington DC's Cherry Blossom Festival (typically late March into early April), the event draws over 1.5 million visitors and pushes hotel packages well above normal spring rates — worth avoiding that exact window unless the blossoms themselves are the point, since venues also need to be booked roughly a year ahead to guarantee it.",
      sourceUrl: "https://washingtonian.com/2026/03/13/15-dc-hotel-packages-for-cherry-blossom-season/",
      category: "Timeline",
    },
    {
      text: "A lunch or brunch reception instead of an evening dinner event runs roughly 30% cheaper per person for the same guest list — worth considering for a welcome event or a next-day send-off brunch.",
      sourceUrl: "https://www.zola.com/expert-advice/how-much-does-a-rehearsal-dinner-cost",
      category: "Budget",
    },
    {
      text: "Publish flight, hotel-block and local-transportation details on the wedding website as soon as save-the-dates go out — guests weighing whether they can make a destination trip decide early, based on exactly those three answers, well before a formal invitation with an RSVP date exists.",
      sourceUrl: "https://zola.com/expert-advice/invites-paper/save-the-dates/what-to-expect-after-sending-save-the-dates",
      category: "Guests & travel",
    },
    {
      text: "Set aside 10-20% of a gown's purchase price for alterations, rising to 30% for a heavily embellished or structurally complex fabric — a $2,000 dress means budgeting $200-400 for fit, not treating alterations as a rounding error after the big purchase.",
      sourceUrl: "https://www.zola.com/expert-advice/how-much-do-wedding-dress-alterations-cost",
      category: "Attire",
    },
    {
      text: "Book the first alteration fitting 3-4 months before the wedding: a typical gown needs 2-3 fittings over 2-3 months to get the hem, bustle and bodice right, and a heavily structured or embellished dress needs even more lead time than that.",
      sourceUrl: "https://www.zola.com/expert-advice/how-much-do-wedding-dress-alterations-cost",
      category: "Attire",
    },
    {
      text: "Book 8 hours of wedding-day photography as the default for a mid-size (100-150 guest) wedding — enough for the tail end of getting ready, the ceremony, and the first part of the reception. Scale down to 4-5 hours for a micro wedding, or 2-4 for an elopement.",
      sourceUrl: "https://www.stephpowellcreative.com/blog/how-many-hours-should-you-book-your-wedding-photographer",
      category: "Photography & video",
    },
    {
      text: "How many photography hours you actually need depends more on the day's logistics than the guest count — count the separate locations (getting-ready spot, ceremony site, reception venue) and budget real travel time between each, since more locations quietly eats into coverage time.",
      sourceUrl: "https://www.forthelovedphotography.com/blog/howmanyhoursofphotographyyoureallyneed",
      category: "Photography & video",
    },
    {
      text: "Plated dinner service runs $70-150+ per person versus $40-80 for a buffet — mostly a staffing difference (roughly one server per 8-10 guests for plated, one per 20-25 for buffet) rather than a difference in the food itself.",
      sourceUrl: "https://weddingtipcalculator.com/blog/buffet-vs-plated-wedding-cost/",
      category: "Food & drink",
    },
    {
      text: "Budget bar service as its own line, not an afterthought: a full open bar runs $40-90 per person nationally (beer-and-wine-only versions run $25-45), which for 100 guests can mean $4,000-9,000 before the typical 20-25% service charge and tax on top of the quoted subtotal.",
      sourceUrl: "https://www.theknot.com/content/open-bar-wedding-cost",
      category: "Food & drink",
    },
    {
      text: "For a destination wedding specifically, lean toward extending a plus-one even where local-wedding etiquette wouldn't strictly require one — asking someone to travel internationally or cross-country alone is a bigger ask than a local plus-one — and apply whatever rule is set to every guest equally to avoid the appearance of favoritism.",
      sourceUrl: "https://www.archweddingstudio.com/blog/2026/1/3/how-to-handle-the-plus-one-conversation-for-destination-weddings",
      category: "Etiquette",
    },
    {
      text: "Send thank-you notes within three months of the wedding (or within three months of receiving any gift that arrives after), not the old one-year guideline — modern etiquette has compressed the traditional window considerably.",
      sourceUrl: "https://www.theknot.com/content/canthank-you-notes-ever-be-overdue",
      category: "Etiquette",
    },
  ],
  sourceUrls: [
    "https://www.businesswire.com/news/home/20260218045442/en/The-Knot-Worldwide-Unveils-2026-Real-Weddings-Study",
    "https://www.theknot.com/content/average-wedding-cost",
    "https://www.theknot.com/content/average-destination-wedding-cost",
    "https://www.zola.com/expert-advice/whats-the-average-cost-of-a-wedding",
    "https://giftlist.com/blog/wedding-budget-breakdown-by-percentage",
    "https://rosevow.com/planning/wedding-budget-breakdown-percentages",
  ],
};
