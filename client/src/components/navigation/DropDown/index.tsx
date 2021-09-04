import { useState, useEffect } from 'react';
// import { SearchBar } from './styles';
import axios from 'axios';

interface ICity {
  city: string;
  province: string;
}

interface Props {
  cities: ICity[];
}

export const DropDown = (props: Props) => {
  return (
    <div>
      <ul>props.</ul>
    </div>
  );
};
