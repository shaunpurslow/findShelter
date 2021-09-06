import { Item } from './styles';

interface Props {
  key: string;
  city: string;
  province: string;
  setCity: any;
  setActiveSearch: ((boolean) => void);
}

export const DropDownItem = (props: Props) => {
  const clickHandle = () => {
    props.setCity(props.city);
    props.setActiveSearch(true);
  };

  return (
    <>
      <Item onClick={clickHandle}>{props.city + '/' + props.province}</Item>
    </>
  );
};
