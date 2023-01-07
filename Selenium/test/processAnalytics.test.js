let page = require("../lib/BaseUtils");
let loginpage = require("../lib/Page_libraries/loginPage");
let config = require("../lib/config");
let processAnalytics = require("../lib/Page_libraries/processAnalytics");
let driver;
describe('QA test celonis', async function () {
    jest.setTimeout(90000);

    beforeAll(async function () {
        driver = await page.getDriver("chrome");
        // navigation to test instance
        await page.navigateTo(driver, config.instanceConfig.instanceURL);

        //Login with static credentials
        await loginpage.login(driver);

    });
    afterAll(async function () {
    await driver.quit();

    });

    it('T-1 Check if the analysis data is present for pizza demo report', async function () {

        await processAnalytics.navigateToProcessAnalyticsPage(driver);
        // assert the workflows are loaded
        await processAnalytics.verifyWorkSpaceIsPresent(driver,"--> Pizza Demo");
        await processAnalytics.verifyWorkSpaceIsPresent(driver,"--> SAP ECC - Order to Cash");
        await processAnalytics.verifyWorkSpaceIsPresent(driver,"--> SAP ECC - Purchase to Pay");
        await processAnalytics.verifyWorkSpaceIsPresent(driver,"--> ServiceNow Ticketing");
        //asserting that the analysis reports are loaded and their count
        await processAnalytics.verifyAnalysisReports(driver,"--> Pizza Demo",187);

    })
    it('T-2 Check if the analysis data is present SAP ECC -order to cash', async function () {

        await processAnalytics.navigateToProcessAnalyticsPage(driver);
        // assert the workflows are loaded
        await processAnalytics.verifyWorkSpaceIsPresent(driver,"--> Pizza Demo");
        await processAnalytics.verifyWorkSpaceIsPresent(driver,"--> SAP ECC - Order to Cash");
        await processAnalytics.verifyWorkSpaceIsPresent(driver,"--> SAP ECC - Purchase to Pay");
        await processAnalytics.verifyWorkSpaceIsPresent(driver,"--> ServiceNow Ticketing");
        //asserting that the analysis reports are loaded and their count
        await processAnalytics.verifyAnalysisReports(driver,"--> SAP ECC - Order to Cash",297);


    })
    it('T-3 Check if the analysis data is present in SAP ECC - Purchase to Pay', async function () {

        await processAnalytics.navigateToProcessAnalyticsPage(driver);
        // assert the workflows are loaded
        await processAnalytics.verifyWorkSpaceIsPresent(driver,"--> Pizza Demo");
        await processAnalytics.verifyWorkSpaceIsPresent(driver,"--> SAP ECC - Order to Cash");
        await processAnalytics.verifyWorkSpaceIsPresent(driver,"--> SAP ECC - Purchase to Pay");
        await processAnalytics.verifyWorkSpaceIsPresent(driver,"--> ServiceNow Ticketing");
        //asserting that the analysis reports are loaded and their count
        await processAnalytics.verifyAnalysisReports(driver,"--> SAP ECC - Purchase to Pay ",309);


    })
    it('T-4 Check if the analysis data is present ServiceNow Ticketing', async function () {

        await processAnalytics.navigateToProcessAnalyticsPage(driver);
        // assert the workflows are loaded
        await processAnalytics.verifyWorkSpaceIsPresent(driver,"--> Pizza Demo");
        await processAnalytics.verifyWorkSpaceIsPresent(driver,"--> SAP ECC - Order to Cash");
        await processAnalytics.verifyWorkSpaceIsPresent(driver,"--> SAP ECC - Purchase to Pay");
        await processAnalytics.verifyWorkSpaceIsPresent(driver,"--> ServiceNow Ticketing");
        //asserting that the analysis reports are loaded and their count
        await processAnalytics.verifyAnalysisReports(driver,"--> ServiceNow Ticketing",294);

    })

})
