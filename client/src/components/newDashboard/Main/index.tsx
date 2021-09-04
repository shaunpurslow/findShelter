import { Overview } from '../Overview';
import Shelter from '../Shelter';
import { Reservation } from '../Reservation';
import { Guests } from '../Guests';
import { MyShelter } from '../MyShelter';

interface Props {
  currentMenu: string;
  capacity: string;
  dashboardState: any;
  updateDashboardReservations: any;
  setDashboardState: any;
}

export const Main = (props: Props) => {
  const shelter = props.dashboardState.shelters.map((shelter) => (
    <Shelter
      id={shelter.id}
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
      confirmedReservations={shelter.confirmed_reservations}
      unconfirmedReservations={shelter.not_confirmed_reservations}
    />
  ));
  switch (props.currentMenu) {
    case 'Overview':
      return (
        <>
          <Overview
            capacity={props.dashboardState.myShelter[0]?.capacity}
            confirmedReservations={
              props.dashboardState?.myShelter[0]?.confirmed_reservations}
            unconfirmedReservations={
              props.dashboardState?.myShelter[0]?.not_confirmed_reservations}
            dashboardState={props.dashboardState}
            setDashboardState={props.setDashboardState}
            id={props.dashboardState?.myShelter[0]?.id}
          />
          {shelter}
        </>
      );
    case 'Find Shelters':
      return <>
        sheltersLoaded={props.dashboardState.shelters}
        setDashboardState={props.setDashboardState}
        {shelter}
      </>;
    case 'Guests':
      return (
        <>
          <Guests 
          shelter_id={props.dashboardState.user.shelter_id}
          />
        </>
      );
    case 'Reservations':
      return (
        <>
          <Reservation
            dashboardState={props.dashboardState}
            updateDashboardReservations={props.updateDashboardReservations}
            setDashboardState={props.setDashboardState}
          />
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
          <Overview
            capacity={props.capacity}
            confirmedReservations={
              props.dashboardState?.myShelter[0]?.confirmed_reservations
            }
            unconfirmedReservations={
              props.dashboardState?.myShelter[0]?.not_confirmed_reservations
            }
            dashboardState={props.dashboardState}
            setDashboardState={props.setDashboardState}
            id={props.dashboardState?.myShelter[0]?.id}
          />
          {shelter}
        </>
      );
  }
};
