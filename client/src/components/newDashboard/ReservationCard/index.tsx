import { useState, useEffect } from 'react';
import { Container, Actions } from './styles';
import { Button, CancelButton } from '../StyledComponents/buttons';
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
  setDashboardState: any;
  updateDashboardReservations: any;
}

export const ReservationCard = (props: Props) => {
  const handleConfirmClick = (e) => {
    // make put request
    const data = { is_confirmed: props.is_confirmed ? false : true };
  }

export const ReservationCard = (props: Props) => {
  const [confirmStatus, setConfirmStatus] = useState({
    is_confirmed: props.is_confirmed,
  });

  const onConfirm = (e) => {
    setConfirmStatus((prev) => ({
      is_confirmed: prev.is_confirmed ? false : true
    }));
  };

  const onCancel = (e) => {
    setConfirmStatus((prev) => ({
      is_confirmed: prev.is_confirmed ? false : true
    }));
  };

  const onDelete = () => {
    axios
      .delete(`http://localhost:8080/reservations/${props.id}`)
      .then((res) => {
        return axios.get(
          `http://localhost:8080/reservations/search?shelter_id=${res.data[0].shelter_id}`
        );
      })
      .then((res) => {
        const reservationsData = res.data
        props.setDashboardState(prev => ({ ...prev, reservations: reservationsData }))
      })
      .catch((e) => console.log(e.message));
  };

  // REFACTOR: get this to not run on initial render
  useEffect(() => {
    axios
      .put(`http://localhost:8080/reservations/${props.id}`, data)
      .then((res) => {
        return axios.get(
          `http://localhost:8080/reservations/search?shelter_id=${res.data[0].shelter_id}`
        );
      })
      .then((res) => {
        // update dashboard state
        props.updateDashboardReservations(res.data);
        const reservationsData = res.data
        props.setDashboardState(prev => ({ ...prev, reservations: reservationsData }))
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
          {props.is_confirmed ?
            <Actions>
              <strong>CONFIRMED</strong>
              <CancelButton
                onClick={onCancel}>
                CANCEL
              </CancelButton>
            </Actions>
            :
            <Actions>
              <Button
                onClick={onConfirm}>
                CONFIRM
              </Button>
              <CancelButton
                onClick={onDelete}>
                <img src="/img/delete.svg" alt="delete" />
              </CancelButton>
            </Actions>}
        </div>
      </div>
    </Container>
  );
};
