import { describe, expect, it } from "vitest";
import { parseFallback, parseLooseDate } from "../src/ai/fallback-parser";
import type { BowerAction } from "../src/ai/actions";

/** Pins "today" so year-less dates ("by Apr 17") never drift with the calendar. */
const OPTIONS = { now: "2026-09-17" } as const;

function only(text: string): BowerAction {
  const actions = parseFallback(text, OPTIONS);
  expect(actions).toHaveLength(1);
  return actions[0]!;
}

describe("parseFallback — guests", () => {
  it("reads a relationship, a city, and a must tier", () => {
    const action = only("add my cousin Marcus from Atlanta, must invite");
    expect(action).toMatchObject({
      type: "add_guests",
      guests: [{ firstName: "Marcus", relationship: "cousin", homeCity: "Atlanta", tier: "must" }],
    });
  });

  it("splits two people joined by 'and'", () => {
    const action = only("add my aunt Denise and uncle Ray to the guest list");
    expect(action.type).toBe("add_guests");
    if (action.type !== "add_guests") return;
    expect(action.guests.map((g) => g.firstName)).toEqual(["Denise", "Ray"]);
    expect(action.guests[1]!.relationship).toBe("uncle");
  });

  it("splits a comma list and keeps last names", () => {
    const action = only("add guests Marcus Lee, Tasha Lee & Priya Raman");
    expect(action.type).toBe("add_guests");
    if (action.type !== "add_guests") return;
    expect(action.guests).toHaveLength(3);
    expect(action.guests[0]).toMatchObject({ firstName: "Marcus", lastName: "Lee" });
    expect(action.guests[2]).toMatchObject({ firstName: "Priya", lastName: "Raman" });
  });

  it("maps “Joshua’s side” to side a", () => {
    const action = only("invite Dana Whitfield from Columbia on Joshua's side");
    expect(action).toMatchObject({ type: "add_guests", guests: [{ firstName: "Dana", side: "a", homeCity: "Columbia" }] });
  });

  it("maps “Janel’s side” to side b", () => {
    const action = only("invite Rose Adeyemi, Janel's side, should invite");
    expect(action).toMatchObject({ type: "add_guests", guests: [{ firstName: "Rose", side: "b", tier: "should" }] });
  });

  it("flags a plus one", () => {
    const action = only("add my friend Theo with a plus one");
    expect(action).toMatchObject({ type: "add_guests", guests: [{ firstName: "Theo", plusOne: true, relationship: "friend" }] });
  });

  it("flags kids", () => {
    const action = only("add our nephew Eli, kid, nice to have");
    expect(action).toMatchObject({ type: "add_guests", guests: [{ firstName: "Eli", isChild: true, tier: "nice" }] });
  });

  it("puts a name on the guest list with the 'put ... on' phrasing", () => {
    const action = only("put Grace Okafor on the guest list");
    expect(action).toMatchObject({ type: "add_guests", guests: [{ firstName: "Grace", lastName: "Okafor", tier: "must" }] });
  });

  it("treats “we need to invite” as a guest add, not a task", () => {
    const action = only("we need to invite my boss Karen");
    expect(action).toMatchObject({ type: "add_guests", guests: [{ firstName: "Karen", relationship: "boss" }] });
  });
});

describe("parseFallback — tasks", () => {
  it("reads a plain task", () => {
    expect(only("add task book the photographer")).toMatchObject({ type: "add_task", title: "Book the photographer" });
  });

  it("reads a due date written as 'Apr 17'", () => {
    expect(only("add task send save the dates by Apr 17")).toMatchObject({
      type: "add_task",
      title: "Send save the dates",
      dueDate: "2027-04-17",
    });
  });

  it("reads a full date with a year", () => {
    expect(only("remind us to mail the invitations on April 17 2027")).toMatchObject({
      type: "add_task",
      title: "Mail the invitations",
      dueDate: "2027-04-17",
    });
  });

  it("reads an ISO date", () => {
    expect(only("we need to lock the venue by 2027-04-17")).toMatchObject({
      type: "add_task",
      title: "Lock the venue",
      dueDate: "2027-04-17",
    });
  });

  it("leaves a relative date alone and keeps the whole phrase as the title", () => {
    const action = only("add task call the florist by next Friday");
    expect(action).toMatchObject({ type: "add_task", title: "Call the florist by next Friday" });
    expect(action.type === "add_task" && action.dueDate).toBeUndefined();
  });
});

describe("parseFallback — completions, notes, decisions", () => {
  it("marks a task done with 'mark ... done'", () => {
    expect(only("mark book the photographer done")).toMatchObject({ type: "complete_task", titleMatch: "book the photographer" });
  });

  it("marks a task done with 'done with'", () => {
    expect(only("done with the guest list draft")).toMatchObject({ type: "complete_task", titleMatch: "guest list draft" });
  });

  it("marks a task done with 'finished'", () => {
    expect(only("we finished the engagement party invites")).toMatchObject({
      type: "complete_task",
      titleMatch: "engagement party invites",
    });
  });

  it("saves an explicit note", () => {
    expect(only("note: Janel loves the Bahamas light in April")).toMatchObject({
      type: "add_note",
      text: "Janel loves the Bahamas light in April",
    });
  });

  it("saves a 'remember' note", () => {
    expect(only("remember that Aunt Denise cannot fly")).toMatchObject({ type: "add_note", text: "Aunt Denise cannot fly" });
  });

  it("logs a decision", () => {
    expect(only("we decided on a spring 2028 wedding")).toMatchObject({ type: "add_decision", title: "A spring 2028 wedding" });
  });

  it("falls back to a note for anything it does not recognize", () => {
    expect(only("what would the Bahamas cost in April?")).toMatchObject({
      type: "add_note",
      text: "what would the Bahamas cost in April?",
    });
  });

  it("returns nothing for empty input", () => {
    expect(parseFallback("   ", OPTIONS)).toEqual([]);
  });
});

describe("parseLooseDate", () => {
  it("rolls a year-less date that already passed into next year", () => {
    expect(parseLooseDate("Apr 17", "2026-09-17")).toBe("2027-04-17");
  });

  it("keeps a year-less date later this year", () => {
    expect(parseLooseDate("Dec 5", "2026-09-17")).toBe("2026-12-05");
  });

  it("returns undefined for a phrase it cannot parse", () => {
    expect(parseLooseDate("next Friday", "2026-09-17")).toBeUndefined();
  });
});
