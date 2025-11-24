import { Page } from '@playwright/test';

export class BasePage {
  constructor(public page: Page) {}

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async close() {
    await this.page.close();
  }
}