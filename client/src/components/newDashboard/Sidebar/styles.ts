import styled from 'styled-components';

export const Aside = styled.aside`
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: column;
height: 100vh;
  margin: 0;
  width: 350px;
  background-color: var(--dark);
  color: var(--light);

  @media only screen and (max-width: 768px) {
    display: none;
}
`