import '../../styles/dashboard/Main.scss';
import React, { useState, useEffect } from 'react';
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
}

const ReservationCard = (props: Props) => {
  const [confirmStatus, setConfirmStatus] = useState({
    is_confirmed: props.is_confirmed,
  });

  const handleConfirmClick = (e) => {
    setConfirmStatus((prev) => ({
      is_confirmed: prev.is_confirmed ? false : true,
    }));
  };

  // REFACTOR: get this to not run on initial render
  useEffect(() => {
    axios
      .put(`http://localhost:8080/reservations/${props.id}`, confirmStatus)
      .then((res) => {
        return axios.get(
          `http://localhost:8080/reservations/search?shelter_id=${res.data[0].shelter_id}`
        );
      })
      .then((res) => {
        localStorage.removeItem('reservationsData');
        localStorage.setItem('reservationsData', JSON.stringify(res.data));
        props.setHistory((prev) => [...prev, 'updated']);
      })
      .catch((e) => console.log(e.message));
  }, [confirmStatus]);

  return (
    <div className='reservation-card'>
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
            <button
              className='confirm-reservation'
              onClick={handleConfirmClick}>
              CONFIRM
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
