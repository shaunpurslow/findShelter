import styled from 'styled-components';

export const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 300px;
    margin: 1.5rem 0;
    border-radius: 0.5rem;
    color: var(--dark);
    box-shadow: var(--box-shadow);

    &:nth-child(odd) {
      margin-right: 2rem;
    }

    // icons
    img {
      height: 1.2rem;
      width: 1.2rem;
      margin: 0 0.5rem;
    }

    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;

      &:first-child {
        width: 100%;
        background-color: var(--light-grey);
        color: var(--dark-grey);
        padding: 1rem;
        -moz-box-shadow:    inset 0 0 10px #000000;
        -webkit-box-shadow: inset 0 0 10px #000000;
        box-shadow:         inset 0 0 10px rgba(149, 157, 165, 0.2);
      }
    }

    &:hover {
      transition: 1s;
      cursor: pointer;
    }
  `

export const Actions = styled.span`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    padding: 1.5rem;

    button {
      padding: 0 1rem;
    }

    img {
      display: flex;
      justify-self: center;
      align-self: center;
      max-height: 1rem;
    }
`