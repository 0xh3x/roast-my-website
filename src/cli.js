import { generateWebsiteEvaluation } from './roaster.js'
import { readFileSync } from 'fs';



async function main() {
    const screenshotUrl = "data:image/png;base64, " + readFileSync('./testscreenshot.png').toString("base64");

    const chatCompletion = await generateWebsiteEvaluation(screenshotUrl);

    const chunks = [];
    for await (const chunk of chatCompletion) {
        const [choice] = chunk.choices;
        const { content } = choice.delta;
        const finalContent = content ? content : '';
        chunks.push(finalContent);
        console.log(finalContent);
    }
    console.log(chunks.join(""));
    console.log(chatCompletion.usage);
}

main()