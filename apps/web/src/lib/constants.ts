import type { DataMode } from "@bower/shared";

/** Local mode holds exactly one wedding, at this fixed slug. */
export const WEDDING_SLUG = "our-wedding";

export const DATA_MODE: DataMode = (process.env.NEXT_PUBLIC_DATA_MODE as DataMode | undefined) ?? "local";
