import '../../styles/user/Header.scss';
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
        <Link to='/login'>
          <button className='sign__up'>Sign in</button>
        </Link>
        <Link to='/register'>
          <button className='sign__up'>Join now</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
