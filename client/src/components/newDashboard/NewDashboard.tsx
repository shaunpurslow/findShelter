import { useState, useEffect } from 'react';
import { GlobalStyle } from '../../styles/global';
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
  myShelter: any[];
}

function NewDashboard(props: any) {
  const localStorageInfo: any = localStorage.getItem('user');
  const loggedIn = JSON.parse(localStorageInfo);

  const [dashboardState, setDashboardState] = useState<IDashboardState>({
    user: loggedIn,
    shelters: [],
    reservations: [],
    guests: [],
    myShelter: [],
  });

  // REFACTOR: change backend route for all of a shelters reservations to this -> "/shelters/:id/reservations"
  // its more RESTful than a search query

  // TODO: create routes for guests "/shelters/:id/guests"
  // axios.get(`guests`)
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8080/shelters`),
      axios.get(
        `http://localhost:8080/reservations/search?shelter_id=${
          dashboardState?.user?.shelter_id || null
        }`
      ),
      axios.get(
        `http://localhost:8080/shelters/${dashboardState?.user?.shelter_id}`
      ),
    ])
      .then((res) => {
        const [shelters, reservations, myShelter] = res;
        setDashboardState((prev) => ({
          ...prev,
          shelters: shelters.data,
          reservations: reservations.data,
          myShelter: myShelter.data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  // whenever reservations state is changed (by reservation card PUT request)
  // also update the myShelter, and shelters state information
  // myShelter state information will then get passed to Overview component triggering a useEffect re-render
  // same thing will happen to Shelters component in the dashboard
  useEffect(() => {
    const getMyShelterUpdate = axios.get(
      `http://localhost:8080/shelters/${dashboardState?.user?.shelter_id}`
    );
    const getSheltersUpdate = axios.get(`http://localhost:8080/shelters`);

    Promise.all([getMyShelterUpdate, getSheltersUpdate])
      .then((res) => {
        const [updatedMyShelter, updatedShelters] = res;
        setDashboardState((prev) => ({
          ...prev,
          myShelter: updatedMyShelter.data,
          shelters: updatedShelters.data,
        }));
      })
      .catch((err) => console.log(err));
  }, [dashboardState.reservations]);

  const [menu, setMenu] = useState({
    currentMenu: 'Overview',
    menuItems: [
      'Overview',
      'Reservations',
      'Find Shelters',
      'Guests',
      'My Shelter',
    ],
  });

  const setMenuItem = (item: string): void =>
    setMenu({ ...menu, currentMenu: item });

  if (!loggedIn) {
    return <Redirect to='/login' />;
  }

  const updateDashboardReservations = (newReservations: any[]): void => {
    setDashboardState((prev) => ({ ...prev, reservations: newReservations }));
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Sidebar
          currentMenu={menu.currentMenu}
          menuItems={menu.menuItems}
          setMenuItem={setMenuItem}
        />
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
            updateDashboardReservations={updateDashboardReservations}
            setDashboardState={setDashboardState}
          />
        </MainContainer>
      </Container>
    </>
  );
}

export default NewDashboard;
