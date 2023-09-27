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
        if (entry.url === '') {
            continue;
        }
            const scriptPath = `test${new URL(entry.url).pathname}`;
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

test.beforeAll(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
    await page.coverage.startJSCoverage();
    await page.coverage.startCSSCoverage();
});

test("Navigate through dept page", async() =>{

    await page.goto("https://www.deptagency.com/");
    
    try {
        await page.waitForSelector("'Accept All'", { state: 'visible', timeout: 5000 });
        await page.click("'Accept All'");
    } catch (error) {
        console.log('Unable to click on Accept All button:', error);
    }

    try {
        await page.waitForSelector("'Careers '", { state: 'visible', timeout: 5000 });
        await page.click("'Careers '");
    } catch (error) {
        console.log('Unable to click on Careers link:', error);
    }
    await expect(page).toHaveURL("https://www.deptagency.com/careers/")
})

test.afterAll(async () => {
    await saveV8Coverage(page);
    await page.close();
});