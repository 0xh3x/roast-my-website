
import dotenv from "dotenv";
import express from "express";
import { generateWebsiteEvaluation } from "./roaster.js";
import { takeScreenshot } from "./screenshot.js";
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

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
  const roastStyle = req.query.roastStyle || 'a';
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

    const chatCompletion = await generateWebsiteEvaluation(screenshotUrl, roastStyle);

    for await (const chunk of chatCompletion) {
      const [choice] = chunk.choices;
      const { content } = choice.delta;
      const finalContent = content ? content : '';
      res.write(finalContent);
    }
    res.end();
  } catch (error) {
    console.error("Error handling AI response:", error);
    res.status(500).send({ msg: "Error handling AI response", error: error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
