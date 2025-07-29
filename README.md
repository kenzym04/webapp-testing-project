# Project Overview

This project is an automated testing setup for a simple web application consisting of a React frontend and a Node.js backend API. The project includes tests for both the frontend and backend components, ensuring that the application functions as expected.

## Demo Credentials

- **Username:** admin
- **Password:** password

Use these credentials to log in via the UI or API tests.

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
|   |   |   └── Login.tsx
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
├── .gitignore
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

### Running Tests

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

## Conclusion

This project provides a solid foundation for developing and testing a web application with a React frontend and a Node.js backend. Follow the setup instructions to get started, and refer to the individual README files in the `frontend`, `backend`, and `tests` directories for more detailed information.