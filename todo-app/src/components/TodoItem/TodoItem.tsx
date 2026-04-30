import type { Todo } from '@/types/types';
import { TodoEditForm } from '@/components/TodoEditForm';
import { TodoText } from '@/components/TodoText';
import { Checkbox } from '@/components/Checkbox';
import { ActionButton } from '@/components/ActionButton';
import { TodoItemContainer } from '@/components/TodoItemContainer';

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
  return (
    <TodoItemContainer>
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
    </TodoItemContainer>
  );
};

export { TodoItem };
