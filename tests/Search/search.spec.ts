import type { Page } from "@playwright/test";
import { SearchPage } from "../../pageObjects/Search/SearchPage";
import { expect, test } from "../driver/baseTest";

async function isBlockedPage(page: Page): Promise<boolean> {
  const bodyText = await page.locator("body").innerText().catch(() => "");
  return /ip address.*(blocked|geblokkeerd)|temporarily blocked|tijdelijk geblokkeerd|slow down there speed racer/i.test(
    bodyText
  );
}

async function ensureSearchInputReady(
  page: Page,
  appSettings: { execution: { delayBetweenTestsMs: number } }
): Promise<SearchPage> {
  const searchPage = new SearchPage(page);
  const searchInput = searchPage.searchInput.first();

  if (await searchInput.isVisible().catch(() => false)) {
    return searchPage;
  }

  await page.waitForTimeout(appSettings.execution.delayBetweenTestsMs);
  await page.goto("/", { waitUntil: "domcontentloaded" });

  if (await isBlockedPage(page)) {
    test.skip(true, "bol.com blocked this IP for homepage access");
    return searchPage;
  }

  await expect(searchInput).toBeVisible();
  return searchPage;
}

test.describe("Search journey", () => {
  test("should load search controls on homepage", async ({ page, appSettings }) => {
    const searchPage = await ensureSearchInputReady(page, appSettings);

    await expect(searchPage.searchInput.first()).toBeVisible();
  });

  test("should show results after entering a query", async ({ page, appSettings }) => {
    const searchPage = await ensureSearchInputReady(page, appSettings);
    const query = appSettings.search.query;

    await searchPage.searchFor(query);
    await expect(page).toHaveURL(new RegExp(query, "i"));
    await expect(searchPage.resultHeader.first()).toBeVisible();
  });
});
