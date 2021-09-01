import Footer from './components/user/Footer';
import Header from './components/user/Header';
import Search from './components/user/Search';
import './styles/App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/admin/Register';
import Dashboard from './components/dashboard/Dashboard';
import NewDashboard from './components/newDashboard/NewDashboard';
import useShelters from './hooks/useShelters';
import { useState } from 'react';
import Shelter from './components/dashboard/Shelter';
import Login from './components/admin/Login';
import Reservation from './components/user/Reservation';
import useSearch from './hooks/useSearch';
import Confirmation from './components/user/Confirmation';

interface ILoggedInUser {
  id: number | string;
  first_name: string;
  last_name: string;
  shelter_id: number | string;
  capacity: number | string;
  thumbnail_url: string;
}

function App() {
  const [shelters, setShelters] = useShelters();
  const [search, setSearch] = useSearch();
  const [loggedInUser, setLoggedInUser] = useState<any>({
    id: '',
    first_name: '',
    last_name: '',
    shelter_id: '',
    capacity: '',
    thumbnail_url: '',
  });

  const shelter = shelters.map((shelter) => (
    <Shelter
      key={shelter.id}
      id={shelter.id}
      name={shelter.name}
      street_address={shelter.street_address}
      city={shelter.city}
      province={shelter.province}
      postal_code={shelter.postal_code}
      country={shelter.country}
      phone={shelter.phone}
      email={shelter.email}
      thumbnail_url={shelter.thumbnail_url}
      website_url={shelter.website_url}
      capacity={shelter.capacity}
      couples={shelter.couples}
      female_only={shelter.female_only}
      male_only={shelter.male_only}
      family={shelter.family}
      pets={shelter.pets}
    />
  ));

  return (
    <Router>
      <div className='App'>
        <Switch>
          {/* Main Page */}
          <Route exact path='/'>
            {search.length < 3 ? (
              <>
                <Header />
                {/* Emmanuel Look at this issue ? */}
                <Search setSearch={setSearch} />
                <Footer />
              </>
            ) : (
              <>
                <Header />
                {/* Emmanuel Look at this issue ? */}
                <Search setSearch={setSearch} />
                {shelter}
                <Footer />
              </>
            )}
          </Route>
          {/* Register */}
          <Route path='/register'>
            <Register setAppState={'setAppState'} />
          </Route>
          {/* Dashborad */}
          <Route path='/dashboard'>
            <Dashboard setAppState={'setAppState'} />
          </Route>
          {/* Temporary Dashborad */}
          <Route path='/new-dashboard'>
            <NewDashboard loggedInUser={loggedInUser} />
          </Route>
          <Route path='/user'>
            <Header />
            {shelter}
          </Route>
          <Route path='/confirmation'>
            <Confirmation />
          </Route>
          <Route path='/reservation'>
            <Header />
            <Reservation />
          </Route>
          <Route path='/login'>
            <Login setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
