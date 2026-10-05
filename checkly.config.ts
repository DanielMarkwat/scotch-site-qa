import { defineConfig } from 'checkly'

export default defineConfig({
  projectName: 'scotch-site-qa',
  logicalId: 'scotch-site-qa',
  checks: {
    activated: true,
    frequency: 10,
    locations: ['af-south-1'],
    checkMatch: '**/__checks__/**/*.check.ts',
    playwrightConfig: {
      timeout: 30000,
      use: {
        baseURL: 'https://scotch-soda.co.za',
        viewport: { width: 1280, height: 720 },
        headless: true,
      },
    },
  },
  cli: {
    runLocation: 'af-south-1',
    reporters: ['list'],
    retries: 0,
  },
})
