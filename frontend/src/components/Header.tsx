import React from "react";
import { Box, Typography, Button, AppBar, Toolbar } from "@mui/material";
// import { logout, selectCurrentuser } from "../store/reducer/authReducer"; // Adjust the import path for your logout action
import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../store/hook";

const Header = () => {
  //   const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = "";
  //   const user = useAppSelector(selectCurrentuser);

  const handleLogout = () => {
    // dispatch(logout()); // Clear user data from global state
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <AppBar position="sticky" sx={{ marginBottom: "20px" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h6" sx={{ color: "white" }}>
            Welcome, {user ? user.name : "Guest"} {/* Display user name */}
          </Typography>
        </Box>

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
