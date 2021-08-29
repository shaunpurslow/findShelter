import '../../styles/dashboard/Main.scss';
import Overview from './Overview';
import Shelter from './Shelter';
import Reservations from './Reservations';
import Guests from './Guests';
import MyShelter from './MyShelter';


interface Props {
  currentMenu: string;
}

const Main = (props: Props) => {
  switch (props.currentMenu) {
    case 'Overview':
      return (
        <>
          <Overview />
          <Shelter />
        </>
      );
    case 'Find Shelters':
      return (
        <>
          <Shelter />
        </>
      );
    case 'Guests':
      return (
        <>
          <Guests />
        </>
      );
    case 'Reservations':
      return (
        <>
          <Reservations />
        </>
      );
    case 'My Shelter':
      return (
        <>
          <MyShelter />
        </>
      );
    default:
      return (
        <>
          <Overview />
          <Shelter />
        </>
      );
  };
};

export default Main;
