import styled from 'styled-components';

export const Container = styled.div`
  width: 90%;
  margin: 5em auto;
  border-radius: 15px;
  background-color: var(--medium);
  padding: 1.5rem;
  box-shadow: 5px 5px var(--medium-dark);

span {
  display: flex;

  div {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    &:first-child {
      padding-right: 0.8em;
    }

    &:last-child {
      padding-left: 0.8em;
    }
  }
}
`

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 2rem;

  img {
    height: 50px;
  }

  h2 {
    font-size: 1em;
    color: var(--medium-dark);
    margin-top: 1em;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 1.5em;
  flex-wrap: wrap;

  h3 {
    color: var(--medium-dark);
    margin-top: 1em;
    margin-bottom: 1em;
  }

  label {
    margin: 0.3rem 0;
    color: var(--dark);
  }

  input {
    padding-left: 0.5rem;
    font-size: 1rem;
    height: 2rem;
    background-color: (--light);
    outline: none;
    border: none;
    border-radius: 5px;
    margin-bottom: 1em;
  }

  div {
    flex-wrap: wrap;
  }
`

export const Actions = styled.div`
    display: flex;
    justify-content: space-around;
    padding: .8em 0.5em;
    border-radius: 5px;

    button {
      background-color: var(--medium-dark);
      margin: 1rem;
      padding: 0 3rem;
      min-width: 3rem;
      color: var(--dark);
      font-weight: 700;

      &:hover {
        background-color: var(--dark);
        color: white;
      }
    }
`