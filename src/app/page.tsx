"use client";
import { fetchTodosAsync } from "@/lib/features/todos/todosSlice";
import { Todo } from "@/types";
import { Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/lib/store';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();  // Example of accessing state
  const todos = useSelector(
    (state: { todos: { todos: Todo[] } }) => state.todos.todos
  );

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h1">Hello</Typography>
      <Button variant="contained">Button</Button>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}
