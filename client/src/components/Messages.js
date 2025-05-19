import React from "react";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

function Messages({ messages }) {
  return (
    <Box
      p={2}
      sx={{
        maxHeight: "400px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {messages.map((msg, index) => {
        const isUser = msg.sender === "user";

        return (
          <Box
            key={index}
            mb={1}
            display="flex"
            flexDirection={isUser ? "row " : "row-reverse"}
            alignItems={"flex-start"}
            alignSelf={isUser ? "flex-start" : "flex-end"}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: isUser ? "#0796FA" : "#D7D7D7",
                mx: 1,
              }}
            />
            <Box
              display="flex"
              flexDirection="column"
              alignItems={isUser ? "flex-start" : "flex-end"}
            >
              <Box
                sx={{
                  backgroundColor: isUser ? "#E6F5FF" : "#F0F0F0",
                  color: "#000",
                  p: 1.5,
                  textAlign: isUser ? "left" : "right",
                }}
              >
                <Typography variant="body1">{msg.content}</Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                mt={0.5}
                justifyContent={isUser ? "flex-start" : "flex-end"}
              >
                <Typography variant="caption" color="textSecondary">
                  Chat - {format(msg.createdAt, "MM/dd/yyyy hh:mm a")}
                </Typography>
                <DoneOutlinedIcon
                  sx={{ fontSize: 14, color: "green", ml: 0.5 }}
                />
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default Messages;
