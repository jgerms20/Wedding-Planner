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

/** Caribbean islands and island nations — what "a Caribbean location" means on the Destinations page. */
const CARIBBEAN = new Set([
  "the bahamas", "bahamas", "jamaica", "st. lucia", "saint lucia", "turks and caicos islands", "turks and caicos",
  "dominican republic", "puerto rico", "aruba", "barbados", "antigua and barbuda", "curaçao", "curacao",
  "cayman islands", "us virgin islands", "u.s. virgin islands", "british virgin islands", "grenada",
  "st. kitts and nevis", "saint kitts and nevis", "trinidad and tobago", "st. vincent and the grenadines",
  "saint vincent and the grenadines", "dominica", "anguilla", "sint maarten", "st. maarten", "saint martin",
  "st. barts", "saint barthélemy", "bonaire", "martinique", "guadeloupe", "haiti", "cuba",
]);

export function isCaribbean(country: string | undefined): boolean {
  return CARIBBEAN.has((country ?? "").trim().toLowerCase());
}
