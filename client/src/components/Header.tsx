import '.././styles/Header.scss';
import React from 'react';
import AppleIcon from '@material-ui/icons/Apple';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Header = () => {
  return (
    <header className='header'>
      {/* left */}
      <div className='nav__left'>
        <AppleIcon />
        <h1>findShelter</h1>
      </div>

      {/* Right */}
      <div className='nav__right'>
        <p className='sign__in'>Sign In</p>
        <p className='sign__up'>Sign Up</p>
      </div>
    </header>
  );
};

export default Header;
