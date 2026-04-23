import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const StyledInput = styled.input<{ theme: 'light' | 'dark' }>`
  flex: 1;
  margin-right: 8px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => (theme === 'light' ? '#ddd' : '#555')};
  background: ${({ theme }) => (theme === 'light' ? '#fff' : '#3d3d3d')};
  color: ${({ theme }) => (theme === 'light' ? '#1a1a1a' : '#fff')};

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SaveButton = styled.button<{ theme: 'light' | 'dark' }>`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: ${({ theme }) => (theme === 'light' ? '#007bff' : '#0056b3')};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

const CancelButton = styled.button<{ theme: 'light' | 'dark' }>`
  padding: 6px 12px;
  margin-left: 4px;
  border-radius: 6px;
  cuursor: pointer;
  background: ${({ theme }) => (theme === 'light' ? '#e0e0e0' : '#4d4d4d')};
  color: ${({ theme }) => (theme === 'light' ? '#1a1a1a' : '#fff')};

  &:hover {
    opacity: 0.9;
  }
`;

const ErrorText = styled.p<{ theme: 'light' | 'dark' }>`
  color: 'red';
  margin-top: 5px;
  font-size: 12px;
`;

interface Props {
  initialValue: string;
  onSave: (newValue: string) => void;
  onCancel: () => void;
}

const TodoEditForm = ({ initialValue, onSave, onCancel }: Props) => {
  const { theme } = useTheme();
  const [editValue, setEditValue] = useState(initialValue);
  const [error, setError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSave = () => {
    const trimmedValue = editValue.trim();

    if (trimmedValue === '') {
      setError('Поле не может быть пустым');
      return;
    }

    onSave(trimmedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
    if (error) setError('');
  };

  return (
    <Container>
      <InputWrapper>
        <StyledInput
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          theme={theme}
        />
        <SaveButton onClick={handleSave} theme={theme}>
          Сохранить
        </SaveButton>
        <CancelButton onClick={onCancel} theme={theme}>
          Отмена
        </CancelButton>
      </InputWrapper>
      {error && <ErrorText theme={theme}>{error}</ErrorText>}
    </Container>
  );
};

export { TodoEditForm };
