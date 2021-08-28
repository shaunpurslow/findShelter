import '../../styles/dashboard/MenuItem.scss';
import classNames from "classnames";

interface Props {
  key: string;
  menu: string;
  selected: boolean;
}

const MenuItem = (props: Props) => {
  const menuClass = classNames('menu-item', {
    'menu-item--selected': props.selected,
  })

  const imageName = props.menu.split(' ').join('')
  const image = `/img/${imageName}.svg`

  return (
    <li
      className={menuClass}
      onClick={(e: any): any => console.log(props.menu)}>
      <img src={image} alt={props.menu} />
      <h2>{props.menu}</h2>
    </li>
  );
};

export default MenuItem;