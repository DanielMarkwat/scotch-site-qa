const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'https://scotch-soda.co.za',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },

  reporter: 'list'
});
