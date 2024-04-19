import { useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";

export const TaskForm = ({
  form,
  setForm,
  setNote,
  editedTask,
  setEditedTask,
}) => {
  const { name, description } = form;

  useEffect(() => {
    if (editedTask.editeTask) {
      setForm({
        name: editedTask.name,
        description: editedTask.description,
      });
    }
  }, [editedTask.description, editedTask.editeTask, editedTask.name, setForm]);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setForm({ ...form, name: value });
        break;
      case "description":
        setForm({ ...form, description: value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      // setNote((prevNotes) => [...prevNotes, { name, description }]);
      if (editedTask.editeTask) {
        setNote((prevNotes) =>
          prevNotes.map((task) =>
            task.name === editedTask.name &&
            task.description === editedTask.description
              ? { ...task, name, description }
              : task
          )
        );
      } else {
        setNote((prevNotes) => [...prevNotes, { name, description }]);
      }

      setForm({ name: "", description: "" });
      setEditedTask({ name: "", description: "", editeTask: false });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="name"
          name="name"
          label="Nombre"
          value={name}
          onChange={handleChangeForm}
          required
        />
        <TextField
          id="description"
          name="description"
          label="Descripción"
          multiline
          rows={4}
          value={description}
          onChange={handleChangeForm}
        />
        <Button type="submit" variant="contained">
          Guardar
        </Button>
      </Box>
    </form>
  );
};
