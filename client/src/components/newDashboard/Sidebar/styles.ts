import styled from 'styled-components';

export const Aside = styled.aside`
@media only screen and (min-width: 767px) {
  position: fixed;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  margin: 0;
  width: 250px;
  background-color: var(--dark);
  color: var(--light);
}

  @media only screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0;
    top: 0;
    width: 100%;
    background-color: var(--dark);
    height: 75px;
}
`
export const Image = styled.img`
    @media only screen and (min-width: 767px) {
      width: 180px;
      margin: 2rem;
      margin-top: 3rem;
      margin-bottom: 5rem;
    }

    @media only screen and (max-width: 768px) {
      justify-self: center;
      align-self: center;
      width: 35px;
      margin: 1rem;
      content:url('/img/shelter.svg');
    }
`