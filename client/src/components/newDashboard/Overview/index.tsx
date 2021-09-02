import { Wrapper, Card } from './styles';

interface Props {
  capacity: string;
  confirmedReservations: any;
}
export const Overview = (props: Props) => {
  const numBedsLeft =
    Number(props.capacity) - Number(props.confirmedReservations);
  return (
    <Wrapper>
      <Card>
        <header>CAPACITY</header>
        <strong>{props.capacity}</strong>
      </Card>
      <Card>
        <header>QUEUE</header>
        <strong>??</strong>
      </Card>
      <Card>
        <header>BEDS FILLED</header>
        <strong>{props.confirmedReservations}</strong>
      </Card>
      <Card>
        <header>BEDS LEFT</header>
        <strong>{numBedsLeft}</strong>
      </Card>
    </Wrapper>
  );
};
