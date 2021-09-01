import '../../styles/user/Reservation.scss';
import { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const Reservation = () => {
  const [selectedDate, handleDateChange] = useState<Date | null>(new Date());
  const [value, setValue] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    emergency_name: '',
    emergency_number: '',
    shelter_id: null,
    reservation_date: '',
  });

  // shelter id passed via redirection from shelter component
  const location: any = useLocation();
  const shelterId = location.state.shelterId || null;
  useEffect(() => {
    setValue((prev) => ({ ...prev, shelter_id: shelterId }));
  }, []);

  console.log(shelterId);

  const [reserved, setReserved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8080/reservations', value)
      .then((res) => {
        setReserved(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    interface IDic {
      [name: string]: string;
      value: string;
    }
    const { name, value }: IDic = e.target;

    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleReservationChange = (e) => {
    setValue((prev) => ({ ...prev, reservation_date: e.target.value }));
  };

  if (reserved) {
    return <Redirect to='/' />;
  }

  return (
    <main className='reservation__container'>
      <div className='reservation__header'>
        <img src='/img/find-shelter.svg' alt='logo' />
        <h2>Reservation</h2>
      </div>

      <form className='reservation-form'>
        <h3>Reservation</h3>

        <label htmlFor='first_name'>First Name</label>
        <input
          name='first_name'
          id='first-name'
          value={value.first_name}
          onChange={handleChange}
          type='text'
          placeholder='required'
        />
        <label htmlFor='last_name'>Last Name</label>
        <input
          name='last_name'
          id='last-name'
          value={value.last_name}
          onChange={handleChange}
          type='text'
          placeholder='required'
        />

        <label htmlFor='phone'>Phone Number</label>
        <input
          name='phone'
          id='phone-number'
          value={value.phone}
          onChange={handleChange}
          type='text'
          placeholder='not required'
        />
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          id='email'
          value={value.email}
          onChange={handleChange}
          type='email'
          placeholder='not required'
        />
        <label htmlFor='emergency_name'>Emergency Contact Name</label>
        <input
          name='emergency_name'
          id='emergency-name'
          value={value.emergency_name}
          onChange={handleChange}
          type='text'
          placeholder='required'
        />
        <label htmlFor='emergency_number'>Emergency Contact #</label>
        <input
          name='emergency_number'
          id='emergency-number'
          value={value.emergency_number}
          onChange={handleChange}
          type='text'
          placeholder='required'
        />
        <div>
          <input
            type='date'
            name='reservationDate'
            id='reservation_date'
            value={value.reservation_date}
            onChange={handleReservationChange}
          />
        </div>
        <div className='reservation__buttons'>
          <button
            className='reservation__submit__button'
            type='submit'
            onClick={handleSubmit}>
            Reserve
          </button>
          <button className='reservation__submit__button'>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default Reservation;
