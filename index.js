import dotenv from "dotenv";
import puppeteer from "puppeteer";
import OpenAI from "openai";
import express from "express";
import { pipeline } from "node:stream/promises";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

// Cache to store the screenshots
const screenshotCache = new Map();

async function takeScreenshot(url) {
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


app.get("/screenshot", async (req, res) => {
  if (!req.query.url) {
    console.error("url parameter is missing");
    res.status(400).send("url parameter is missing");
    return;
  }
  const { url } = req.query;
  let screenshotUrl;
  try {
    screenshotUrl = await takeScreenshot(url);
    res.send({ screenshot: screenshotUrl });
  } catch (error) {
    console.error(`Error taking screenshot of ${url}:`, error);
    res
      .status(500)
      .send({ msg: `Error taking screenshot of ${url}`, error: error });
  }
});

app.get("/roast", async (req, res) => {

  if (!req.query.url) {
    console.error("url parameter is missing");
    res.status(400).send("url parameter is missing");
    return;
  }
  // get website screenshot
  const { url } = req.query;
  let screenshotUrl;
  try {
    screenshotUrl = await takeScreenshot(url);
  } catch (error) {
    console.error(`Error taking screenshot of ${url}:`, error);
    res
      .status(500)
      .send({ msg: `Error taking screenshot of ${url}`, error: error });
    return;
  }
  // roast the website
  try {
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
    });
    const openai = new OpenAI();

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: `You are a website critique expert. You have been asked to evaluate the following website based on a screenshot. Provide a detailed critique focusing on usability, visual design, content structure, mobile responsiveness, and SEO practices. Deliver the critique with a humorous yet informative tone, highlighting only weaknesses in a balanced manner.
                      - Evaluate the following aspects of the website based on the screenshot:
                      1. Usability: How user-friendly is the navigation? Are the call-to-action buttons evident and functional?
                      2. Visual Design: Comment on the color scheme, typography, spacing, and overall aesthetic appeal. Does the design suit the website's purpose?
                      3. Content Structure: Is the content well-organized and easy to read? Are there any overwhelming text blocks or confusing layouts?
                      4. Mobile Responsiveness: Based on the visual cues, how well do you think the website adapts to mobile devices?
                      5. SEO Practices: Are there any visible elements that could impact the website's search engine ranking, like heavy use of images over text or poor header structure?
                  - Expertise Level: Deliver the critique with a humorous yet informative tone, highlighting both the strengths and weaknesses in a balanced manner.
                  - Output Structure: Provide the critique in a structured paragraph format, with each aspect clearly addressed in sequence.
                  Don't use any HTML for formatting
                  `,
            },
          ],
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Evaluate this website" },
            {
              type: "image_url",
              image_url: screenshotUrl,
            },
          ],
        },
      ],
      model: "gpt-4-vision-preview",
      stream: true,
    });
  

    for await (const chunk of chatCompletion) {
      const [choice] = chunk.choices;
      const { content } = choice.delta;
      const finalContent = content ? content : '';
      res.write(finalContent);
    }
    // res.write(contentText);
    res.end();
    // res.send({
    //   screenshot: screenshotUrl,
    //   ai_response: aiResponse,
    // });
  } catch (error) {
    console.error("Error handling AI response:", error);
    res.status(500).send({ msg: "Error handling AI response", error: error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
