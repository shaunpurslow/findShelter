import '../../styles/user/Search.scss';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';

import ShelterItems from './ShelterItems';

interface Props {
  setSearch: any;
}
const Search = (props: Props) => {
  // saved data from search query
  const [shelters, setShelters] = useState([]);

  // controlled search input
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    maleOnly: false,
    femaleOnly: false,
    couples: false,
    families: false,
    pets: false,
  });

  const handleChange = (e) => {
    setSearchQuery((prev) => e.target.value);
  };

  // use effect: get search queries from database when values state changes
  useEffect(() => {
    axios
      .get(`http://localhost:8080/shelters/search/?value=${searchQuery}`)
      .then((res) => {
        setShelters((prev) => res.data);
      })
      .catch((err) => console.error(err));
  }, [searchQuery]);

  const handleCheckboxChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.id]: e.target.checked }));
  };

  const filterResults = (arrayOfShelters) => {
    const results = arrayOfShelters.filter((shelter) => {
      if (filters.maleOnly && !shelter['male_only']) {
        return false;
      }
      if (filters.femaleOnly && !shelter['female_only']) {
        return false;
      }
      if (filters.pets && !shelter['pets']) {
        return false;
      }
      if (filters.couples && !shelter['couples']) {
        return false;
      }
      if (filters.families && !shelter['families']) {
        return false;
      }
      return true;
    });

    return results;
  };

  // custom class names with conditional visiblity for search results
  const searchResultStyles = classNames('container--search-results', {
    hidden: !searchQuery.length,
  });

  // https://www.pluralsight.com/guides/how-to-use-geolocation-call-in-reactjs
  const handleLocationClick = (e) => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);
    });
  };

  return (
    <main className='container--main-page'>
      <div className='container--search-bar'>
        <div className='search__bar'>
          <SearchIcon className='search__icon' />
          <input
            className='search__bar--input'
            type='text'
            placeholder='Enter your location'
            value={searchQuery}
            onChange={handleChange}
          />
          <LocationOnIcon className='icon' onClick={handleLocationClick} />
        </div>

        {/* FILTERS */}
        <span className='search-filters'>
          <div className='search-filters__checkbox'>
            <input
              type='checkbox'
              id='femaleOnly'
              name='female'
              value='female_only'
              onChange={handleCheckboxChange}
            />
            <label htmlFor='femaleOnly'>Female Only</label>
          </div>

          <div className='search-filters__checkbox'>
            <input
              type='checkbox'
              id='maleOnly'
              name='male'
              value='male_only'
              onChange={handleCheckboxChange}
            />
            <label htmlFor='maleOnly'>Male Only</label>
          </div>

          <div className='search-filters__checkbox'>
            <input
              type='checkbox'
              id='couples'
              name='couples'
              value='couples'
              onChange={handleCheckboxChange}
            />
            <label htmlFor='couples'>Couples</label>
          </div>

          <div className='search-filters__checkbox'>
            <input
              type='checkbox'
              id='families'
              name='families'
              value='family'
              onChange={handleCheckboxChange}
            />
            <label htmlFor='families'>Families</label>
          </div>

          <div className='search-filters__checkbox'>
            <input
              type='checkbox'
              id='pets'
              name='pets'
              value='pets'
              onChange={handleCheckboxChange}
            />
            <label htmlFor='pets'>Pets</label>
          </div>
        </span>
      </div>

      {/* results container */}
      <div className={searchResultStyles}>
        {searchQuery.length ? (
          <ShelterItems shelters={filterResults(shelters)} />
        ) : null}
      </div>
    </main>
  );
};

export default Search;
