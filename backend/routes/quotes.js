const express = require("express");
const router = express.Router();
const Quote = require("../models/Quote");
const { generateResponse } = require("../services/generativeAIService");

router.get("/", async (req, res) => {
  try {
    // Create date objects for start and end of current day in UTC
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

    // Find quote for current day using proper date range
    const existingQuote = await Quote.findOne({
      createdAt: {
        $gte: today,
        $lt: tomorrow
      }
    });

    if (existingQuote) {
      return res.json(existingQuote);
    }

    // Get previously used quotes to avoid repetition
    const previousQuotes = await Quote.find({}, { text: 1 }).sort({ createdAt: -1 }).limit(20);
    const previousTexts = previousQuotes.map(q => q.text);
    
    // Request a unique quote with more specific formatting instructions
    const prompt = `Generate a single inspiring quote in this exact format only: "quote text" - author name.
    Do not include any additional text, explanations, or multiple quotes.
    Please make sure it's not one of these previous quotes: ${previousTexts.join(', ')}`;

    const responseText = await generateResponse(prompt);
    
    // Extract just the first quote if multiple are provided
    // Find the pattern of "quote" - author in the response
    const quoteMatch = responseText.match(/[""](.+?)[""] - (.+?)($|\n)/);
    
    let text, author;
    
    if (quoteMatch && quoteMatch.length >= 3) {
      // Use the matched quote and author
      text = quoteMatch[1];
      author = quoteMatch[2].trim();
    } else if (responseText.includes("-")) {
      // Fallback to simpler parsing, taking just the first line
      const firstLine = responseText.split('\n')[0].trim();
      // Split by the first occurrence of " - "
      const splitIndex = firstLine.indexOf(" - ");
      if (splitIndex !== -1) {
        text = firstLine.substring(0, splitIndex).trim().replace(/^[""]|[""]$/g, '');
        author = firstLine.substring(splitIndex + 3).trim();
      }
    }

    // If parsing failed, use a default approach
    if (!text || !author) {
      text = responseText.split('\n')[0].trim().replace(/^[""]|[""]$/g, '');
      author = "Unknown";
    }

    // Final verification
    if (!text) {
      throw new Error("Invalid quote format received");
    }

    const newQuote = await Quote.create({ text, author });
    res.json(newQuote);
  } catch (error) {
    console.error("Quote generation error:", error);
    res.status(500).json({ error: "Error fetching quote" });
  }
});

module.exports = router;
