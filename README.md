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
├── playwright.config.ts   # Main Playwright configuration
├── tsconfig.json          # TypeScript compiler options
└── package.json
```

## Notes

- Base navigation to `https://www.bol.com` is handled in `tests/driver/baseTest.ts` via `beforeEach`, so tests do not call homepage navigation independently.
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

## Built With Codex

This automation framework was built from scratch using OpenAI Codex.
I will continue using Codex going forward to expand this project with additional test coverage and framework improvements.
