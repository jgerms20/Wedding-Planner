import { expect, test } from "@playwright/test";

test("first load lands on the pre-seeded Home, and the redesigned pages hold up", async ({ page }) => {
  // Loads the site root (first visit ever, nothing in IndexedDB yet). The app seeds Joshua &
  // Janel's bundle itself — no intake redirect. A relative "./" (not "/") keeps baseURL's
  // /Wedding-Planner path segment.
  await page.goto("./");
  await page.waitForURL(/\/w\/our-wedding\/?$/);
  await expect(page.getByText("Joshua & Janel").first()).toBeVisible();
  await expect(page.getByTestId("home-headline")).toHaveText("April 15, 2028");

  // Plan: phases render as chapter openers, grouped tasks and all.
  await page.getByRole("link", { name: "Plan", exact: true }).click();
  await page.waitForURL(/\/w\/our-wedding\/plan\/?$/);
  await expect(page.getByRole("heading", { name: "Just engaged" })).toBeVisible();

  // Budget: seeded lines are marked as estimates, and the drawer explains where a number came from.
  await page.getByRole("link", { name: "Budget", exact: true }).click();
  await page.waitForURL(/\/w\/our-wedding\/budget\/?$/);
  await page.getByTestId("budget-category-toggle").first().click();
  const estimateChip = page.getByTestId("budget-estimate-chip").first();
  await expect(estimateChip).toBeVisible();
  await page.getByRole("button", { name: "Where this number came from" }).first().click();
  await expect(page.getByRole("heading", { name: "How we estimated this" })).toBeVisible();
  // It is a modal: close it before navigating, the way a person would.
  await page.keyboard.press("Escape");
  await expect(page.getByRole("heading", { name: "How we estimated this" })).toBeHidden();

  // Destinations: the Round 4 expansion (Charleston plus 40 new Explore destinations) actually
  // reaches the live app, not just the seed data — Explore is the default tab.
  await page.getByRole("link", { name: "Destinations", exact: true }).click();
  await page.waitForURL(/\/w\/our-wedding\/destinations\/?$/);
  await expect(page.getByText("Charleston, SC")).toBeVisible();
  await expect(page.getByText("Tulum", { exact: true })).toBeVisible();

  // "Not for us" sets a destination aside instead of deleting it, and it stays set aside (and
  // single) across a reload — a removed seed destination used to quietly come back on load.
  await page.getByRole("button", { name: "Not for us: Iceland" }).click();
  // The banner appears only once the save has landed — reloading before that races the write.
  await expect(page.getByText(/Iceland moved to/)).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: /^Not for us \(1\)/ }).click();
  await page.getByRole("button", { name: "Bring it back" }).click();
  await page.getByRole("button", { name: "Explore", exact: true }).click();
  await expect(page.getByRole("button", { name: "Not for us: Iceland" })).toHaveCount(1);

  // Guests: the headcount card renders, both partners' lists are in (Janel's corrected spellings,
  // Joshua's numbered pool), and each partner's "Mom" stays a separate person.
  await page.getByRole("link", { name: "Guests", exact: true }).click();
  await page.waitForURL(/\/w\/our-wedding\/guests\/?$/);
  await expect(page.getByTestId("guests-headcount")).toBeVisible();
  await expect(page.getByText("Reagan").first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Alayna", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Grandmommy", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Mom", exact: true })).toHaveCount(2);

  // Settings: the seed-restore action is there, ready if the couple wants to start over.
  await page.getByRole("link", { name: "Settings", exact: true }).click();
  await page.waitForURL(/\/w\/our-wedding\/settings\/?$/);
  await expect(page.getByRole("button", { name: /Restore the Joshua & Janel seed/ })).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export JSON" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("our-wedding-export.json");
});
