import '../../styles/dashboard/Sidebar.scss';
import '../../styles/dashboard/MenuItem.scss';

const Sidebar = () => {
  return (
    <aside className='dashboard-sidebar'>
      <img src='/img/find-shelter-b.svg' alt='logo' className='sidebar-logo' />

      <li className='menu-item--selected'>
        <img src='/img/overview.svg' alt='overview' />
        <h2>Overview</h2>
      </li>
      <li className='menu-item'>
        <img src='/img/reservation.svg' alt='reservation' />
        <h2>Reservations</h2>
      </li>
      <li className='menu-item'>
        <img src='/img/shelters.svg' alt='shelters' />
        <h2>Find Shelters</h2>
      </li>
      <li className='menu-item'>
        <img src='/img/guests.svg' alt='guests' />
        <h2>Guests</h2>
      </li>
      <li className='menu-item'>
        <img src='/img/myshelter.svg' alt='myshelter' />
        <h2>My Shelter</h2>
      </li>
    </aside>
  );
};

export default Sidebar;