import { defineConfig } from "cypress";
import isCI from "is-ci";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:1234",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    viewportHeight: 1000,
    viewportWidth: 1280,
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
  video: false,
  screenshotOnRunFailure: !isCI,
});
