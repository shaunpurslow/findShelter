import '../../styles/admin/Login.scss';
import { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const [value, setValue] = useState({
    email: '',
    password: '',
  });

  const [loginAttempt, setLoginAttempt] = useState({ attempt: false });

  const handleSubmit = () => {
    axios
      .post('http://localhost:8080/login/', value)
      .then((res) => {
        localStorage.setItem('userData', JSON.stringify(res.data.user));

        return axios.get(
          `http://localhost:8080/reservations/search?shelter_id=${res.data.user.id}`
        );
      })
      .then((res) => {
        localStorage.setItem('reservationsData', JSON.stringify(res.data));
        setLoginAttempt({ attempt: true });
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

  const loggedIn = localStorage.getItem('userData');
  if (loggedIn) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <main className='login__container'>
      <div className='login__header'>
        <img src='/img/find-shelter.svg' alt='logo' />
        <h2>Login</h2>
      </div>

      <form
        className='login-form'
        autoComplete='off'
        onSubmit={(event) => event.preventDefault()}>
        <h3>Login</h3>
        <label htmlFor='email'>Email</label>
        <input
          className='login-email'
          name='email'
          type='text'
          value={value.email}
          onChange={handleChange}
          placeholder='email'
        />
        <label htmlFor='password'>Password</label>
        <input
          className='login-password'
          name='password'
          type='password'
          placeholder='password'
          value={value.password}
          onChange={handleChange}
        />
        <div className='button__container'>
          <button
            className='login__submit__button'
            type='submit'
            onClick={handleSubmit}>
            Login
          </button>
          <button className='login__submit__button' type='submit'>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default Login;
