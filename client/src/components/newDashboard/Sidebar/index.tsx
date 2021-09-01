import { Aside, Image } from './styles';
import MenuItem from '../MenuItem'

interface Props {
  currentMenu: string;
  menuItems: string[];
  setMenuItem: (e: any) => void;
}

export const Sidebar = (props: Props) => {
  const menuList = props.menuItems.map(menu =>
    <MenuItem
      key={menu}
      menu={menu}
      selected={menu === props.currentMenu}
      setMenuItem={props.setMenuItem}
    />
  )

  return (
    <Aside>
      <Image
        src='/img/find-shelter-b.svg'
        alt='logo'
        className='sidebar-logo'
      />
      {menuList}
    </Aside>
  );
};