import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext';

const StyledEmptyMessage = styled.div<{ theme: 'light' | 'dark' }>`
  text-align: center;
  padding: 40px;
  color: ${({ theme }) => (theme === 'light' ? '#888' : '#aaa')};
  font-size: 18px;
`;

interface Props {
  children: React.ReactNode;
}

const EmptyMessage = ({ children }: Props) => {
  const { theme } = useTheme();

  return <StyledEmptyMessage theme={theme}>{children}</StyledEmptyMessage>;
};

export { EmptyMessage };
