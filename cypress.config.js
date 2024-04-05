const { defineConfig } = require("cypress");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprocessor,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");


async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", preprocessor(config));

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

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
    setupNodeEvents,
    specPattern: 'cypress/integration/example/cucumberFiles/*.feature'
  },
});

// cucmber can only create messages of results, cannot create JSON formaet result, to do that it needs plugin