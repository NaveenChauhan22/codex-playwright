const base = require("@playwright/test");
const settings = require("../../settings.json");

const HOME_SEARCH_INPUT_SELECTOR =
  'input#searchfor[name="searchtext"][data-test="search_input_trigger"]';

const test = base.test.extend({
  appSettings: async ({}, use) => {
    await use(settings);
  },
  sharedContext: [
    async ({ browser }, use) => {
      const context = await browser.newContext();
      await use(context);
      await context.close();
    },
    { scope: "worker" },
  ],
  sharedPage: [
    async ({ sharedContext }, use) => {
      const page = await sharedContext.newPage();
      await use(page);
      await page.close();
    },
    { scope: "worker" },
  ],
  page: async ({ sharedPage }, use) => {
    await use(sharedPage);
  },
});

async function isHomePageLoaded(page) {
  return page
    .locator(HOME_SEARCH_INPUT_SELECTOR)
    .first()
    .isVisible({ timeout: 1500 })
    .catch(() => false);
}

async function acceptCookiesIfPresent(page) {
  const acceptButton = page.getByRole("button", { name: /accepteren|accept/i });
  if (await acceptButton.count()) {
    await acceptButton.first().click({ timeout: 3000 }).catch(() => {});
  }
}

test.beforeEach(async ({ page, appSettings }) => {
  if (await isHomePageLoaded(page)) {
    return;
  }

  await page.waitForTimeout(appSettings.execution.delayBetweenTestsMs);
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await acceptCookiesIfPresent(page);
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== "skipped") {
    return;
  }

  const skipReasons = testInfo.annotations
    .filter((annotation) => annotation.type === "skip")
    .map((annotation) => annotation.description)
    .filter(Boolean);
  const reasonText = skipReasons.length ? skipReasons.join(" | ") : "No explicit skip reason";
  const headingText = await page
    .getByRole("heading")
    .first()
    .innerText()
    .catch(() => "No heading captured");

  testInfo.annotations.push({
    type: "skip-context",
    description: `${reasonText} | URL: ${page.url()} | Heading: ${headingText}`,
  });

  await testInfo.attach("skip-reason", {
    body: Buffer.from(
      [
        "# Skip Context",
        "",
        `- Reason: ${reasonText}`,
        `- URL: ${page.url()}`,
        `- Heading: ${headingText}`,
      ].join("\n"),
      "utf8"
    ),
    contentType: "text/markdown",
  });

  const screenshot = await page.screenshot({ fullPage: true }).catch(() => null);
  if (screenshot) {
    await testInfo.attach("skip-screenshot", {
      body: screenshot,
      contentType: "image/png",
    });
  }
});

module.exports = { test, expect: base.expect };
