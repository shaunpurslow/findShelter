import styled from 'styled-components';

interface IContainer {
  startQuery: boolean;
}

export const Container = styled.div<IContainer>`
  background-color: white;
  color: var(--dark);
  box-shadow: var(--box-shadow);
  align-items: center;
  flex-direction: column;
  display: ${prop => prop.startQuery ? 'flex' : 'none'};
`