const { test, expect } = require("../driver/baseTest");
const { SearchPage } = require("../../pageObjects/Search/SearchPage");

async function isBlockedPage(page) {
  const blockedPageHeading = page.getByRole("heading", {
    name: /ip address .* is blocked|slow down there speed racer/i,
  });
  return (await blockedPageHeading.count()) > 0;
}

async function ensureSearchInputReady(page, test) {
  const searchPage = new SearchPage(page);

  if (await isBlockedPage(page)) {
    test.skip(true, "bol.com blocked this IP for homepage access");
    return searchPage;
  }

  await expect(searchPage.searchInput.first()).toBeVisible();
  return searchPage;
}

test.describe("Search journey", () => {
  test("should load search controls on homepage", async ({ page }) => {
    const searchPage = await ensureSearchInputReady(page, test);

    await expect(searchPage.searchInput.first()).toBeVisible();
  });

  test("should show results after entering a query", async ({ page, appSettings }) => {
    const searchPage = await ensureSearchInputReady(page, test);
    const query = appSettings.search.query;

    await searchPage.searchFor(query);
    await expect(page).toHaveURL(new RegExp(query, "i"));
    await expect(searchPage.resultHeader.first()).toBeVisible();
  });
});
