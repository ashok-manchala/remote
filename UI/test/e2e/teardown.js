const { teardown: teardownPuppeteer } = require('jest-environment-puppeteer');
 require("../../sendTestResultsReport.js");
module.exports = async function globalTeardown(done) {
  // Your global teardown
  await teardownPuppeteer();
  global.workbookTableName = null;
  global.worksheetName = null;
  global.worksheetPage = null;
};