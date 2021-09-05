import styled from 'styled-components';

export const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 100%;
height: 100%;
`
export const Menu = styled.span`
width: 55vw;
display: flex;
justify-content: space-between;
align-items: center;

`
interface IStyles {
  mode: boolean;
};

export const DivMode = styled.div<IStyles>`
  text-align: center;
  cursor: pointer;
  background-color: ${prop => prop.mode ? 'white' : 'rgba(0, 0, 0, 0.1)'};
  color: ${prop => prop.mode ? 'var(--dark)' : 'grey'};
  box-shadow: var(--box-shadow);

  &:first-child {
    border-top-left-radius: 0.35rem;
  }

  &:last-child {
    border-top-right-radius: 0.35rem;
  }
`

export const SearchBar = styled.div`
  

  
`;