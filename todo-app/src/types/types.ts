export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoListResponse {
  data: Todo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
