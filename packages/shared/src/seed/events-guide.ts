/**
 * Events guidance, researched with sources (see the wedding-research skill). Customs are framed as
 * tradition next to what couples actually do now — never as rules. Party ideas exclude anything
 * plantation-adjacent (the couple's standing rule), which is why a Myrtle Beach golf idea is absent.
 *
 * Every row cites one page. The research environment couldn't load these sites directly, so each
 * URL and claim was confirmed through search results scoped to that site.
 */

export interface Custom {
  topic: string;
  traditionallyOrganizes: string;
  traditionallyPays: string;
  howCouplesDoItNow: string;
  sourceUrl: string;
}

export interface PartyIdea {
  title: string;
  description: string;
  /** A source-backed per-person range, or undefined when the source didn't give one. */
  roughCostPerPerson?: string;
  sourceUrl: string;
}

export type PartyKind = "bachelor" | "bachelorette" | "joint_bachelor_bachelorette";

export const CUSTOMS: Custom[] = [
  {
    topic: "Engagement party",
    traditionallyOrganizes: "Bride's parents (first right to host)",
    traditionallyPays: "Bride's parents",
    howCouplesDoItNow: "Either family, close friends, or the couple themselves now host, and whoever hosts covers food, drinks, decor and venue. For a destination wedding it is usually a hometown party so people who can't travel still celebrate.",
    sourceUrl: "https://www.theknot.com/content/who-pays-for-engagement-party",
  },
  {
    topic: "Bridal shower",
    traditionallyOrganizes: "Maid of honor with the bridesmaids",
    traditionallyPays: "The host(s), usually the maid of honor; bridesmaids may chip in on decor and favors",
    howCouplesDoItNow: "Anyone who offers can host, including the bride's mother or other relatives; the host covers food, games, decor and favors. The one person who traditionally should not host is the bride herself.",
    sourceUrl: "https://www.theknot.com/content/who-pays-for-the-bridal-shower",
  },
  {
    topic: "Who hosts showers: friends vs. family",
    traditionallyOrganizes: "Friends or attendants, not immediate family",
    traditionallyPays: "Whoever hosts",
    howCouplesDoItNow: "Family hosting was long seen as a faux pas because it could look like the family was asking for gifts; Emily Post now says nearly anyone except the couple may host, and family often steps in (e.g. a future mother-in-law hosting in her hometown, or when the bridal party is spread out). Coordinate so hosts aren't stepping on each other.",
    sourceUrl: "https://emilypost.com/advice/shower-etiquette",
  },
  {
    topic: "Couples shower (Jack and Jill)",
    traditionallyOrganizes: "Wedding party members, friends, and/or family",
    traditionallyPays: "The host(s); co-hosts often split costs",
    howCouplesDoItNow: "Co-ed showers for both partners are popular, and some couples plan and pay for their own. Hosts often pick a venue so costs and cleanup are shared, with formats like a boozy brunch, backyard barbecue or stock-the-bar party.",
    sourceUrl: "https://www.theknot.com/content/couple-bridal-shower-basics",
  },
  {
    topic: "Groom's shower",
    traditionallyOrganizes: "When held: attendants, the bride's mother and/or the groom's mother",
    traditionallyPays: "The host(s)",
    howCouplesDoItNow: "A shower just for the groom is uncommon. The trend is toward co-ed Jack-and-Jill showers that include both partners and both sides' friends and family; when the groom's mother co-hosts, his aunts, cousins and close family friends usually get invited.",
    sourceUrl: "https://www.zola.com/expert-advice/who-do-you-invite-to-a-wedding-shower-from-the-grooms-side",
  },
  {
    topic: "Who gets invited to pre-wedding parties",
    traditionallyOrganizes: "The host, checking the list with the couple",
    traditionallyPays: "n/a",
    howCouplesDoItNow: "The long-held etiquette norm is that anyone invited to a shower or other pre-wedding party should also be invited to the wedding; the usual exception is an office shower thrown by coworkers. With multiple showers, invite different guests to each, with close family and the wedding party the ones who might attend more than one.",
    sourceUrl: "https://emilypost.com/advice/who-to-invite-to-the-wedding-and-parties",
  },
  {
    topic: "Bachelor party",
    traditionallyOrganizes: "Best man with the groomsmen",
    traditionallyPays: "Attendees split the cost and cover the groom's share",
    howCouplesDoItNow: "Everyone except the groom splits costs evenly and pays their own travel and lodging. For a far-off or expensive destination the groom often pays his own travel or chips in for lodging; talk budgets openly first.",
    sourceUrl: "https://www.theknot.com/content/who-pays-for-bachelor-and-bachelorette-parties",
  },
  {
    topic: "Bachelorette party",
    traditionallyOrganizes: "Maid of honor with the bridesmaids",
    traditionallyPays: "Attendees split costs; the group often covers the bride's share",
    howCouplesDoItNow: "Each attendee pays their own travel, lodging, food and activities; the bride typically covers her own transportation and lodging for an out-of-town trip, and the group covering her other costs is a bonus, not an expectation. Start with a budget conversation.",
    sourceUrl: "https://www.zola.com/expert-advice/who-pays-for-the-bachelorette-party",
  },
  {
    topic: "Bridesmaid and groomsmen attire",
    traditionallyOrganizes: "The couple chooses the style",
    traditionallyPays: "Each attendee pays for their own dress or suit/tux",
    howCouplesDoItNow: "Attendees still usually buy or rent their own outfits, but couples increasingly contribute to or fully cover the cost, especially when a friend is under financial strain. Tell people the expected cost up front.",
    sourceUrl: "https://www.zola.com/expert-advice/who-pays-for-the-groomsmen-suits",
  },
  {
    topic: "Wedding party travel and lodging (destination wedding)",
    traditionallyOrganizes: "Each attendee books their own",
    traditionallyPays: "Attendees pay their own travel and lodging",
    howCouplesDoItNow: "Attendees usually pay their own airfare and rooms, but at destination or small weddings many couples cover or chip in on wedding-party rooms as a thank-you for the big financial ask.",
    sourceUrl: "https://www.theknot.com/content/who-pays-for-wedding-party-accommodations",
  },
  {
    topic: "Guest travel and lodging (destination wedding)",
    traditionallyOrganizes: "Guests book their own; the couple arranges room blocks",
    traditionallyPays: "Guests",
    howCouplesDoItNow: "Guests expect to pay their own airfare and hotel, while the couple provides lodging options and hotel blocks (which cost the couple nothing to reserve) and shares estimated costs early via the save-the-date and wedding website. Some couples subsidize travel to lift attendance.",
    sourceUrl: "https://www.theknot.com/content/destination-weddings-who-pays",
  },
  {
    topic: "Welcome party (destination weddings)",
    traditionallyOrganizes: "Whoever is hosting the wedding",
    traditionallyPays: "The couple, or the side of the family not paying for the wedding",
    howCouplesDoItNow: "Welcome parties are strongly encouraged for destination weddings and are usually paid for by the couple; if it replaces the rehearsal dinner, the groom's parents may pay. A formal written invitation implies you are hosting, so don't ask guests to pay.",
    sourceUrl: "https://www.theknot.com/content/wedding-welcome-party-basics",
  },
  {
    topic: "Rehearsal dinner",
    traditionallyOrganizes: "Groom's parents",
    traditionallyPays: "Groom's family",
    howCouplesDoItNow: "Couples paying for their own wedding often host it themselves or split it with parents; if one family pays for the wedding, the other frequently offers to cover this dinner. At destination weddings it is often merged into a larger welcome party.",
    sourceUrl: "https://www.theknot.com/content/mandatory-wedding-rehearsal-dinner",
  },
  {
    topic: "Wedding ceremony and reception",
    traditionallyOrganizes: "Bride's family (as hosts)",
    traditionallyPays: "Bride's family",
    howCouplesDoItNow: "Any split works: the couple paying for everything, both families splitting it, or a three-way split between the couple and each family. Emily Post notes the wedding belongs to the couple whoever pays, and that asking guests to fund the budget is the one thing to avoid.",
    sourceUrl: "https://emilypost.com/advice/wedding-expenses-who-pays-for-what",
  },
  {
    topic: "Officiant fee and marriage license",
    traditionallyOrganizes: "The groom",
    traditionallyPays: "Groom and his family (fee, tip and license)",
    howCouplesDoItNow: "Most couples now fold the officiant fee into the shared wedding budget. For a destination wedding, check whether the officiant's travel is extra and whether a legal ceremony at home is simpler (verify with the county / an attorney).",
    sourceUrl: "https://www.theknot.com/content/what-grooms-family-traditionally-pays-for",
  },
  {
    topic: "Wedding-day transportation",
    traditionallyOrganizes: "Bride's family",
    traditionallyPays: "Bride's family for the wedding party; groom's family for the groom and best man",
    howCouplesDoItNow: "Today whoever is funding the wedding covers it, often the couple. At destination weddings couples commonly provide shuttles between the hotel and the ceremony and reception sites, and sometimes airport pickups.",
    sourceUrl: "https://www.theknot.com/content/wedding-budget-who-pays-for-what",
  },
  {
    topic: "Morning-after brunch",
    traditionallyOrganizes: "Bride's family",
    traditionallyPays: "Bride's family (whoever hosts pays)",
    howCouplesDoItNow: "Most often the newlyweds host and pay, with parents or a friend sometimes stepping in as a gift. If you don't want to pay, don't send invitations; just let people know when you'll be at the hotel restaurant.",
    sourceUrl: "https://www.theknot.com/content/where-to-begin-planning-the-postwedding-brunch",
  },
  {
    topic: "Honeymoon",
    traditionallyOrganizes: "The groom",
    traditionallyPays: "Groom and his family",
    howCouplesDoItNow: "Most couples now save for the honeymoon together, and many add a honeymoon fund to their registry so guests can gift experiences like a sunset cruise or a dinner.",
    sourceUrl: "https://www.theknot.com/content/who-pays-for-the-honeymoon",
  },
];

