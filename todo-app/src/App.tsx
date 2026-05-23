import { useEffect } from 'react';
import { TodoForm } from '@/widgets/TodoForm';
import { TodoList } from '@/widgets/TodoList';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { AppContainer } from '@/shared/AppContainer';
import { Title } from '@/shared/Title';
import { ThemeToggleButton } from '@/shared/ThemeToggleButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTodosThunk } from '@/store/slices/todoSlice';

const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    <GlobalStyles />
    <AppContainer>
      <ThemeToggleButton />
      <Title>Задачи</Title>
      {children}
    </AppContainer>
  </>
);

function App() {
  const dispatch = useAppDispatch();
  const { loading, error, page, limit, filter } = useAppSelector(
    (state) => state.todos
  );

  useEffect(() => {
    dispatch(fetchTodosThunk({ page, limit, filter }));
  }, [dispatch, page, limit, filter]);

  if (loading)
    return (
      <AppWrapper>
        <div>Загрузка...</div>
      </AppWrapper>
    );

  if (error)
    return (
      <AppWrapper>
        <div>Ошибка: {error}</div>
      </AppWrapper>
    );

  return (
    <AppWrapper>
      <TodoForm />
      <TodoList />
    </AppWrapper>
  );
}

export { App };
