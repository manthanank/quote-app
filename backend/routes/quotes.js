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
      date: {
        $gte: today,
        $lt: tomorrow
      }
    });

    if (existingQuote) {
      return res.json(existingQuote);
    }

    const quoteText = await generateResponse(
      "Give me an inspiring quote in this exact format only: quote text - author name"
    );

    // More robust parsing logic
    let text, author;
    if (quoteText.includes("-")) {
      [text, author] = quoteText.split("-").map((s) => s.trim());
    } else {
      text = quoteText.trim();
      author = "Unknown";
    }

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
