import { useState } from 'react';
import { ReservationCard } from '../ReservationCard';
import { Container } from './styles';

const getStatusByGuestId = (id: number): string => {
  return 'Active'
};

interface Props {
  dashboardState: any;
}

export const Reservation = (props: Props) => {
  // state hook to make the reservation component refresh
  const [history, setHistory] = useState<string[]>([]);

  const reservations = props.dashboardState.reservations.map(reservation =>
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
      setHistory={setHistory}
    />)
  return (
    <Container>
      {reservations}
    </Container>
  );
};