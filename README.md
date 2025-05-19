# Chat Application – Home Assignment

This is a full-stack chat application built as part of a technical assignment.  
It allows a single end-user to exchange messages with a chatbot using a clean and responsive UI.

---

# Tech Stack

Frontend: React + Material UI (MUI)
Backend: Node.js (Express)
Database: PostgreSQL
Data Seeding: JSON files loaded via a custom Node.js script

# Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/koralmoyal1/chat-app.git
cd chat-app
```

---

### 2. Install Dependencies

#### Client

```bash
cd client
npm install
npm start
```

#### Server

```bash
cd ../server
npm install
```

---

### 3. Set Up the Database

- Make sure PostgreSQL is installed and running locally.
- Create a database named `chat_app_db`.

Run this in `psql`:

```sql
CREATE DATABASE chat_app_db;
```

- Create the tables (`users`, `conversations`, `messages`)

### 4. Seed the Database

```bash
cd server
node seed.js
```

---

### 5. Run the Server

```bash
node index.js
```

---
