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
@media only screen and (min-width: 767px) {
  margin-left: 250px;
  width: 100%;
}
@media only screen and (max-width: 768px) {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
`