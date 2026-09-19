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
  honeymoon: "The trip after the wedding — worth tracking here for its own dates and budget.",
  other: "Anything else worth its own date, host, and budget line.",
};
