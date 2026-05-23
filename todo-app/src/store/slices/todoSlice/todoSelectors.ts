import type { RootState } from '@/store';

export const selectTodosState = (state: RootState) => state.todos;

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectLoading = (state: RootState) => state.todos.loading;
export const selectError = (state: RootState) => state.todos.error;
export const selectPage = (state: RootState) => state.todos.page;
export const selectLimit = (state: RootState) => state.todos.limit;
export const selectTotalPages = (state: RootState) => state.todos.totalPages;
export const selectFilter = (state: RootState) => state.todos.filter;
export const selectTotal = (state: RootState) => state.todos.total;

export const selectCompletedCount = (state: RootState) =>
  state.todos.todos.filter((todo) => todo.completed).length;

export const selectActiveCount = (state: RootState) =>
  state.todos.todos.filter((todo) => !todo.completed).length;
