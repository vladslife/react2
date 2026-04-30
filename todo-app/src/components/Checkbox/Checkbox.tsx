import styled from 'styled-components';

const StyledCheckbox = styled.input`
  margin-right: 12px;
  width: 20px;
  height: 20px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

interface Props {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

const Checkbox = ({ checked, onChange, disabled = false }: Props) => {
  return (
    <StyledCheckbox
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export { Checkbox };
