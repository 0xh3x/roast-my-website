
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

export async function generateWebsiteEvaluation(screenshotUrl) {
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
                  Don't use any HTML for formatting.
                  
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

    return chatCompletion;
}
