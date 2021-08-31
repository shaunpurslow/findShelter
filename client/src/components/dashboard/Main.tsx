import '../../styles/dashboard/Main.scss';
import Overview from './Overview';
import Shelter from './Shelter';
import Reservations from './Reservations';
import Guests from './Guests';
import MyShelter from './MyShelter';
import useShelters from '../../hooks/useShelters';


interface Props {
  currentMenu: string;
  capacity: string;
}

const Main = (props: Props) => {
  const [shelters, setShelters] = useShelters();

  const shelter = shelters.map(shelter =>
    <Shelter
      key={shelter.id}
      name={shelter.name}
      street_address={shelter.street_address}
      city={shelter.city}
      province={shelter.province}
      postal_code={shelter.postal_code}
      country={shelter.country}
      phone={shelter.phone}
      email={shelter.email}
      thumbnail_url={shelter.thumbnail_url}
      website_url={shelter.website_url}
      capacity={shelter.capacity}
      couples={shelter.couples}
      female_only={shelter.female_only}
      male_only={shelter.male_only}
      family={shelter.family}
      pets={shelter.pets}
    />
  )

  switch (props.currentMenu) {
    case 'Overview':
      return (
        <>
          <Overview capacity={props.capacity} />
          {shelter}
        </>
      );
    case 'Find Shelters':
      return (
        <>
          {shelter}
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
          <Overview capacity={props.capacity} />
          {shelter}
        </>
      );
  };
};

export default Main;
