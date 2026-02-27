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

test.describe("Login validations", () => {
  test("should not login with invalid credentials", async ({ page, appSettings }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open(appSettings.app.loginPath);
    await skipIfBlocked(page, test);
    await loginPage.login(appSettings.credentials.username, appSettings.credentials.password);

    await expect(page).toHaveURL(/login|inloggen|account/i);
    await expect(loginPage.usernameInput.first()).toBeVisible();
    await expect(loginPage.passwordInput.first()).toBeVisible();
    await expect.soft(loginPage.errorMessage.first()).toBeVisible();
  });
});
