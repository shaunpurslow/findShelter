import styled from 'styled-components';

export const Container = styled.div`
  width: 90%;
  overflow-y: auto;
  color: var(--dark);
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 0 2px 5px 5px rgba(77, 79, 115, 0.1);
`;

export const Table = styled.table`
  width: 100%;

  tr {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;

    &:hover {
      background-color: var(--dark);
      color: var(--light);
    }
  }
`;
