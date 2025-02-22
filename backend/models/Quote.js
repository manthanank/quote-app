const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  text: String,
  author: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quote', QuoteSchema);