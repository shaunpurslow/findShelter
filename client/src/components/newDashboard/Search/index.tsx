import SearchIcon from '@material-ui/icons/Search';
import { useState, useEffect } from 'react';
import { SearchBar } from './styles';

interface Props {
  setDashboardState: any;
  dashboardState: any;
};

export const Search = (props: Props) => {
  const [shelters, setShelters]: any = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setShelters(prev => [...prev, ...props.dashboardState.shelters])
  }, [])

  const handleChange = (e) => {
    setSearch(prev => e.target.value);

    const updatedShelters = shelters.filter(shelter => {
      if (search === '') return shelter;
      else if (shelter.city.toLowerCase().includes(search.toLowerCase())) return shelter;
      else if (shelter.name.toLowerCase().includes(search.toLowerCase())) return shelter;
    });

    props.setDashboardState(prev => ({ ...prev, shelters: [...updatedShelters] }));
  };

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