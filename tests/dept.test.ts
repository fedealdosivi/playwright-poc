import test, { chromium, expect } from "playwright/test";

test("Navigate through dept page", async() =>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

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
    await browser.close();
})