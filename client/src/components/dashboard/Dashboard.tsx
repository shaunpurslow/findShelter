import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';
import '../../styles/dashboard/Dashboard.scss';
import { useState } from 'react';

function Dashboard() {
  const [menu, setMenu] = useState({
    currentMenu: 'Overview',
    menuItems: ['Overview', 'Reservations', 'Find Shelters', 'Guests', 'My Shelter']
  });

  return (
    <>
      <div className='dashboard-view'>
        <Sidebar currentMenu={menu.currentMenu} menuItems={menu.menuItems} onChange={(e: any) => setMenu(e)} />
        <section className='dashboard'>
          <Header />
          <Main />
        </section>
      </div>
    </>
  )
}

export default Dashboard;

