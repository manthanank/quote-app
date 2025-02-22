# Quote App

A modern web application that displays inspiring daily quotes. Built with Angular frontend and Node.js/Express backend.

## Features

- Daily rotating inspirational quotes
- Modern, responsive UI with glassmorphism design
- AI-powered quote generation using Google's Gemini model
- MongoDB integration for quote storage
- CORS-enabled secure communication between frontend and backend
- Environment-based configuration

## Tech Stack

### Frontend

- Angular 19
- RxJS
- TypeScript
- Modern CSS with responsive design
- Responsive layouts with CSS Grid and Flexbox

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- Google Generative AI (Gemini)

## Getting Started

1. Clone the repository

    ```sh
    git clone https://github.com/manthanank/quote-app.git
    ```

    ```sh
    cd quote-app
    ```

2. Install dependencies

    ```sh
    # Install frontend dependencies
    npm install

    # Install backend dependencies
    cd backend
    npm install
    ```

3. Configure environment variables

    - Copy `backend/.example.env` to `.env`
    - Add your MongoDB URI and Gemini API key

    ```text
    MONGO_URI=your_mongodb_uri
    GEMINI_API_KEY=your_gemini_api_key
    PORT=5000
    NODE_ENV=development
    BASE_URL=http://localhost:5000
    FRONTEND_URL=http://localhost:4200
    ```

4. Run the application

    ```sh
    # Start frontend
    npm start
    
    # Start backend
    cd backend
    npm run dev
    ```

5. Open <http://localhost:4200> in your browser

## Project Structure

```text
project-root/
├── src/                      # Angular frontend application
│   ├── app/                  # Angular components and modules
│   ├── services/            # Angular services
│   └── models/              # TypeScript interfaces
│
└── backend/                 # Node.js backend
    ├── config/             # Database configuration
    ├── models/             # MongoDB schemas
    ├── routes/             # API routes
    └── services/           # AI integration services
```

## API Documentation

### Endpoints

#### Get Daily Quote

```http
GET /api/quote
```

**Description:**
Retrieves the quote of the day. Automatically generates a new quote using Gemini AI if none exists for the current date.

**Response Format:**

```json
{
  "text": "Quote text",
  "author": "Author name",
  "date": "2024-03-10T00:00:00.000Z"
}
```

**Status Codes:**

- `200` - Success
- `500` - Server Error

## Scripts

### Frontend Scripts

- `npm start` - Run development server
- `npm run build` - Build production bundle
- `npm test` - Run unit tests
- `npm run watch` - Build with watch mode

### Backend Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload

## License

This project is licensed under the MIT License.
