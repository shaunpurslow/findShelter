import format from 'date-fns/format';
import { useEffect } from 'react';
import { ReservationCard } from '../ReservationCard';
import { Container, Confirmed, Unconfirmed, Text, H2, Past } from './styles';
import axios from 'axios';

interface Props {
  dashboardState: any;
  updateDashboardReservations: any;
  setDashboardState: any;
}

export const Reservation = (props: Props) => {
  const currentDate = format(new Date(), 'MMMM do, yyyy');

  useEffect(() => {
    axios.get(
      `http://localhost:8080/reservations/search?shelter_id=${props.dashboardState.user.shelter_id}`
    )
      .then((res) => {
        // update dashboard state
        props.updateDashboardReservations(res.data);
        const reservationsData = res.data;
        props.setDashboardState((prev) => ({
          ...prev,
          reservations: reservationsData,
        }));
      })
      .catch((e) => console.log(e.message));
  }, [])

  const todayReservations = props.dashboardState.reservations.filter(
    (reservation) =>
      currentDate ===
      format(new Date(reservation.reservation_date), 'MMMM do, yyyy')
  );

  const pastReservations = props.dashboardState.reservations.filter(
    (reservation) =>
      currentDate !==
      format(new Date(reservation.reservation_date), 'MMMM do, yyyy')
  );

  const confirmed = todayReservations.filter(
    (reservation) => reservation.is_confirmed
  );
  const unconfirmed = todayReservations.filter(
    (reservation) => !reservation.is_confirmed
  );

  const confirmedReservations = confirmed.map((reservation) => (
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
      reservation_date={format(
        new Date(reservation.reservation_date),
        'MMMM do, yyyy'
      )}
      setDashboardState={props.setDashboardState}
      updateDashboardReservations={props.updateDashboardReservations}
    />
  ));

  const unconfirmedReservations = unconfirmed.map((reservation) => (
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
      reservation_date={format(
        new Date(reservation.reservation_date),
        'MMMM do, yyyy'
      )}
      setDashboardState={props.setDashboardState}
      updateDashboardReservations={props.updateDashboardReservations}
    />
  ));

  const oldReservations = pastReservations.map((reservation) => (
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
      reservation_date={format(
        new Date(reservation.reservation_date),
        'MMMM do, yyyy'
      )}
      setDashboardState={props.setDashboardState}
      updateDashboardReservations={props.updateDashboardReservations}
    />
  ));

  return (
    <Container>
      {unconfirmedReservations.length > 0 ? (
        <H2>Latest Reservations {currentDate}</H2>
      ) : (
        <Text>No reservation placed in {currentDate} to be confirmed yet</Text>
      )}

      <Unconfirmed>{unconfirmedReservations}</Unconfirmed>

      {confirmedReservations.length > 0 ? (
        <H2>Confirmed Reservations for {currentDate}</H2>
      ) : (
        <Text>No reservation confirmed for {currentDate} yet</Text>
      )}

      <Confirmed>{confirmedReservations}</Confirmed>

      <H2>Past Reservations</H2>
      <Past>{oldReservations}</Past>
    </Container>
  );
};
