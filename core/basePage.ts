import { Page } from "playwright";

export class BasePage {
    constructor(public page: Page) {}

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async close() {
        await this.page.close();
    }
}