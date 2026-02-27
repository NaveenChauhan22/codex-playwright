import type { Page } from "@playwright/test";
import { LoginPage } from "../../pageObjects/Login/LoginPage";
import { expect, test } from "../driver/baseTest";

async function skipIfBlocked(page: Page): Promise<void> {
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
    await skipIfBlocked(page);
    await loginPage.login(appSettings.credentials.username, appSettings.credentials.password);

    await expect(page).toHaveURL(/login|inloggen|account/i);
    await expect(loginPage.usernameInput.first()).toBeVisible();
    await expect(loginPage.passwordInput.first()).toBeVisible();
    await expect.soft(loginPage.errorMessage.first()).toBeVisible();
  });
});
