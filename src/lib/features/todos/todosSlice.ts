import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { Todo } from "@/types/index";

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
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
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const {
  fetchTodos,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodo,
  toggleTodo,
} = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectTodosLoading = (state: RootState) => state.todos.loading;
export const selectTodosError = (state: RootState) => state.todos.error;

export default todosSlice.reducer;

// Async thunks
export function fetchTodosAsync() {
  return async (dispatch: any) => {
    dispatch(fetchTodos());
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      dispatch(fetchTodosSuccess(data));
    } catch (error: any) {
      dispatch(fetchTodosFailure(error.message));
    }
  };
}
