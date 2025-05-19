import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

function UserInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() !== "") {
      onSend(text);
      setText("");
    }
  };

  return (
    <Box
      p={2}
      display="flex"
      flexDirection={"column"}
      gap={1.5}
      borderTop="1px solid #ddd"
    >
      <Box border="1px solid #ddd">
        <TextField
          fullWidth
          variant="standard"
          size="small"
          multiline
          minRows={2}
          maxRows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 0,
          }}
        />
        <Box
          p={2}
          display="flex"
          justifyContent="flex-end"
          minHeight={150}
          alignItems={"flex-end"}
        >
          <Button
            variant="contained"
            onClick={handleSend}
            sx={{
              backgroundColor: "#06007D",
              borderRadius: 0,
              height: "100%",
              minWidth: "80px",
              fontSize: "0.75rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#04005a",
              },
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default UserInput;
