const CODES: Record<string, string> = {
  brazil: "BR",
  jamaica: "JM",
  bahamas: "BS",
  "the bahamas": "BS",
  "united states": "US",
  usa: "US",
  us: "US",
  mexico: "MX",
  italy: "IT",
  portugal: "PT",
  spain: "ES",
  france: "FR",
  greece: "GR",
  "dominican republic": "DO",
  "costa rica": "CR",
  colombia: "CO",
};

/** Two-letter code for the passport stamp; falls back to the first two letters of the name. */
export function countryCode(country: string | undefined, name?: string): string {
  const key = (country ?? "").trim().toLowerCase();
  if (CODES[key]) return CODES[key];
  const source = name ?? country ?? "??";
  return source.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase() || "??";
}

/** True for anywhere in the United States, for grouping the atlas into domestic/international. */
export function isDomesticCountry(country: string | undefined): boolean {
  return countryCode(country) === "US";
}
