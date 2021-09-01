import { useState, useEffect } from 'react';
import useShelterInfo from '../../hooks/useShelterInfo';
import { GlobalStyle } from '../../styles/global'
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Main } from './Main';
import { Container, MainContainer } from './styles';

interface Props {
  setAppState: {};
}

function NewDashboard(props: Props) {
  const [menu, setMenu] = useState({
    currentMenu: 'Overview',
    menuItems: ['Overview', 'Reservations', 'Find Shelters', 'Guests', 'My Shelter']
  });
  const [user, setUser] = useState({
    id: '',
    first_name: '',
    last_name: '',
    capacity: '',
    thumbnail_url: ''
  });

  const dataLocalStorage: any = localStorage.getItem('userData');
  const userData = JSON.parse(dataLocalStorage);

  useEffect(() => {
    setUser(prev => ({ ...prev, ...userData }))
  }, [])

  const shelterInfo = useShelterInfo(props.setAppState);

  const setMenuItem = (item: string): void =>
    setMenu({ ...menu, currentMenu: item });

  return (
    <>
      <GlobalStyle />
      <Container>
        <Sidebar currentMenu={menu.currentMenu} menuItems={menu.menuItems} setMenuItem={setMenuItem} />
        <MainContainer>
          <Header
            currentMenu={menu.currentMenu}
            first_name={user.first_name}
            last_name={user.last_name}
            thumbnail_url={user.thumbnail_url}
          />
          <Main
            currentMenu={menu.currentMenu}
            capacity={user.capacity}
          />
        </MainContainer>
      </Container>
    </>
  )
}

export default NewDashboard;

