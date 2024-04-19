import { useState } from "react";
import PropTypes from "prop-types";

import { Box, Card, CardContent, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const TaskFinder = ({ tasks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    const filteredTasks = tasks.filter(({ name }) =>
      name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(filteredTasks);
  };

  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "flex-end", justifyContent: "end" }}
      >
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="search"
          name="serch"
          label="Buscar Tarea"
          value={searchTerm}
          onChange={handleChange}
          variant="standard"
        />
      </Box>
      {searchTerm && (
        <Card>
          <CardContent>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>{result.name}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </>
  );
};

TaskFinder.propTypes = {
  tasks: PropTypes.array,
};
