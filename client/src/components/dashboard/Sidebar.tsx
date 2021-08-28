import '../../styles/dashboard/Sidebar.scss';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className='dashboard-sidebar'>
      <img src='/img/find-shelter-b.svg' alt='logo' />
      <li>icon | Overview</li>
      <li>icon | Reservations</li>
      <li>icon | Find Shelters</li>
      <li>icon | Guests</li>
      <li>icon | My Shelter</li>
    </aside>
  );
};

export default Sidebar;