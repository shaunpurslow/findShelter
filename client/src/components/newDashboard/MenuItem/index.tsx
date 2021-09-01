import { List, ListSelected } from './styles';
import classNames from "classnames";

interface Props {
  key: string;
  menu: string;
  selected: boolean;
  setMenuItem: (e: any) => void;
}

const MenuItem = (props: Props) => {
  const imageName = props.menu.split(' ').join('')
  const image = `/img/${imageName}.svg`

  return (
    <>
      {!props.selected ?
        (<List
          onClick={(e: any): any => props.setMenuItem(props.menu)}>
          <img src={image} alt={props.menu} />
          <h2>{props.menu}</h2>
        </List>)
        :
        (<ListSelected
          onClick={(e: any): any => props.setMenuItem(props.menu)}>
          <img src={image} alt={props.menu} />
          <h2>{props.menu}</h2>
        </ListSelected>)
      }
    </>
  );
};

export default MenuItem;