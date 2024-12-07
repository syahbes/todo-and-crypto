//todo slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { Todo } from "@/types/index";

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [{ id: "1", title: "example", done: false }],
  loading: false,
  error: null,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    fetchTodos: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action: PayloadAction<Todo[]>) => {
      state.loading = false;
      state.error = null;
      state.todos = action.payload;
    },
    fetchTodosFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchTodos, fetchTodosSuccess, fetchTodosFailure } =
  todosSlice.actions;
export const selectTodos = (state: RootState) => state.todos.todos;
export const selectTodosLoading = (state: RootState) => state.todos.loading;
export const selectTodosError = (state: RootState) => state.todos.error;

export default todosSlice.reducer;

export function fetchTodosAsync() {
  return async (dispatch: any) => {
    dispatch(fetchTodos());
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      dispatch(fetchTodosSuccess(data));
    } catch (error) {
      //   dispatch(fetchTodosFailure(error.message));
      console.log("error", error);
    }
  };
}
