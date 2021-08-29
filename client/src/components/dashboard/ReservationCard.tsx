import '../../styles/dashboard/Main.scss';

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
}

const ReservationCard = (props: Props) => {
  return (
    <div className="reservation-card">
      <div>
        <span>
          <h2>{props.first_name + ' ' + props.last_name}</h2>
          <em>{props.status}</em>
        </span>
        <span>
          <img src='/img/phone.svg' alt="phone" />
          <p>{props.phone || 'no information'}</p>
        </span>
        <span>
          <img src='/img/email.svg' alt="email" />
          <p>{props.phone || 'no information'}</p>
        </span>
        <span>
          <img src='/img/emergency.svg' alt="emergency contact" />
          <p><strong>{props.emergency_name}</strong> {props.emergency_contact}</p>
        </span>
      </div>
      <div>
        <div>
          <strong>Reservation #{props.id}</strong>
          <p>{props.reservation_date}</p>
        </div>
        <div>
          {props.is_confirmed ?
            <strong>CONFIRMED</strong>
            : <button
              className='confirm-reservation'>
              CONFIRM
            </button>}
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;