import styled from 'styled-components';

export const HeaderContainer = styled.header`
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
`

export const UserInfo = styled.span`
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
  `