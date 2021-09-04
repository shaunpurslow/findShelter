import styled from 'styled-components';

export const Head = styled.header`
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2),
    0 0 0 6px rgba(166, 177, 225, 0.1);

  span {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`

export const Logo = styled.img`
  display: flex;
  align-items: space-between;
  justify-content: space-between;
  max-height: 50px;
`

export const Button = styled.button`
  color: var(--dark);
  padding: 1rem;
  border: none;
  background: none;

  &:hover {
    background-color: var(--dark);
    color: var(--light);
    font-weight: bold;
    padding: 0.5rem;
    transition: 0.4s;
    border-radius: 1rem;
  }
`