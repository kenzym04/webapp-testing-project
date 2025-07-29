# Automated Testing for Web Application

This directory contains the test files and documentation for the automated testing of the web application, which consists of a React frontend and a Node.js backend API.

## Directory Structure

- **api/**: Contains Playwright API tests for backend endpoints.
- **ui/**: Contains Playwright UI (end-to-end) tests for the frontend application.
- **[webapp-api.postman_collection.json](../webapp-api.postman_collection.json)**: contains the API collections

## Running Tests

> **Note:** Ensure both the backend (`npm start` in `/backend`) and frontend (`npm start` in `/frontend`) servers are running before executing tests.

### 1. Install Playwright (if not already installed)

From the project root:
```
npm install --save-dev playwright @playwright/test
npx playwright install
```

### 2. Run All Tests

From the `tests` directory:
```
npx playwright test
```

### 3. Run Only API or UI Tests

- **API Tests:**
  ```
  npx playwright test api/api.spec.ts
  ```
- **UI Tests:**
  ```
  npx playwright test ui/ui.spec.ts
  ```

## Testing Strategy

- **API Testing:**  
  Uses Playwright's APIRequestContext to validate backend endpoints (`/login`, `/items`, etc.) for both positive and negative scenarios.

- **UI Testing:**  
  Uses Playwright to automate browser interactions with the React frontend, covering login, item creation, editing, deletion, and data assertions.

## Additional Notes

- All tests are written in TypeScript and located in the `tests/api` and `tests/ui` folders.
- For CI/CD, integrate `npx playwright test` into your pipeline to ensure tests run on every commit or pull request.
- You can generate HTML reports with:
  ```
  npx playwright test --reporter=html
  ```
- For more details, see the main project `README.md` and `TEST_PLAN.md`.

# Project Overview

This project is an automated testing setup for a simple web application consisting of a React frontend and a Node.js backend API. The project includes tests for both the frontend and backend components, ensuring that the application functions as expected.

## Project Structure

```
webapp-testing-project
├── backend
│   ├── node_modules
│   ├── src
│   │   ├── app.ts
│   │   └── routes
│   │       ├── api.ts
│   │       └── items.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── README.md
├── frontend
│   ├── node_modules
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   │   └── TodoList.tsx
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── minimatch.d.ts
│   │   ├── react-app-env.d.ts
│   │   └── react-dom-client.d.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── README.md
├── tests
│   ├── api
│   │   └── api.spec.ts
│   ├── ui
│   │   └── ui.spec.ts
│   ├── README.md
│   └── TEST_PLAN.md
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (version 16 or higher recommended)
- npm (Node package manager)
- TypeScript (for TypeScript projects)

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the frontend application:
   ```
   npm start
   ```

### Backend Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the backend server:
   ```
   npm start
   ```

### Running Automated Tests (Playwright + Allure)

> **Note:** Ensure both backend and frontend servers are running before testing.

1. Install Playwright and Allure reporter (from project root):
   ```
   npm install --save-dev playwright @playwright/test allure-playwright
   npx playwright install
   npm install -g allure-commandline
   ```

2. Run all tests:
   ```
   npx playwright test
   ```

3. Generate and open Allure report:
   ```
   npx allure generate ./allure-results --clean -o ./allure-report
   npx allure open ./allure-report
   ```

4. To run only API or UI tests:
   ```
   npx playwright test tests/api/api.spec.ts
   npx playwright test tests/ui/ui.spec.ts
   ```

### CI/CD Integration

This project is integrated with GitHub Actions for continuous integration and deployment.  
All Playwright tests are automatically run on every push and pull request using **GitHub Actions**.  
See `.github/workflows/playwright.yml` for the workflow configuration.

### Visual Snapshots (UI, Allure)

- **Screenshots** are captured for every test (pass or fail) and saved in the `test-results` directory.
- **Allure reports** include these screenshots for easy review.
- To generate and view the Allure report locally:
  ```
  npx allure generate ./allure-results --clean -o ./allure-report
  npx allure open ./allure-report
  ```

### Code Coverage (API)

- Code coverage for the backend API is collected using **nyc**.
- To run API tests with coverage:
  ```
  cd backend
  npx nyc --reporter=lcov --reporter=text npm start
  ```
  In a separate terminal, run:
  ```
  npx playwright test tests/api/api.spec.ts
  ```
  Then stop the backend server and generate the HTML report:
  ```
  npx nyc report --reporter=html
  ```
- Coverage reports are output to `backend/coverage/`.

---

**Summary:**
- CI pipeline runs all tests on GitHub Actions.
- Visual UI snapshots are always available in `test-results` and Allure.
- API code coverage is available via `nyc` in the backend.