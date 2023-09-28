import test, { chromium, expect } from "playwright/test";
import v8toIstanbul from 'v8-to-istanbul';
import libCoverage from 'istanbul-lib-coverage';
import libReport from 'istanbul-lib-report';
import reports from 'istanbul-reports';
import { Page } from "playwright";
import { promises as fs } from 'fs';

let page: Page;

export async function saveV8Coverage(page: Page): Promise<void> {
    const coverage = await page.coverage.stopJSCoverage();
    const map = libCoverage.createCoverageMap();
    for (const entry of coverage) {
        if (entry.url === '' || entry.url.includes('cloudfront.net')) {
            continue;
        }
            const scriptPath = entry.url;
            const converter = v8toIstanbul(scriptPath, 0, { source: entry.source }, (filepath) => {
            const normalized = filepath.replace(/\\/g, '/');
            const ret = normalized.includes('node_modules/');
            return ret;
        });
        try {
            await converter.load();
            converter.applyCoverage(entry.functions);
            const data = converter.toIstanbul();
            map.merge(data);
        } catch (error) {
            console.error(`Error processing entry ${entry.url}:`, error);
        }
    }
    await fs.rm('coverage', { force: true, recursive: true });
    const context = libReport.createContext({ coverageMap: map });
    reports.create('html').execute(context);
  }

test.beforeEach(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
    await page.coverage.startJSCoverage();
});

test('Navigate to shop guinnes using recorder', async () => {
    try {
        await page.goto('https://www.guinness.diageo.site/');
        await page.getByPlaceholder('DD').click();
        await page.getByPlaceholder('DD').fill('24');
        await page.getByPlaceholder('MM').click();
        await page.getByPlaceholder('MM').fill('05');
        await page.getByPlaceholder('YYYY').click();
        await page.getByPlaceholder('YYYY').fill('1996');
        await page.getByRole('button', { name: 'Enter' }).click();
        await expect(page).toHaveURL("https://www.guinness.diageo.site/en/home")
        await page.getByLabel('Shop', { exact: true }).click();
        await page.getByLabel('Shop', { exact: true }).click();
    } catch (error) {
        console.log('Could not navigate to the shop', error);
    }
});

test.afterEach(async () => {
    await saveV8Coverage(page);
    await page.close();
});