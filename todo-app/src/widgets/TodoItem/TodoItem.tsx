import type { Todo } from '@/types/types';
import { TodoEditForm } from '@/widgets/TodoEditForm';
import { TodoText } from '@/widgets/TodoText';
import { Checkbox } from '@/ui/Checkbox';
import { ActionButton } from '@/ui/ActionButton';
import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext';

const StyledContainer = styled.li<{ theme: 'light' | 'dark' }>`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 15px;
  background: ${({ theme }) => (theme === 'light' ? '#f9f9f9' : '#363636')};
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

interface Props {
  todo: Todo;
  isEditing: boolean;
  onToggle: (id: number) => void;
  onStartEdit: (todo: Todo) => void;
  onSaveEdit: (id: number, newText: string) => void;
  onCancelEdit: () => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({
  todo,
  isEditing,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: Props) => {
  const { theme } = useTheme();

  return (
    <StyledContainer theme={theme}>
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        disabled={isEditing}
      />

      {isEditing ? (
        <TodoEditForm
          initialValue={todo.text}
          onSave={(newText) => onSaveEdit(todo.id, newText)}
          onCancel={onCancelEdit}
        />
      ) : (
        <TodoText completed={todo.completed}>{todo.text}</TodoText>
      )}

      {!isEditing && (
        <>
          <ActionButton onClick={() => onStartEdit(todo)}>
            Редактировать
          </ActionButton>
          <ActionButton variant="danger" onClick={() => onDelete(todo.id)}>
            Удалить
          </ActionButton>
        </>
      )}
    </StyledContainer>
  );
};

export { TodoItem };
