import styled from 'styled-components';

export const Row = styled.tr`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;

  &:hover {
    color: white;
    background-color: var(--dark);
  }
`;
