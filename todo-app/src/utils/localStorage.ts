import type { Todo } from '@/types/types';

export const getTodosFromStorage = (): Todo[] => {
  const saved = localStorage.getItem('todos');
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return parsed.map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt),
    }));
  } catch (e) {
    console.error('Ошибка парсинга todos:', e);
    return [];
  }
};

export const saveTodosToStorage = (todos: Todo[]) => {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (e) {
    console.error('Ошибка сохранения в localeStorage', e);
  }
};
