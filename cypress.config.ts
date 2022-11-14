import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://www.saucedemo.com',
    specPattern: 'cypress/integration/*.cy.ts',
    "chromeWebSecurity": false,
    "retries": 3,
    "pageLoadTimeout": 10000,
    "execTimeout": 10000,
    "requestTimeout": 100000,
    "taskTimeout": 10000,
    "responseTimeout": 10000,
    "defaultCommandTimeout": 10000,
    // @ts-ignore
    setupNodeEvents(on, config) {
      return {
        browsers: config.browsers.filter(browser => browser.name === 'electron')
      }
    },
  },
});
