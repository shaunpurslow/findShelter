import styled from 'styled-components';

export const SearchBar = styled.span`
      background-color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      padding: 0.5em;
      border-radius: 50px;
      width: 250px;
      max-height: 2rem;
      box-shadow: var(--box-shadow);
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