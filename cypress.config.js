const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Automation Exercise - Relatório de Testes E2E (PGATS)',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },
  e2e: {
    baseUrl: 'https://automationexercise.com',
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    chromeWebSecurity: false,
    screenshotOnRunFailure: true,
    video: false,
    blockHosts: [
      '*google-analytics.com',
      '*googlesyndication.com',
      '*doubleclick.net',
      '*googleads.g.doubleclick.net',
      '*adservice.google.com',
      '*pagead2.googlesyndication.com'
    ],
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    }
  }
});
