const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      API_URL: 'https://serverest.dev',
      API_KEY: "api-key-here",      
    },    

    baseUrl: 'https://serverest.dev',

    watchForFileChanges : false,
    
  },
});
