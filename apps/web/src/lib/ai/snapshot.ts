import { scenarioMath, type Guest, type WeddingRepo } from "@bower/shared";
import { WEDDING_SLUG } from "@/lib/constants";

/**
 * Everything Atlas needs to know about this wedding, as compact text.
 *
 * It is deliberately deterministic — sorted lists, no timestamps, no ids that
 * change between runs — because it rides after the cached system block and any
 * churn would invalidate the cache on every turn. Target is ~2-3k tokens.
 */

export interface SnapshotOptions {
  /** "Today" as YYYY-MM-DD. Defaults to the real date; tests pin it. */
  today?: string;
  /** Local mode holds one wedding at a fixed slug. */
  slug?: string;
}

const MAX_TASKS = 15;
const MAX_DECISIONS = 6;

export async function buildSnapshot(repo: WeddingRepo, weddingId: string, options: SnapshotOptions = {}): Promise<string> {
  const today = options.today ?? new Date().toISOString().slice(0, 10);
  const wedding = await repo.getWedding(options.slug ?? WEDDING_SLUG);
  const [settings, destinations, scenarios, tasks, subEvents, partyMembers, guests, budgetItems, decisions, venues] =
    await Promise.all([
      repo.getSettings(weddingId),
      repo.destinations.list(weddingId),
      repo.scenarios.list(weddingId),
      repo.tasks.list(weddingId),
      repo.subEvents.list(weddingId),
      repo.partyMembers.list(weddingId),
      repo.guests.list(weddingId),
      repo.budgetItems.list(weddingId),
      repo.decisions.list(weddingId),
      repo.venues.list(weddingId),
    ]);

  const lines: string[] = [];
  lines.push(`TODAY: ${today}`);

  lines.push("", "## Wedding");
  if (wedding) {
    lines.push(
      `name: ${wedding.name}`,
      `partner A (side a): ${wedding.partnerA.name}`,
      `partner B (side b): ${wedding.partnerB.name}`,
      `date: ${wedding.targetDate ?? "not set"} (flexibility: ${wedding.dateFlexibility})`,
      `season: ${wedding.targetSeason ?? "not set"}`,
      `guest target: ${wedding.guestTarget ?? "not set"}`,
      `destination wedding: ${wedding.isDestination ? "yes" : "no"}`,
    );
    if (wedding.locationText) lines.push(`location note: ${wedding.locationText}`);
    if (wedding.styleNotes) lines.push(`style: ${wedding.styleNotes}`);
  } else {
    lines.push("(not loaded)");
  }

  const plan = settings?.planConfig;
  lines.push("", "## Anchors and communication offsets");
  if (plan) {
    const anchors = [...plan.anchors].sort(byKey((a) => `${a.date ?? "9999"}|${a.title}`));
    for (const anchor of anchors) {
      lines.push(`- ${anchor.title} (${anchor.kind}) on ${anchor.date ?? "TBD"}; reveals: ${anchor.reveals.join(", ") || "none"}`);
    }
    if (anchors.length === 0) lines.push("- none");
    lines.push(
      `save-the-dates: ${plan.saveTheDatesMonthsBefore} months before the wedding`,
      `invitations: ${plan.invitationsMonthsBefore} months before`,
      `RSVP deadline: ${plan.rsvpDeadlineMonthsBefore} months before`,
    );
    const windows = [...plan.travelWindows].sort(byKey((w) => `${w.start}|${w.label}`));
    for (const window of windows) lines.push(`- travel window ${window.label}: ${window.start} to ${window.end}, ${window.location}`);
  } else {
    lines.push("- none");
  }

  lines.push("", "## Destinations");
  const venuesByDestination = new Map<string, number>();
  for (const venue of venues) venuesByDestination.set(venue.destinationId, (venuesByDestination.get(venue.destinationId) ?? 0) + 1);
  // Full stats only for what the couple is actually comparing (favorited, matching the
  // Explore/Favorites split on the Destinations page) — the rest of the Explore catalog can
  // run to 50+ entries, so those get a name-only line instead of full per-destination detail,
  // keeping the AI aware of what exists without blowing the token budget.
  const sortedDestinations = [...destinations].sort(byKey((d) => d.name));
  for (const destination of sortedDestinations) {
    if ((destination.favoritedBy?.length ?? 0) > 0) {
      const attendance =
        destination.attendanceRateEstimate !== undefined ? `${Math.round(destination.attendanceRateEstimate * 100)}% likely to attend` : "attendance unknown";
      lines.push(
        `- ${destination.name}, ${destination.country} [id ${destination.id}] [FAVORITED] — travel ${money(destination.travelCostPerGuestEstimate)}/guest, ${attendance}, ${venuesByDestination.get(destination.id) ?? 0} venue(s) saved`,
      );
    } else {
      // No id here: an unfavorited destination is browse-only context, not something an
      // action would target directly, and the id would otherwise cost ~36 chars x up to 50
      // rows for no benefit — the couple would favorite it first before acting on it.
      lines.push(`- ${destination.name}, ${destination.country}`);
    }
  }
  if (sortedDestinations.length === 0) lines.push("- none yet");

  lines.push("", "## Scenarios");
  const destinationNames = new Map(destinations.map((d) => [d.id, d.name]));
  const sortedScenarios = [...scenarios].sort(byKey((s) => s.name));
  for (const scenario of sortedScenarios) {
    const math = scenarioMath(scenario);
    const pinned = scenario.pinned || scenario.id === wedding?.activeScenarioId ? " [PINNED]" : "";
    lines.push(
      `- ${scenario.name}${pinned} — ${destinationNames.get(scenario.destinationId ?? "") ?? "no destination"}, ${math.expectedGuests} of ${scenario.guestAssumption} guests expected, total ${money(math.totalCost)}, ${money(math.costPerGuest)}/guest, guest travel burden ${money(math.guestTravelBurden)}`,
    );
  }
  if (sortedScenarios.length === 0) lines.push("- none yet");

  lines.push("", `## Next ${MAX_TASKS} open tasks`);
  const openTasks = tasks
    .filter((task) => task.status !== "done" && task.status !== "skipped")
    .sort(byKey((task) => `${task.dueDate ?? "9999-99-99"}|${task.title}`))
    .slice(0, MAX_TASKS);
  for (const task of openTasks) lines.push(`- ${task.dueDate ?? "no date"} — ${task.title} (${task.phase})`);
  if (openTasks.length === 0) lines.push("- none open");

  lines.push("", "## Sub-events");
  const sortedSubEvents = [...subEvents].sort(byKey((s) => `${s.date ?? "9999-99-99"}|${s.title}`));
  for (const subEvent of sortedSubEvents) {
    lines.push(
      `- ${subEvent.title} (${subEvent.kind}) on ${subEvent.date ?? "TBD"}${subEvent.hostName ? `, hosted by ${subEvent.hostName}` : ""}${subEvent.budgetEstimate !== undefined ? `, ~${money(subEvent.budgetEstimate)}` : ""}`,
    );
  }
  if (sortedSubEvents.length === 0) lines.push("- none yet");

  lines.push("", "## Wedding party");
  const sortedParty = [...partyMembers].sort(byKey((m) => `${m.role}|${m.name}`));
  for (const member of sortedParty) lines.push(`- ${member.name} — ${member.role}, side ${member.side}, ${member.asked ? "asked" : "not asked yet"}`);
  if (sortedParty.length === 0) lines.push("- none yet");

  lines.push("", "## Guests");
  lines.push(`total: ${guests.length}`);
  lines.push(`by tier: ${countLine(guests, (g) => g.tier, ["must", "should", "nice"])}`);
  lines.push(`by side: ${countLine(guests, (g) => g.side, ["a", "b", "both"])}`);
  lines.push(`plus ones: ${guests.filter((g) => g.plusOne).length}, children: ${guests.filter((g) => g.isChild).length}`);

  lines.push("", "## Budget totals");
  lines.push(
    `estimate ${money(sum(budgetItems, (i) => i.estimate))}, quoted ${money(sum(budgetItems, (i) => i.quoted))}, contracted ${money(sum(budgetItems, (i) => i.contracted))}, paid ${money(sum(budgetItems, (i) => i.paid))} across ${budgetItems.length} line(s)`,
  );

  lines.push("", `## Last ${MAX_DECISIONS} decisions`);
  const recentDecisions = [...decisions]
    .sort((a, b) => (a.decidedAt < b.decidedAt ? 1 : a.decidedAt > b.decidedAt ? -1 : a.title.localeCompare(b.title)))
    .slice(0, MAX_DECISIONS);
  for (const decision of recentDecisions) lines.push(`- ${decision.title}${decision.detail ? ` — ${decision.detail}` : ""}`);
  if (recentDecisions.length === 0) lines.push("- none yet");

  return lines.join("\n");
}

function byKey<T>(key: (value: T) => string): (a: T, b: T) => number {
  return (a, b) => {
    const left = key(a);
    const right = key(b);
    return left < right ? -1 : left > right ? 1 : 0;
  };
}

function sum<T>(items: T[], pick: (item: T) => number | undefined): number {
  return items.reduce((total, item) => total + (pick(item) ?? 0), 0);
}

function countLine(guests: Guest[], pick: (guest: Guest) => string, keys: string[]): string {
  return keys.map((key) => `${key} ${guests.filter((guest) => pick(guest) === key).length}`).join(", ");
}

function money(value: number | undefined): string {
  if (value === undefined) return "unknown";
  return `$${Math.round(value).toLocaleString("en-US")}`;
}
