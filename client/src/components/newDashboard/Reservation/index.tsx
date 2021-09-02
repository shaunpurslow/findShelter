import { useState } from 'react';
import { ReservationCard } from '../ReservationCard';
import { Container, Confirmed, Unconfirmed, Text, H2 } from './styles';

interface Props {
  dashboardState: any;
  updateDashboardReservations: any;
  setDashboardState: any;
}

export const Reservation = (props: Props) => {
  // state hook to make the reservation component refresh
  const confirmed = props.dashboardState.reservations.filter(reservation => reservation.is_confirmed);
  const unconfirmed = props.dashboardState.reservations.filter(reservation => !reservation.is_confirmed);

        // feature/real-time-socket
//   const reservations = props.dashboardState.reservations.map((reservation) => (
//      <ReservationCard
//       key={reservation.id}
//       id={reservation.id}
//       first_name={reservation.first_name}
//       last_name={reservation.last_name}
//       emergency_contact={reservation.emergency_contact}
//       phone={reservation.phone}
//       email={reservation.email}
//       emergency_name={reservation.emergency_name}
//       is_confirmed={reservation.is_confirmed}
//       status={reservation.status}
//       reservation_date={reservation.reservation_date}
//        setHistory={setHistory}
//       updateDashboardReservations={props.updateDashboardReservations}
//     />
//   ));
//   return <Container>{reservations}</Container>;
// };

  const confirmedReservations = confirmed.map(reservation => (
    <ReservationCard
      key={reservation.id}
      id={reservation.id}
      first_name={reservation.first_name}
      last_name={reservation.last_name}
      emergency_contact={reservation.emergency_contact}
      phone={reservation.phone}
      email={reservation.email}
      emergency_name={reservation.emergency_name}
      is_confirmed={reservation.is_confirmed}
      status={reservation.status}
      reservation_date={reservation.reservation_date}
      setDashboardState={props.setDashboardState}
    />)

  const unconfirmedReservations = unconfirmed.map(reservation =>
    <ReservationCard
      key={reservation.id}
      id={reservation.id}
      first_name={reservation.first_name}
      last_name={reservation.last_name}
      emergency_contact={reservation.emergency_contact}
      phone={reservation.phone}
      email={reservation.email}
      emergency_name={reservation.emergency_name}
      is_confirmed={reservation.is_confirmed}
      status={reservation.status}
      reservation_date={reservation.reservation_date}
      setDashboardState={props.setDashboardState}
    />)
  return (
    <Container>
      {unconfirmedReservations.length > 0 ?
        <H2>Latest Reservations</H2> :
        <Text>No reservation placed to be confirmed yet</Text>}
      <Unconfirmed>
        {unconfirmedReservations}
      </Unconfirmed>
      {confirmedReservations.length > 0 ?
        <H2>Confirmed Reservations</H2> :
        <Text>No reservation confirmed yet for today</Text>}

      <Confirmed>
        {confirmedReservations}
      </Confirmed>
    </Container>
  );
};
