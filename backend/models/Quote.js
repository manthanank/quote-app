const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  text: String,
  author: String,
  date: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true // Optional: adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Quote', QuoteSchema);