const { defineConfig } = require("cypress");

module.exports = defineConfig({

// Overrides the defaultCommandTimeout fro all the spec file to 6000
  projectId: "k51esp",
  defaultCommandTimeout: 8000,

  env: {
    url: 'https://rahulshettyacademy.com'

  },

  retries: {
    runMode: 1, // rerrun falied tests one more time
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/example/*.js'
  },
});
