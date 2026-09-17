import { describe, expect, it } from "vitest";
import { defaultPlanConfig, type Task, type Wedding } from "../src/entities/index.js";
import { generateAnchorEvents, generatePlan, parseSeasonStart } from "../src/timeline/generate.js";

function makeWedding(overrides: Partial<Wedding> = {}): Wedding {
  return {
    id: "wedding-1",
    slug: "our-wedding",
    name: "Our wedding",
    partnerA: { name: "Partner A" },
    partnerB: { name: "Partner B" },
    dateFlexibility: "fixed",
    isDestination: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

describe("generatePlan", () => {
  it("produces a task for every template task (minus destination-only ones) when not a destination wedding", () => {
    const wedding = makeWedding({ targetDate: "2028-06-10" });
    const tasks = generatePlan({ wedding, planConfig: defaultPlanConfig(), existingTasks: [] });

    expect(tasks.some((t) => t.templateId === "destination_research")).toBe(false);
    expect(tasks.some((t) => t.templateId === "foreign_legal_requirements")).toBe(false);
    expect(tasks.some((t) => t.templateId === "book_venue")).toBe(true);
    expect(tasks.length).toBeGreaterThan(50);
  });

  it("includes destination-only tasks when the wedding is a destination wedding", () => {
    const wedding = makeWedding({ targetDate: "2028-06-10", isDestination: true });
    const tasks = generatePlan({ wedding, planConfig: defaultPlanConfig(), existingTasks: [] });

    expect(tasks.some((t) => t.templateId === "destination_research")).toBe(true);
    expect(tasks.some((t) => t.templateId === "foreign_legal_requirements")).toBe(true);
  });

  it("computes due dates as targetDate minus monthsBefore", () => {
    const wedding = makeWedding({ targetDate: "2028-06-10" });
    const tasks = generatePlan({ wedding, planConfig: defaultPlanConfig(), existingTasks: [] });

    const ceremony = tasks.find((t) => t.templateId === "ceremony");
    expect(ceremony?.dueDate).toBe("2028-06-10");

    const bookVenue = tasks.find((t) => t.templateId === "book_venue"); // 14 months before
    expect(bookVenue?.dueDate).toBeDefined();
    // 14 months before 2028-06-10 lands in April 2027.
    expect(bookVenue!.dueDate!.slice(0, 7)).toBe("2027-04");
  });

  it("falls back to the target season's first day when only a season is known", () => {
    const wedding = makeWedding({ targetSeason: "Spring 2028", dateFlexibility: "season" });
    const tasks = generatePlan({ wedding, planConfig: defaultPlanConfig(), existingTasks: [] });

    const ceremony = tasks.find((t) => t.templateId === "ceremony");
    expect(ceremony?.dueDate).toBe("2028-03-01");
  });

  it("leaves dueDate undefined but keeps phase ordering when nothing is known", () => {
    const wedding = makeWedding({ dateFlexibility: "open" });
    const tasks = generatePlan({ wedding, planConfig: defaultPlanConfig(), existingTasks: [] });

    expect(tasks.every((t) => t.dueDate === undefined)).toBe(true);
    const phases = tasks.map((t) => t.phase);
    expect(phases).toContain("just_engaged");
    expect(phases).toContain("after");
  });

  it("parses season strings", () => {
    expect(parseSeasonStart("Spring 2027")?.toISOString().slice(0, 10)).toBe("2027-03-01");
    expect(parseSeasonStart("fall 2029")?.toISOString().slice(0, 10)).toBe("2029-09-01");
    expect(parseSeasonStart("nonsense")).toBeUndefined();
  });

  it("uses the comms offsets from PlanConfig, not the template default, for the three comms tasks", () => {
    const wedding = makeWedding({ targetDate: "2028-06-10" });
    const planConfig = { ...defaultPlanConfig(), saveTheDatesMonthsBefore: 10, invitationsMonthsBefore: 3, rsvpDeadlineMonthsBefore: 1.5 };
    const tasks = generatePlan({ wedding, planConfig, existingTasks: [] });

    const saveTheDates = tasks.find((t) => t.templateId === "save_the_dates");
    // 10 months before 2028-06-10 is ~2027-08.
    expect(saveTheDates!.dueDate!.slice(0, 7)).toBe("2027-08");
  });

  it("lets a dated save-the-dates anchor win over saveTheDatesMonthsBefore", () => {
    const wedding = makeWedding({ targetDate: "2028-06-10" });
    const planConfig = {
      ...defaultPlanConfig(),
      saveTheDatesMonthsBefore: 10,
      anchors: [{ id: "a1", kind: "save_the_dates" as const, title: "Save the dates", date: "2027-05-01", reveals: [] }],
    };
    const tasks = generatePlan({ wedding, planConfig, existingTasks: [] });
    const saveTheDates = tasks.find((t) => t.templateId === "save_the_dates");
    expect(saveTheDates?.dueDate).toBe("2027-05-01");
  });

  it("creates an engagement-party-anchored prepare task 8 weeks before the party", () => {
    const wedding = makeWedding({ targetDate: "2028-06-10" });
    const planConfig = {
      ...defaultPlanConfig(),
      anchors: [{ id: "a1", kind: "engagement_party" as const, title: "Engagement party", date: "2027-03-15", reveals: [] }],
    };
    const tasks = generatePlan({ wedding, planConfig, existingTasks: [] });
    const prep = tasks.find((t) => t.templateId === "plan_engagement_party");
    expect(prep?.dueDate).toBe("2027-01-18"); // 56 days before 2027-03-15
  });

  it("pulls finalize_date, pin_destination_scenario and choose_wedding_party to 2 weeks before an engagement party that reveals them", () => {
    const wedding = makeWedding({ targetDate: "2028-06-10", isDestination: true });
    const planConfig = {
      ...defaultPlanConfig(),
      anchors: [
        {
          id: "a1",
          kind: "engagement_party" as const,
          title: "Engagement party",
          date: "2027-03-15",
          reveals: ["date", "destination", "wedding_party"] as const,
        },
      ],
    };
    const tasks = generatePlan({ wedding, planConfig, existingTasks: [] });

    expect(tasks.find((t) => t.templateId === "finalize_date")?.dueDate).toBe("2027-03-01");
    expect(tasks.find((t) => t.templateId === "pin_destination_scenario")?.dueDate).toBe("2027-03-01");
    expect(tasks.find((t) => t.templateId === "choose_wedding_party")?.dueDate).toBe("2027-03-01");
  });

  it("does not pull those tasks in when the anchor doesn't reveal them", () => {
    const wedding = makeWedding({ targetDate: "2028-06-10" });
    const planConfig = {
      ...defaultPlanConfig(),
      anchors: [{ id: "a1", kind: "engagement_party" as const, title: "Engagement party", date: "2027-03-15", reveals: [] }],
    };
    const tasks = generatePlan({ wedding, planConfig, existingTasks: [] });
    const finalizeDate = tasks.find((t) => t.templateId === "finalize_date");
    expect(finalizeDate?.dueDate).not.toBe("2027-03-01");
  });

  it("assigns in-person tasks to the latest travel window that ends before their due date", () => {
    const wedding = makeWedding({ targetDate: "2028-06-10" });
    const planConfig = {
      ...defaultPlanConfig(),
      travelWindows: [
        { id: "w1", label: "Early trip", start: "2027-01-01", end: "2027-01-10" },
        { id: "w2", label: "Later trip", start: "2027-06-01", end: "2027-06-10" },
      ],
    };
    const tasks = generatePlan({ wedding, planConfig, existingTasks: [] });
    // venue_tours is 15 months before 2028-06-10 -> ~2027-03, after w1's end and before w2's start.
    const venueTours = tasks.find((t) => t.templateId === "venue_tours");
    expect(venueTours?.windowId).toBe("w1");
    expect(venueTours?.tags).not.toContain("needs-window");
  });

  it("assigns the earliest following window, tagged needs-window, when no window precedes the due date", () => {
    const wedding = makeWedding({ targetDate: "2028-06-10" });
    const planConfig = {
      ...defaultPlanConfig(),
      travelWindows: [{ id: "w1", label: "Only trip", start: "2027-06-01", end: "2027-06-10" }],
    };
    const tasks = generatePlan({ wedding, planConfig, existingTasks: [] });
    const venueTours = tasks.find((t) => t.templateId === "venue_tours"); // due ~2027-03, before the only window
    expect(venueTours?.windowId).toBe("w1");
    expect(venueTours?.tags).toContain("needs-window");
  });

  it("assigns a window containing the due date directly", () => {
    const wedding = makeWedding({ targetDate: "2028-06-10" });
    const planConfig = {
      ...defaultPlanConfig(),
      travelWindows: [{ id: "w1", label: "Spans it", start: "2027-02-01", end: "2027-04-30" }],
    };
    const tasks = generatePlan({ wedding, planConfig, existingTasks: [] });
    const venueTours = tasks.find((t) => t.templateId === "venue_tours");
    expect(venueTours?.windowId).toBe("w1");
    expect(venueTours?.tags).not.toContain("needs-window");
  });

  describe("regeneration preserves user edits", () => {
    const wedding = makeWedding({ targetDate: "2028-06-10" });

    it("keeps status and title for a matched existing task", () => {
      const existing: Task = {
        id: "existing-1",
        weddingId: wedding.id,
        templateId: "book_venue",
        title: "Book The Grand Hall",
        phase: "foundation",
        dueDate: "2027-04-01",
        status: "done",
        tags: ["vendor"],
        dependsOn: [],
        createdAt: "2026-02-01T00:00:00.000Z",
        updatedAt: "2026-02-01T00:00:00.000Z",
      };
      const tasks = generatePlan({ wedding, planConfig: defaultPlanConfig(), existingTasks: [existing] });
      const bookVenue = tasks.find((t) => t.templateId === "book_venue");
      expect(bookVenue?.id).toBe("existing-1");
      expect(bookVenue?.status).toBe("done");
      expect(bookVenue?.title).toBe("Book The Grand Hall");
      expect(bookVenue?.dueDate).toBe("2027-04-01"); // manually touched (not "todo") -> due date preserved
    });

    it("recomputes the due date for a still-todo task when its inputs change", () => {
      const existing: Task = {
        id: "existing-2",
        weddingId: wedding.id,
        templateId: "book_venue",
        title: "Book venue (and ceremony site, if separate) and lock the date",
        phase: "foundation",
        dueDate: "2020-01-01", // stale, from some earlier targetDate
        status: "todo",
        tags: ["vendor"],
        dependsOn: [],
        createdAt: "2026-02-01T00:00:00.000Z",
        updatedAt: "2026-02-01T00:00:00.000Z",
      };
      const tasks = generatePlan({ wedding, planConfig: defaultPlanConfig(), existingTasks: [existing] });
      const bookVenue = tasks.find((t) => t.templateId === "book_venue");
      expect(bookVenue?.dueDate).not.toBe("2020-01-01");
      expect(bookVenue!.dueDate!.slice(0, 7)).toBe("2027-04");
    });

    it("marks a task skipped when overrides[templateId].skipped is set, even if it was done", () => {
      const existing: Task = {
        id: "existing-3",
        weddingId: wedding.id,
        templateId: "premarital_counseling",
        title: "Schedule premarital counseling, if required",
        phase: "core_vendors",
        status: "done",
        tags: [],
        dependsOn: [],
        createdAt: "2026-02-01T00:00:00.000Z",
        updatedAt: "2026-02-01T00:00:00.000Z",
      };
      const planConfig = { ...defaultPlanConfig(), overrides: { premarital_counseling: { skipped: true } } };
      const tasks = generatePlan({ wedding, planConfig, existingTasks: [existing] });
      expect(tasks.find((t) => t.templateId === "premarital_counseling")?.status).toBe("skipped");
    });

    it("uses overrides[templateId].monthsBefore even for a manually-touched task", () => {
      const existing: Task = {
        id: "existing-4",
        weddingId: wedding.id,
        templateId: "book_florist",
        title: "Book florist",
        phase: "core_vendors",
        dueDate: "2027-01-01",
        status: "doing",
        tags: [],
        dependsOn: [],
        createdAt: "2026-02-01T00:00:00.000Z",
        updatedAt: "2026-02-01T00:00:00.000Z",
      };
      const planConfig = { ...defaultPlanConfig(), overrides: { book_florist: { monthsBefore: 2 } } };
      const tasks = generatePlan({ wedding, planConfig, existingTasks: [existing] });
      const florist = tasks.find((t) => t.templateId === "book_florist");
      // 2 months before 2028-06-10 -> 2028-04
      expect(florist!.dueDate!.slice(0, 7)).toBe("2028-04");
    });
  });

  it("resolves dependsOn template ids into generated task ids", () => {
    const wedding = makeWedding({ targetDate: "2028-06-10" });
    const tasks = generatePlan({ wedding, planConfig: defaultPlanConfig(), existingTasks: [] });
    const announcePublic = tasks.find((t) => t.templateId === "announce_public");
    const announceFamily = tasks.find((t) => t.templateId === "announce_family");
    expect(announcePublic?.dependsOn).toEqual([announceFamily?.id]);
  });
});

describe("generateAnchorEvents", () => {
  it("creates an anchor event only for dated anchors", () => {
    const wedding = makeWedding({ targetDate: "2028-06-10" });
    const planConfig = {
      ...defaultPlanConfig(),
      anchors: [
        { id: "a1", kind: "engagement_party" as const, title: "Engagement party", date: "2027-03-15", reveals: [] },
        { id: "a2", kind: "custom" as const, title: "Undated idea", reveals: [] },
      ],
    };
    const events = generateAnchorEvents(wedding, planConfig);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ title: "Engagement party", startsAt: "2027-03-15", kind: "anchor" });
  });
});
