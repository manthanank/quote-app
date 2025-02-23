# Quote App Backend

The backend server for the Quote App, built with Node.js, Express, and MongoDB. Features AI-powered quote generation using Google's Gemini model.

## Features

- RESTful API endpoints for quote management
- MongoDB integration with Mongoose
- Google Gemini AI integration for quote generation
- CORS configuration for frontend communication
- Environment-based configuration
- Error handling and logging

## Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- Google Generative AI (Gemini)
- Express Rate Limit
- Helmet for security
- Dotenv for configuration
- CORS for cross-origin requests

## Project Structure

```text
backend/
├── config/
│   └── db.js          # Database configuration
├── models/
│   └── Quote.js       # MongoDB schema
├── routes/
│   └── quotes.js      # API routes
├── services/
│   └── generativeAIService.js  # Gemini AI integration
├── .env               # Environment variables
├── .example.env       # Example environment template
├── index.js          # Server entry point
└── package.json      # Dependencies and scripts
```

## Setup

### Environment Variables

Create a `.env` file based on `.example.env`.

### Installation

1. Install dependencies:

    ```bash
    npm install
    ```

2. Configure environment:

    - Copy `.example.env` to `.env`
    - Add your MongoDB URI and Gemini API key

3. Start the server:

    ```bash
    npm start
    ```

### Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## License

This project is licensed under the MIT License.
