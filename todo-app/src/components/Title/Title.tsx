import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext';

const StyledTitle = styled.h1<{ theme: 'light' | 'dark' }>`
  text-align: center;
  color: ${({ theme }) => (theme === 'light' ? '#1a1a1a' : '#fff')};
  margin-top: 30px;
  margin-bottom: 30px;
`;

interface Props {
  children: React.ReactNode;
}

const Title = ({ children }: Props) => {
  const { theme } = useTheme();

  return <StyledTitle theme={theme}>{children}</StyledTitle>;
};

export { Title };
