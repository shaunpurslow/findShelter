import { Item } from './styles';

interface Props {
  city: string;
  province: string;
  setCity: any;
}

export const DropDownItem = (props: Props) => {
  const clickHandle = () => {
    console.log('Clicked!!');
    // set the choose city to pass as props to the map
  };

  return (
    <>
      <Item onClick={clickHandle}>{props.city + '/' + props.province}</Item>
    </>
  );
};
