import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './e2e',

  timeout: 10000000,

  fullyParallel: false,

  retries: 3,

  workers: 3,

  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    headless: false,
  },


  projects: [

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },

    {
      name: 'Google Chrome',
    use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },

  ],

});
