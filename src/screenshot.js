import puppeteer from "puppeteer";
// Cache to store the screenshots
const screenshotCache = new Map();

export async function takeScreenshot(url) {
    // Check if the screenshot is already in the cache
    if (screenshotCache.has(url)) {
        console.log("takeScreenshot: Screenshot found in cache");
        return screenshotCache.get(url);
    }

    // Launch a new browser instance
    const browser = await puppeteer.launch({
        executablePath: "/usr/bin/google-chrome",
        headless: true,
        ignoreDefaultArgs: ["--disable-extensions"],
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 1024 });

    await page.goto(url, { waitUntil: "networkidle0" });

    const buffer = await page.screenshot({
        fullPage: true,
    });

    await browser.close();

    const screenshotUrl = "data:image/png;base64, " + buffer.toString("base64");

    // we only store one screenshot
    screenshotCache.clear();
    // Cache the screenshot
    screenshotCache.set(url, screenshotUrl);

    return screenshotUrl;
}