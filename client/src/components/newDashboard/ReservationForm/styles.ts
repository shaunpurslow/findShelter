import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 1rem;

  img {
    width: 100px;
  }

  h2 {
    font-size: 1em;
    color: var(--medium-dark);
    margin-top: 1em;
  }

  @media only screen and (max-width: 768px) {
    img {
      width: 110px;
      margin-right: 2em;
    }

    h2 {
      font-size: .8em;
    }
  }
`

export const Form = styled.form`
display: flex;
  flex-direction: column;
  margin: 0 1.5em;
  font-size: 0.9rem;

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
    height: 2rem;
    background-color: white;
    outline: none;
    border: none;
    border-radius: 7px;
    margin-bottom: 1em;
    padding-left: 1em;
  }

  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin: 0 1em;

    h3 {
      margin-top: 1em;
      margin-bottom: 2em;
    }
  }
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-self: space-between;
  margin-top: 0.5em;

  .reservation__submit__button {
    width: 200px;
    padding: 1em 0.5em;
    background-color: var(--medium-dark);
    color: var(--dark);
    font-weight: bold;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    margin: 0.5rem auto;
  }

  .reservation__submit__button:hover {
  background-color: var(--dark);
  color: var(--light);
  transition: 0.3s;
  }

  @media only screen and (max-width: 768px) {
    margin: 0.8em;
    margin-top: 0.8em;
   
    .reservation__submit__button {
      width: 140px;
      padding: 0.7em 0.2em;
      margin-top: 0.3em;
    }
  }
`