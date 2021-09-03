import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

import { Header } from './components/navagation/Header';
import Search from './components/user/Search';
import { Footer } from './components/navagation/Footer';

import Register from './components/admin/Register';
import NewDashboard from './components/newDashboard/NewDashboard';
import Login from './components/admin/Login';
import useSearch from './hooks/useSearch';
import Confirmation from './components/user/Confirmation';
import Map from './components/user/Map';

import { GlobalStyle } from './styles/global';
import './styles/App.scss';

function App() {
  const [search, setSearch] = useSearch();
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
            <Search setSearch={setSearch} />
            <Footer />
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
          <Route path='/map'>
            <Map />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
