import { Wrapper, Card } from './styles';

interface Props {
  capacity: string;
}

export const Overview = (props: Props) => {
  return (
    <Wrapper>
      <Card>
        <header>CAPACITY</header>
        <strong>{props.capacity}</strong>
      </Card>
      <Card>
        <header>QUEUE</header>
        <strong>3</strong>
      </Card>
      <Card>
        <header>BEDS FILLED</header>
        <strong>53</strong>
      </Card>
      <Card>
        <header>BEDS REMAINING</header>
        <strong>44</strong>
      </Card>
    </Wrapper>
  );
};