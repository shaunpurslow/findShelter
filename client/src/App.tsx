import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Search from './components/Search';
import './styles/App.scss';

function App() {
  return (
    <div className='App'>
      {/* Header */}
      <Header />
      {/* search */}
      <Search />
      {/* Register */}
      
      {/*Footer  */}
      <Footer />
    </div>
  );
}

export default App;
