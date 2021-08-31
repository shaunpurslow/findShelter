import '../../styles/user/Search.scss';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useState, useEffect } from 'react';
import axios from 'axios'

import ShelterItems from './ShelterItems'
import useShelters from '../../hooks/useShelters';

interface Props {
  setSearch: any;
}
const Search = (props: Props) => {
  // saved data from search query
  // const [shelters, setShelters] = useShelters();
  const [shelters, setShelters] = useState([]);
  console.log(shelters);

  // controlled search input
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    interface ISearchValue {
      value: string;
    }
    setSearchQuery((prev) => e.target.value)
  };

  // const newShelters = shelters.filter(shelter => (
  //   searchQuery.includes(shelter.name) || searchQuery.includes(shelter.street_address) || searchQuery.includes(shelter.city)
  // ));

  // console.log('This is newShelters ', newShelters)
  // console.log('This is searchQuery ', searchQuery)

  // use effect: get search queries from database when values state changes
  useEffect(() => {
    axios.get(`http://localhost:8080/search/?value=${searchQuery}`)
      .then(res => {
        setShelters(prev => res.data)
      })
      .catch(err => console.error(err))
  }, [searchQuery])

  return (
    <main className='search__container'>
      <div className='container'>

        <div className='search__bar'>
          <SearchIcon className='search__icon' />
          <input
            type='text'
            placeholder='Enter your location'
            value={searchQuery}
            onChange={handleChange}
          />
          <LocationOnIcon className='icon' />
        </div>

        <span className='filters-checkbox'>
          <input type='checkbox' id='female' name='female' value='female_only' />
          <label htmlFor='female'>Female Only</label>
          <input type='checkbox' id='male' name='male' value='male_only' />
          <label htmlFor='male'>Male Only</label>
          <input type='checkbox' id='couples' name='couples' value='couples' />
          <label htmlFor='couples'>Couples</label>
          <input type='checkbox' id='families' name='families' value='family' />
          <label htmlFor='families'>Families</label>
          <input type='checkbox' id='pets' name='pets' value='pets' />
          <label htmlFor='pets'>Pets</label>
        </span>

        {shelters.length ? <ShelterItems shelters={shelters} /> : null}

      </div>
    </main>
  );
};

export default Search;
