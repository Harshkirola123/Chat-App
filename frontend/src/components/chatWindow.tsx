import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE_MUTATION } from "../graphql/mutations"; // Mutation to send a message

interface ChatWindowProps {
  selectedUser: { id: string; username: string };
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedUser }) => {
  const [message, setMessage] = useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);

  const handleSendMessage = async () => {
    try {
      await sendMessage({
        variables: { userId: selectedUser.id, content: message },
      });
      setMessage(""); // Clear the input field
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <Box sx={{ padding: 3, height: "100%" }}>
      <Typography variant="h6">Chat with {selectedUser.username}</Typography>
      <List sx={{ maxHeight: "300px", overflowY: "auto" }}>
        {/* List of messages */}
        <ListItem>
          <ListItemText primary="Hello, how are you?" />
        </ListItem>
        <ListItem>
          <ListItemText primary="I'm good, thanks!" />
        </ListItem>
      </List>

      {/* Send Message */}
      <Box sx={{ display: "flex", marginTop: 2 }}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          label="Type your message"
        />
        <Button
          onClick={handleSendMessage}
          sx={{ marginLeft: 2 }}
          variant="contained"
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatWindow;
