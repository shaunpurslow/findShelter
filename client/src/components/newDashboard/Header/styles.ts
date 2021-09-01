import styled from 'styled-components';

export const HeaderContainer = styled.header`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
margin: 2em 0;
color: var(--dark);
border: none;

h1 {
  padding-left: 1em;
  font-size: 2rem;
  font-weight: 700;
}

button {
  margin-right: 1em;
}

@media only screen and (max-width: 768px) {
  h1 {
      font-size: 1.5rem;
    }
`

export const UserInfo = styled.span`
@media only screen and (min-width: 767px) {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  padding-right: 1rem;

  h2 {
    padding: 0 5rem;
  }

  img {
    margin: 0 1rem;
    border-radius: 30px;
    width: 3em;
    height: 3em;

    &:first-child {
      max-width: 1.5rem;
    }
  }
}

  @media only screen and (max-width: 768px) {
    h3, img {
      display: none;
    }
  }
  `