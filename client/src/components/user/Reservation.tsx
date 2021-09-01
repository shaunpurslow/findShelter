import '../../styles/user/Reservation.scss';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const Reservation = () => {
  const [value, setValue] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    emergency_contact: '',
    emergency_phone: ''
  });

  const [reserved, setReserved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8080/reservations/', value)
      .then((res) => {
        setReserved(true);
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
        <label htmlFor='emergency_contact'>Emergency Contact Name</label>
        <input
          name='emergency_contact'
          id='emergency-contact-name'
          value={value.emergency_contact}
          onChange={handleChange}
          type='text'
          placeholder='required'
        />
        <label htmlFor='emergency_phone'>Emergency Contact #</label>
        <input
          name='emergency_phone'
          id='emergency-contact-num'
          value={value.emergency_phone}
          onChange={handleChange}
          type='email'
          placeholder='required'
        />
        <div>

        </div>
        <div className='reservation__buttons'>
          <button className='reservation__submit__button' type='submit'
            onClick={handleSubmit}>
            Login
          </button>
          <button className='reservation__submit__button'>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default Reservation;
