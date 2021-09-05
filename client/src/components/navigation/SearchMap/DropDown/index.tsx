import { useState, useEffect } from 'react';
import { DropDownItem } from './DropDownItem';
import { Container } from './styles';
// import { SearchBar } from './styles';

interface ICity {
  city: string;
  province: string;
}

interface Props {
  cities: ICity[];
  setCity: any;
  startQuery: boolean;
};

export const DropDown = (props: Props) => {
  const dropDownItems = props.cities.map((city) => (
    <DropDownItem
      key={city.city}
      city={city.city}
      province={city.province}
      setCity={props.setCity}
    />
  ));

  return (
    <Container startQuery={props.startQuery}>
      <ul>{dropDownItems}</ul>
    </Container>
  );
};
