import type { Side } from "@bower/shared";

/** "a"/"b"/"both" are the storage values; the couple should only ever see their own names. */
export function sideLabel(side: Side, partnerAName: string, partnerBName: string): string {
  if (side === "a") return partnerAName;
  if (side === "b") return partnerBName;
  return "Both";
}
