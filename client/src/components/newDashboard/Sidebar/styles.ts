import styled from 'styled-components';

export const Aside = styled.aside`
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  margin: 0;
  min-width: 300px;
  max-width: 10vw;
  background-color: var(--dark);
  color: var(--light);

  @media only screen and (max-width: 768px) {
    width: 50px;
}
`
export const Image = styled.img`
    min-width: 200px;
    max-width: 8vw;
    margin: 2rem;
    margin-top: 3rem;
    margin-bottom: 5rem;
`