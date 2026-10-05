import { PlaywrightCheck, UrlAssertionBuilder, UrlMonitor } from 'checkly/constructs'

new PlaywrightCheck('mens-jeans-product-flow', {
  name: "Men's jeans product browsing flow",
  playwrightConfigPath: '../playwright.config.js',
  tags: ['critical-flow', 'storefront'],
})

new UrlMonitor('storefront-homepage-uptime', {
  name: 'Scotch & Soda South Africa homepage',
  request: {
    url: 'https://scotch-soda.co.za/',
    assertions: [UrlAssertionBuilder.statusCode().equals(200)],
  },
  degradedResponseTime: 5000,
  maxResponseTime: 20000,
  tags: ['storefront', 'uptime'],
})
