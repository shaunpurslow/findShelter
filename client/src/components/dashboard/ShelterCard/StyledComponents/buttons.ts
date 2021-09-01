import styled from 'styled-components';

export const Button = styled.button`
      background-color: --dark;
      color: white;
      font-size: 1rem;
      border: 0;
      padding: 0 2rem;
      decoration: none;
      border-radius: 0.25rem;
      height: 2rem;
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
        background-color: #87bf63;
      }

`