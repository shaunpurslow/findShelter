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
width: 40vw;
display: flex;
justify-content: space-between;
align-items: center;
box-shadow: var(--box-shadow);
`
interface IStyles {
  mode: boolean;
};

export const DivMode = styled.div<IStyles>`
  text-align: center;
  cursor: pointer;
  background-color: ${prop => prop.mode ? 'white' : 'var(--light-grey)'};
  color: ${prop => prop.mode ? 'var(--dark)' : 'var(--dark-grey)'};
  font-weight: ${prop => prop.mode ? '700' : '400'};
  height: 100%;
  padding: 0.3rem 0;

  &:first-child {
    border-top-left-radius: 0.35rem;
  }

  &:last-child {
    border-top-right-radius: 0.35rem;
  }

  &:hover {
    transition: 0.4s;
    font-weight: 700;
  }
`

export const SearchBar = styled.div`
  

  
`;