import { expect, test } from "@playwright/test";

test("first visit through intake to a working plan, destination, and export", async ({ page }) => {
  // Loads the site root (first visit), which creates the placeholder wedding and sends us to intake.
  // A relative "./" (not "/") keeps baseURL's /Wedding-Planner path segment.
  await page.goto("./");
  await page.waitForURL(/\/w\/our-wedding\/intake\/?$/);
  await expect(page.getByRole("heading", { name: /let.s sketch the shape/i })).toBeVisible();

  // Step 0: names.
  await page.getByTestId("intake-partner-a-name").fill("Alex");
  await page.getByTestId("intake-partner-b-name").fill("Sam");
  await page.getByRole("button", { name: "Next" }).click();

  // Step 1: a fixed date, so Home has a real countdown to check.
  await page.getByTestId("intake-date-mode").selectOption("fixed");
  await page.getByTestId("intake-target-date").fill("2028-06-10");
  await page.getByRole("button", { name: "Next" }).click();

  // Steps 2-6: accept defaults.
  for (let i = 0; i < 5; i++) {
    await page.getByRole("button", { name: "Next" }).click();
  }

  // Step 7: review and build.
  await expect(page.getByText("Alex & Sam")).toBeVisible();
  await page.getByRole("button", { name: "Build my plan" }).click();

  // Home: redirected here once the plan is generated, with a real countdown.
  await page.waitForURL(/\/w\/our-wedding\/?$/);
  await expect(page.getByTestId("home-countdown")).toHaveText(/days to go|Tomorrow|Today/);
  await expect(page.getByText(/Saturday, June 10, 2028/)).toBeVisible();

  // Plan: the generated tasks are grouped by phase.
  await page.getByRole("link", { name: "Plan", exact: true }).click();
  await page.waitForURL(/\/w\/our-wedding\/plan\/?$/);
  await expect(page.getByText("Just engaged")).toBeVisible();
  // Task titles render as inline-editable <input> values, not text nodes.
  await expect(page.locator('input[value*="Book venue"]')).toBeVisible();

  // Destinations: add a destination and a scenario, see it in the comparison table.
  await page.getByRole("link", { name: "Destinations" }).click();
  await page.waitForURL(/\/w\/our-wedding\/destinations\/?$/);

  await page.getByRole("button", { name: "Add destination" }).click();
  await page.getByTestId("destination-name").fill("Tulum");
  await page.getByTestId("destination-country").fill("Mexico");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Tulum", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "New scenario" }).click();
  await page.getByTestId("scenario-name").fill("Plan A — Tulum");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("table")).toContainText("Plan A — Tulum");

  // Settings: export a JSON backup.
  await page.getByRole("link", { name: "Settings" }).click();
  await page.waitForURL(/\/w\/our-wedding\/settings\/?$/);
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export JSON" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("our-wedding-export.json");
});
