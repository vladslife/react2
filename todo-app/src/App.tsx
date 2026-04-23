import { useState, useEffect } from 'react';
import { getTodosFromStorage, saveTodosToStorage } from '@/utils/localStorage';
import type { Todo } from '@/types/types';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { AppContainer } from '@/components/AppContainer';
import { Title } from '@/components/Title';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';

function App() {
  const [todos, setTodos] = useState<Todo[]>(getTodosFromStorage());

  useEffect(() => {
    saveTodosToStorage(todos);
  }, [todos]);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date(),
    };

    setTodos([...todos, newTodo]);
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <ThemeToggleButton />
        <Title>Задачи</Title>
        <TodoForm onAdd={handleAddTodo} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </AppContainer>
    </>
  );
}

export { App };
