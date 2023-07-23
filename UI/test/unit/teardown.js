const { teardown: teardownPuppeteer } = require('jest-environment-puppeteer');

module.exports = async function globalTeardown() {
  // Your global teardown
  await teardownPuppeteer();
  global.workbookTableName = null;
  global.worksheetName = null;
  global.worksheetPage = null;
};
