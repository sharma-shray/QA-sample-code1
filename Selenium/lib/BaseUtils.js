let config = require("../lib/config");
let webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    assert = require('assert');
const {until} = require("selenium-webdriver");
let options = new chrome.Options();
let path = require('chromedriver').path;
let service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

jest.setTimeout(90000);

//to check the load status of the page by checking ready state
async function waitForPageLoad(driver) {
    await driver.wait(function () {
        return driver.executeScript('return document.readyState').then(function (readyState) {
            return readyState === 'complete';
        });
    });
}

// generate driver with desired options
async function getDriver(browser) {
    if ((config.testConfig.headless).toLowerCase() === "yes") {
        options.addArguments('headless');
        options.addArguments("window-size=1920,1080");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--no-sandbox");
    }
    options.addArguments("window-size=1920,1080");
    let driver = await new webdriver.Builder().setChromeOptions(options).forBrowser('chrome').build();
    await driver.manage().setTimeouts({implicit: (2000)});
    return driver;
}

//navigation wrapper
async function navigateTo(driver, url) {
    await driver.get(url);
}

//quit wrapper
async function quit(driver) {
    await driver.quit();
}

//sub function for all action to wait before element appears
async function waitForElement(driver, lookForEl, lookBy) {
    switch((lookBy.toString()).toLowerCase()){
        case "xpath":
            await driver.wait(until.elementLocated(By.xpath(lookForEl)),10000);
            break;
        case "classname":
            await driver.wait(until.elementLocated(By.className(lookForEl)),10000);
            break;
        case "id":
            await driver.wait(until.elementLocated(By.id(lookForEl)),10000);
            break;
        default :
            throw new Error("Incorrect find by input for element wait.");
    }
}

//wrapper class for clicking which incorporates waiting for element
async function click(driver, lookForEl, lookBy) {
    await this.waitForElement(driver, lookForEl, lookBy);

    switch((lookBy.toString()).toLowerCase()){
        case "xpath":
            try {

                await driver.findElement(By.xpath(lookForEl)).click();
            } catch (exception) {
                await console.log(exception);
            }
            break;
        case "classname":
            try {
                await driver.findElement(By.className(lookForEl)).click();
            } catch (exception) {
                await console.log(exception);
            }
            break;
        case "id":
            try {
                await driver.findElement(By.id(lookForEl)).click();
            } catch (exception) {
                await console.log(exception);
            }
            break;
        default :
            throw new Error("Incorrect find by input for element click.");
    }

}

//wrapper class for write which incorporates waiting for element
async function write(driver, element, lookBy, value) {
    await this.waitForElement(driver, element, lookBy);

    switch((lookBy.toString()).toLowerCase()){
        case "xpath":
            await driver.findElement(By.xpath(element)).sendKeys(value);
            break;
        case "classname":
            await driver.findElement(By.className(element)).sendKeys(value);
            break;
        case "id":
            await driver.findElement(By.id(element)).sendKeys(value);
            break;
        default :
            throw new Error("Incorrect find by input for element send keys.");
    }
}

//assertion for current url
async function verifyCurrentUrl(driver,expectedUrl) {
    await driver.getCurrentUrl().then(function(result){assert(result===expectedUrl, result+ " is not the expected URL." )});
}

//assertion for element presence
async function lookForElement(driver, lookForEl, lookBy) {
    await this.waitForElement(driver, lookForEl, lookBy)

    switch((lookBy.toString()).toLowerCase()){
        case "xpath":
            await driver.findElement(By.xpath(lookForEl)).then(function(result){assert(result!==null, lookForEl + " element was not found." )});
            break;
        case "classname":
            await driver.findElement(By.className(lookForEl)).then(function(result){assert(result!==null, lookForEl + " element was not found." )});
            break;
        case "id":
            await driver.findElement(By.id(lookForEl)).then(function(result){assert(result!==null, lookForEl + " element was not found." )});
            break;
        default :
            throw new Error("Invalid element search criteria '" + lookBy + "'");
    }
}

//wrapper function for back functionality.
async function back(driver) {
    await driver.navigate().back();
    await this.waitForPageLoad(driver);
}


module.exports = {
    getDriver,
    navigateTo,
    quit,
    waitForElement,
    write,
    waitForPageLoad,
    click,
    lookForElement,
    verifyCurrentUrl,
    back
};
