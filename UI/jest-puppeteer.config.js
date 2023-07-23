const os=require("os")
console.log("Tests Running in env: "+os.type())
let launchoptions
if(os.type().includes("Windows")){
    launchoptions= {
        headless:false,
        ignoreHTTPSErrors: true,
        slowMo:50,
        args:[`--ignore-certificate-errors`],
        executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    }
}
const width = 800,height = 600;
module.exports = {
    launch: launchoptions
};