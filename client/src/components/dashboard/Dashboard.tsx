import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';
import '../../styles/dashboard/Dashboard.scss';
import { useState } from 'react';
import useShelterInfo from '../../hooks/useShelterInfo';

interface Props {
  setAppState: {};
}

function Dashboard(props: Props) {
  const [menu, setMenu] = useState({
    currentMenu: 'Overview',
    menuItems: ['Overview', 'Reservations', 'Find Shelters', 'Guests', 'My Shelter']
  });

  const shelterInfo = useShelterInfo(props.setAppState);

  const setMenuItem = (item: string): void =>
    setMenu({ ...menu, currentMenu: item });

  return (
    <>
      <div className='dashboard-view'>
        <Sidebar currentMenu={menu.currentMenu} menuItems={menu.menuItems} setMenuItem={setMenuItem} />
        <section className='dashboard'>
          <Header
            currentMenu={menu.currentMenu}
            first_name={shelterInfo.first_name}
            last_name={shelterInfo.last_name}
            thumbnail_url={shelterInfo.thumbnail_url}
          />
          <Main
            currentMenu={menu.currentMenu}
            capacity={shelterInfo.capacity}
          />
        </section>
      </div>
    </>
  )
}

export default Dashboard;

