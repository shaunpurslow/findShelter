import '../../styles/user/Search.scss';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useState, useEffect } from 'react';
import axios from 'axios'

import ShelterItems from './ShelterItems'

interface Props {
  setSearch: any;
}
const Search = (props: Props) => {
  // saved data from search query
  // const [shelters, setShelters] = useShelters();
  const [shelters, setShelters] = useState([]);

  // controlled search input
  const [searchQuery, setSearchQuery] = useState({
    query: '',
    female_only: false,
    male_only: false,
    couples: false,
    families: false,
    pets: false
  });

  const handleChange = (e) => {
    setSearchQuery((prev) => ({ ...prev, query: e.target.value }))
  };

  const handleChangeCheck = (e) => {
    const checkBoxName = e.target.value
    setSearchQuery((prev) => ({ ...prev, [checkBoxName]: !prev[checkBoxName] }))
  };

  // use effect: get search queries from database when values state changes
  useEffect(() => {
    axios.get(`http://localhost:8080/shelters/search/?value=${searchQuery.query}&couples=${searchQuery.couples}&female_only=${searchQuery.female_only}&male_only=${searchQuery.male_only}&family=${searchQuery.families}&pets=${searchQuery.pets}
    `)
      .then(res => {
        // console.log(res.data)
        setShelters(prev => res.data)
      })
      .catch(err => console.error(err))
  }, [searchQuery])

  const filterByChecks = (arrayOfShelters) => {
    const result = arrayOfShelters.filter((shelter) => {

      // female onlys checked

    })

    return result
  }




  return (
    <main className='search__container'>
      <div className='container'>

        <div className='search__bar'>
          <SearchIcon className='search__icon' />
          <input
            type='text'
            placeholder='Enter your location'
            value={searchQuery.query}
            onChange={handleChange}
          />
          <LocationOnIcon className='icon' />
        </div>

        <span className='filters-checkbox'>
          <input
            type='checkbox'
            id='female'
            name='female'
            value='female_only'
            defaultChecked={searchQuery.female_only}
            // ref='female_only'
            onChange={handleChangeCheck}
          />
          <label htmlFor='female'>Female Only</label>

          <input type='checkbox' id='male' name='male' value='male_only'
            onChange={handleChangeCheck} />
          <label htmlFor='male'>Male Only</label>

          <input type='checkbox' id='couples' name='couples' value='couples'
            onChange={handleChangeCheck}
          />
          <label htmlFor='couples'>Couples</label>

          <input type='checkbox' id='families' name='families' value='family'
            onChange={handleChangeCheck}
          />
          <label htmlFor='families'>Families</label>
          <input type='checkbox' id='pets' name='pets' value='pets'
            onChange={handleChangeCheck}
          />

          <label htmlFor='pets'>Pets</label>
        </span>

        {searchQuery.query.length ? <ShelterItems shelters={filterByChecks(shelters)} /> : null}

      </div>
    </main>
  );
};

export default Search;
