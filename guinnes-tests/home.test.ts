import test, { chromium, expect } from "playwright/test";
import { Page } from "playwright";
import { GuinnessPage } from "../guinnes-pom/guinnesPage";
import { saveV8Coverage, finalizeCoverage } from "../core/coverageHelper";

let page: Page;
let guinnessPage: GuinnessPage;

test.beforeEach(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
    guinnessPage = new GuinnessPage(page);
    await page.coverage.startJSCoverage();
});

test('Navigate to shop guinnes using recorder', async () => {
    try {
        await guinnessPage.navigate('https://www.guinness.diageo.site/');
        await guinnessPage.enterDateOfBirth('24', '05', '1996');
        await expect(guinnessPage.page).toHaveURL("https://www.guinness.diageo.site/en/home")
        await guinnessPage.navigateToShop();
    } catch (error) {
        console.log('Could not navigate to the shop', error);
    }
});

test('Validate user can view more items in the search bar', async ( ) => {
    await guinnessPage.navigate('https://www.guinness.diageo.site/');
    await guinnessPage.enterDateOfBirth('24', '05', '1996');
    await guinnessPage.viewMoreItemsInSearchBar();
  });

  test('Navigate to beers section and validate you are able to buy one of the products', async () => {
    await guinnessPage.navigate('https://www.guinness.diageo.site/en/home');
    await guinnessPage.enterDateOfBirth('24', '05', '1996');
    await guinnessPage.buyBeerFromSection();
  });

test.afterEach(async () => {
    await saveV8Coverage(guinnessPage.page);
    await guinnessPage.close();
});

test.afterAll(async () => {
    await finalizeCoverage();
});