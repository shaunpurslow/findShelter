import { useState } from 'react';
import '../styles/Register.scss';

const Register = () => {
  const [formValues, setFormValues] = useState({
    shelterName: '',
    capacity: '',
    streetAddress: '',
    city: '',
    province: '',
    postalCode: '',
    country: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  // TODO: move to a helper function folder and import into this file
  const validateInputs = () => {
    const errors = [];
    // validate inputs
    // password
    if (formValues.password !== formValues.passwordConfirmation) {
      errors.push('email doesnt match');
      console.log('emails dont match');
      //TODO: toggle error warning on the front end
      return false;
    }

    // email
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const emailRegEx =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegEx.test(formValues.email)) {
      console.log('bad email');
      return false;
    }

    // postal code
    // only supports canadian postal codes
    // https://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function
    const postalCodeRegEx =
      /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
    if (!postalCodeRegEx.test(formValues.postalCode)) {
      console.log('bad postal code');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputsNotCorrect = !validateInputs();
    if (inputsNotCorrect) {
      return;
    }
    // send info to db
    console.log('SUCCESS');
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <main className='register__container'>
      <div className='register__header'>
        <img src='/img/find-shelter.png' alt='logo' />
        <h2>Register</h2>
      </div>

      <form onSubmit={handleSubmit} className='registration-form'>
        <h3>Shelter Details</h3>
        <label htmlFor='shelter-name'>Shelter Name</label>
        <input
          name='shelter-name'
          id='shelterName'
          value={formValues.shelterName}
          onChange={handleChange}
          type='text'
        />

        <label htmlFor='capacity'>Number of Beds</label>
        <input
          name='capacity'
          id='capacity'
          value={formValues.capacity}
          onChange={handleChange}
          type='number'
          min='1'
          max='100'
          step='1'
        />

        <label htmlFor='street-address'>Street Address</label>
        <input
          name='street-address'
          id='streetAddress'
          value={formValues.streetAddress}
          onChange={handleChange}
          type='text'
        />

        <label htmlFor='city'>City</label>
        <input
          name='city'
          id='city'
          value={formValues.city}
          onChange={handleChange}
          type='text'
        />

        <label htmlFor='province'>Province</label>
        <input
          name='province'
          id='province'
          value={formValues.province}
          onChange={handleChange}
          type='text'
        />

        <label htmlFor='postal-code'>postal Code</label>
        <input
          name='postal-code'
          id='postalCode'
          value={formValues.postalCode}
          onChange={handleChange}
          type='text'
        />

        <label htmlFor='country'>Country</label>
        <input
          name='country'
          id='country'
          value={formValues.country}
          onChange={handleChange}
          type='text'
        />

        <h3>Staff Details</h3>
        <label htmlFor='first_name'>First Name</label>
        <input
          name='first-name'
          id='firstName'
          value={formValues.firstName}
          onChange={handleChange}
          type='text'
        />

        <label htmlFor='last_name'>Last Name</label>
        <input
          name='last-name'
          id='lastName'
          value={formValues.lastName}
          onChange={handleChange}
          type='text'
        />

        <label htmlFor='email'>Email</label>
        <input
          name='email'
          id='email'
          value={formValues.email}
          onChange={handleChange}
          type='text'
        />

        <label htmlFor='password'>Password</label>
        <input
          name='password'
          id='password'
          value={formValues.password}
          onChange={handleChange}
          type='text'
        />

        <label htmlFor='password-confirmation'>Password Confirmation</label>
        <input
          name='password-confirmation'
          id='passwordConfirmation'
          value={formValues.passwordConfirmation}
          onChange={handleChange}
          type='text'
        />
        <button type='submit'>Register</button>
      </form>
    </main>
  );
};

export default Register;
