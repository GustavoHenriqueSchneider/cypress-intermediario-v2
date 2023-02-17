const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8000",
    env: {
      hideCredentials: true,
      requestMode: true,
      snapshotOnly: true
    },
    experimentalRunAllSpecs: true
  },
  fixturesFolder: false,
  video: false
})