import React from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";

interface UserListProps {
  users: Array<{ id: string; username: string }>;
  onUserSelect: (user: { id: string; username: string }) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onUserSelect }) => {
  return (
    <List>
      {users.map((user) => (
        <ListItemButton key={user.id} onClick={() => onUserSelect(user)}>
          <ListItemText primary={user.username} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default UserList;
