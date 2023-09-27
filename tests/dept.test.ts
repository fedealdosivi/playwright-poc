import test, { chromium } from "playwright/test";

test("Navigate through dept page", async() =>{
    const browser = await chromium.launch({
        headless: false,
    }
    );
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
        // You may need to use a different approach to locate the link, as `@innertext` is not a valid selector. Perhaps, you meant `text=Careers`.
        await page.waitForSelector("'Careers '", { state: 'visible', timeout: 5000 });
        await page.click("'Careers '");
    } catch (error) {
        console.log('Unable to click on Careers link:', error);
    }

    // Finally, make sure to close the browser once your test is done
    await browser.close();
})