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
      width: 65vw;
      max-height: 2rem;
      box-shadow: ${prop => prop.startQuery ? 'rgba(149, 157, 165, 0.2) 0px -10px 20px 0px' : 'var(--box-shadow)'};
      border-radius: ${prop => prop.startQuery ? '1rem 1rem 0 0' : '5rem'};

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
      padding-left: 0.5rem;
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
