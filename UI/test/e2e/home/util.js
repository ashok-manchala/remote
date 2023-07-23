import puppexpect from 'expect-puppeteer';

export const initializePage = async()=>{
    let page= await browser.newPage();
    let theTempValue
    page.on("pageerror", function(err) {
        theTempValue = err.toString();
        console.log("Page error: " + theTempValue);
    })

    page.on("error", function (err) {
        theTempValue = err.toString();
        console.log("Error: " + theTempValue);
    })

    page.on("response", async (request)=> {
        if(request._headers['x-request-id']!== undefined ){
            console.log("Req ID: "+request._headers['x-request-id']+" URL: "+request._request._url+" Method: "+ request._request._method+ " Status: "+request._status)
        }
    })

    await page._client.send('Emulation.clearDeviceMetricsOverride');
    return page;
}