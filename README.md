# Playwright Automation Framework

## Project Structure

```
.
├── pageObjects/
│   ├── Login/             # Login page object model
│   └── Search/            # Search page object model
├── reports/               # JUnit or other machine-readable reports
├── settings.json          # Base URL, credentials, and test settings
├── tests/
│   ├── driver/            # Shared test driver fixture (base navigation)
│   ├── Login/             # Login test specs
│   └── Search/            # Search test specs
├── test-results/          # Raw artifacts (screenshots/videos/traces)
├── html-report/           # Playwright HTML report
├── playwright.config.js   # Main Playwright configuration
└── package.json
```

## Notes

- Base navigation to `https://www.bol.com` is handled in `tests/driver/baseTest.js` via `beforeEach`, so tests do not call homepage navigation independently.
- Credentials and paths are read from `settings.json`.
- `bol.com` can rate-limit/temporarily block automation traffic by IP; tests skip in that case with a clear reason.

## Install

```bash
npm install
npx playwright install
```

## Run Tests

```bash
npm test
npm run test:headed
npm run test:ui
```

## Open HTML Report

```bash
npm run report
```
