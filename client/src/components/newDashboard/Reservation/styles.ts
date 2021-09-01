import styled from 'styled-components';

export const Container = styled.div`
  h2 {
    color: var(--dark);
    text-align: center;

    &:nth-child(3) {
      margin-top: 2rem;
    }
  }
`

export const Confirmed = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    &:last-child {
      margin-bottom: 2rem;
    }
`

export const Unconfirmed = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
`