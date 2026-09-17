import { expect, test } from "@playwright/test";

test("first load lands on the pre-seeded Home, and the redesigned pages hold up", async ({ page }) => {
  // Loads the site root (first visit ever, nothing in IndexedDB yet). The app seeds Joshua &
  // Janel's bundle itself — no intake redirect. A relative "./" (not "/") keeps baseURL's
  // /Wedding-Planner path segment.
  await page.goto("./");
  await page.waitForURL(/\/w\/our-wedding\/?$/);
  await expect(page.getByText("Joshua & Janel").first()).toBeVisible();
  await expect(page.getByTestId("home-headline")).toHaveText("Spring 2028");

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
  await page.getByRole("button", { name: "Sources" }).first().click();
  await expect(page.getByRole("heading", { name: "How we estimated this" })).toBeVisible();
  // It is a modal: close it before navigating, the way a person would.
  await page.keyboard.press("Escape");
  await expect(page.getByRole("heading", { name: "How we estimated this" })).toBeHidden();

  // Guests: the cut-at-N slider renders even with an empty list (no guests in the seed).
  await page.getByRole("link", { name: "Guests", exact: true }).click();
  await page.waitForURL(/\/w\/our-wedding\/guests\/?$/);
  await expect(page.getByTestId("guests-cut-slider")).toBeVisible();

  // Settings: the seed-restore action is there, ready if the couple wants to start over.
  await page.getByRole("link", { name: "Settings", exact: true }).click();
  await page.waitForURL(/\/w\/our-wedding\/settings\/?$/);
  await expect(page.getByRole("button", { name: /Restore the Joshua & Janel seed/ })).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export JSON" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("our-wedding-export.json");
});
