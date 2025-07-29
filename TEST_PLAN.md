# Test Plan

## What is being tested
- The core functionality of a simple web application with a React frontend and Node.js backend API.
- Both API endpoints and UI workflows.

## Coverage areas
- **API:** Login (valid/invalid), CRUD for items, negative and edge cases (invalid data, not found, etc.).
- **UI:** Add, edit, delete items, prevent empty items, and verify data presence after actions.

## Tools used and why
- **Playwright:** For unified, fast, and reliable end-to-end and API automation.
- **Jest/React Scripts:** For any unit tests in the frontend (optional).

## How to run the tests
1. Start both backend (`npm start` in `/backend`) and frontend (`npm start` in `/frontend`).
2. From the project root, install test dependencies:
   ```
   npm install --save-dev playwright @playwright/test
   npx playwright install
   ```
3. Run all tests:
   ```
   npx playwright test
   ```
4. Run only API or UI tests:
   ```
   npx playwright test tests/api/api.spec.ts
   npx playwright test tests/ui/ui.spec.ts
   ```

## Assumptions/limitations
- The backend and frontend must be running locally on ports 5000 and 3000.
- Test data is not persisted between runs (in-memory).
- No authentication tokens/session management required for UI.
- UI selectors are stable and based on visible text or placeholders.

## Summary Table

| Step         | Tool        | File/Folder               |
|--------------|-------------|---------------------------|
| API Tests    | Playwright  | tests/api/api.spec.ts     |
|              | Postman     | webapp-api.postman_collection.json|
| UI Tests     | Playwright  | tests/ui/ui.spec.ts       |
| Test Plan    | Markdown    | TEST_PLAN.md              |

---

## Bonus Section Summary Table

| Bonus Requirement                | Status | Details/Location                          |
|----------------------------------|--------|-------------------------------------------|
| GitHub Actions CI                | ✔️     | `.github/workflows/playwright.yml`        |
| Code Coverage Reporting          | ✔️     | `backend/coverage/` (nyc, backend only)   |
| Visual Snapshots (UI, Allure)    | ✔️     | `test-results` folder, Allure report      |