import styled from 'styled-components';

export const List = styled.li`
@media only screen and (min-width: 767px) {
    display: flex;
    width: 100%;
    padding: 1rem 0 1rem 1.5rem;
    list-style: none;

    h2 {
      font-size: 1.2rem;
    }

    img {
      margin-right: 1.5em;
      max-width: 1.5em;
      max-height: 1.5em;
    }

    &:hover {
      opacity: 0.75;
      background-color: var(--more-dark);
    }
  }

    @media only screen and (max-width: 768px) {
      display: flex;
      justify-content: center;
      align-items: center;
      list-style: none;

    img {
      max-width: 1.5em;
      max-height: 1.5em;
    }

    &:hover {
      opacity: 0.75;
      background-color: var(--more-dark);
    }

      h2 {
        display: none;
      }
    }
`

export const ListSelected = styled.li`
@media only screen and (min-width: 767px) {
  display: flex;
  width: 100%;
  padding: 1rem 0 1rem 1.5rem;
  background-color: var(--more-dark);
  color: var(--medium);
  -moz-box-shadow: inset 0 0 0.2em #000000;
  -webkit-box-shadow: inset 0 0 0.2em #000000;
  box-shadow: inset 0 0 0.2em #000000;
  color: white;
  list-style: none;

  h2 {
      font-size: 1.2rem;
    }

  img {
    color: white;
    max-width: 1.5em;
    max-height: 1.5em;
    margin-right: 1.5em;
  }

  &:hover {
    opacity: 0.8;
  }
    }

  @media only screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--more-dark);
    color: var(--medium);
    padding: 0;
    -moz-box-shadow: inset 0 0 0.2em #000000;
    -webkit-box-shadow: inset 0 0 0.2em #000000;
    box-shadow: inset 0 0 0.2em #000000;
    color: white;
    list-style: none;

  img {
    color: white;
    max-width: 1.5em;
    max-height: 1.5em;
    margin-right: 1.5em;
    margin: 0;
  }

  &:hover {
    opacity: 0.8;
  }

  h2 {
      display: none;
    }
    }
`

