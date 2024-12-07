"use client";
import { useActionState, useEffect, useState } from "react";
import { fetchTodosAsync } from "@/lib/features/todos/todosSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Container,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Todo } from "@/types";

export default function TodoList() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector(
    (state: { todos: { todos: Todo[] } }) => state.todos.todos
  );
  const [filter, setFilter] = useState<"ALL" | "COMPLETED" | "INCOMPLETE">(
    "ALL"
  );

  const [error, submitAction, isPending] = useActionState(
    async (_previousState: any, formData: any) => {
      console.log("will submit", formData.get("newTask"));
      const error = await addNewTask(formData.get("newTask"));
      if (error) {
        return error;
      }
      return null;
    },
    null
  );

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, [dispatch]);

  const filteredTasks = todos.filter((todo) => {
    if (filter === "COMPLETED") {
      return todo.completed;
    } else if (filter === "INCOMPLETE") {
      return !todo.completed;
    }
    return true;
  });

  const handleToggleTask = async (id: string) => {
    console.log("toggle task", id);
  };

  const addNewTask = async (newTask: string) => {
    if (!newTask) {
      return "Please enter a task";
    }
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5",
      {
        method: "POST",
        body: JSON.stringify({
          title: newTask,
          completed: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();
    return null;
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 1, p: 1, mb: 4 }}>
        <Typography variant="h5" fontWeight={"bold"} textAlign={"center"}>
          JsonPlaceholder: Todo's
        </Typography>
      </Card>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
        <ButtonGroup variant="contained" aria-label="task filter button group">
          <Button
            onClick={() => setFilter("ALL")}
            color={filter === "ALL" ? "primary" : "inherit"}>
            ALL
          </Button>
          <Button
            onClick={() => setFilter("COMPLETED")}
            color={filter === "COMPLETED" ? "primary" : "inherit"}>
            COMPLETED
          </Button>
          <Button
            onClick={() => setFilter("INCOMPLETE")}
            color={filter === "INCOMPLETE" ? "primary" : "inherit"}>
            INCOMPLETE
          </Button>
        </ButtonGroup>
      </Box>
      <form action={submitAction} style={{ marginBottom: "1rem" }}>
        <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
          <TextField
            size="small"
            placeholder="New Task"
            name="newTask"
            sx={{ flex: 1 }}
          />
          <Button variant="contained" type="submit">
            Add Task
          </Button>
        </Box>
      </form>
      {error && <Typography color="error">{error}</Typography>}
      {isPending && <Typography>Loading...</Typography>}

      <List sx={{ p: 0 }}>
        {filteredTasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              bgcolor: "background.paper",
              borderBottom: "1px solid",
              borderColor: "divider",
              pr: 7,
              position: "relative",
            }}
            secondaryAction={
              <Checkbox
                edge="end"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
              />
            }>
            <ListItemText
              primary={task.title}
              sx={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
