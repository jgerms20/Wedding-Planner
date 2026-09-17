import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;
const BASE_PATH = "/Wedding-Planner";
const baseURL = `http://localhost:${PORT}${BASE_PATH}/`;

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: { timeout: 5_000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  webServer: {
    command: `node e2e/static-server.mjs`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    env: { PORT: String(PORT), BASE_PATH },
    timeout: 30_000,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Pinned @playwright/test matches the pre-installed chromium-1194 in
        // PLAYWRIGHT_BROWSERS_PATH; point at it directly rather than relying
        // on discovery, per the environment's rule against `playwright install`.
        launchOptions: { executablePath: "/opt/pw-browsers/chromium" },
      },
    },
  ],
});
