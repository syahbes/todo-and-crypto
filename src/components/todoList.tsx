"use client";
import { useEffect, useState } from "react";
import {
  fetchTodosAsync,
  addTodo,
  toggleTodo,
} from "@/lib/features/todos/todosSlice";
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
  const loading = useSelector(
    (state: { todos: { loading: boolean } }) => state.todos.loading
  );
  const error = useSelector(
    (state: { todos: { error: string | null } }) => state.todos.error
  );
  const [filter, setFilter] = useState<"ALL" | "COMPLETED" | "INCOMPLETE">(
    "ALL"
  );
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, [dispatch]);

  const filteredTasks = todos.filter((todo) => {
    if (filter === "COMPLETED") return todo.completed;
    if (filter === "INCOMPLETE") return !todo.completed;
    return true;
  });

  const handleToggleTask = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTask,
          completed: false,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      dispatch(addTodo(data));
      setNewTask("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 1, p: 1, mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Todo List
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

      <form onSubmit={handleAddTask} style={{ marginBottom: "1rem" }}>
        <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
          <TextField
            size="small"
            placeholder="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            sx={{ flex: 1 }}
          />
          <Button variant="contained" type="submit">
            Add Task
          </Button>
        </Box>
      </form>

      {error && <Typography color="error">{error}</Typography>}
      {loading && <Typography>Loading...</Typography>}

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
