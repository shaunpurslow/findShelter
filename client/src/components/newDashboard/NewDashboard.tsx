import { useState, useEffect } from 'react';
import { GlobalStyle } from '../../styles/global'
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Main } from './Main';
import { Container, MainContainer } from './styles';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


interface IDashboardState {
  user: any;
  shelters: any[];
  reservations: any[];
  guests: any[];
}

function NewDashboard(props: any) {
  const localStorageInfo: any = localStorage.getItem('user');
  const loggedIn = JSON.parse(localStorageInfo);

  const [dashboardState, setDashboardState] = useState<IDashboardState>({
    user: loggedIn,
    shelters: [],
    reservations: [],
    guests: []
  });

  // REFACTOR: change backend route for all of a shelters reservations to this -> "/shelters/:id/reservations"
  // its more RESTful than a search query

  // TODO: create routes for guests "/shelters/:id/guests"
  // axios.get(`guests`)
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8080/shelters`),
      axios.get(`http://localhost:8080/reservations/search?shelter_id=${dashboardState?.user?.shelter_id || null}`)
    ])
      .then(res => {
        const [shelters, reservations] = res;
        setDashboardState(prev => ({ ...prev, shelters: shelters.data, reservations: reservations.data }))
      })
      .catch((err) => console.log(err))
  }, [])

  const [menu, setMenu] = useState({
    currentMenu: 'Overview',
    menuItems: ['Overview', 'Reservations', 'Find Shelters', 'Guests', 'My Shelter']
  });

  const setMenuItem = (item: string): void =>
    setMenu({ ...menu, currentMenu: item });

  if (!loggedIn) {
    return <Redirect to='/login' />;
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Sidebar currentMenu={menu.currentMenu} menuItems={menu.menuItems} setMenuItem={setMenuItem} />
        <MainContainer>
          <Header
            currentMenu={menu.currentMenu}
            first_name={dashboardState.user.first_name}
            last_name={dashboardState.user.last_name}
            thumbnail_url={dashboardState.user.thumbnail_url}
          />
          <Main
            currentMenu={menu.currentMenu}
            capacity={dashboardState.user.capacity}
            dashboardState={dashboardState}
          />
        </MainContainer>
      </Container>
    </>
  )
}

export default NewDashboard;

