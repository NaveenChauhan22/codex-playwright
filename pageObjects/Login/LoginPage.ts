import type { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(
      'input[type="email"], input[name*="email"], input[autocomplete="username"]'
    );
    this.passwordInput = page.locator(
      'input[type="password"], input[autocomplete="current-password"]'
    );
    this.loginButton = page.getByRole("button", {
      name: /inloggen|log in|login|doorgaan|continue/i,
    });
    this.errorMessage = page.locator(
      '[role="alert"], .notification__body, .message, [class*="error"]'
    );
  }

  async open(loginPath: string): Promise<void> {
    await this.page.goto(loginPath);
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.first().fill(username);
    await this.passwordInput.first().fill(password);
    await this.loginButton.first().click();
  }
}
