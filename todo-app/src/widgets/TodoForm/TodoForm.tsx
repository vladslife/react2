import { useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { useTheme } from '@/context/ThemeContext';
import styled from 'styled-components';
import { useAppDispatch } from '@/store/hooks';
import { createTodoThunk } from '@/store/slices/todoSlice';

const Form = styled.form`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Input = styled.input<{ theme: 'light' | 'dark' }>`
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => (theme === 'light' ? '#ddd' : '#555')};
  background: ${({ theme }) => (theme === 'light' ? '#fff' : '#3d3d3d')};
  color: ${({ theme }) => (theme === 'light' ? '#1a1a1a' : '#fff')};

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const AddButton = styled.button<{ theme: 'light' | 'dark' }>`
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: ${({ theme }) => (theme === 'light' ? '#007bff' : '#0056b3')};
  color: white;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

const ErrorMessage = styled.p<{ theme: 'light' | 'dark' }>`
  color: #dc3545;
  margin-top: 5px;
  font-size: 14px;
`;

const TodoForm = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      setError('Поле не может быть пустым');
      return;
    }

    dispatch(createTodoThunk(inputValue.trim()));
    setInputValue('');
    setError('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Текст задачи..."
        theme={theme}
      />
      <AddButton type="submit" theme={theme}>
        Добавить
      </AddButton>
      {error && <ErrorMessage theme={theme}>{error}</ErrorMessage>}
    </Form>
  );
};

export { TodoForm };
