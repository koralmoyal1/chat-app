require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 5000;

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "chat_app_db",
  password: process.env.DB_PASSWORD || "",
  port: process.env.DB_PORT || 5432,
});

app.use(cors());
app.use(bodyParser.json());

const generateMessageId = (sender) => `msg-${Date.now()}-${sender}`;

app.get("/messages", async (req, res) => {
  const { conversationId } = req.query;

  if (!conversationId) {
    return res.status(400).json({ error: "Missing conversationId parameter" });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC`,
      [conversationId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

app.post("/messages", async (req, res) => {
  const { conversationId, content } = req.body;

  if (!conversationId || !content) {
    return res.status(400).json({ error: "Missing conversationId or content" });
  }

  const timestamp = new Date();

  try {
    const userMessageId = generateMessageId("user");
    await pool.query(
      `INSERT INTO messages (message_id, conversation_id, sender, content, created_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [userMessageId, conversationId, "user", content, timestamp]
    );

    const botReply = "Thanks for your message!";
    const botMessageId = generateMessageId("bot");

    await pool.query(
      `INSERT INTO messages (message_id, conversation_id, sender, content, created_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [botMessageId, conversationId, "bot", botReply, timestamp]
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
