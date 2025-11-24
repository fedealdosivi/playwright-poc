# Playwright POC

A Playwright test automation proof of concept implementing the Page Object Model (POM) design pattern with code coverage reporting.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Configuration

Copy the example environment file and configure as needed:

```bash
cp .env.example .env
```

Edit `.env` to customize:

- `BASE_URL` - Base URL for tests
- `HEADLESS` - Run tests in headless mode
- `TIMEOUT` - Default timeout for actions
- Test user credentials

## Running Tests

Run all tests:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run tests in UI mode:

```bash
npm run test:ui
```

Debug tests:

```bash
npm run test:debug
```

Run tests for specific browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Reports

View HTML test report:

```bash
npm run test:report
```

Coverage reports are generated in the `coverage/` directory after test execution.

## Code Quality

Run linter:

```bash
npm run lint
```

Fix linting issues:

```bash
npm run lint:fix
```

Format code:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

## Playwright Codegen

Open Playwright code generator:

```bash
npm run codegen
```
## License

MIT