import { useState, useEffect } from 'react';

import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

import { SearchBar } from './styles';
import { DropDown } from './DropDown';
import Map from '../../user/Map';
import MapSearch from '../../mapSearch';

interface ICity {
  city: string;
  province: string;
}

interface Props {
  setActiveSearch: (boolean) => void;
  activeSearch: boolean;
}

export const SearchMap = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cities, setCities] = useState<ICity[]>([]);

  // set by dropdown item on click
  const [city, setCity] = useState<ICity>({ city: '', province: '' });

  const handleChange = (e): void => {
    setSearchTerm((prev) => e.target.value);
    props.setActiveSearch(false);
  };

  useEffect(() => {
    if (props.activeSearch) {
      setSearchTerm((prev) => city.city);
    }
  }, [props.activeSearch]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/cities/search/?value=${searchTerm}`)
      .then((res) => setCities([...res.data]))
      .catch((err) => console.log(err));
  }, [searchTerm]);

  console.log('This is city in SeachMap comp', city);

  return (
    <>
      <div>
        <SearchBar
          startQuery={searchTerm.length > 2}
          activeSearch={props.activeSearch}>
          <input
            type='text'
            placeholder={'start typing a city'}
            value={searchTerm}
            onChange={handleChange}
          />
          <SearchIcon className='icon' />
        </SearchBar>
        <DropDown
          cities={cities}
          setCity={setCity}
          startQuery={searchTerm.length > 2}
          setActiveSearch={props.setActiveSearch}
          activeSearch={props.activeSearch}
        />
      </div>
      {/* if props.activeSearch is true, render the map on the page */}
      {props.activeSearch && <MapSearch />}
      {/* {city ? <Map /> : null} */}
    </>
  );
};
