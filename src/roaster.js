
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const prompts = {
    a: `Provide a detailed critique focusing on usability, visual design, content structure, mobile responsiveness, and SEO practices. Deliver the critique with a humorous yet informative tone, highlighting only weaknesses in a balanced manner.
- Evaluate the following aspects of the website based on the screenshot:
1. Usability: How user-friendly is the navigation? Are the call-to-action buttons evident and functional?
2. Visual Design: Comment on the color scheme, typography, spacing, and overall aesthetic appeal. Does the design suit the website's purpose?
3. Content Structure: Is the content well-organized and easy to read? Are there any overwhelming text blocks or confusing layouts?
4. Mobile Responsiveness: Based on the visual cues, how well do you think the website adapts to mobile devices?
5. SEO Practices: Are there any visible elements that could impact the website's search engine ranking, like heavy use of images over text or poor header structure?
- Expertise Level: Deliver the critique with a humorous yet informative tone, highlighting both the strengths and weaknesses in a balanced manner.
- Output Structure: Provide the critique in a structured paragraph format, with each aspect clearly addressed in sequence.
- Critique: Provide only actionable critique.`,
    b: `Here are several aspects to consider and the types of actionable items you can suggest:
1. Visual Design
Aesthetics: Assess the colors, fonts, and general layout. Do they look modern and are they consistent? Is the style appropriate for the target audience?
Actionable Feedback: Suggest more harmonious color schemes, professional fonts, or layout adjustments that could enhance readability and visual appeal.
2. Usability
Navigation: Look for a clear, intuitive navigation structure. Are the menus easy to understand and use?
Actionable Feedback: Recommend simplifying the navigation menu, using more descriptive menu labels, or reorganizing the structure for ease of access.
3. Accessibility
Font Size and Color Contrast: Check if the text is easily readable, including font size and color contrast against the background.
Actionable Feedback: Propose adjustments in font sizes or colors to meet accessibility standards, ensuring that all users, including those with visual impairments, can easily read the content.
4. Branding
Consistency: Determine if the branding is consistent across the page (logo, color scheme, typography).
Actionable Feedback: Suggest ways to make the branding more consistent across all pages of the site or improve the logo's visibility and placement.
5. Content Layout
Clarity and Focus: Analyze the layout of content for clarity and focus. Is the important content highlighted effectively?
Actionable Feedback: Advise on rearranging content blocks to prioritize essential information or using design elements like borders or shading to highlight key sections.
6. Mobile Responsiveness
Adaptability: Since a screenshot may not show this directly, consider if elements look like they could stack or scale well on different screen sizes.
Actionable Feedback: If possible, suggest specific CSS or structural changes to improve responsiveness, or recommend testing with mobile emulators for better insights.
7. SEO Readiness
Text and Headings: Look for the presence of text-based content and proper use of headings for SEO.
Actionable Feedback: Recommend using keyword-rich headings and ensuring that essential content is text-based rather than embedded within images.
8. Legal and Compliance
Legal Notices: Look for standard legal notices such as privacy policies, cookie notices, etc.
Actionable Feedback: Advise on adding or updating these sections if they seem outdated or missing.
Each piece of feedback should be specific and explain both the issue and the suggested improvement. This ensures that the website owner understands the criticism and knows how to act on it effectively.
`,
    c: `When analyzing a website screenshot to provide constructive criticism and actionable items for improvement, consider the following aspects:

1. Layout and design:
   - Is the layout clean, organized, and easy to navigate?
   - Are the important elements (e.g., call-to-action buttons, navigation menu) easily accessible?
   - Is the design visually appealing and consistent with the brand's identity?
   - Are the colors, fonts, and whitespace used effectively?

2. Content:
   - Is the content clear, concise, and easy to understand?
   - Does the content effectively communicate the website's purpose and value proposition?
   - Is the content free of spelling, grammar, and formatting errors?
   - Is the content engaging and persuasive?

3. Usability:
   - Is the website intuitive and user-friendly?
   - Are the links and buttons functioning properly?
   - Is the website responsive and mobile-friendly?
   - Is the loading speed satisfactory?

4. Imagery and multimedia:
   - Are the images and videos high-quality, relevant, and visually appealing?
   - Do the images and videos enhance the user experience and support the content?
   - Are the images and videos properly optimized for web use?

5. Call-to-action (CTA):
   - Are the CTAs prominent, clear, and compelling?
   - Do the CTAs effectively guide users towards the desired action (e.g., signing up, making a purchase)?
   - Are the CTAs strategically placed throughout the website?

6. Branding and consistency:
   - Is the branding consistent across the website (e.g., logo, color scheme, tone of voice)?
   - Does the website effectively communicate the brand's personality and values?

7. Accessibility:
   - Is the website accessible to users with disabilities?
   - Are the colors and contrast sufficient for readability?
   - Are the font sizes and styles easy to read?

Actionable items based on the above aspects may include:

1. Redesign the layout to improve navigation and user experience.
2. Optimize the content for clarity, engagement, and persuasion.
3. Conduct usability testing to identify and fix any issues.
4. Replace low-quality images and videos with high-quality, relevant ones.
5. Redesign CTAs to make them more prominent and compelling.
6. Ensure branding consistency across the website.
7. Implement accessibility best practices to make the website inclusive.

Remember to provide specific examples and recommendations when offering feedback to help the website owner understand and implement the necessary changes effectively.`,
    d: `Use this guide: Comprehensive guide to help a junior designer effectively critique a website from a full-page screenshot. This will include aspects to observe and questions to consider, structured around key elements of visual website design.

Guide for Critiquing a Website Using a Full-Page Screenshot

1. **Overall Visual Impression**
   - **Aesthetics**: Does the website look modern or outdated? Is the design consistent with current web design trends?
   - **Theme Consistency**: Are the colors, fonts, and design elements consistent throughout the page?
   - **Branding**: How well does the website reflect the brand's identity? Consider logos, color schemes, and typography.

2. **Layout and Structure**
   - **Navigation**: Is the navigation intuitive and easy to locate? Are the menu items clearly labeled?
   - **Content Hierarchy**: Is there a clear visual hierarchy that guides the viewer's eye through the page? Look for the use of headings, subheadings, and visual cues that organize content.
   - **Whitespace**: Does the design make good use of space? Is the content overcrowded or too sparse?

3. **Typography**
   - **Readability**: Are the fonts easy to read? Consider size, color contrast, and font style.
   - **Font Choices**: Are the font styles appropriate for the web and the brand? How many different fonts are used, and is this number appropriate?
   - **Text Alignment and Spacing**: Is the text properly aligned and spaced? Check for consistent alignment and adequate spacing between lines and paragraphs.

4. **Color Scheme**
   - **Appeal and Accessibility**: Are the colors appealing and accessible? Consider whether the color choices ensure good contrast for readability.
   - **Consistency and Emotion**: Do the colors align with the emotional feel of the brand? Are they used consistently throughout the site?
   - **Overuse or Underuse**: Is there an overuse or underuse of colors which could lead to visual monotony or chaos?

5. **Imagery**
   - **Quality and Relevance**: Are the images high quality? Are they relevant to the content?
   - **Placement and Sizing**: Are images well-placed and appropriately sized? Do they enhance or distract from the content?
   - **Alt Text**: Consider if images likely have appropriate alt text, which is crucial for accessibility (though you cannot see alt text in a screenshot, mention the importance of checking this).

6. **Responsiveness**
   - **Adaptability**: While you can't test responsiveness with a screenshot, critique based on visible clues. Do elements look like they would scale or rearrange effectively on different devices?

7. **Call to Action (CTA)**
   - **Visibility**: Are CTAs prominently placed and easy to identify?
   - **Design**: Do the CTAs stand out due to their design and color? Are they inviting to click?

8. **User Interface Elements**
   - **Consistency**: Are buttons, icons, and other interactive elements consistent in style and behavior?
   - **Functionality Indicators**: Do elements like links and buttons look clickable? Are interactive elements distinguishable from static ones?

9. **Accessibility**
   - **Color Contrast**: Is there sufficient contrast between text and background colors to be easily readable by everyone, including those with visual impairments?
   - **Font Sizes**: Are font sizes adequate for readability across all devices?

10. **Final Assessment and Recommendations**
   - **Strengths**: Summarize the strong points of the website's design.
   - **Areas for Improvement**: List areas where the design could be improved.
   - **Actionable Suggestions**: Provide specific, actionable suggestions for each critique to help the web designer understand what changes are necessary.

Structure the report clearly, separating observations into the categories above. Each criticism should be specific and backed by a visual reference from the screenshot when possible. Emphasize the importance of constructive criticism and actionable feedback to ensure that the report is useful to the web development team.`
    , e: `This is The Website Visual Evaluation Checklist: Score the website for each checklist item.
1. Overall Aesthetics
1.1 Is the color scheme visually pleasing and consistent throughout the page? (0-5 points)
1.2 Does the website use high-quality, relevant images that enhance the content? (0-5 points)
1.3 Are the font styles and sizes appropriate and consistent, making the text easy to read? (0-5 points)
2. Layout and Composition
2.1 Is the layout logical and easy to follow? (0-5 points)
2.2 Are the spacing and alignment of elements consistent throughout the website? (0-5 points)
2.3 Does the design utilize the space effectively, neither too crowded nor too sparse? (0-5 points)
3. Branding and Professionalism
3.1 Does the design align with the brand's identity (colors, logos, fonts)? (0-5 points)
3.2 Does the website convey a professional image appropriate for the brand? (0-5 points)
4. User Interface and Navigation
4.1 Are navigation elements (menus, buttons) clearly visible and understandable? (0-5 points)
4.2 Are interactive elements (links, buttons) clearly distinguishable from non-interactive elements? (0-5 points)
5. Accessibility
5.1 Are text and background color contrasts sufficient for easy readability? (0-5 points)
5.2 Are visual elements accessible with text alternatives (like alt text for images)? (0-5 points)
6. Responsiveness and Mobile Compatibility
6.1 Does the design appear as if it would scale well on different devices (considering only visual cues)? (0-5 points)
7. Attention to Detail
7.1 Are there any visible errors like typos, incorrect alignments, or pixelated images? (0-5 points)
7.2 Does the design include refined details such as icons, micro-interactions, or animations that enhance user experience? (0-5 points)

Assign a score for each item in the format of: (x/5 points), write justification of the score and give actionable advices on how to improve it.
`

}
const youAre = `You are a website critique expert. You have been asked to evaluate the following website based on a screenshot and html. IMPORTANT: Only output what needs to be improved, no need to repot what's already good.`;// If some aspects of a website can't be determined with just a screenshot skip it.`;
const outputFormat = `The output should be in plain text. Use whitespace to format it properly. Don't use double asterisk to denote bold or any other markdown syntax. IMPORTANT: Only output what needs to be improved, no need to repot what's already good.`;

export async function generateWebsiteEvaluation(screenshotUrl, html = undefined, prompt = 'a') {
    const openai = new OpenAI();
    const textPrompt = html ? `This is the HTML of the website: ${html}` : "Evaluate this website";

    const config = {
        messages: [
            {
                role: "system",
                content: [
                    {
                        type: "text",
                        text: `${youAre} ${prompts[prompt]} ${outputFormat}`,
                    },
                ],
            },
            {
                role: "user",
                content: [
                    { type: "text", text: textPrompt },
                    {
                        type: "image_url",
                        image_url: screenshotUrl,
                    },
                ],
            },
        ],
        model: "gpt-4-vision-preview",
        stream: true,
    };
    // console.log(JSON.stringify(config));
    const chatCompletion = await openai.chat.completions.create(config);

    return chatCompletion;
}
