import { useState } from 'react';
import { ReservationCard } from '../ReservationCard';
import { Container, Confirmed, Unconfirmed } from './styles';

const getStatusByGuestId = (id: number): string => {
  return 'Active'
};

interface Props {
  dashboardState: any;
  setDashboardState: any;
}

export const Reservation = (props: Props) => {
  // state hook to make the reservation component refresh
  const confirmed = props.dashboardState.reservations.filter(reservation => reservation.is_confirmed);
  const unconfirmed = props.dashboardState.reservations.filter(reservation => !reservation.is_confirmed);

  const confirmedReservations = confirmed.map(reservation =>
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
      {unconfirmedReservations ?
        <h2>Latest Reservations</h2> :
        <h3>No reservation placed to be confirmed yet</h3>}
      <Unconfirmed>
        {unconfirmedReservations}
      </Unconfirmed>
      {confirmedReservations ?
        <h2>Confirmed Reservations</h2> :
        <h3>No reservation confirmed yet for today</h3>}

      <Confirmed>
        {confirmedReservations}
      </Confirmed>
    </Container>
  );
};