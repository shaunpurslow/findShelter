import '../../styles/user/Reservation.scss';


const Reservation = () => {

  

  return (
    <main className='reservation__container'>
      <div className='reservation__header'>
        <img src='/img/find-shelter.svg' alt='logo' />
        <h2>Reservation</h2>
      </div>

      <form className='reservation-form'>
        <h3>Reservation</h3>

        <label htmlFor='firstName'>First Name</label>
        <input
          name='firstName'
          id='first-name'
          // value={formValues.shelterName}
          // onChange={handleChange}
          type='text'
          placeholder='required'
        />
        <label htmlFor='lastName'>Last Name</label>
        <input
          name='lastName'
          id='last-name'
          // value={formValues.shelterName}
          // onChange={handleChange}
          type='text'
          placeholder='required'
        />

        <label htmlFor='phoneNumber'>Phone Number</label>
        <input
          name='phoneNumber'
          id='phone-number'
          // value={formValues.streetAddress}
          // onChange={handleChange}
          type='text'
          placeholder='not required'
        />
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          id='email'
          // value={formValues.streetAddress}
          // onChange={handleChange}
          type='email'
          placeholder='not required'
        />
        <label htmlFor='emergencyContactName'>Emergency Contact Name</label>
        <input
          name='emergencyContactName'
          id='emergency-contact-name'
          // value={formValues.streetAddress}
          // onChange={handleChange}
          type='text'
          placeholder='required'
        />
        <label htmlFor='emergencyContactNum'>Emergency Contact #</label>
        <input
          name='emergencyContactNum'
          id='emergency-contact-num'
          // value={formValues.streetAddress}
          // onChange={handleChange}
          type='email'
          placeholder='required'
        />
        <div>
     
        </div>
        <div className='reservation__buttons'>
          <button className='reservation__submit__button' type='submit'>
            Login
          </button>
          <button className='reservation__submit__button'>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default Reservation;
