import type { AnchorKind, PhaseKey } from "../entities/index.js";

/**
 * A single row of the default plan template, authored from design doc
 * §2.1-2.5 (lifecycle phases, satellite events, wedding party, legal/admin,
 * and the "things people forget" list). `generatePlan` turns these into
 * per-wedding `Task`s.
 */
export interface TemplateTask {
  templateId: string;
  title: string;
  description?: string;
  phase: PhaseKey;
  /**
   * Months before the wedding date this task is due (fractional values are
   * fine, e.g. 0.5 for "two weeks out"). Negative values fall after the
   * wedding (phase H). Ignored for the three comms tasks (`save_the_dates`,
   * `invitations`, `rsvp_deadline`), whose due dates instead come from
   * `PlanConfig`.
   */
  monthsBefore: number;
  tags: string[];
  /** Only generated when `wedding.isDestination` is true. */
  destinationOnly?: boolean;
  /**
   * Ties this task to an anchor of the same kind in `PlanConfig.anchors`.
   * `generatePlan` uses it to let an engagement-party anchor that reveals the
   * date/destination/wedding party pull `finalize_date`,
   * `pin_destination_scenario` and `choose_wedding_party` in to two weeks
   * before the party, and to let a dated `save_the_dates` anchor win over
   * `saveTheDatesMonthsBefore`.
   */
  anchorKind?: AnchorKind;
  /** templateIds of tasks this one depends on. */
  dependsOn?: string[];
}

