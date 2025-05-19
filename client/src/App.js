import React, { useState, useEffect } from "react";
import { Box, Paper, Button, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Header from "./components/Header";
import CaseDetails from "./components/CaseDetails";
import Messages from "./components/Messages";
import UserInput from "./components/UserInput";
import { user, conversation } from "./data";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/messages", {
        params: { conversationId: conversation.conversationId },
      })
      .then((res) => {
        const sorted = res.data.map((msg) => ({
          sender: msg.sender,
          content: msg.content,
          createdAt: new Date(msg.created_at),
        }));
        setMessages(sorted);
      })
      .catch((err) => console.error("Error fetching messages:", err));
  }, []);

  const handleSendMessage = async (text) => {
    try {
      await axios.post("http://localhost:5000/messages", {
        conversationId: conversation.conversationId,
        content: text,
      });

      const res = await axios.get("http://localhost:5000/messages", {
        params: { conversationId: conversation.conversationId },
      });

      const sorted = res.data.map((msg) => ({
        sender: msg.sender,
        content: msg.content,
        createdAt: new Date(msg.created_at),
      }));

      setMessages(sorted);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleBack = () => {
    console.log("Back to Conversations clicked");
  };

  return (
    <Box>
      <Header user={user} />
      <div style={{ backgroundColor: "#f0f0f0", marginLeft: "20%" }}>
        {" "}
        <Button
          variant="text"
          startIcon={<ChevronLeftIcon />}
          onClick={handleBack}
          sx={{
            margin: "0 80px",
            padding: "60px 0 0 0",
            color: "#9A9EA7",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          Back to Conversations
        </Button>
        <Box
          mx="auto"
          mt={4}
          component={Paper}
          elevation={3}
          display="flex"
          flexDirection="column"
          margin={10}
        >
          <Typography variant="h6" fontWeight="bold" align="left" mt={2} pl={2}>
            {conversation.title}
          </Typography>

          <CaseDetails
            caseId={conversation.caseId}
            productName={conversation.productName}
            createdAt={conversation.createdAt}
            lastUpdated={conversation.lastUpdated}
          />

          <Box flex={1} display="flex" flexDirection="column" overflow="auto">
            <Messages messages={messages} />
          </Box>

          <UserInput onSend={handleSendMessage} />
        </Box>
      </div>
    </Box>
  );
}

export default App;
