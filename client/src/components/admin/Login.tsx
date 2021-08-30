import '../../styles/admin/Login.scss';


const Login = () => {
  return (
    <main className='login__container'>
      <div className='login__header'>
        <img src='/img/find-shelter.svg' alt='logo' />
        <h2>Login</h2>
      </div>

      <form className='login-form'>
        <h3>Login</h3>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          id='email'
          // value={formValues.shelterName}
          // onChange={handleChange}
          type='text'
        />
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          id='password'
          // value={formValues.streetAddress}
          // onChange={handleChange}
          type='text'
        />
        <button className='login__submit__button' type='submit'>
          Login
        </button>
      </form>
    </main>
  );
};

export default Login;
