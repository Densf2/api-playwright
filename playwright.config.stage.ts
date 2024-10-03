import { defineConfig, devices } from "@playwright/test";
// import { configDotenv } from "dotenv";

// configDotenv({ path: `env/.env.${process.env.ENV}` });
/* jscpd:ignore-start */
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests-examples",
  // testIgnore: "*example.*.ts",
  // testMatch: ["example.spec.ts", "2example.spec.ts"],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"], ["dot"], ["line"]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  /* jscpd:ignore-end */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    // baseURL: "https://qauto.forstudy.space",
    // baseURL: process.env.ENV_URL,
    // httpCredentials: {
    //   username: process.env.HTTP_CREDENTIALS_USERNAME,
    //   password: process.env.HTTP_CREDENTIALS_PASSWORD,
    // },
    ignoreHTTPSErrors: true,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    viewport: { width: 1600, height: 1000 },
    locale: "de-DE",
    timezoneId: "Europe/Berlin",
    permissions: ["geolocation"],
    geolocation: { longitude: 52.150002, latitude: 10.333333 },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: "Mobile Chrome",
    //   use: { ...devices["Pixel 5"] },
    // },
    // {
    //   name: "Mobile Safari",
    //   use: { ...devices["iPhone 12"] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
