import { expect, Locator } from '@playwright/test';
import { BasePage } from '../core/basePage';

export class GuinnessPage extends BasePage {
  // Locators
  private get ddInput(): Locator {
    return this.page.getByPlaceholder('DD');
  }

  private get mmInput(): Locator {
    return this.page.getByPlaceholder('MM');
  }

  private get yyyyInput(): Locator {
    return this.page.getByPlaceholder('YYYY');
  }

  private get enterButton(): Locator {
    return this.page.getByRole('button', { name: 'Enter' });
  }

  private get shopLink(): Locator {
    return this.page.getByLabel('Shop', { exact: true });
  }

  private get menuIcon(): Locator {
    return this.page.getByLabel('Menu Icon');
  }

  private get beersLink(): Locator {
    return this.page.getByRole('navigation').getByRole('link', { name: 'BEERS' });
  }

  private get buyNowButton(): Locator {
    return this.page.locator('[aria-label="BUY NOW"]');
  }

  // Actions
  async enterDateOfBirth(dd: string, mm: string, yyyy: string) {
    await this.ddInput.click();
    await this.ddInput.fill(dd);
    await this.mmInput.click();
    await this.mmInput.fill(mm);
    await this.yyyyInput.click();
    await this.yyyyInput.fill(yyyy);
    await this.enterButton.click();
  }

  async navigateToShop() {
    await this.shopLink.click();
    await this.shopLink.click();
  }

  async viewMoreItemsInSearchBar() {
    await this.page
      .locator('.cursor-pointer.flex.items-center.justify-center.py-4')
      .click();
    await this.page.getByRole('link', { name: 'View More' }).click();
    const page1Promise = this.page.waitForEvent('popup');
    await this.page
      .getByRole('link', {
        name: 'DISCOVER DISCOVER DISCOVER The Guinness Archive is home to the history, culture and memory of Guinness from 1759 to the present day. The story of Guinness is a living ...',
      })
      .click();
    const page1 = await page1Promise;
    return page1;
  }

  async buyBeerFromSection() {
    await this.menuIcon.click();
    await this.beersLink.click();
    await this.page
      .locator('section')
      .filter({
        hasText:
          "FEATURED BEERGUINNESS DRAUGHTTHERE'S NOTHING ON THIS PLANET LIKE A PINT OF THE B",
      })
      .getByRole('button')
      .click();
    await this.buyNowButton.hover();
    await this.buyNowButton.click();
  }

  // Assertions
  async expectToBeOnHomePage() {
    await expect(this.page).toHaveURL(/.*\/en\/home/);
  }

  async expectShopLinkVisible() {
    await expect(this.shopLink).toBeVisible();
  }
}



