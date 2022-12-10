import {defineConfig} from "cypress";

export default defineConfig({
    e2e: {
        video: false,
        screenshotOnRunFailure: false,
        baseUrl: "http://localhost:3000/",
    },

    component: {
        devServer: {
            framework: "react",
            bundler: "webpack",
        },
        supportFile: "cypress/support/component.ts",
        specPattern: "src/**/*.cy.{ts,tsx}",
    },
});
