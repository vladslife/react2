import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '@/api/todos';
import type { FilterType } from './todoTypes';

export const fetchTodosThunk = createAsyncThunk(
  'todos/fetchTodos',
  async ({
    page,
    limit,
    filter,
  }: {
    page: number;
    limit: number;
    filter: FilterType;
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
