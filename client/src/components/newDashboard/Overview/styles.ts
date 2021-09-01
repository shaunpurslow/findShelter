import styled from 'styled-components';

export const Wrapper = styled.div`
@media only screen and (min-width: 767px) {
  margin: 2em;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
@media only screen and (max-width: 768px) {
  width: 90%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 0 auto;
}
`

export const Card = styled.div`
    background: white;
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--dark);

    &:hover {
      box-shadow: 0 2px 5px 5px rgba(77, 79, 115, 0.1);
    }

    header {
      display: flex;
      align-items: center;
      justify-content: center;
      decoration: none;
    }

    strong {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1rem;
      font-size: 4rem;
      font-weight: 600;
      line-height: 3rem;
    }

    &:last-child {
      background-color: var(--dark);
      color: white;
    }

    @media only screen and (max-width: 768px) {
      &:nth-child(3) {
        margin-bottom: 1rem;
      }

      &:nth-child(4) {
        margin-bottom: 1rem;
      }

      &:nth-child(even) {
        margin-right: 0.5rem;
      }

      &:nth-child(odd) {
        margin-left: 0.5rem;
      }
}
`

