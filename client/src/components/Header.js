import React from "react";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../assets/elementor-logo.svg";

function Header({ user }) {
  return (
    <Box
      p={2}
      borderBottom="1px solid #ccc"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box display="flex" alignItems="center">
        <img src={logo} alt="Elementor Logo" />
      </Box>
      <Box>
        <IconButton sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32 }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="body1">Hi {user.firstName}!</Typography>
          <ExpandMoreOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Header;
