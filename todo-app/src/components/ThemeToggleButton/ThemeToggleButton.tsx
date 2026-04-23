import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext';

const StyledButton = styled.button<{ theme: 'light' | 'dark' }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 15px;
  font-size: 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ theme }) =>
    theme === 'light' ? '#ffffff' : '#2d2d2d'};
  color: ${({ theme }) => (theme === 'light' ? '#1a1a1a' : '#ffffff')};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  z-index: 1000;

  &:hover {
    transform: scale(1.05);
  }
`;

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledButton onClick={toggleTheme} theme={theme}>
      {theme === 'light' ? 'dark 🌙' : 'light ☀️'}
    </StyledButton>
  );
};

export { ThemeToggleButton };
