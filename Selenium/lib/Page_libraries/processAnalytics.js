let webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    assert = require('assert')
let page = require("../BaseUtils");

jest.setTimeout(5000000);

//navigation to process analytic page
async function navigateToProcessAnalyticsPage(driver) {
// navigation to Test component
    await page.navigateTo(driver, "https://applications.eu-1.celonis.cloud/process-mining/ui");
    await page.waitForPageLoad(driver);
    await page.waitForElement(driver, "//h2[contains(text(),'Workspaces')]", "xpath");
}

//assertion for workspace being displayed
async function verifyWorkSpaceIsPresent(driver,expectedWorkspaceName) {
    await page.waitForPageLoad(driver);
    var element = await driver.findElements(By.xpath("//a[text()='All Workspaces']/../a")).then(elements => element = elements.length);
    let availabilityFlag=0;
    while(element>0)
    {
        await driver.findElement(By.xpath("//a[text()='All Workspaces']/../a["+element+"]")).getText().then(function(workspaceName){
            if(workspaceName===expectedWorkspaceName) {
                availabilityFlag=1;}
            else {
                element--; }
        });
        if(availabilityFlag==1){
            break;
        }
    }
    await assert(availabilityFlag==1,"workflow "+expectedWorkspaceName+" not found");
}

//Assertion for analysis reports being displayed.
async function verifyAnalysisReports(driver,workspace,expectedNumberOfReports) {

    await page.click(driver,"//span[text()=\'"+workspace+"\']","xpath");
    await page.waitForPageLoad(driver);
    await page.lookForElement(driver,"//h3[text()=\'"+workspace+"\']","xpath");
    var element = await driver.findElements(By.xpath("//div[@class='ce-tiles ce-tiles--with-css-grid']/div")).then(elements => element = elements.length);
    await assert(element==expectedNumberOfReports,"workflow "+workspace+" was found to have "+element+" reports, but was expected to have "+expectedNumberOfReports+ " reports");
}


module.exports = {
    navigateToProcessAnalyticsPage,
    verifyWorkSpaceIsPresent,
    verifyAnalysisReports

};