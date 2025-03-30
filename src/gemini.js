import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold // ✅ Fixed typo in "HarmBlockThreshold"
} from "@google/generative-ai";

const apiKey = "put your gemini api key"; // ✅ Keeping it as you prefer

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
};

async function run(prompt) {
    try {
        const chatSession = model.startChat({
            generationConfig, // ✅ Fixed typo
            history: []
        });

        const result = await chatSession.sendMessage(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error in AI Response:", error);
        return "Sorry, I couldn't process that request.";
    }
}

export default run;
