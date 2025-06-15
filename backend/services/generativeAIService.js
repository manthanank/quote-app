const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

const generateResponse = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    throw new Error(`Error generating content: ${error.message}`);
  }
};

module.exports = { generateResponse };
