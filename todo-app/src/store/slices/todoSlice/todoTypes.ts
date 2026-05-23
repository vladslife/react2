import type { Todo } from '@/types/types';

export type FilterType = 'all' | 'completed' | 'active';
export type SortType = 'newest' | 'oldest';

export interface TodoState {
  todos: Todo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filter: FilterType;
  loading: boolean;
  error: string | null;
}
