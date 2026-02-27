import type { Locator, Page } from "@playwright/test";

export class SearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly resultHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator(
      'input#searchfor[name="searchtext"][data-test="search_input_trigger"]'
    );
    this.searchButton = page.getByRole("button", { name: /zoek|search/i });
    this.resultHeader = page.locator("h1");
  }

  async searchFor(query: string): Promise<void> {
    await this.searchInput.first().fill(query);
    await this.searchInput.first().press("Enter");
  }
}
