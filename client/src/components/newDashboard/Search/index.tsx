import SearchIcon from '@material-ui/icons/Search';
import { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { SearchBar } from './styles';
import axios from 'axios';

interface Props {
  setDashboardState: any;
  dashboardState: any;
};

export const Search = (props: Props) => {
  const [shelters, setShelters]: any = useState([]);
  const [search, setSearch] = useState('');

  const updateShelters = () => {
    axios
      .get(`http://localhost:8080/shelters/search/?value=${search}`)
      .then((res) => {
        setShelters((prev) => res.data);
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    debouncedRequest();
    setSearch(e.target.value);

    const updatedShelters = shelters.filter(shelter => {
      if (search === '') return shelter;
      else if (shelter.city.toLowerCase().includes(search.toLowerCase())) return shelter;
      else if (shelter.name.toLowerCase().includes(search.toLowerCase())) return shelter;
    });

    props.setDashboardState(prev => ({ ...prev, shelters: [...updatedShelters] }));
  };

  const debouncedRequest = useCallback(debounce(updateShelters, 300), []);

  return (
    <SearchBar>
      <input
        type='text'
        placeholder='Type a city or shelter name'
        value={search}
        onChange={handleChange}
      />
      <SearchIcon className='icon' />
    </SearchBar>
  )
};