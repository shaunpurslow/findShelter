import styled from 'styled-components';

export const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: stretch;
    min-width: 420px;
    max-width: 768px;
    box-sizing: border-box;
    font-size: 1.2rem;
    margin: 1rem 0 0 2em;
    background-color: white;
    border-radius: 1rem;
    color: var(--dark);

    div {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;
      padding: 1rem;
      padding-left: 2rem;

      div {
        width: 100%;
        padding: 0;
        padding-right: 1rem;
        align-self: center;
      }
    }

    // icons
    img {
      height: 1.2rem;
      width: 1.2rem;
      margin: 0 0.5rem;
    }

    &:hover {
      box-shadow: 0 2px 5px 5px rgba(77, 79, 115, 0.1);
    }
  `

export const Actions = styled.span`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

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