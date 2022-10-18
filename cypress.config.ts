import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://www.saucedemo.com',
    specPattern: 'cypress/integration/*.cy.ts',
    // @ts-ignore
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return {
        browsers: config.browsers.filter(browser => browser.name === 'electron')
      }
    },
  },
});
