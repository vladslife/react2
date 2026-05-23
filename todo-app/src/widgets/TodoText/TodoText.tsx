import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext';

const StyledText = styled.span<{
  completed: boolean;
  theme: 'light' | 'dark';
}>`
  flex: 1;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  color: ${({ completed, theme }) => {
    if (completed) return '#888';
    return theme === 'light' ? '#1a1a1a' : '#ffffff';
  }};
  font-size: 16px;

  overflow: hidden;
  text-overflow: ellipsis;
`;

interface Props {
  completed: boolean;
  children: string;
}

const TodoText = ({ completed, children }: Props) => {
  const { theme } = useTheme();

  return (
    <StyledText completed={completed} theme={theme}>
      {children}
    </StyledText>
  );
};

export { TodoText };
