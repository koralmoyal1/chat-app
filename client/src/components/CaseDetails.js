import React from "react";
import { Box, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { format } from "date-fns";

function CaseDetails({ caseId, productName, createdAt, lastUpdated }) {
  return (
    <Box
      p={2}
      borderBottom="1px solid #ccc"
      display="flex"
      flexDirection="column"
      gap={1}
    >
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        gap={8}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <ChatBubbleOutlineIcon fontSize="small" />
          <Typography variant="body1">Case ID: {caseId}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <ArticleOutlinedIcon fontSize="small" />
          <Typography variant="body1">Product Name: {productName}</Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-start" gap={8}>
        <Typography variant="body2">
          {" "}
          Created At: {format(new Date(createdAt), "MMM dd, yyyy hh:mm a")}
        </Typography>
        <Typography variant="body2">
          Last Updated: {format(new Date(lastUpdated), "MMM dd, yyyy hh:mm a")}
        </Typography>
      </Box>
    </Box>
  );
}

export default CaseDetails;
