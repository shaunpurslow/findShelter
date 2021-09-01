import { useState } from 'react';
import '../../styles/dashboard/Main.scss';
import ReservationCard from './ReservationCard';

const Reservation = () => {
  // state hook to make the reservation component refresh
  const [history, setHistory] = useState<string[]>([]);

  const shelterReservationData: any | null =
    localStorage.getItem('reservationsData') || [];
  const parsedReservationsData = JSON.parse(shelterReservationData);

  const reservations = parsedReservationsData.map((reservation) => {
    return (
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
      />
    );
  });
  return <div className='reservations'>{reservations}</div>;
};

export default Reservation;
