import { useState } from 'react';
import type { Todo } from '@/types/types';
import { TodoItem } from '@/components/TodoItem';
import { useTheme } from '@/context/ThemeContext';
import styled from 'styled-components';
import { EmptyMessage } from '@/components/EmptyMessage/';
import { TodoListContainer } from '@/components/TodoListContainer';
import { Pagination } from '@mui/material';

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

interface Props {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  page: number;
  limit: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

type FilterType = 'all' | 'completed' | 'active';
type SortType = 'newest' | 'oldest';

const TodoList = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  page,
  limit,
  totalPages,
  onPageChange,
  onLimitChange,
}: Props) => {
  const { theme } = useTheme();
  const [editingId, setEditingId] = useState<number | null>(null);

  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('newest');

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;

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

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    onPageChange(value);
  };

  const totalTodos = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = totalTodos - completedCount;

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
  };

  const saveEdit = (id: number, newText: string) => {
    onEdit(id, newText);
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
            $active={filter === 'all'}
            onClick={() => setFilter('all')}
            theme={theme}
          >
            Все ({totalTodos})
          </FilterButton>

          <FilterButton
            $active={filter === 'active'}
            onClick={() => setFilter('active')}
            theme={theme}
          >
            Активные ({activeCount})
          </FilterButton>

          <FilterButton
            $active={filter === 'completed'}
            onClick={() => setFilter('completed')}
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
                onToggle={onToggle}
                onStartEdit={startEdit}
                onSaveEdit={saveEdit}
                onCancelEdit={cancelEdit}
                onDelete={onDelete}
              />
            ))}
          </TodoListContainer>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '20px',
              padding: '10px 0',
            }}
          >
            <div>
              <span style={{ marginRight: '10px' }}>Задач на странице:</span>
              <select
                value={limit}
                onChange={(e) => onLimitChange(Number(e.target.value))}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: `1px solid ${theme === 'light' ? '#ddd' : '#555'}`,
                  background: theme === 'light' ? '#fff' : '#3d3d3d',
                  color: theme === 'light' ? '#1a1a1a' : '#fff',
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>

            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: theme === 'light' ? '#1a1a1a' : '#fff',
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export { TodoList };
