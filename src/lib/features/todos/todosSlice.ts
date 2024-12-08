import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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

export const fetchTodosAsync = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error);
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
        state.error = null;
      })
      .addCase(fetchTodosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addTodo, toggleTodo } = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectTodosLoading = (state: RootState) => state.todos.loading;
export const selectTodosError = (state: RootState) => state.todos.error;

export default todosSlice.reducer;
