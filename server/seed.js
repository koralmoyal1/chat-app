const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "chat_app_db",
  port: 5432,
});

async function seed() {
  try {
    const user = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "User.json"))
    );
    const conversation = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "Conversation.json"))
    );
    const messagesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "Messages.json"))
    );

    await pool.query("TRUNCATE TABLE messages, conversations, users");

    await pool.query(
      `INSERT INTO users (user_id, first_name, last_name, email)
       VALUES ($1, $2, $3, $4)`,
      [user.userId, user.firstName, user.lastName, user.email]
    );

    await pool.query(
      `INSERT INTO conversations (
        conversation_id, user_id, case_id, product_name, status, created_at, last_updated
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        conversation.conversationId,
        conversation.userId,
        conversation.caseId,
        conversation.productName,
        conversation.status,
        conversation.createdAt,
        conversation.lastUpdated,
      ]
    );

    for (const msg of messagesData.messages) {
      const sender = msg.direction === "in" ? "user" : "bot";
      await pool.query(
        `INSERT INTO messages (message_id, conversation_id, sender, content, created_at)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          msg.messageId,
          messagesData.conversationId,
          sender,
          msg.content,
          msg.timestamp,
        ]
      );
    }

    console.log("Data seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
}

seed();
