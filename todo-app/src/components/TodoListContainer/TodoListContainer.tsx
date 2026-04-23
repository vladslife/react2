import styled from 'styled-components';

const StyledTodoListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

interface Props {
  children: React.ReactNode;
}

const TodoListContainer = ({ children }: Props) => {
  return <StyledTodoListContainer>{children}</StyledTodoListContainer>;
};

export { TodoListContainer };
