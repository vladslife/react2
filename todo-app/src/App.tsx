import { useEffect } from 'react';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { AppContainer } from '@/components/AppContainer';
import { Title } from '@/components/Title';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  createTodoThunk,
  fetchTodosThunk,
  toggleTodoThunk,
  deleteTodoThunk,
  updateTodoThunk,
  setLimit,
  setPage,
} from '@/store/slices/todoSlice';

function App() {
  const dispatch = useAppDispatch();
  const { todos, loading, error, page, limit, filter, totalPages } =
    useAppSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodosThunk({ page, limit, filter }));
  }, [dispatch, page, limit, filter]);

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodoThunk(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodoThunk(id));
  };

  const handleEditTodo = (id: number, newText: string) => {
    dispatch(updateTodoThunk({ id, data: { text: newText } }));
  };

  const handleAddTodo = (text: string) => {
    dispatch(createTodoThunk(text));
  };

  if (loading) {
    return (
      <>
        <GlobalStyles />
        <AppContainer>
          <ThemeToggleButton />
          <Title>Задачи</Title>
          <div>Загрузка...</div>
        </AppContainer>
      </>
    );
  }

  if (error) {
    return (
      <>
        <GlobalStyles />
        <AppContainer>
          <ThemeToggleButton />
          <Title>Задачи</Title>
          <div>Ошибка: {error}</div>
        </AppContainer>
      </>
    );
  }

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <ThemeToggleButton />
        <Title>Задачи</Title>
        <TodoForm onAdd={handleAddTodo} />
        <TodoList
          todos={todos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo}
          page={page}
          limit={limit}
          totalPages={totalPages}
          onPageChange={(newPage) => dispatch(setPage(newPage))}
          onLimitChange={(newLimit) => dispatch(setLimit(newLimit))}
        />
      </AppContainer>
    </>
  );
}

export { App };
