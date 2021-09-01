import styled from 'styled-components';

export const Logo = styled.img`
      margin: 0;
      padding: 0;
      border: 0;
      min-height: 2rem;
      transition: filter 0.2s;

      &:hover {
        filter: grayscale(80%);
      }
`