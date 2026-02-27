const { test, expect } = require("../driver/baseTest");
const { LoginPage } = require("../../pageObjects/Login/LoginPage");

async function skipIfBlocked(page, test) {
  const blockedPageHeading = page.getByRole("heading", {
    name: /ip address .* is blocked|slow down there speed racer/i,
  });
  if (await blockedPageHeading.count()) {
    test.skip(true, "bol.com temporarily blocked this IP");
  }
}

test.describe("Login page", () => {
  test("should load username and password fields", async ({ page, appSettings }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open(appSettings.app.loginPath);
    await skipIfBlocked(page, test);
    await expect(loginPage.usernameInput.first()).toBeVisible();
    await expect(loginPage.passwordInput.first()).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
