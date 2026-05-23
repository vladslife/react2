import type { TodoState } from './todoTypes';

export const initialState: TodoState = {
  todos: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  filter: 'all',
  loading: false,
  error: null,
};
