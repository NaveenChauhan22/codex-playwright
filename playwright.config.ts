import { defineConfig, devices } from "@playwright/test";
import settings from "./settings.json";

export default defineConfig({
  testDir: "./tests",
  timeout: settings.timeouts.navigationMs,
  expect: {
    timeout: settings.timeouts.expectMs,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ["list"],
    ["html", { outputFolder: "html-report", open: "never" }],
    ["junit", { outputFile: "reports/results.xml" }],
  ],
  use: {
    baseURL: process.env.BASE_URL || settings.app.baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: true,
  },
  outputDir: "test-results",
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
