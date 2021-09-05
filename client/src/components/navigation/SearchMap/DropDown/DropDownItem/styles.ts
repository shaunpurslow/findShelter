import styled from 'styled-components';

export const Item = styled.li`
  list-style: none;
  color: rgb(68, 68, 68);
  width: 100%;
  cursor: pointer;
  padding: 0.2rem;
  
  &:hover{
    /* background-color: #D1D1D1; */
    color: var(--dark);
    font-weight: 700;
    transition: 0.2s;
  }
`