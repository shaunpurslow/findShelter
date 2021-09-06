import { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';

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

const MODE = {
  SHOW_SEARCHBAR: 'SHOW_SEARCHBAR',
  SHOW_MAP: 'MAP_VIEW',
};
export const SearchMap = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cities, setCities] = useState<ICity[]>([]);
  const [city, setCity] = useState<ICity>({ city: '', province: '' });
  const [shelters, setShelters] = useState([]);
  const [mode, setMode] = useState(MODE.SHOW_SEARCHBAR);

  const handleChange = (e): void => {
    setSearchTerm((prev) => e.target.value);
    props.setActiveSearch(false);
  };

  useEffect(() => {
    if (props.activeSearch) {
      setSearchTerm((prev) => city.city);
      setMode(MODE.SHOW_MAP);
    }
  }, [props.activeSearch]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/cities/search/?value=${searchTerm}`)
      .then((res) => setCities([...res.data]))
      .catch((err) => console.log(err));
  }, [searchTerm]);

  useEffect(() => {
    if (city.city) {
      axios
        .get(`http://localhost:8080/shelters/search?value=${city.city}`)
        .then((res) => {
          setShelters((prev) => res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [city.city]);

  return (
    <>
      {mode === MODE.SHOW_SEARCHBAR && (
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
      )}
      {mode === MODE.SHOW_MAP && (
        <MapSearch
          viewPortLocation={city}
          shelters={shelters}
          setSearchViewMode={setMode}
        />
      )}
    </>
  );
};
