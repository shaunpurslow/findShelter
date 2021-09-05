import styled from 'styled-components';

interface IProp {
  startQuery: boolean;
}

export const SearchBar = styled.span<IProp>`
      background-color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      padding: 0.5em;
      border-radius: 50px;
      width: 65vw;
      max-height: 2rem;
      box-shadow: ${prop => prop.startQuery ? 'rgba(149, 157, 165, 0.2) 0px -8px 10px 0px' : 'var(--box-shadow)'};

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
`;
