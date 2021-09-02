import styled from 'styled-components';

export const Container = styled.div`

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

export const H2 = styled.h2`
  color: var(--dark);
  text-align: left;
  margin: 1rem 1rem 0 2rem;
`
export const Text = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
  color: var(--medium-dark);
  text-align: left;
  margin: 1rem 1rem 0 2rem;

  &:first-child {
      margin-bottom: 2rem;
    }
`

export const Past = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    
    button {
      display: none;
    }

    &:last-child {
      margin-bottom: 2rem;
    }
`