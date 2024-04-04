const { defineConfig } = require("cypress");

module.exports = defineConfig({

// Overrides the defaultCommandTimeout fro all the spec file to 6000
  defaultCommandTimeout: 8000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/example/*.js'
  },
});
