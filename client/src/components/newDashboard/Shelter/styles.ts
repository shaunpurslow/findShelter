import styled from 'styled-components';

export const Container = styled.div`
  @media only screen and (min-width: 767px) {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    align-self: center;
    padding: 0;
    box-sizing: border-box;
    margin: 2rem;
    background-color: white;
    border-radius: 1rem;
    color: var(--dark);
    box-shadow: var(--box-shadow);

    &:hover {
      transition: 2s linear;
      border: var(--light-grey) 1px solid;
    }
  }

  @media only screen and (max-width: 768px) {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-direction: column;
    padding: 0;
    box-sizing: border-box;
    font-size: 1.2rem;
    background-color: white;
    border-radius: 1rem;
    color: var(--dark);
    width: 90%;
    margin-bottom: 2rem;
    max-height: 90vh;
    box-shadow: var(--box-shadow);

    &:hover {
      transition: 2s linear;
      border: var(--light-grey) 1px solid;
    }
}
`

export const Image = styled.div`
@media only screen and (min-width: 767px) {
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
}

@media only screen and (max-width: 768px) {
  margin: 0;
  box-sizing: border-box;
  max-height: 40px;
  margin-bottom: 3rem;

  img {
    height: 80px;
    width: 100%;
    border-radius: 1rem 1rem 0 0;
    object-fit: cover;
    object-position: center center;
  }
}
`

export const Info = styled.div`
@media only screen and (min-width: 767px) {
  padding: 1rem 0.5rem;
  flex-grow: 1;

  img {
    height: 1.2rem;
    width: 1.2rem;
    margin: 0 0.3rem;
  }
}
@media only screen and (max-width: 768px) {
  padding: 1rem;

  img {
    height: 1.2rem;
    width: 1.2rem;
    margin: 0 0.5rem;
  }
  
  h2 {
    text-align: center;
    }
}
`

export const Filters = styled.span`
flex-wrap: wrap;
  margin: 0.5rem 0;

  img {
    align-self: center;
    height: 1.2rem;
    width: 1.2rem;
    margin-right: 1rem;
  }

  @media only screen and (max-width: 768px) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    &:last-child {
      grid-column: span 2;
    }
  }
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

  @media only screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    span {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-bottom: 0.5rem;
    }

    strong {
      align-self: center;
    }
  }
`

export const Wrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-end;
margin: 1rem 1rem 0 0;

@media only screen and (max-width: 768px) {
  justify-content: space-around;
  margin-bottom: 1rem;
}
`

export const Card = styled.div`
background-color: var(--red);
color: var(--light);
border-radius: 0.5rem;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
padding: 1rem 1rem 0 1rem;

strong {
  font-size: 4rem;
  font-weight: 700;
}
`


