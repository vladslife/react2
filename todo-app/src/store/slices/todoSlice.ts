import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Todo } from '@/types/types';
import * as api from '@/api/todos';

interface TodoState {
  todos: Todo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filter: 'all' | 'active' | 'completed';
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  filter: 'all',
  loading: false,
  error: null,
};

export const fetchTodosThunk = createAsyncThunk(
  'todos/fetchTodos',
  async ({
    page,
    limit,
    filter,
  }: {
    page: number;
    limit: number;
    filter: 'all' | 'active' | 'completed';
  }) => {
    const response = await api.fetchTodos(page, limit, filter);
    return response;
  }
);

export const createTodoThunk = createAsyncThunk(
  'todos/createTodo',
  async (text: string) => {
    const response = await api.createTodo(text);
    return response;
  }
);

export const toggleTodoThunk = createAsyncThunk(
  'todos/toggleTodo',
  async (id: number) => {
    const response = await api.toggleTodoStatus(id);
    return response;
  }
);

export const deleteTodoThunk = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number) => {
    await api.deleteTodo(id);
    return id;
  }
);

export const updateTodoThunk = createAsyncThunk(
  'todos/updateTodo',
  async ({
    id,
    data,
  }: {
    id: number;
    data: { text?: string; completed?: boolean };
  }) => {
    const response = await api.updateTodo(id, data);
    return response;
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodosThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTodosThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки задач';
      })
      .addCase(createTodoThunk.fulfilled, (state, action) => {
        state.todos = [action.payload, ...state.todos];
        state.total += 1;
        state.totalPages = Math.ceil(state.total / state.limit);
      })
      .addCase(toggleTodoThunk.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const index = state.todos.findIndex(
          (todo) => todo.id === updatedTodo.id
        );
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
      })
      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.todos = state.todos.filter((todo) => todo.id !== deletedId);
        state.total -= 1;
        state.totalPages = Math.ceil(state.total / state.limit);
      })
      .addCase(updateTodoThunk.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const index = state.todos.findIndex(
          (todo) => todo.id === updatedTodo.id
        );
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
      });
  },
});

export const { setPage, setLimit, setFilter, clearError } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
