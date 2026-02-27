class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator(
      'input#searchfor[name="searchtext"][data-test="search_input_trigger"]'
    );
    this.searchButton = page.getByRole("button", { name: /zoek|search/i });
    this.resultHeader = page.locator("h1");
  }

  async searchFor(query) {
    await this.searchInput.first().fill(query);
    await this.searchInput.first().press("Enter");
  }
}

module.exports = { SearchPage };
