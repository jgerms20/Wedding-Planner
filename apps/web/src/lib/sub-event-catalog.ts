import type { SubEventKind } from "@bower/shared";

/** Shared with the intake wizard, which offers the same catalog as checkboxes during onboarding. */
export const SUB_EVENT_LABELS: Record<SubEventKind, string> = {
  engagement_party: "Engagement party",
  bridal_shower: "Bridal shower",
  couples_shower: "Couples shower",
  groom_shower: "Groom's shower",
  bachelor: "Bachelor party",
  bachelorette: "Bachelorette party",
  joint_bachelor_bachelorette: "Joint bachelor/bachelorette trip",
  premarital_counseling: "Premarital counseling",
  rehearsal_dinner: "Rehearsal dinner",
  welcome_party: "Welcome party",
  after_party: "After-party",
  brunch: "Morning-after brunch",
  second_reception: "Second reception (for those who couldn't travel)",
  sangeet: "Sangeet",
  henna_night: "Henna night",
  tea_ceremony: "Tea ceremony",
  engagement_photoshoot: "Engagement photos",
  bridal_party_proposal: "Wedding party ask",
  tasting: "Cake and menu tasting",
  dress_shopping: "Dress shopping",
  suit_fitting: "Suit or tux fitting",
  stock_the_bar_party: "Stock-the-bar party",
  bridesmaids_luncheon: "Bridesmaids' luncheon",
  group_excursion: "Group excursion",
  day_after_pool_party: "Day-after pool party",
  farewell_dinner: "Farewell dinner",
  honeymoon: "Honeymoon",
  other: "Something else",
};

/** One line on what each kind typically is, for the Events page's "Consider" catalog. */
export const SUB_EVENT_DESCRIPTIONS: Record<SubEventKind, string> = {
  engagement_party: "A celebration soon after getting engaged, often doubling as the first big reveal.",
  bridal_shower: "Gifts and games hosted for one partner, typically 1-3 months before the wedding.",
  couples_shower: "A shower for both partners together, gender-neutral and increasingly common.",
  groom_shower: "The newer counterpart to a bridal shower, same window.",
  bachelor: "A trip or night out for one partner's closest friends.",
  bachelorette: "A trip or night out for one partner's closest friends.",
  joint_bachelor_bachelorette: "Both parties combine into one trip or event.",
  premarital_counseling: "Sessions with an officiant or counselor before the wedding — some officiants require it.",
  rehearsal_dinner: "A dinner the night before, usually after the ceremony rehearsal, for the wedding party and family.",
  welcome_party: "A casual gathering the night guests arrive — common at destination weddings in place of a formal rehearsal dinner.",
  after_party: "A later, looser continuation of the reception, often with different guests than dinner.",
  brunch: "A casual send-off the morning after for guests still in town.",
  second_reception: "A separate celebration for guests who couldn't travel to the wedding itself.",
  sangeet: "A music-and-dance celebration, traditional in South Asian weddings, usually a night or two before.",
  henna_night: "A henna (mehndi) application evening for one partner and close family/friends, traditional across Middle Eastern, North African and South Asian weddings, usually a few days before.",
  tea_ceremony: "A formal tea-serving ceremony honoring both families, traditional in Chinese and other East Asian weddings — often held the morning of, or the day before.",
  engagement_photoshoot: "A photo session soon after the engagement, often used for save-the-dates and the wedding website.",
  bridal_party_proposal: "The moment or small gathering where the couple asks friends to be bridesmaids or groomsmen, usually early in planning.",
  tasting: "A sampling appointment with the caterer or baker to choose the menu and cake, typically several months before the wedding.",
  dress_shopping: "Bridal salon appointments to find the wedding dress, often with a few close family members or friends, about 9-12 months out.",
  suit_fitting: "Fittings for the groom's and groomsmen's suits or tuxedos, with a final fitting in the weeks before the wedding.",
  stock_the_bar_party: "A casual co-ed party where guests bring bottles or bar tools to stock the couple's home bar, held in the months before the wedding.",
  bridesmaids_luncheon: "A small thank-you lunch or tea the bride hosts for her bridesmaids, usually a day or two before the wedding.",
  group_excursion: "An organized outing for guests during a destination wedding weekend, such as a catamaran cruise or island tour.",
  day_after_pool_party: "A relaxed pool or beach hangout for guests the day after the wedding, common at destination and resort weddings.",
  farewell_dinner: "A last group dinner for guests still in town after the wedding, before everyone heads home.",
  honeymoon: "The trip after the wedding — worth tracking here for its own dates and budget.",
  other: "Anything else worth its own date, host, and budget line.",
};

/** Broader grouping for the Consider grid, so it reads as sections instead of one flat list of
 * granular kinds (e.g. "premarital counseling" alone reading oddly next to "honeymoon"). */
export type SubEventCategory = "relationship" | "pre_wedding" | "wedding_weekend" | "post_wedding";

export const SUB_EVENT_CATEGORY: Record<SubEventKind, SubEventCategory> = {
  premarital_counseling: "relationship",
  engagement_party: "pre_wedding",
  bridal_shower: "pre_wedding",
  couples_shower: "pre_wedding",
  groom_shower: "pre_wedding",
  bachelor: "pre_wedding",
  bachelorette: "pre_wedding",
  joint_bachelor_bachelorette: "pre_wedding",
  henna_night: "pre_wedding",
  tea_ceremony: "pre_wedding",
  sangeet: "pre_wedding",
  engagement_photoshoot: "relationship",
  bridal_party_proposal: "pre_wedding",
  tasting: "pre_wedding",
  dress_shopping: "pre_wedding",
  suit_fitting: "pre_wedding",
  stock_the_bar_party: "pre_wedding",
  bridesmaids_luncheon: "wedding_weekend",
  group_excursion: "wedding_weekend",
  day_after_pool_party: "post_wedding",
  farewell_dinner: "post_wedding",
  rehearsal_dinner: "wedding_weekend",
  welcome_party: "wedding_weekend",
  after_party: "wedding_weekend",
  brunch: "wedding_weekend",
  second_reception: "post_wedding",
  honeymoon: "post_wedding",
  other: "pre_wedding",
};

export const SUB_EVENT_CATEGORY_LABELS: Record<SubEventCategory, string> = {
  relationship: "Relationship stuff",
  pre_wedding: "Before the wedding",
  wedding_weekend: "Wedding weekend",
  post_wedding: "After",
};

/** Category display order for the Consider grid. */
export const SUB_EVENT_CATEGORY_ORDER: SubEventCategory[] = ["relationship", "pre_wedding", "wedding_weekend", "post_wedding"];
