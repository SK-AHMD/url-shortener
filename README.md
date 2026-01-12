# 🔗 Node.js & PostgreSQL URL Shortener

A modern, high-performance URL shortener API that transforms long, clunky URLs into short, shareable links. This project uses **Express.js** for the server logic and **PostgreSQL** to handle data persistence and click analytics.

---

## ✨ Features

- **Short ID Generation:** Uses `shortid` to create unique, non-sequential URL aliases.
- **Efficient Redirects:** High-speed redirection to original destination URLs.
- **Visit Tracking:** Automatically logs the exact timestamp of every click using PostgreSQL `JSONB` arrays.
- **Analytics API:** View total clicks and detailed history for any short link.
- **Modern Syntax:** Fully implemented using `async/await` for clean, readable code.

---

## 🛠️ Database Schema

Run the following SQL commands in your PostgreSQL environment (e.g., pgAdmin or psql) to set up the necessary table:

```sql
CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    short_url VARCHAR(15) UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    visited_history JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
🚀 Getting Started
1. Installation
Clone the repository and install dependencies:

Bash

git clone <your-repo-url>
cd url-shortener
npm install
2. Configuration
Update the database connection details in your main file:

JavaScript

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: 'your_password',
    port: 5432,
});
3. Run the App
Bash

node index.js
📡 API Endpoints
1. Create a Short URL
POST /url

Request Body:

JSON

{ "originalURL": "[https://www.google.com](https://www.google.com)" }
2. Redirect
GET /:shortURL

Description: Redirects to the original URL and automatically updates the visit history.

3. Analytics
GET /analytics/:shortURL

Response:

JSON

{
  "totalClicks": 12,
  "visitedHistory": [
      { "visited_at": "2026-01-12T..." }
  ],
  "createdAt": "...",
  "updatedAt": "..."
}
📁 Project Structure
Plaintext

├── node_modules/    # Dependencies (Ignored by Git)
├── index.js         # Main Server & Database Logic
├── .gitignore       # Prevents node_modules from being pushed
├── package.json     # Project Metadata
└── README.md        # Documentation
