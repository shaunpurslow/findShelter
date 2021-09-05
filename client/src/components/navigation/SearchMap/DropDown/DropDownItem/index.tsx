import { Item } from './styles';

interface Props {
  key: string;
  city: string;
  province: string;
  setCity: any;
}

export const DropDownItem = (props: Props) => {
  const clickHandle = () => {
    props.setCity(props.city);
  };

  return (
    <>
      <Item onClick={clickHandle}>{props.city + '/' + props.province}</Item>
    </>
  );
};
