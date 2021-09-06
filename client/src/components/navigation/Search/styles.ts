import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const SearchBar = styled.span`
      background-color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      padding: 0.5em;
      border-radius: 50px;
      width: 65vw;
      max-height: 2rem;
      box-shadow: var(--box-shadow);

      position: relative;
    }

    .icon {
      color: var(--dark);

      &:hover {
        color: var(--medium-dark);
        cursor: pointer;
        transition: 0.3s;
      }
    }

    input {
      border: none;
      flex-grow: 1;
      color: var(--dark);
      font-size: .8em;
      font-weight: bold;
      padding-left: 1rem;

      &:focus {
        outline: none;
      }
    }
`

export const Filter = styled.span`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  flex-wrap: wrap;

  @media only screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    align-self: center;
    padding: 1rem 0;
    // Last two filters need to be position better
    /* grid-column: span 2; */
  }
`

export const Checkbox = styled.span`
  color: var(--dark) !important;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;

  &:hover {
    box-shadow: var(--box-shadow);
    border-radius: 2rem;
  }

  input {
    margin-right: 0.35rem;
  }

  @media only screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 0;

    &:nth-child(4) {
      grid-column: span 1;
    }

    &:nth-child(5) {
      grid-column: span 2;
    }
  }
`

interface IResults {
  startQuery: boolean;
}

export const Results = styled.div<IResults>`
    margin-top: 1rem;
  display: flex;
  flex-direction: column;
  display: ${prop => prop.startQuery ? 'flex' : 'none'};
  overflow: scroll;
  /* transform: translateY(0); */
`

export const Main = styled.div`
margin: 0 auto;
`