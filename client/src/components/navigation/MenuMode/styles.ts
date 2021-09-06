import styled from 'styled-components';

interface IProp {
  activeSearch: boolean;
}

export const Wrapper = styled.main<IProp>`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 100%;

position: absolute; 
top: ${prop => prop.activeSearch ? '20vh' : '50%'}; 
left: 50%;
transform: translate(-50%, -50%);

& > div {
  align-items: center;

  &:last-child {
    align-items: center;
    max-height: 60vh;
  }
}
`
export const Menu = styled.span`
width: 40vw;
display: flex;
justify-content: space-between;
align-items: center;
box-shadow: var(--box-shadow);

@media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
  }
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