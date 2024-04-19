import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const createData = (name, description, state) => {
  return { name, description, state };
};

export const TaskTable = ({ note, setNote, setEditedTask }) => {
  const [rows, setRows] = useState([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const newRows = note.map((item) =>
      createData(item.name, item.description, item.state)
    );

    const newChecked = newRows.map((row) => row.state === "Completada");
    setChecked(newChecked);
    setRows(newRows);
  }, [note]);

  const handleEdit = (taskId, taskName, taskDescription, taskState) => {
    const confirmEdition = window.confirm(`Desea editar la tarea ${taskName}`);
    if (confirmEdition) {
      setEditedTask({
        name: taskName,
        description: taskDescription,
        state: taskState,
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

  const handleChange = (index) => {
    setChecked((prevChecked) =>
      prevChecked.map((checkedState, idx) =>
        idx === index ? !checkedState : checkedState
      )
    );

    if (!checked[index]) {
      const updatedRows = rows.map((row, idx) =>
        idx === index ? { ...row, state: "Completada" } : row
      );
      setRows(updatedRows);
      setNote(updatedRows);
    } else {
      const updatedRows = rows.map((row, idx) =>
        idx === index ? { ...row, state: "No Completada" } : row
      );
      setRows(updatedRows);
      setNote(updatedRows);
    }
  };

  return (
    <>
      {rows.length === 0 ? (
        <Card>
          <CardContent>
            <Typography
              align="center"
              gutterBottom
              variant="h5"
              component="div"
              padding={1}
            >
              Aun no hay tareas creadas
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="center">Descripcion</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Checkbox
                        checked={checked[index]}
                        onChange={() => handleChange(index)}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.state}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          handleEdit(
                            index,
                            row.name,
                            row.description,
                            row.state
                          )
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

          <div style={{ marginTop: "20px" }}>
            <Card>
              <CardContent>
                <Typography>cantidad de tareas: {rows.length}</Typography>
                <Typography>
                  cantidad de tareas Completadas:{" "}
                  {checked.filter((isChecked) => isChecked === true).length}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

TaskTable.propTypes = {
  note: PropTypes.array,
  setNote: PropTypes.func,
  setEditedTask: PropTypes.func,
};
