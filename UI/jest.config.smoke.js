module.exports = {
    "globalSetup": "./test/e2e/setup.js",
    "globalTeardown": "./test/e2e/teardown.js",
    "testEnvironment": "./test/e2e/puppeteer_environment.js",
    "preset": "jest-puppeteer",
    "testRegex": ['demo.test.js'],
    "setupTestFrameworkScriptFile": "expect-puppeteer",
    "roots":["./test/e2e/home"],
    "reporters":[ "default",
        "./node_modules/jest-html-reporters","jest-stare"]
};

