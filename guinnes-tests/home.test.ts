import { test } from '@playwright/test';
import { GuinnessPage } from '../guinnes-pom/guinnesPage';
import { saveV8Coverage, finalizeCoverage } from '../core/coverageHelper';

test.describe('Guinness Website Tests', () => {
  let guinnessPage: GuinnessPage;

  test.beforeEach(async ({ page, browserName }) => {
    guinnessPage = new GuinnessPage(page);
    // Code coverage only works in Chromium
    if (browserName === 'chromium' && page.coverage) {
      await page.coverage.startJSCoverage();
    }
  });

  test('should navigate to shop using recorder', async () => {
    await guinnessPage.navigate('https://www.guinness.com/en');
    await guinnessPage.enterDateOfBirth('24', '05', '1996');
    await guinnessPage.expectToBeOnHomePage();
    await guinnessPage.navigateToShop();
  });

  test('should allow user to view more items in the search bar', async () => {
    await guinnessPage.navigate('https://www.guinness.com/en');
    await guinnessPage.enterDateOfBirth('24', '05', '1996');
    await guinnessPage.viewMoreItemsInSearchBar();
  });

  test('should navigate to beers section and validate buying products', async () => {
    await guinnessPage.navigate('https://www.guinness.com/en/home');
    await guinnessPage.enterDateOfBirth('24', '05', '1996');
    await guinnessPage.buyBeerFromSection();
  });

  test.afterEach(async ({ page, browserName }) => {
    // Code coverage only works in Chromium
    if (browserName === 'chromium' && page.coverage) {
      await saveV8Coverage(page);
    }
  });

  test.afterAll(async () => {
    await finalizeCoverage();
  });
});