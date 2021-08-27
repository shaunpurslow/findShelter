import '.././styles/Header.scss';
import HomeIcon from '@material-ui/icons/Home';

const Header = () => {
  return (
    <header className='header'>
      {/* left */}
      <div className='nav__left'>
        <HomeIcon />
        <h1>findShelter</h1>
      </div>

      {/* Right */}
      <div className='nav__right'>
        <p className='sign__in'>Sign In</p>
        <button className='sign__up'>Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
