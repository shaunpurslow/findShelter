import { Container } from './styles';
import { Button } from '../StyledComponents/buttons';
import axios from 'axios';

interface Props {
  key: number;
  id: number;
  first_name: string;
  last_name: string;
  emergency_contact: string;
  phone: string | null;
  email: string | null;
  emergency_name: string;
  is_confirmed: boolean;
  status: string;
  reservation_date: string;
  setHistory: any;
  updateDashboardReservations: any;
}

export const ReservationCard = (props: Props) => {
  const handleConfirmClick = (e) => {
    // make put request
    const data = { is_confirmed: props.is_confirmed ? false : true };
    axios
      .put(`http://localhost:8080/reservations/${props.id}`, data)
      .then((res) => {
        return axios.get(
          `http://localhost:8080/reservations/search?shelter_id=${res.data[0].shelter_id}`
        );
      })
      .then((res) => {
        localStorage.removeItem('reservationsData');
        localStorage.setItem('reservationsData', JSON.stringify(res.data));
        // update dashboard state
        props.updateDashboardReservations(res.data);
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <Container>
      <div>
        <span>
          <h2>{props.first_name + ' ' + props.last_name}</h2>
          <em>{props.status}</em>
        </span>
        <span>
          <img src='/img/phone.svg' alt='phone' />
          <p>{props.phone || 'no information'}</p>
        </span>
        <span>
          <img src='/img/email.svg' alt='email' />
          <p>{props.phone || 'no information'}</p>
        </span>
        <span>
          <img src='/img/emergency.svg' alt='emergency contact' />
          <p>
            <strong>{props.emergency_name}</strong> {props.emergency_contact}
          </p>
        </span>
      </div>
      <div>
        <div>
          <strong>Reservation #{props.id}</strong>
          <p>{props.reservation_date}</p>
        </div>
        <div>
          {props.is_confirmed ? (
            <strong>CONFIRMED</strong>
          ) : (
            <Button onClick={handleConfirmClick}>CONFIRM</Button>
          )}
        </div>
      </div>
    </Container>
  );
};
