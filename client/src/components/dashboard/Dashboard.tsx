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

  const setMenuItem = (item: string): void =>
    setMenu({ ...menu, currentMenu: item });

  return (
    <>
      <div className='dashboard-view'>
        <Sidebar currentMenu={menu.currentMenu} menuItems={menu.menuItems} setMenuItem={setMenuItem} />
        <section className='dashboard'>
          <Header currentMenu={menu.currentMenu} />
          <Main currentMenu={menu.currentMenu} />
        </section>
      </div>
    </>
  )
}

export default Dashboard;

