# LOOPTE - Playwright Test Automation

End-to-end test suite for the [Project Board](https://animated-gingersnap-8cf7f2.netlify.app) application using Playwright.

---

## Project Structure

```
LOOPTE/
├── Pages/
│   ├── HomePage.ts               # Login page load verification
│   ├── LoginPage.ts              # Login actions
│   └── ProjectBoardPage.ts       # Project board interactions
├── tests/
│   ├── Home.spec.ts                      # Verifies login page loads correctly
│   ├── Login.spec.ts                     # Verifies login with valid credentials
│   ├── ProjectStatusBoard.spec.ts        # Data-driven tests (single test per TC)
│   └── ProjectStatusBoardGranular.spec.ts # Data-driven tests (granular steps per TC)
├── data/
│   └── testdata.json             # Test case data
├── support/
│   ├── config.ts                 # Credentials (env var support)
│   └── types.ts                  # TypeScript interfaces
├── playwright.config.ts
└── tsconfig.json
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+

---

## Installation

```bash
npm install
npx playwright install
```

---

## Running Tests

| Command | Description |
|---|---|
| `npm test` | Run all tests headless |
| `npm run test:headed` | Run all tests with browser visible |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:board` | Run ProjectStatusBoard spec and open report |
| `npm run report` | Open last HTML report |

---

## Test Data

Tests are data-driven using `data/testdata.json`. Each entry represents a test case with the following fields:

| Field | Description |
|---|---|
| `TC` | Test case name |
| `Project` | Project to navigate to |
| `ProjectDBCol` | Board column (e.g. To Do, In Progress, Done) |
| `USNameCol` | User story name to verify |
| `USTagsCol` | Tags to verify on the card |

---

## Credentials

Credentials default to `admin` / `password123`. Override via environment variables:

```bash
APP_USERNAME=admin APP_PASSWORD=password123 npm test
```

---

## Reports

After each run an HTML report is generated in `playwright-report/`. Open it with:

```bash
npm run report
```
