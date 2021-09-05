import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

import { Header } from './components/navigation/Header';
import { MenuMode } from './components/navigation/MenuMode';

import Register from './components/admin/Register';
import NewDashboard from './components/newDashboard/NewDashboard';
import Login from './components/admin/Login';
import Confirmation from './components/user/Confirmation';
import MapSearch from './components/mapSearch';

import { GlobalStyle } from './styles/global';
import './styles/App.scss';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<any>({
    id: '',
    first_name: '',
    last_name: '',
    shelter_id: '',
    capacity: '',
    thumbnail_url: '',
  });

  return (
    <Router>
      <div className='App'>
        <GlobalStyle />
        <Switch>
          {/* Main Page */}
          <Route exact path='/'>
            <Header />
            <MenuMode />
          </Route>
          {/* Register */}
          <Route path='/register'>
            <Register setAppState={'setAppState'} />
          </Route>
          <Route path='/new-dashboard'>
            <NewDashboard loggedInUser={loggedInUser} />
          </Route>
          <Route path='/user'>
            <Header />
          </Route>
          <Route path='/confirmation'>
            <Confirmation />
          </Route>
          <Route path='/login'>
            <Login
              setLoggedInUser={setLoggedInUser}
              loggedInUser={loggedInUser}
            />
          </Route>
          <Route path='/mapsearch'>
            <MapSearch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