export const PARTY_IDEAS: Record<PartyKind, PartyIdea[]> = {
  bachelor: [
    {
      title: "Casino weekend in Las Vegas",
      description: "Two nights on the Strip or downtown with tables, a pool day and one club night. Bottle service usually runs $200-300 per person on top of a base budget, and group transport is about $20 each.",
      roughCostPerPerson: "$400-650 for a 2-night weekend (excl. flights and gambling)",
      sourceUrl: "https://gxptours.com/las-vegas-bachelor-party/",
    },
    {
      title: "Atlantic City casino and boardwalk weekend",
      description: "A drivable East Coast alternative to Vegas: casino nights, boardwalk arcades, a steak dinner in the Knife and Fork Inn's private room, and a climb up the Absecon Lighthouse. Cheaper table minimums in the morning.",
      sourceUrl: "https://www.theknot.com/content/atlantic-city-bachelor-party",
    },
    {
      title: "Casino night at MGM National Harbor (DC area)",
      description: "A closer-to-home casino resort with 125,000+ sq ft of tables and slots, a poker room, a theater for comedy or concerts, and dueling-piano and bar options at National Harbor for the rest of the night.",
      sourceUrl: "https://www.nationalharbor.com/blog/bachelor-party/",
    },
    {
      title: "Rented casino night at a house or party room",
      description: "Hire dealer-staffed tables and play for chips and prizes instead of travelling: blackjack with a dealer from about $275, roulette from $365, craps from $825, and most whole events land between $500 and $5,000, split across the group.",
      sourceUrl: "https://www.acesup.com/how-much-casino-party-rentals-cost/",
    },
    {
      title: "All-inclusive bachelor weekend in Cancun",
      description: "Resorts like Breathless Cancun Soul sell bachelor add-on packages (tequila on arrival, a group dinner, a reserved nightclub table), so food and drinks are already covered. East Coast flights are short.",
      sourceUrl: "https://paradiseweddings.com/blog/bachelor-party-cancun/",
    },
    {
      title: "Golf weekend in Palm Springs or Fort Lauderdale",
      description: "Palm Springs has 100+ courses plus casinos and a lively bar scene; Fort Lauderdale has 40+ courses including more affordable ones like Colony West. Tee off in the morning and spend the evenings out.",
      sourceUrl: "https://www.theknot.com/content/golf-bachelor-party",
    },
    {
      title: "Private deep-sea fishing charter",
      description: "Book a whole boat for a half day out of Miami, Destin or Port Canaveral. Once you have four or more guys, a private charter usually beats buying seats on a shared party boat.",
      roughCostPerPerson: "~$150 (a ~$900 private half-day split six ways)",
      sourceUrl: "https://chooseyourcharter.com/guides/deep-sea-fishing-cost",
    },
    {
      title: "Pro sports game and steakhouse dinner",
      description: "Tickets to a game (tailgate included) followed by a nice steakhouse dinner. A classic one-day format that works in any big city.",
      sourceUrl: "https://www.zola.com/expert-advice/bachelor-party-ideas",
    },
    {
      title: "Axe throwing, go-karts or paintball day",
      description: "A low-cost local afternoon of friendly competition, which also works well for friends who don't drink. Finish at a bar or with a poker night at someone's place.",
      sourceUrl: "https://www.zola.com/expert-advice/bachelor-party-ideas",
    },
    {
      title: "Local brewery crawl",
      description: "Line up two to four craft breweries for flights or a guided tour, with a designated driver or party bus. An easy, cheaper option close to home.",
      sourceUrl: "https://www.zola.com/expert-advice/bachelor-party-ideas",
    },
    {
      title: "New Orleans weekend",
      description: "Oysters at Acme Oyster House (there's a 15-dozen challenge), betting on the horses at the historic Fair Grounds Race Course, and bowling with live music at Rock 'n' Bowl. New Orleans is also on your shortlist, so it can double as a scouting trip.",
      sourceUrl: "https://www.neworleans.com/weddings/pre-post-wedding-events/bachelor-parties/",
    },
    {
      title: "Kentucky Bourbon Trail",
      description: "Base in Louisville and hire a driver or a full-service guide to take the group between distilleries, with Bardstown as the heart of it. Nobody has to drive, and the guide handles the reservations.",
      roughCostPerPerson: "$250-400 a day for a full-service guided tour",
      sourceUrl: "https://mybourbontrailplan.com/bourbon-trail-bachelor-party-guide.html",
    },
    {
      title: "Atlanta: Topgolf, barbecue and a speakeasy",
      description: "An afternoon at Topgolf, dinner at Fox Bros Bar-B-Q, then the Red Phone Booth speakeasy (you walk in through a red phone booth). A short drive or flight for most of your list.",
      sourceUrl: "https://www.theknot.com/content/atlanta-bachelor-party",
    },
  ],
  bachelorette: [
    {
      title: "Nashville weekend",
      description: "Free-entry honky-tonks on Broadway, a party bus ($30-60 each for two hours) or a pontoon cruise, and group dinners. Splitting a house in East Nashville is far cheaper than downtown hotels.",
      roughCostPerPerson: "$450-1,100 for 2 nights (excl. flights)",
      sourceUrl: "https://pontoonsaloontn.com/blog/nashville-bachelorette-party-budget/",
    },
    {
      title: "Scottsdale spa and pool weekend",
      description: "Resort pool days, spa treatments, brunch in Old Town and a desert ATV or hot-air-balloon outing. Group size drives the cost, since rentals and activities split more ways.",
      roughCostPerPerson: "$470-990 for 3 nights (sum of source's lodging, food, activity and local transport ranges; excl. flights)",
      sourceUrl: "https://www.azadventures.com/a-comprehensive-guide-to-the-average-cost-of-a-bachelorette-party-in-scottsdale/",
    },
    {
      title: "Miami boat day",
      description: "Charter a captained boat or catamaran for a sandbar and swim afternoon, then go out in South Beach. Smaller boats run about $100-200/hour and mid-size catamarans $250-500/hour, usually with a 2-4 hour minimum.",
      sourceUrl: "https://www.getmyboat.com/journal/destinations/miami-bachelorette-boat-party-guide/",
    },
    {
      title: "Las Vegas casino and dayclub weekend",
      description: "Shared rooms on the Strip, one dayclub, a nightclub or two (often free for women on guest lists) and a party-bus crawl; stay near Fremont Street for cheaper drinks and free live bands.",
      roughCostPerPerson: "$500-1,000 for 2 nights (excl. flights)",
      sourceUrl: "https://guides.wepartynow.com/las-vegas/las-vegas-bachelorette-party/",
    },
    {
      title: "All-inclusive Cancun getaway",
      description: "Two nights at an all-inclusive with a resort bachelorette package (group photo shoot, a reserved nightclub table, a group dinner). East Coast flights are short and most food and drink is covered.",
      roughCostPerPerson: "~$520-1,000 incl. East Coast flights (sum of source's flight, shared-room and food ranges)",
      sourceUrl: "https://paradiseweddings.com/blog/bachelorette-party-cancun/",
    },
    {
      title: "Old San Juan, Puerto Rico (no passport needed)",
      description: "Explore El Morro and the colorful streets, take a private boat to different beaches, do a rum distillery tasting, and go salsa dancing at night in Old San Juan or La Placita.",
      sourceUrl: "https://www.theknot.com/content/puerto-rico-bachelorette-party",
    },
    {
      title: "Wine country or winery tour day",
      description: "Hire a party bus or tour to four or five wineries with lunch included, either somewhere nearby or in Napa/Sonoma.",
      sourceUrl: "https://www.theknot.com/content/winery-bachelorette-party",
    },
    {
      title: "Spa day or spa weekend",
      description: "Book a group treatment package or a private pool cabana with champagne, or keep it at home with an at-home spa night for five to ten friends.",
      sourceUrl: "https://www.theknot.com/content/spa-bachelorette-party-ideas",
    },
    {
      title: "At-home paint-and-sip or cooking class",
      description: "Follow a paint-and-sip tutorial with favorite drinks, hire a personal chef for a lesson in someone's kitchen, or do a make-your-own-pizza night. One of the cheapest options.",
      sourceUrl: "https://www.theknot.com/content/planning-a-budget-bachelorette-party",
    },
    {
      title: "Dance class and karaoke night",
      description: "Hire an instructor for a hip-hop, heels or salsa class, then take over a karaoke room. Karaoke usually costs less and is less crowded than a club.",
      sourceUrl: "https://www.zola.com/expert-advice/affordable-bachelorette-party-ideas",
    },
    {
      title: "Charleston harbor boat weekend",
      description: "A private party boat or harbor cruise, brunch, and King Street at night. Lodging runs about $150-400+ each for the weekend and a private boat about $450-800+ for the whole group; leave room for Charleston's 2% hospitality tax and 15-20% tips for the captain.",
      sourceUrl: "https://www.badgirlsyoga.com/blog/charleston-bachelorette-party-cost",
    },
    {
      title: "Tulum villa and cenote weekend",
      description: "Split a private villa, swim in the cenotes, and book a beach club or private chef. A private cenote party for about 15 people costs $1,800-3,500 for the group.",
      roughCostPerPerson: "$600-1,200 all-in for 4 nights",
      sourceUrl: "https://www.thebeachplanner.com/tulum-bachelorette-itinerary/",
    },
  ],
  joint_bachelor_bachelorette: [
    {
      title: "Co-ed casino night",
      description: "Rent dealer-staffed blackjack, roulette and craps tables for a house or party room so both crews play for chips and prizes. It's one shared bill ($500-5,000 total depending on tables) instead of two trips.",
      sourceUrl: "https://www.acesup.com/how-much-casino-party-rentals-cost/",
    },
    {
      title: "Joint Nashville bach weekend",
      description: "Both wedding parties on one trip: a BACH party river cruise, axe throwing, karaoke in Printer's Alley and neighborhood hopping. A bigger group makes boats and rentals cheaper per person.",
      sourceUrl: "https://pontoonsaloontn.com/blog/your-guide-to-joint-bachelor-and-bachelorette-parties-in-nashville/",
    },
    {
      title: "Separate-then-together lake house weekend",
      description: "Rent a lake house; each group does its own thing Friday and Saturday day, then everyone merges for one big Saturday night. Sharing one party bus and a room block keeps costs down.",
      sourceUrl: "https://www.theknot.com/content/how-to-have-coed-bachelor-bachelorette-party",
    },
    {
      title: "Chef's dinner or Chopped-style cook-off",
      description: "Hire a personal chef for a themed dinner party, or send teams to the grocery store for mystery ingredients and hold a lighthearted cooking competition, then play games.",
      sourceUrl: "https://www.theknot.com/content/how-to-have-coed-bachelor-bachelorette-party",
    },
    {
      title: "Team scavenger hunt and lawn-game Olympics",
      description: "Split into mixed teams for a city scavenger hunt, then giant Jenga with couple trivia, darts and pickup basketball. This one costs very little.",
      sourceUrl: "https://www.zola.com/expert-advice/joint-bachelor-bachelorette-party-games",
    },
    {
      title: "Cartagena, Colombia group trip",
      description: "A colonial house in the old walled city with a pool, a boat day to the Rosario Islands, and nights out. Package prices rise in high season (late March to mid April, June to July, and the holidays). Cartagena is also in your atlas.",
      roughCostPerPerson: "From $709 for 4 days / 3 nights",
      sourceUrl: "https://primecartagena.com/packages/cartagena-bachelor-bachelorette-party-packages/",
    },
    {
      title: "Short Bahamas cruise",
      description: "A 4-night Royal Caribbean sailing to Nassau and the line's private island, where meals and entertainment are included. One real trip came to $1,168 each, including an interior cabin, flights, a hotel the night before and onboard extras.",
      roughCostPerPerson: "About $1,170 all-in for 4 nights",
      sourceUrl: "https://www.royalcaribbeanblog.com/2025/09/27/bahamas-cruise-royal-caribbean-4-night-what-it-costs",
    },
    {
      title: "New Orleans festival weekend",
      description: "Time a co-ed weekend to a festival: French Quarter Fest (mid April, free) or Jazz Fest (late April to early May, at the Fair Grounds). Everyone can join for the whole weekend or just a day.",
      sourceUrl: "https://www.neworleans.com/weddings/pre-post-wedding-events/joint-bachelor-bachelorette-parties/",
    },
  ],
};
