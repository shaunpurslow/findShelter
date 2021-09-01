import styled from 'styled-components';

export const Container = styled.div`
display: flex;
justify-content: flex-start;
width: 100%;

@media only screen and (max-width: 768px) {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
`

export const MainContainer = styled.main`
width: 100%;
@media only screen and (max-width: 768px) {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
`