const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

const generateResponse = async (prompt) => {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    });
    return response.text;
  } catch (error) {
    throw new Error(`Error generating content: ${error.message}`);
  }
};

module.exports = { generateResponse };
