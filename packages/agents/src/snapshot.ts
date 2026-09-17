import type { WeddingSnapshot } from "./types.js";

/** A snapshot with nothing in it yet, for weddings the store has no data for. */
export function emptySnapshot(weddingId: string): WeddingSnapshot {
  return {
    wedding: { id: weddingId, name: "Untitled wedding" },
    tasksSummary: { total: 0, done: 0, upcoming: [] },
  };
}

/**
 * Renders a wedding snapshot as plain text for the system prompt's second
 * cacheable block. Rendering is a pure function of the snapshot's own
 * fields (no timestamps, no random ids, no object-key order dependence) so
 * that two calls with equal snapshots always produce byte-identical text —
 * required for prompt cache hits on the wedding-context block.
 */
export function renderSnapshot(snapshot: WeddingSnapshot): string {
  const lines: string[] = [];
  lines.push(`Wedding: ${snapshot.wedding.name} (${snapshot.wedding.id})`);
  if (snapshot.wedding.targetDate) {
    lines.push(`Target date: ${snapshot.wedding.targetDate}`);
  }
  lines.push(
    `Tasks: ${snapshot.tasksSummary.done}/${snapshot.tasksSummary.total} done`,
  );
  if (snapshot.tasksSummary.upcoming.length > 0) {
    lines.push("Upcoming:");
    for (const task of snapshot.tasksSummary.upcoming) {
      const due = task.dueDate ? ` (due ${task.dueDate})` : "";
      lines.push(`- [${task.phase}] ${task.title}${due}`);
    }
  }
  return lines.join("\n");
}
