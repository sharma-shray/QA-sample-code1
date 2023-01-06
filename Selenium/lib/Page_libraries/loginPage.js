let page = require("../BaseUtils");
let config= require("../config");
let webdriver = require('selenium-webdriver'),
    By = webdriver.By;
const {until} = require("selenium-webdriver");
    jest.setTimeout(5000000);

//navigation to the test instance and asserting for readiness
async function login (driver) {
    await page.waitForPageLoad(driver);
    await driver.wait(until.elementLocated(By.id("ce-input-0")),5000);
    await page.waitForElement(driver, "ems-picture-cover ems-fti__picture", "classname");
    await page.write(driver,"ce-input-0","id",config.userConfig.username);
    await page.write(driver,"ce-input-1","id",config.userConfig.password);
    await page.click(driver,'//span[contains(text(),\'Sign in\')]',"xpath");
    await page.waitForPageLoad(driver);
    await page.waitForElement(driver, "//p[contains(text(),'No Apps')]", "xpath");
    await page.verifyCurrentUrl(driver,"https://applications.eu-1.celonis.cloud/package-manager/ui/views/ui/empty");
 }


 module.exports = {login};