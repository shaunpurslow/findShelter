import useRegistrationForm from '../../../hooks/useRegistrationForm';
import { Container, Actions, Form, Header } from './styles';
import { Button } from '../StyledComponents/buttons';
import { Logo } from '../StyledComponents/logo';

export const MyShelter = () => {
  const [formValues, handleChange, handleSubmit] =
    useRegistrationForm({});

  return (
    <Container>
      <Header>
        <Logo src='/img/find-shelter.svg' alt='logo' />
        <h2>Register</h2>
      </Header>

      <Form onSubmit={handleSubmit}>
        <h3>Shelter Registration</h3>
        <label htmlFor='shelter-name'>Shelter Name</label>
        <input
          name='shelter-name'
          id='shelterName'
          value={formValues.shelterName}
          onChange={handleChange}
          type='text'
        />
        <label htmlFor='street-address'>Street Address</label>
        <input
          name='street-address'
          id='streetAddress'
          value={formValues.streetAddress}
          onChange={handleChange}
          type='text'
        />
        <span>
          <div>
            <label htmlFor='city'>City</label>
            <input
              name='city'
              id='city'
              value={formValues.city}
              onChange={handleChange}
              type='text'
            />
          </div>

          <div>
            <label htmlFor='province'>Province</label>
            <input
              name='province'
              id='province'
              value={formValues.province}
              onChange={handleChange}
              type='text'
            />
          </div>
        </span>

        <span>
          <div>
            <label htmlFor='postal-code'>Postal Code</label>
            <input
              name='postal-code'
              id='postalCode'
              value={formValues.postalCode}
              onChange={handleChange}
              type='text'
            />
          </div>
          <div>
            <label htmlFor='country'>Country</label>
            <input
              name='country'
              id='country'
              value={formValues.country}
              onChange={handleChange}
              type='text'
            />
          </div>
        </span>

        <label htmlFor='capacity'>Total Beds</label>
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

        <h3>Staff Details</h3>

        <span>
          <div>
            <label htmlFor='first_name'>First Name</label>
            <input
              name='first-name'
              id='firstName'
              value={formValues.firstName}
              onChange={handleChange}
              type='text'
            />
          </div>
          <div>
            <label htmlFor='last_name'>Last Name</label>
            <input
              name='last-name'
              id='lastName'
              value={formValues.lastName}
              onChange={handleChange}
              type='text'
            />
          </div>
        </span>

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
        <Actions>
          <Button type='submit'>
            Register
          </Button>
          <Button type='submit'>
            Cancel
          </Button>
        </Actions>
      </Form>
    </Container>
  );
};