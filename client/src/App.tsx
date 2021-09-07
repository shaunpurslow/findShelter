import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

import { Header } from './components/navigation/Header';
import { MenuMode } from './components/navigation/MenuMode';

import Register from './components/admin/Register';
import NewDashboard from './components/newDashboard/NewDashboard';
import Login from './components/admin/Login';
import Confirmation from './components/user/Confirmation';
import MapSearch from './components/mapSearch';
import Search from './components/Search';
import SearchResults from './components/SearchResults';

import { GlobalStyle } from './styles/global';
import './styles/App.scss';

const USER_VIEW_MODE = {
  SEARCH: 'SEARCH',
  LIST_SEARCH_RESULTS: 'LIST_SEARCH_RESULTS',
  MAP_SEARCH_RESULTS: 'MAP_SEARCH_RESULTS',
};
function App() {
  const [loggedInUser, setLoggedInUser] = useState<any>({
    id: '',
    first_name: '',
    last_name: '',
    shelter_id: '',
    capacity: '',
    thumbnail_url: '',
  });

  const [userViewMode, setUserViewMode] = useState(USER_VIEW_MODE.SEARCH);
  const [userSearchResults, setUserSearchResults] = useState([]);

  const changeToSearchView = () => {
    setUserViewMode(USER_VIEW_MODE.SEARCH);
  };
  const changeToMapResultsView = () => {
    setUserViewMode(USER_VIEW_MODE.MAP_SEARCH_RESULTS);
  };

  const changeToListResultsView = () => {
    setUserViewMode(USER_VIEW_MODE.LIST_SEARCH_RESULTS);
  };
  return (
    <Router>
      <div className='App'>
        <GlobalStyle />
        <Switch>
          {/* Main Page */}
          <Route exact path='/'>
            {userViewMode === USER_VIEW_MODE.SEARCH && (
              <>
                <Header />
                <Search
                  setUserSearchResults={setUserSearchResults}
                  changeToMapResultsView={changeToMapResultsView}
                  changeToListResultsView={changeToListResultsView}
                />
              </>
            )}
            {userViewMode === USER_VIEW_MODE.LIST_SEARCH_RESULTS && (
              <>
                <Header />
                <SearchResults
                  searchResults={userSearchResults}
                  changeToSearchView={changeToSearchView}
                />
              </>
            )}
            {userViewMode === USER_VIEW_MODE.MAP_SEARCH_RESULTS && (
              <MapSearch
                viewPortLocation={userSearchResults[0]}
                searchResults={userSearchResults}
                changeToSearchView={changeToSearchView}
              />
            )}
          </Route>

          <Route path='/search-results'>{/* <SearchResults /> */}</Route>

          {/* Register */}
          <Route path='/register'>
            <Register setAppState={'setAppState'} />
          </Route>
          <Route path='/new-dashboard'>
            <NewDashboard loggedInUser={loggedInUser} />
          </Route>
          <Route path='/dashboard'>
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
