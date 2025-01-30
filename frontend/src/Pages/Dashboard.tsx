import React, { useState } from "react";
import {
  Box,
  Container,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  useTheme,
  CssBaseline,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_USERS_QUERY } from "../graphql/query";
import UserList from "../components/userList";
import ChatWindow from "../components/chatWindow";
import CreateGroupModal from "../components/createGroupModal";
import SearchBar from "../components/searchBar";
import Header from "../components/Header";

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_USERS_QUERY);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const theme = useTheme(); // Get theme for dynamic styling

  const handleSearch = (searchTerm: string) => {
    // Implement search logic or update query to filter users based on search term
  };

  return (
    <Container sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <CssBaseline /> {/* Normalize styling across browsers */}
      {/* Sidebar */}
      <Drawer
        sx={{
          width: 280,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.common.white,
            borderRight: "2px solid #444", // Border to give separation
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: theme.palette.primary.main,
            boxShadow: "none",
            marginBottom: "10px",
          }}
        >
          <Toolbar>
            <Typography variant="h6">Chat App</Typography>
          </Toolbar>
        </AppBar>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* User List */}
        {!loading && !error && data && (
          <Box sx={{ marginTop: "20px" }}>
            <UserList
              users={data.users}
              onUserSelect={setSelectedUser}
              sx={{
                "& .MuiListItem-root:hover": {
                  backgroundColor: theme.palette.primary.light,
                  cursor: "pointer",
                },
              }}
            />
          </Box>
        )}

        {/* Create Group Button */}
        <Button
          variant="contained"
          onClick={() => setOpenCreateGroup(true)}
          sx={{
            marginTop: "10px",
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark,
            },
          }}
        >
          Create Group
        </Button>
      </Drawer>
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Chat Window */}
        {selectedUser && (
          <Box
            sx={{
              backgroundColor: theme.palette.background.default,
              flexGrow: 1,
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <ChatWindow selectedUser={selectedUser} />
          </Box>
        )}
      </Box>
      {/* Create Group Modal */}
      {openCreateGroup && (
        <CreateGroupModal
          open={openCreateGroup}
          onClose={() => setOpenCreateGroup(false)}
        />
      )}
    </Container>
  );
};

export default Dashboard;
