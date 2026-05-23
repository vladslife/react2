import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext';

const StyledContainer = styled.div<{ theme: 'light' | 'dark' }>`
  min-height: 100vh;
  padding: 20px;
  background-color: ${({ theme }) =>
    theme === 'light' ? '#f0f2f5' : '#1a1a1a'};
  transition: all 0.3s ease;
`;

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer = ({ children }: AppContainerProps) => {
  const { theme } = useTheme();

  return <StyledContainer theme={theme}>{children}</StyledContainer>;
};

export { AppContainer };
