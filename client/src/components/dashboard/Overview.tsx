import '../../styles/dashboard/Main.scss';

interface Props {
  capacity: string;
}

const Overview = (props: Props) => {
  return (
    <div className='overview-cards'>
      <div>
        <header>CAPACITY</header>
        <strong>{props.capacity}</strong>
      </div>
      <div>
        <header>QUEUE</header>
        <strong>3</strong>
      </div>
      <div>
        <header>BEDS FILLED</header>
        <strong>53</strong>
      </div>
      <div>
        <header>BEDS REMAINING</header>
        <strong>44</strong>
      </div>
    </div>
  );
};

export default Overview;