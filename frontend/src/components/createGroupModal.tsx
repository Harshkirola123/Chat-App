import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { CREATE_GROUP_MUTATION } from "../graphql/mutations"; // Mutation to create a group
import { useMutation } from "@apollo/client";

interface CreateGroupModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  open,
  onClose,
}) => {
  const [groupName, setGroupName] = useState("");
  const [createGroup] = useMutation(CREATE_GROUP_MUTATION);

  const handleCreateGroup = async () => {
    try {
      await createGroup({ variables: { name: groupName } });
      onClose();
    } catch (error) {
      console.error("Error creating group", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 300,
          padding: 3,
          margin: "auto",
          backgroundColor: "white",
          marginTop: "100px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Create New Group
        </Typography>
        <TextField
          label="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          fullWidth
        />
        <Box sx={{ marginTop: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} sx={{ marginRight: 2 }}>
            Cancel
          </Button>
          <Button onClick={handleCreateGroup} variant="contained">
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateGroupModal;
