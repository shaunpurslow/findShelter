import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Search from './components/Search';
import './styles/App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';

function App() {
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
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
