import { expect } from "playwright/test";
import { BasePage } from "../core/basePage";

export class GuinnessPage extends BasePage {
    async enterDateOfBirth(dd: string, mm: string, yyyy: string) {
        await this.page.getByPlaceholder('DD').click();
        await this.page.getByPlaceholder('DD').fill(dd);
        await this.page.getByPlaceholder('MM').click();
        await this.page.getByPlaceholder('MM').fill(mm);
        await this.page.getByPlaceholder('YYYY').click();
        await this.page.getByPlaceholder('YYYY').fill(yyyy);
        await this.page.getByRole('button', { name: 'Enter' }).click();
    }

    async navigateToShop() {
        await this.page.getByLabel('Shop', { exact: true }).click();
        await this.page.getByLabel('Shop', { exact: true }).click();
    }

    async viewMoreItemsInSearchBar() {
        await this.page.locator('.cursor-pointer.flex.items-center.justify-center.py-4').click();
        await this.page.getByRole('link', { name: 'View More' }).click();
        const page1Promise = this.page.waitForEvent('popup');
        await this.page.getByRole('link', { name: 'DISCOVER DISCOVER DISCOVER The Guinness Archive is home to the history, culture and memory of Guinness from 1759 to the present day. The story of Guinness is a living ...' }).click();
        const page1 = await page1Promise;
    }

    async buyBeerFromSection() {
        await this.page.getByLabel('Menu Icon').click();
        await this.page.getByRole('navigation').getByRole('link', { name: 'BEERS' }).click();
        await this.page.locator('section').filter({ hasText: 'FEATURED BEERGUINNESS DRAUGHTTHERE’S NOTHING ON THIS PLANET LIKE A PINT OF THE B' }).getByRole('button').click();
        await this.page.locator('[aria-label="BUY NOW"]').hover();
        await this.page.locator('[aria-label="BUY NOW"]').click();
        //await expect(this.page.getByText('Retailer Product Stock Price Buy Now There are no available retailers')).toBeVisible();
    }
}



