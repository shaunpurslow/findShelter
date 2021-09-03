import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 87%;
  max-width: 600px;
  border-radius: 15px;
  background-color: var(--medium);
  padding: 1.5rem;
  box-shadow: 5px 5px var(--medium-dark);
`;

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
  width: 100%;
  &:hover {
    filter: brightness(0.9);
    background-color: #87bf63;
  }
`;
