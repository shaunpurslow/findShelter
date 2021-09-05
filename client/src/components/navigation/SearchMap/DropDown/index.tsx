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
}

const mockCities = [
  { city: 'Maringa', province: 'PR' },
  { city: 'Calgary', province: 'AB' },
  { city: 'Vancouver', province: 'BC' },
]

export const DropDown = (props: Props) => {
  // const dropDownItems = props.cities.map((city) => (
  const dropDownItems = mockCities.map((city) => (
    <DropDownItem
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
