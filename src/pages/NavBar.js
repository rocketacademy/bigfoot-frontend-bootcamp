import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component={Link}
            to={"/"}
            variant="h6"
            sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
          >
            Home
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
