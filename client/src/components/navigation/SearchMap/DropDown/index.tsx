import { useState, useEffect } from 'react';
import { DropDownItem } from './DropDownItem';
// import { SearchBar } from './styles';
import axios from 'axios';

interface ICity {
  city: string;
  province: string;
}

interface Props {
  cities: ICity[];
  setCity: any;
}

export const DropDown = (props: Props) => {
  const dropDownItems = props.cities.map((city) => (
    <DropDownItem
      city={city.city}
      province={city.city}
      setCity={props.setCity}
    />
  ));

  return (
    <div>
      <ul>{dropDownItems}</ul>
    </div>
  );
};
