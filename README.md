# 🔗 PostgreSQL URL Shortener

A simple yet powerful URL shortener built with **Node.js**, **Express**, and **PostgreSQL**. This project generates unique short IDs for long URLs and tracks every click with a timestamp.

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

## 📋 Features

- 🔗 Generate short URLs from long URLs
- 📊 Track click analytics with timestamps
- ⚡ Fast redirects using database indexing
- 📈 View detailed visit history
- 🗃️ PostgreSQL for reliable data storage
- 🎯 Unique ID generation with collision protection

---

## 🛠️ Tech Stack

- **Backend:** Node.js & Express
- **Database:** PostgreSQL (with JSONB for analytics)
- **ID Generation:** Shortid library
- **HTTP Client:** Axios (if used for URL validation)
- **Environment Variables:** dotenv (recommended)

---

## 🗄️ Database Setup

Before running the application, you need to create the table in your PostgreSQL database. Run the following SQL script:

```sql
CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    short_url VARCHAR(10) UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    visited_history JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
