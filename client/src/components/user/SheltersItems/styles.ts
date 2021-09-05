import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 768px) {
    margin-top: 1rem;
  };

  & > div {
    box-shadow: var(--box-shadow);
  }
`