import { Redirect } from 'react-router-dom'
import { useState } from 'react';
import { HeaderContainer, UserInfo } from './styles';
import { Button } from '../StyledComponents/buttons';

interface Props {
  currentMenu: string;
  first_name: string;
  last_name: string;
  thumbnail_url: string;
}

export function Header(props: Props) {
  const [isLogged, setIsLogged] = useState({ logged: true })

  const destroySession = () => {
    localStorage.clear();
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
        <h3>{props.first_name ? props.first_name + ' ' + props.last_name : 'Machado de Assis'}</h3>
        <img src={props.thumbnail_url ? props.thumbnail_url : 'https://picsum.photos/200'} alt='logo' />
        <Button onClick={destroySession}>
          logout
        </Button>
      </UserInfo>
    </HeaderContainer>
  );
};
