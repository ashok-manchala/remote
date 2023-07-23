import config from '../../config';
import puppexpect, {setDefaultOptions} from 'expect-puppeteer';



import ActionStack from "../../helpers/ActionStack";
/*import LoginData from "../../repo/loginPageData";
import {
    initializePage
} from "../util";
import testData from "../../repo/demoTestData";*/


setDefaultOptions({timeout: 20000});

jest.setTimeout(config.JEST_TIMEOUT);
const _ = require('lodash');


describe('[API Keys]: API Key UI tests ',() => {
    let page;

    beforeAll(async () => {
        global.stack = new ActionStack();
        page= await browser.newPage();
        await page._client.send('Emulation.clearDeviceMetricsOverride');

        await global.stack.do(page,"navigating to URL",()=>page.goto("https://www.facebook.com/"));
        await global.stack.do(page,"wait for 10 sec",()=>page.waitForTimeout(10000));
    })
    beforeEach(async () => {
        global.stack = new ActionStack();
    });
    afterEach(async () => {
        global.stack = null;
    });
    afterAll(async () => {
        await global.stack.do(page,"close browser",()=>page.close());
    })

    test("[API-Keys 0001]: Assert Generate API key button",async()=>{
        console.log("Inside test API-Keys 0001");
        await global.stack.do(page,'Match name', () =>puppexpect(page).toMatchElement('#email'));
        await global.stack.do(page,'Fill Name', () =>puppexpect(page).toFill('#email','Ashok Reddy'));
        await global.stack.do(page,"wait for 2 sec",()=>page.waitForTimeout(2000));

        await global.stack.do(page,'Match name', () =>puppexpect(page).toMatchElement('#lastName'));
        await global.stack.do(page,'Fill Name', () =>puppexpect(page).toFill('#lastName','Manchala'));
        await global.stack.do(page,"wait for 2 sec",()=>page.waitForTimeout(2000));
        //input[type='checkbox']
        await global.stack.do(page,'Match CheckBox', () =>puppexpect(page).toMatchElement('input[type=\'checkbox\']'));
        await global.stack.do(page,'Click checkBox', () =>puppexpect(page).toClick('input[type=\'checkbox\']'));
        await global.stack.do(page,"wait for 2 sec",()=>page.waitForTimeout(2000));

    })

})