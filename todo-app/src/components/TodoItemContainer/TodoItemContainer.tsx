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
  children: React.ReactNode;
}

const TodoItemContainer = ({ children }: Props) => {
  const { theme } = useTheme();

  return <StyledContainer theme={theme}>{children}</StyledContainer>;
};

export { TodoItemContainer };
