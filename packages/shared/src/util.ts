/** New random id for an entity. UUID v4 via the platform crypto implementation. */
export function newId(): string {
  return crypto.randomUUID();
}

/** Current time as an ISO string, matching the entities.md "timestamps are ISO strings" rule. */
export function nowIso(): string {
  return new Date().toISOString();
}

/**
 * A deterministic id for a record created from shared seed data: the same inputs always give the
 * same id, so two browsers adding the same seed record at once write one record, not two.
 * (FNV-1a over four seeds, formatted like a UUID. Not a security primitive.)
 */
export function stableId(...parts: string[]): string {
  const input = parts.join("\u0000");
  const hex = [0x811c9dc5, 0x01000193, 0x2545f491, 0x9e3779b9]
    .map((seed) => {
      let hash = seed >>> 0;
      for (let i = 0; i < input.length; i++) {
        hash ^= input.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193) >>> 0;
      }
      return hash.toString(16).padStart(8, "0");
    })
    .join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}
