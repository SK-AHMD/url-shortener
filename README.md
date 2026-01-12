# 🔗 Node.js & PostgreSQL URL Shortener

A modern, high-performance **URL Shortener API** built with **Express.js** and **PostgreSQL**.  
It converts long URLs into short, shareable links while tracking every visit with precise analytics.

---

## 🚀 Why This Project Matters

This system is designed like a **real SaaS backend**:

- Scalable PostgreSQL storage  
- Accurate click tracking  
- REST-based API  
- Production-grade async architecture  

Perfect for:
- Startups  
- Marketing tools  
- Analytics platforms  
- Backend portfolio  

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🔗 Short ID Generation | Uses `shortid` to generate unique, non-predictable URLs |
| ⚡ Fast Redirects | Optimized lookup and redirection |
| 📊 Visit Tracking | Every click is stored with timestamp |
| 🧠 JSONB Analytics | PostgreSQL `JSONB` stores click history efficiently |
| 🛡 Async/Await | Clean, safe non-blocking backend |
| 📡 REST API | Easy integration with frontend or mobile apps |

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **shortid**
- **pg (node-postgres)**

---

## 🗄 Database Schema

Run this in PostgreSQL (`psql` or pgAdmin):

```sql
CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    short_url VARCHAR(15) UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    visited_history JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
