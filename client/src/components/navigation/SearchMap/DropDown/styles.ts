import styled from 'styled-components';

interface IContainer {
  startQuery: boolean;
  activeSearch: boolean;
}

export const Container = styled.div<IContainer>`
  background-color: white;
  color: var(--dark);
  box-shadow: var(--box-shadow);
  align-items: flex-start;
  flex-direction: column;
  display: ${prop => prop.startQuery && !prop.activeSearch ? 'flex' : 'none'};
  padding: 0.5rem 1rem;
  width: 100%;
  border-radius: 0 0 0.5rem 0.5rem;
`