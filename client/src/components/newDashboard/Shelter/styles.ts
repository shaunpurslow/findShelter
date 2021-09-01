import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 0;
  box-sizing: border-box;
  font-size: 1.2rem;
  margin: 2rem;
  background-color: white;
  border-radius: 1rem;
  color: var(--dark);
  max-width: 100vw;
  }

  &:hover {
    box-shadow: 0 2px 5px 5px rgba(77, 79, 115, 0.1);
  }
`

export const Image = styled.div`
    margin: 0;
    box-sizing: border-box;
    padding-right: 1rem;
    min-width: 100px;
    max-width: 300px;

img {
  height: 100%;
  width: 100%;
  border-radius: 1rem 0 0 1rem;
  object-fit: cover;
  object-position: center center;
}
`

export const Info = styled.div`
  img {
    height: 1.2rem;
    width: 1.2rem;
    margin: 0 0.5rem;
  }
    padding: 1rem;
    flex-grow: 1;
`

export const Filters = styled.span`
  margin: 0.5rem 0;

  img {
    align-self: center;
    height: 1.2rem;
    width: 1.2rem;
    margin-right: 1rem;
  }
`

export const Details = styled.div`
  margin: 0;

  span {
    margin: 0.2rem 0;

    img {
    margin: 0;
    margin-right: 0.5rem;
    }
  }
`

export const Wrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
`

export const Numbers = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
margin: 1rem 0;
`

export const Card = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 10rem;
margin-bottom: 1rem;
`

export const Actions = styled.div`
  margin: 1rem 0;
display: flex;
justify-content: space-between;
align-items: center;

button {
  margin: 0.5rem 1rem;
}
`


