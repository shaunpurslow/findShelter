import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
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
      margin-left: 0.5em;
      font-size: .8em;
      font-weight: bold;

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
`

interface IResults {
  startQuery: boolean;
}

export const Results = styled.div<IResults>`
  display: flex;
  align-items: center;
  flex-direction: column;
  display: ${prop => prop.startQuery ? 'flex' : 'none'};
  /* overflow: scroll;
  transform: translateY(0);
  transition: transform 5s ease-in-out;  // not working */
  /* transform: translateY(2000px); */
`

export const Main = styled.div`
margin: 0 auto;
`