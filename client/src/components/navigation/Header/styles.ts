import styled from 'styled-components';

export const Head = styled.header`
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: var(--box-shadow);
  margin-bottom: 3rem;

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
  font-size: 0.8rem;
  color: var(--dark-grey);
  padding: 0.5rem;
  border: none;
  background: none;

  &:hover {
    background-color: var(--dark);
    color: var(--light);
    font-weight: bold;
    padding: 0.5rem;
    transition: 0.4s;
    border-radius: 2rem;
  }
`