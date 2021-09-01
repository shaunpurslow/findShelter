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
`

export const UserInfo = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  padding-right: 1em;

  h2 {
    padding: 0 5em;
  }

  img {
    max-width: 1em;
    margin: 0 1em;
    border-radius: 30px;

      &:last-child {
      max-width: 3em;
    }
  }
  `