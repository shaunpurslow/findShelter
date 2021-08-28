import '../../styles/dashboard/Sidebar.scss';
import '../../styles/dashboard/MenuItem.scss';
import MenuItem from './MenuItem';

interface Props {
  currentMenu: string;
  menuItems: string[];
  onChange: (e: any) => void;
}

const Sidebar = (props: Props) => {
  const menuList = props.menuItems.map(menu =>
    <MenuItem
      key={menu}
      menu={menu}
      selected={menu === props.currentMenu}
    />
  )

  return (
    <aside className='dashboard-sidebar'>
      <img
        src='/img/find-shelter-b.svg'
        alt='logo'
        className='sidebar-logo'
      />
      {menuList}
    </aside>
  );
};

export default Sidebar;