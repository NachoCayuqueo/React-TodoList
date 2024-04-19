import { Grid } from "@mui/material";
import { TaskFinder, TaskForm, TaskTable, Title } from "../../components";
import { useState } from "react";

const initializeForm = {
  name: "",
  description: "",
  state: "No Completada",
};

const initializeEditedTask = {
  name: "",
  description: "",
  state: "",
  editeTask: false,
};

export const Home = () => {
  const [form, setForm] = useState(initializeForm);
  const [editedTask, setEditedTask] = useState(initializeEditedTask);
  const [note, setNote] = useState([]);

  return (
    <div style={{ marginLeft: "16px", marginRight: "16px", padding: "10px" }}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Title text="Mi Lista de Tareas" />
        </Grid>
        <Grid item xs={12}>
          <TaskFinder tasks={note} />
        </Grid>
        <Grid item xs={5}>
          <TaskForm
            form={form}
            setForm={setForm}
            setNote={setNote}
            editedTask={editedTask}
            setEditedTask={setEditedTask}
          />
        </Grid>
        <Grid item xs={7}>
          <TaskTable
            note={note}
            setNote={setNote}
            setEditedTask={setEditedTask}
          />
        </Grid>
      </Grid>
    </div>
  );
};
