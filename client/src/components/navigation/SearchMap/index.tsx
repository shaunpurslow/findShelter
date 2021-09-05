import SearchIcon from '@material-ui/icons/Search';
import { useState, useEffect } from 'react';
import { SearchBar } from './styles';
import { DropDown } from './DropDown';
import axios from 'axios';

interface ICity {
  city: string;
  province: string;
}

export const SearchMap = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cities, setCities] = useState<ICity[]>([]);
  const [city, setCity] = useState<string>('');

  const handleChange = (e): void => {
    setSearchTerm((prev) => e.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/cities/search/?value=${searchTerm}`)
      .then((res) => setCities((prev) => [...prev, ...res.data]))
      .catch((err) => console.log(err));
  }, [searchTerm]);

  return (
    <div>
      <SearchBar>
        <input
          type='text'
          placeholder='start typing a city'
          value={searchTerm}
          onChange={handleChange}
        />
        <SearchIcon className='icon' />
      </SearchBar>
      <DropDown cities={cities} setCity={setCity} />
    </div>
  );
};
