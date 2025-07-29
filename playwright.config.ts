import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
  use: {
    screenshot: 'on', // Take a screenshot for every test, pass or fail
    video: 'retain-on-failure'
  }
});