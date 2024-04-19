import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const createData = (name, description) => {
  return { name, description };
};

export const TaskTable = ({ note, setNote, setEditedTask }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const newRows = note.map((item) => createData(item.name, item.description));
    setRows(newRows);
  }, [note]);

  const handleEdit = (taskId, taskName, taskDescription) => {
    const confirmEdition = window.confirm(`Desea editar la tarea ${taskName}`);
    if (confirmEdition) {
      setEditedTask({
        name: taskName,
        description: taskDescription,
        editeTask: true,
      });
    }
  };

  const handleDelete = (taskId, taskName) => {
    const confirmDelete = window.confirm(`Desea borrar la tarea ${taskName}`);
    if (confirmDelete) {
      const updatedRows = rows.filter((_, index) => index !== taskId);
      setNote(updatedRows);
      setRows(updatedRows);
    }
  };

  return (
    <>
      {rows.length === 0 ? (
        <Typography>No hay notas agregadas</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "20%" }}>Nombre</TableCell>
                <TableCell sx={{ width: "60%" }} align="center">
                  Descripcion
                </TableCell>
                <TableCell sx={{ width: "20%" }} align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleEdit(index, row.name, row.description)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(index, row.name)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
