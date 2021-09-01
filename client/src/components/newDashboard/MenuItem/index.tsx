import { List } from './styles';
import classNames from "classnames";

interface Props {
  key: string;
  menu: string;
  selected: boolean;
  setMenuItem: (e: any) => void;
}

const MenuItem = (props: Props) => {
  const menuClass = classNames('menu-item', {
    'menu-item--selected': props.selected,
  })

  const imageName = props.menu.split(' ').join('')
  const image = `/img/${imageName}.svg`

  return (
    <List
      className={menuClass}
      onClick={(e: any): any => props.setMenuItem(props.menu)}>
      <img src={image} alt={props.menu} />
      <h2>{props.menu}</h2>
    </List>
  );
};

export default MenuItem;