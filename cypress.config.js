const { defineConfig } = require('cypress')
const { fs } = require('fs')
const { addMatchImageSnapshotPlugin } = require('@simonsmith/cypress-image-snapshot/plugin')


module.exports = defineConfig({
  watchForFileChanges: false,
  defaultCommandTimeout: 30000,
  requestTimeout: 60000,
  responseTimeout: 60000,
  pageLoadTimeout: 60000,
  video: true,
  numTestsKeptInMemory: 5,
  experimentalMemoryManagement: true,
  reporterOptions: {
    reportDir: "results",
    overwrite: false,
    html: true,
    json: false,
  },
  chromeWebSecurity: false,
  viewportHeight: 1200,
  viewportWidth: 1400,
  scrollBehavior: "center",
  retries: {
    runMode: 0,
    openMode: 0,
  },
  e2e: {
    baseUrl: "https://app.appsmith.com",
    env: {
      USERNAME: "tester.sagar.007@gmail.com",
      PASSWORD: "Sagar@123",
      grepFilterSpecs: true,
      grepOmitFiltered: true
    },
    setupNodeEvents(on, config) {
      require('cypress-terminal-report/src/installLogsPrinter')(on);
      require('@cypress/grep/src/plugin')(config);
      addMatchImageSnapshotPlugin(on)
      return config;
    },
    specPattern: "cypress/e2e/**/*.{js,ts}",
    testIsolation: true
  },
});