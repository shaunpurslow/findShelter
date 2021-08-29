import '../../styles/dashboard/Main.scss';
import ReservationCard from './ReservationCard';

const getStatusByGuestId = (id: number): string => {
  return 'Active'
};

const mockData = [{
  id: 1,
  first_name: 'John',
  last_name: 'Fulano',
  emergency_contact: '4032008000',
  phone: null,
  email: null,
  emergency_name: 'Ricardo Gomes',
  is_confirmed: false,
  status: 'ACTIVE',
  reservation_date: '2021-05-20'
},
{
  id: 2,
  first_name: 'Peter',
  last_name: 'Ciclano',
  emergency_contact: '4032008000',
  phone: null,
  email: null,
  emergency_name: 'Shaun Purslow',
  is_confirmed: true,
  status: 'ACTIVE',
  reservation_date: '2021-05-22'
},
{
  id: 22,
  first_name: 'Jane',
  last_name: 'Beltrano',
  emergency_contact: '4032008000',
  phone: null,
  email: null,
  emergency_name: 'Emmanuel Etti',
  is_confirmed: false,
  status: 'ACTIVE',
  reservation_date: '2021-05-23'
}];

const Reservation = () => {
  const reservations = mockData.map(reservation =>
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
    />)
  return (
    <div className="reservations">
      {reservations}
    </div>
  );
};

export default Reservation;