export const TEMPLATE_TASKS: TemplateTask[] = [
  // --- A. Just engaged (weeks 0-4 post-engagement; the longest lead time) ---
  {
    templateId: "announce_family",
    title: "Tell family the news",
    phase: "just_engaged",
    monthsBefore: 20,
    tags: [],
  },
  {
    templateId: "announce_public",
    title: "Announce publicly",
    phase: "just_engaged",
    monthsBefore: 20,
    tags: [],
    dependsOn: ["announce_family"],
  },
  {
    templateId: "ring_insurance",
    title: "Insure and appraise the ring",
    description: "Get the ring appraised and add it to a policy (renter's/homeowner's rider or a standalone ring policy).",
    phase: "just_engaged",
    monthsBefore: 19,
    tags: ["admin", "dont-forget"],
  },
  {
    templateId: "align_vision",
    title: "Align on size, vibe, season, and local vs. destination",
    phase: "just_engaged",
    monthsBefore: 18,
    tags: [],
  },
  {
    templateId: "gut_guest_count",
    title: "Gut-check the guest count",
    phase: "just_engaged",
    monthsBefore: 18,
    tags: [],
    dependsOn: ["align_vision"],
  },
  {
    templateId: "budget_contributions",
    title: "Talk budget and who contributes",
    phase: "just_engaged",
    monthsBefore: 17,
    tags: [],
  },
  {
    templateId: "planner_vs_diy",
    title: "Decide planner vs. DIY",
    phase: "just_engaged",
    monthsBefore: 17,
    tags: [],
  },
  {
    templateId: "choose_wedding_party",
    title: "Choose your wedding party",
    description: "Decide who you're asking, and how, before the engagement party if it's revealing the wedding party.",
    phase: "just_engaged",
    monthsBefore: 16,
    tags: ["wedding-party"],
    anchorKind: "engagement_party",
  },
  {
    templateId: "plan_engagement_party",
    title: "Plan the engagement party",
    description: "Usually hosted by parents, 1-3 months post-engagement.",
    phase: "just_engaged",
    monthsBefore: 15,
    tags: ["satellite-event"],
  },

  // --- B. Foundation (12-18 months out) ---
  {
    templateId: "set_budget",
    title: "Set the total budget",
    phase: "foundation",
    monthsBefore: 17,
    tags: [],
    dependsOn: ["budget_contributions"],
  },
  {
    templateId: "guest_list_draft",
    title: "Draft the guest list (A/B tiers)",
    phase: "foundation",
    monthsBefore: 16,
    tags: [],
    dependsOn: ["gut_guest_count"],
  },
  {
    templateId: "destination_research",
    title: "Research destination candidates",
    description: "Travel cost per guest, lodging bands, weather, and legal requirements for each candidate.",
    phase: "foundation",
    monthsBefore: 16,
    tags: ["destination"],
    destinationOnly: true,
  },
  {
    templateId: "venue_tours",
    title: "Tour venues",
    phase: "foundation",
    monthsBefore: 15,
    tags: ["in-person", "vendor"],
  },
  {
    templateId: "pin_destination_scenario",
    title: "Pin a destination and venue scenario",
    phase: "foundation",
    monthsBefore: 15,
    tags: ["destination"],
    destinationOnly: true,
    anchorKind: "engagement_party",
  },
  {
    templateId: "finalize_date",
    title: "Finalize the wedding date",
    phase: "foundation",
    monthsBefore: 15,
    tags: [],
    anchorKind: "engagement_party",
  },
  {
    templateId: "book_venue",
    title: "Book venue (and ceremony site, if separate) and lock the date",
    phase: "foundation",
    monthsBefore: 14,
    tags: ["vendor"],
    dependsOn: ["finalize_date", "venue_tours"],
  },
  {
    templateId: "book_officiant",
    title: "Book officiant",
    phase: "foundation",
    monthsBefore: 13,
    tags: ["vendor"],
  },
  {
    templateId: "book_planner",
    title: "Book a planner or coordinator, if using one",
    phase: "foundation",
    monthsBefore: 13,
    tags: ["vendor"],
    dependsOn: ["planner_vs_diy"],
  },
  {
    templateId: "book_photographer",
    title: "Book photographer",
    description: "Sells out first — book early.",
    phase: "foundation",
    monthsBefore: 12,
    tags: ["vendor"],
  },
  {
    templateId: "book_videographer",
    title: "Book videographer",
    phase: "foundation",
    monthsBefore: 12,
    tags: ["vendor"],
  },
  {
    templateId: "book_caterer",
    title: "Book caterer",
    phase: "foundation",
    monthsBefore: 12,
    tags: ["vendor"],
  },
  {
    templateId: "book_band_dj",
    title: "Book band or DJ",
    phase: "foundation",
    monthsBefore: 12,
    tags: ["vendor"],
  },
  {
    templateId: "wedding_website",
    title: "Launch the wedding website",
    phase: "foundation",
    monthsBefore: 12,
    tags: [],
  },
  {
    templateId: "hotel_room_block",
    title: "Reserve a hotel room block",
    description: "Note the block's release date so unclaimed rooms don't quietly disappear.",
    phase: "foundation",
    monthsBefore: 12,
    tags: ["dont-forget"],
  },

  // --- C. Core vendors (9-12 months out) ---
  {
    templateId: "attire_shopping",
    title: "Shop for wedding attire",
    description: "Gowns can take 4-6 months plus alterations — start early.",
    phase: "core_vendors",
    monthsBefore: 11,
    tags: ["in-person"],
  },
  {
    templateId: "book_florist",
    title: "Book florist",
    phase: "core_vendors",
    monthsBefore: 10,
    tags: ["vendor"],
  },
  {
    templateId: "order_cake",
    title: "Taste and order the cake",
    phase: "core_vendors",
    monthsBefore: 10,
    tags: ["vendor", "in-person"],
  },
  {
    templateId: "book_rentals",
    title: "Book rentals",
    phase: "core_vendors",
    monthsBefore: 10,
    tags: ["vendor"],
  },
  {
    templateId: "book_hair_makeup",
    title: "Book hair & makeup artist",
    phase: "core_vendors",
    monthsBefore: 9,
    tags: ["vendor"],
  },
  {
    templateId: "book_transport",
    title: "Arrange wedding-day transport",
    phase: "core_vendors",
    monthsBefore: 9,
    tags: ["dont-forget"],
  },
  {
    templateId: "honeymoon_research",
    title: "Research the honeymoon",
    phase: "core_vendors",
    monthsBefore: 9,
    tags: ["satellite-event"],
  },
  {
    templateId: "passports",
    title: "Renew or apply for passports",
    phase: "core_vendors",
    monthsBefore: 9,
    tags: ["legal", "dont-forget"],
  },
  {
    templateId: "premarital_counseling",
    title: "Schedule premarital counseling, if required",
    phase: "core_vendors",
    monthsBefore: 9,
    tags: ["legal"],
  },
  {
    templateId: "rehearsal_dinner_venue",
    title: "Book the rehearsal dinner venue",
    phase: "core_vendors",
    monthsBefore: 9,
    tags: ["satellite-event", "vendor"],
  },

  // --- D. Communications (6-9 months out) ---
  {
    templateId: "save_the_dates",
    title: "Send save-the-dates",
    description: "Destination weddings send these earlier (9-12 months) so guests can book travel.",
    phase: "communications",
    monthsBefore: 6, // overridden by PlanConfig.saveTheDatesMonthsBefore
    tags: ["comms"],
    anchorKind: "save_the_dates",
    dependsOn: ["book_venue"],
  },
  {
    templateId: "invitation_design",
    title: "Design invitations",
    phase: "communications",
    monthsBefore: 8,
    tags: [],
  },
  {
    templateId: "menu_tastings",
    title: "Schedule menu tastings",
    phase: "communications",
    monthsBefore: 7,
    tags: ["in-person", "vendor"],
  },
  {
    templateId: "ceremony_music",
    title: "Choose ceremony music",
    phase: "communications",
    monthsBefore: 7,
    tags: [],
  },
  {
    templateId: "wedding_party_attire",
    title: "Finalize wedding party attire",
    phase: "communications",
    monthsBefore: 7,
    tags: ["wedding-party"],
  },
  {
    templateId: "wedding_bands",
    title: "Shop for wedding bands",
    phase: "communications",
    monthsBefore: 6,
    tags: [],
  },
  {
    templateId: "schedule_showers",
    title: "Set dates and hosts for showers",
    phase: "communications",
    monthsBefore: 6,
    tags: ["satellite-event"],
  },
  {
    templateId: "schedule_bach_parties",
    title: "Set dates for the bachelor/bachelorette trips",
    description: "Increasingly destination trips — poll the group early; split costs among attendees.",
    phase: "communications",
    monthsBefore: 6,
    tags: ["satellite-event"],
  },

  // --- E. Details (3-6 months out) ---
  {
    templateId: "invitations",
    title: "Send invitations",
    description: "Conventionally 6-8 weeks out; destination weddings send 3 months out.",
    phase: "details",
    monthsBefore: 2, // overridden by PlanConfig.invitationsMonthsBefore
    tags: ["comms"],
    anchorKind: "invitations",
    dependsOn: ["invitation_design"],
  },
  {
    templateId: "foreign_legal_requirements",
    title: "Confirm foreign legal requirements",
    description: "Residency days, apostilles, translations, and whether you need a separate legal ceremony at home.",
    phase: "details",
    monthsBefore: 5,
    tags: ["legal", "destination"],
    destinationOnly: true,
  },
  {
    templateId: "finalize_menu",
    title: "Finalize the menu",
    phase: "details",
    monthsBefore: 5,
    tags: [],
    dependsOn: ["menu_tastings"],
  },
  {
    templateId: "showers_bach_trips",
    title: "Hold showers and bach trips",
    phase: "details",
    monthsBefore: 4,
    tags: ["satellite-event"],
    dependsOn: ["schedule_showers", "schedule_bach_parties"],
  },
  {
    templateId: "vendor_insurance",
    title: "Collect vendor certificates of insurance",
    description: "Many venues require this. Check cancellation/force majeure terms too.",
    phase: "details",
    monthsBefore: 4,
    tags: ["legal"],
  },
  {
    templateId: "marriage_license_research",
    title: "Research marriage license requirements",
    description: "Waiting period, validity window, ID and witness requirements, and fees vary by jurisdiction — confirm with the county.",
    phase: "details",
    monthsBefore: 4,
    tags: ["legal"],
  },
  {
    templateId: "prenup",
    title: "Finalize a prenup, if any",
    description: "Must be done early with independent counsel for each partner.",
    phase: "details",
    monthsBefore: 4,
    tags: ["legal"],
  },
  {
    templateId: "vows_readings",
    title: "Write vows and choose readings",
    phase: "details",
    monthsBefore: 3,
    tags: [],
  },
  {
    templateId: "seating_chart_start",
    title: "Start the seating chart",
    phase: "details",
    monthsBefore: 3,
    tags: [],
  },
  {
    templateId: "party_gifts",
    title: "Buy gifts for the wedding party and parents",
    phase: "details",
    monthsBefore: 3,
    tags: ["dont-forget"],
  },
  {
    templateId: "fittings",
    title: "Attend attire fittings",
    phase: "details",
    monthsBefore: 3,
    tags: ["in-person"],
    dependsOn: ["attire_shopping"],
  },

  // --- F. Final stretch (1-3 months out) ---
  {
    templateId: "rsvp_deadline",
    title: "RSVP deadline",
    phase: "final_stretch",
    monthsBefore: 1, // overridden by PlanConfig.rsvpDeadlineMonthsBefore
    tags: ["comms", "deadline"],
    dependsOn: ["invitations"],
  },
  {
    templateId: "chase_rsvps",
    title: "Chase non-responders",
    phase: "final_stretch",
    monthsBefore: 0.75,
    tags: [],
    dependsOn: ["rsvp_deadline"],
  },
  {
    templateId: "final_headcount",
    title: "Give the final headcount to the caterer",
    description: "About two weeks out.",
    phase: "final_stretch",
    monthsBefore: 0.5,
    tags: ["deadline"],
    dependsOn: ["rsvp_deadline"],
  },
  {
    templateId: "seating_chart_final",
    title: "Finalize the seating chart",
    phase: "final_stretch",
    monthsBefore: 0.5,
    tags: [],
    dependsOn: ["seating_chart_start", "final_headcount"],
  },
  {
    templateId: "final_vendor_confirmations",
    title: "Confirm final vendor details and payment schedule",
    phase: "final_stretch",
    monthsBefore: 1,
    tags: ["vendor"],
  },
  {
    templateId: "get_marriage_license",
    title: "Get the marriage license",
    description: "Inside its validity window — confirm with the county/an attorney.",
    phase: "final_stretch",
    monthsBefore: 0.5,
    tags: ["legal", "deadline"],
    dependsOn: ["marriage_license_research"],
  },
  {
    templateId: "hair_makeup_trial",
    title: "Hair & makeup trial",
    phase: "final_stretch",
    monthsBefore: 1,
    tags: ["in-person"],
    dependsOn: ["book_hair_makeup"],
  },
  {
    templateId: "final_timeline_to_vendors",
    title: "Send the final day-of timeline to all vendors",
    description: "Include sunset time for the photo schedule, a rain plan, and timeline buffers.",
    phase: "final_stretch",
    monthsBefore: 0.5,
    tags: [],
  },
  {
    templateId: "tip_envelopes",
    title: "Prepare tip envelopes",
    phase: "final_stretch",
    monthsBefore: 0.25,
    tags: ["dont-forget"],
  },
  {
    templateId: "emergency_kit",
    title: "Pack the day-of emergency kit",
    phase: "final_stretch",
    monthsBefore: 0.25,
    tags: ["dont-forget"],
  },
  {
    templateId: "programs",
    title: "Print ceremony programs",
    phase: "final_stretch",
    monthsBefore: 0.5,
    tags: [],
  },

  // --- G. Wedding weekend (days -2 to +1) ---
  {
    templateId: "rehearsal",
    title: "Rehearse the ceremony",
    phase: "wedding_weekend",
    monthsBefore: 0.07,
    tags: [],
  },
  {
    templateId: "rehearsal_dinner",
    title: "Host the rehearsal dinner",
    phase: "wedding_weekend",
    monthsBefore: 0.05,
    tags: ["satellite-event"],
    dependsOn: ["rehearsal_dinner_venue"],
  },
  {
    templateId: "welcome_party",
    title: "Host the welcome party",
    phase: "wedding_weekend",
    monthsBefore: 0.03,
    tags: ["satellite-event"],
  },
  {
    templateId: "ceremony",
    title: "Ceremony",
    phase: "wedding_weekend",
    monthsBefore: 0,
    tags: [],
  },
  {
    templateId: "reception",
    title: "Reception and send-off",
    phase: "wedding_weekend",
    monthsBefore: 0,
    tags: [],
  },
  {
    templateId: "morning_after_brunch",
    title: "Morning-after brunch",
    phase: "wedding_weekend",
    monthsBefore: -0.03,
    tags: ["satellite-event"],
  },

  // --- H. After (0-3 months after) ---
  {
    templateId: "thank_you_notes",
    title: "Send thank-you notes",
    description: "Within 3 months of the wedding.",
    phase: "after",
    monthsBefore: -1,
    tags: ["dont-forget"],
  },
  {
    templateId: "vendor_reviews",
    title: "Leave vendor reviews",
    phase: "after",
    monthsBefore: -1,
    tags: [],
  },
  {
    templateId: "marriage_certificate_copies",
    title: "Order certified marriage certificate copies",
    phase: "after",
    monthsBefore: -0.5,
    tags: ["legal"],
    dependsOn: ["get_marriage_license"],
  },
  {
    templateId: "name_change",
    title: "Work through the name-change checklist",
    description: "SSA, DMV, passport, banks, employer — in that rough order.",
    phase: "after",
    monthsBefore: -1,
    tags: ["legal", "dont-forget"],
  },
  {
    templateId: "insurance_beneficiary_updates",
    title: "Update insurance and beneficiaries",
    phase: "after",
    monthsBefore: -2,
    tags: ["legal"],
  },
  {
    templateId: "dress_preservation",
    title: "Preserve the dress and bouquet",
    phase: "after",
    monthsBefore: -1,
    tags: [],
  },
  {
    templateId: "photo_delivery",
    title: "Receive final photo delivery",
    phase: "after",
    monthsBefore: -2,
    tags: [],
  },
  {
    templateId: "budget_reconciliation",
    title: "Reconcile the final budget",
    phase: "after",
    monthsBefore: -2,
    tags: [],
  },
];

export const COMMS_TEMPLATE_IDS = ["save_the_dates", "invitations", "rsvp_deadline"] as const;
