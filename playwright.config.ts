import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './e2e',

  timeout: 240000,

  fullyParallel: false,

  retries: 1,

  workers: 3,

  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    headless: true,
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 30000,
    navigationTimeout: 60000,
    screenshot: 'only-on-failure',
  },


  projects: [

    //{
      //name: 'firefox',
      //use: { ...devices['Desktop Firefox'] },
    //},

    //{
      //name: 'Microsoft Edge',
      //use: { ...devices['Desktop Edge'], channel: 'msedge' },
    //},

    {
      name: 'Google Chrome',
    use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },

  ],

});
