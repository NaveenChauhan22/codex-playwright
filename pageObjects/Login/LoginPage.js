class LoginPage {
  constructor(page) {
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

  async open(loginPath) {
    await this.page.goto(loginPath);
  }

  async login(username, password) {
    await this.usernameInput.first().fill(username);
    await this.passwordInput.first().fill(password);
    await this.loginButton.first().click();
  }
}

module.exports = { LoginPage };
