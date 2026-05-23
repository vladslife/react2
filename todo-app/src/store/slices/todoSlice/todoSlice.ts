import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './todoConstants';
import {
  fetchTodosThunk,
  createTodoThunk,
  toggleTodoThunk,
  deleteTodoThunk,
  updateTodoThunk,
} from './todoApi';

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
