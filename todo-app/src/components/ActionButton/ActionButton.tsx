import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext';

const StyledButton = styled.button<{
  variant?: 'danger' | 'default';
  theme: 'light' | 'dark';
}>`
  padding: 6px 12px;
  margin-left: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  background: ${({ variant, theme }) => {
    if (variant === 'danger') return '#dc3545';
    return theme === 'light' ? '#e0e0e0' : '#4d4d4d';
  }};

  color: ${({ variant }) => (variant === 'danger' ? '#ffffff' : 'inherit')};

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

interface ActionButtonProps {
  variant?: 'danger' | 'default';
  onClick: () => void;
  children: React.ReactNode;
}

const ActionButton = ({
  variant = 'default',
  onClick,
  children,
}: ActionButtonProps) => {
  const { theme } = useTheme();

  return (
    <StyledButton variant={variant} onClick={onClick} theme={theme}>
      {children}
    </StyledButton>
  );
};

export { ActionButton };
