import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Search from './components/Search';
import './styles/App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import { useState } from 'react';

function App() {
  const [appState, setAppState] = useState({
    user: {},
    shelter: {},
  });

  return (
    <Router>
      <div className='App'>
        <Switch>
          {/* Main Page */}
          <Route exact path='/'>
            <Header />
            <Search />
            <Footer />
          </Route>
          {/* Register */}
          <Route path='/register'>
            <Register setAppState={setAppState} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
