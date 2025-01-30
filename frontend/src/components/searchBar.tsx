import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle input change and search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Trigger search action
  };

  return (
    <div style={{ padding: "10px", display: "flex", alignItems: "center" }}>
      <TextField
        label="Search Users"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        size="small"
        sx={{ marginRight: "10px" }}
      />
      <IconButton onClick={() => onSearch(searchTerm)} disabled={!searchTerm}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
