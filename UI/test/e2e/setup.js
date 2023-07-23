const { setup: setupPuppeteer } = require('jest-environment-puppeteer');
module.exports = async function globalSetup() {
  await setupPuppeteer();
  // Your global setup
  global.workbook ={
    tableName:null,
    sheetName:null,
    page:null
  };
  global.workbookTableName = null;
  global.worksheetName = null;
  global.worksheetPage = null;
  global.adminSessionID = null;
};
