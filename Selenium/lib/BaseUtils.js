let config = require("../lib/config");
const {default: Symbols} = require('selenium-webdriver/lib/symbols');
let webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    assert = require('assert');
let path = require('chromedriver').path;
let service = new chrome.ServiceBuilder(path).build();
//chrome.setDefaultService(service);
let options = new chrome.Options();

jest.setTimeout(5000000);

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
    if ((lookBy.toString()).toLowerCase()=== "xpath") {
        let counter = 0;
        while (counter <= 10) {
            try {
                await driver.findElement(By.xpath(lookForEl))
                counter=11;

            } catch (exception) {
                if (counter == 5) {
                    throw new Error(exception);
                } else {
                    //console.log("element not found");
                    await driver.sleep(1000);
                    counter++;
                }
            }
        }
    }
   else if ((lookBy.toString()).toLowerCase()==="classname") {
        let counter = 0;
        while (counter < 10) {
            try {
                await driver.findElement(By.className(lookForEl));
                counter = 11;
            } catch (exception) {
                if (counter = 5) {
                    throw new Error(exception);
                } else {
                    await driver.sleep(1000);
                    counter++;
                }
            }
        }
    }
   else if ((lookBy.toString()).toLowerCase()=== "id") {
        let counter = 0;
        while (counter < 10) {
            try {
                await driver.findElement(By.id(lookForEl));
                counter = 11;
            } catch (exception) {
                if (counter = 5) {
                    throw new Error(exception);
                } else {
                    await driver.sleep(1000);
                    counter++;
                }
            }
        }
    }
   else {
        throw new Error("Incorrect find by input for element wait.");
    }
}

//wrapper class for clicking which incorporates waiting for element
async function click(driver, lookForEl, lookBy) {
    await this.waitForElement(driver, lookForEl, lookBy);
    if (lookBy.toLowerCase() === "xpath") {
        try {

            await driver.findElement(By.xpath(lookForEl)).click();
        } catch (exception) {
            await console.log(exception);
        }
    }
    if (lookBy.toLowerCase() === "classname") {
        try {

            await driver.findElement(By.className(lookForEl)).click();
        } catch (exception) {
            await console.log(exception);
        }
    }
    if (lookBy.toLowerCase() === "id") {
        try {
            await driver.findElement(By.id(lookForEl)).click();
        } catch (exception) {
            await console.log(exception);
        }
    }
}
//wrapper class for write which incorporates waiting for element
async function write(driver, element, lookBy, value) {
    await this.waitForElement(driver, element, lookBy);

    if (lookBy.toLowerCase() === "xpath") {
        await driver.findElement(By.xpath(element)).sendKeys(value);
    }
    if (lookBy.toLowerCase() === "classname") {

        await driver.findElement(By.className(element)).sendKeys(value);
    }
    if (lookBy.toLowerCase() === "id") {
        await driver.findElement(By.id(element)).sendKeys(value);
    }
}
//assertion for current url
async function verifyCurrentUrl(driver,expectedUrl) {
    await driver.getCurrentUrl().then(function(result){assert(result===expectedUrl, result+ " is not the expected URL." )});
}

//assertion for element presence
async function lookForElement(driver, lookForEl, lookBy) {
    await this.waitForElement(driver, lookForEl, lookBy)
    if (lookBy.toLowerCase() === "xpath") {
            await driver.findElement(By.xpath(lookForEl)).then(function(result){assert(result!==null, lookForEl + " element was not found." )});
    } else if (lookBy.toLowerCase() === "classname") {
        await driver.findElement(By.className(lookForEl)).then(function(result){assert(result!==null, lookForEl + " element was not found." )});
    } else if (lookBy.toLowerCase() === "id") {
        await driver.findElement(By.id(lookForEl)).then(function(result){assert(result!==null, lookForEl + " element was not found." )});
    } else {
        throw new Error("Invalid element search criteria '" + lookBy + "'");
    }

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
    verifyCurrentUrl
};
