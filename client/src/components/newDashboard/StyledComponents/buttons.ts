import styled from 'styled-components';

export const Button = styled.button`
      background-color: var(--dark);
      color: white;
      font-size: 1rem;
      border: 0;
      padding: 0 2rem;
      decoration: none;
      border-radius: 0.25rem;
      min-height: 2rem;
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
        background-color: #87bf63;
      }
`

export const CancelButton = styled.button`
      background-color: var(--red);
      color: white;
      font-size: 1rem;
      border: 0;
      padding: 0 2rem;
      decoration: none;
      border-radius: 0.25rem;
      min-height: 2rem;
      transition: filter 0.2s;

      &:hover {
        background-color: var(--red);
        filter: contrast(150%);
      }
`