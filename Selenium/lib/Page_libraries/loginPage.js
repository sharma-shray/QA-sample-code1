let page = require("../BaseUtils");
let config= require("../config");
    jest.setTimeout(5000000);

//navigation to the test instance and asserting for readiness
async function login (driver) {
    await page.waitForPageLoad(driver);
    await page.write(driver,"ce-input-0","id",config.userConfig.username);
    await page.write(driver,"ce-input-1","id",config.userConfig.password);
    await page.click(driver,'//span[contains(text(),\'Sign in\')]',"xpath");
    await page.waitForPageLoad(driver);
    await page.waitForElement(driver, "//p[contains(text(),'No Apps')]", "xpath");
    await page.verifyCurrentUrl(driver,"https://applications.eu-1.celonis.cloud/package-manager/ui/views/ui/empty");
 }


 module.exports = {login};