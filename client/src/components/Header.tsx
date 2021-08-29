import '.././styles/Header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='header'>
      {/* left */}
      <div className='nav__image'>
        <Link to='/'>
          <img src='/img/find-shelter.svg' alt='logo' />
        </Link>
      </div>

      {/* Right */}
      <div className='nav__right'>
        <p className='sign__in'>Sign In</p>
        <Link to='/register'>
          <button className='sign__up'>Sign Up</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
