import { Redirect } from 'react-router-dom'
import { useState } from 'react';
import styles from 'styled-components';
import { HeaderContainer, UserInfo } from './styles';

interface Props {
  currentMenu: string;
  first_name: string;
  last_name: string;
  thumbnail_url: string;
}

export const Header = (props: Props) => {
  const [isLogged, setIsLogged] = useState({ logged: true })


  const destroySession = () => {
    localStorage.removeItem('userData');
    setIsLogged({ logged: false })
  };

  if (!isLogged.logged) {
    return (
      <Redirect to='/login' />
    )
  }

  return (
    <HeaderContainer>
      <h1>{props.currentMenu}</h1>
      <UserInfo>
        <img src='/img/search.svg' alt='search' />
        <img src='/img/divider.svg' alt='divider' />
        <h3>{props.first_name + ' ' + props.last_name}</h3>
        <img src={props.thumbnail_url} alt='logo' />
        <button onClick={destroySession} >logout</button>
      </UserInfo>
    </HeaderContainer>
  );
};
