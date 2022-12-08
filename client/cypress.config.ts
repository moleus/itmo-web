import {defineConfig} from "cypress";

export default defineConfig({
  e2e: {
    video: false,
    screenshotOnRunFailure: false,
    baseUrl: "http://localhost:8080/",
  },

    component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
