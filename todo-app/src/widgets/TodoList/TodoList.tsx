import { useState } from 'react';
import type { Todo } from '@/types/types';
import { TodoItem } from '@/widgets/TodoItem';
import { useTheme } from '@/context/ThemeContext';
import styled from 'styled-components';
import { EmptyMessage } from '@/shared/EmptyMessage';
import { Pagination as MUIPagination } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  toggleTodoThunk,
  deleteTodoThunk,
  updateTodoThunk,
  setPage,
  setLimit,
} from '@/store/slices/todoSlice';
import {
  selectTodos,
  selectPage,
  selectLimit,
  selectTotalPages,
} from '@/store/slices/todoSlice';

const ControlsPanel = styled.div<{ theme: 'light' | 'dark' }>`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background: ${({ theme }) => (theme === 'light' ? '#fff' : '#2d2d2d')};
  border-radius: 12px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 10px 0;
`;

const StyledSelect = styled.select<{ theme: 'light' | 'dark' }>`
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => (theme === 'light' ? '#ddd' : '#555')};
  background: ${({ theme }) => (theme === 'light' ? '#fff' : '#3d3d3d')};
  color: ${({ theme }) => (theme === 'light' ? '#1a1a1a' : '#fff')};
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const FilterButton = styled.button<{
  $active: boolean;
  theme: 'light' | 'dark';
}>`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  background: ${({ $active, theme }) =>
    $active
      ? theme === 'light'
        ? '#007bff'
        : '#0056b3'
      : theme === 'light'
        ? '#e0e0e0'
        : '#3d3d3d'};

  color: ${({ $active, theme }) =>
    $active ? '#fff' : theme === 'light' ? '#1a1a1a' : '#fff'};

  &:hover {
    transform: translateY(-2px);
  }
`;

const Select = styled.select<{ theme: 'light' | 'dark' }>`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => (theme === 'light' ? '#ddd' : '#555')};
  background: ${({ theme }) => (theme === 'light' ? '#fff' : '#3d3d3d')};
  color: ${({ theme }) => (theme === 'light' ? '#1a1a1a' : '#fff')};
  cursor: pointer;
`;

const Label = styled.label<{ theme: 'light' | 'dark' }>`
  margin-right: 8px;
  color: ${({ theme }) => (theme === 'light' ? '#1a1a1a' : '#fff')};
`;

const LabelText = styled.span`
  margin-right: 10px;
`;

const StyledPagination = styled(MUIPagination)<{ theme: 'light' | 'dark' }>`
  & .MuiPaginationItem-root {
    color: ${({ theme }) => (theme === 'light' ? '#1a1a1a' : '#fff')};
  }
`;

const TodoListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

type FilterType = 'all' | 'completed' | 'active';
type SortType = 'newest' | 'oldest';

const TodoList = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const todos = useAppSelector(selectTodos);
  const page = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);
  const totalPages = useAppSelector(selectTotalPages);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('newest');

  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === 'completed') return todo.completed;
    if (currentFilter === 'active') return !todo.completed;

    return true;
  });

  const sortedAndFilteredTodos = [...filteredTodos].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    if (sort === 'newest') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodoThunk(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodoThunk(id));
  };

  const handleEditTodo = (id: number, newText: string) => {
    dispatch(updateTodoThunk({ id, data: { text: newText } }));
  };

  const totalTodos = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = totalTodos - completedCount;

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
  };

  const saveEdit = (id: number, newText: string) => {
    handleEditTodo(id, newText);
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div>
      <ControlsPanel theme={theme}>
        <ButtonGroup>
          <FilterButton
            $active={currentFilter === 'all'}
            onClick={() => setCurrentFilter('all')}
            theme={theme}
          >
            Все ({totalTodos})
          </FilterButton>

          <FilterButton
            $active={currentFilter === 'active'}
            onClick={() => setCurrentFilter('active')}
            theme={theme}
          >
            Активные ({activeCount})
          </FilterButton>

          <FilterButton
            $active={currentFilter === 'completed'}
            onClick={() => setCurrentFilter('completed')}
            theme={theme}
          >
            Выполненные ({completedCount})
          </FilterButton>
        </ButtonGroup>

        <div>
          <Label theme={theme}>Сортировать</Label>
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortType)}
            theme={theme}
          >
            <option value="newest">Сначала новые</option>
            <option value="oldest">Сначала старые</option>
          </Select>
        </div>
      </ControlsPanel>

      {sortedAndFilteredTodos.length === 0 ? (
        <EmptyMessage>Задачи не найдены</EmptyMessage>
      ) : (
        <>
          <TodoListContainer>
            {sortedAndFilteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isEditing={editingId === todo.id}
                onToggle={handleToggleTodo}
                onStartEdit={startEdit}
                onSaveEdit={saveEdit}
                onCancelEdit={cancelEdit}
                onDelete={handleDeleteTodo}
              />
            ))}
          </TodoListContainer>

          <PaginationContainer>
            <div>
              <LabelText>Задач на странице:</LabelText>
              <StyledSelect
                value={limit}
                onChange={(e) => dispatch(setLimit(Number(e.target.value)))}
                theme={theme}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </StyledSelect>
            </div>

            <StyledPagination
              count={totalPages}
              page={page}
              onChange={(_, value) => dispatch(setPage(value))}
              color="primary"
              theme={theme}
            />
          </PaginationContainer>
        </>
      )}
    </div>
  );
};

export { TodoList };
