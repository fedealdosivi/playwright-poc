import test, { chromium, expect } from "playwright/test";
import v8toIstanbul from 'v8-to-istanbul';

test("Navigate through dept page", async() =>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.deptagency.com/");
    await page.coverage.startJSCoverage();
    await page.coverage.startCSSCoverage();
    
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

    const JsCoverage = await page.coverage.stopJSCoverage();
    const CssCoverage = await page.coverage.stopCSSCoverage();
    console.log(JSON.stringify(JsCoverage));
    for (const entry of JsCoverage) {
        const converter = v8toIstanbul('', 0, { source: entry.source });
        await converter.load();
        converter.applyCoverage(entry.functions);
        console.log(JSON.stringify(converter.toIstanbul()));
      }
    await browser.close();
})