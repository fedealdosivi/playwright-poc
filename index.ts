import { chromium, ChromiumBrowser, Page } from 'playwright';

(async () => {
    const browser: ChromiumBrowser = await chromium.launch(); // For Firefox or WebKit, you would use firefox.launch() or webkit.launch()
    const page: Page = await browser.newPage();
    await page.goto('https://example.com');
    await page.screenshot({ path: 'example.png' });
    await browser.close();
})();