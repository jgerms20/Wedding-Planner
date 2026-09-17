/** New random id for an entity. UUID v4 via the platform crypto implementation. */
export function newId(): string {
  return crypto.randomUUID();
}

/** Current time as an ISO string, matching the entities.md "timestamps are ISO strings" rule. */
export function nowIso(): string {
  return new Date().toISOString();
}
