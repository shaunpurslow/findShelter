import '../../styles/dashboard/Main.scss';
import Overview from './Overview';
import Shelter from './Shelter';
import Reservations from './Reservations';
import Guests from './Guests';
import MyShelter from './MyShelter';

// Will display items on the dashboard
const Main = () => {
  return (
    <>
      <Overview />
      <Shelter />
      <Shelter />
      <Guests />
      <Reservations />
      <MyShelter />
    </>
  );
};

export default Main;
