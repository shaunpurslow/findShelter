import SearchIcon from '@material-ui/icons/Search';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchBar, Filter, Checkbox, Wrapper, Results } from './styles';

import SheltersItems from '../../user/SheltersItems';

interface Props {
  setActiveSearch: (boolean) => void;
  activeSearch: boolean;
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
    family: false,
    pets: false,
  });

  const handleChange = (e) => {
    setSearchQuery((prev) => e.target.value);

    if (searchQuery.length > 2) {
      props.setActiveSearch(true);
    } else {
      props.setActiveSearch(false);
    }
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

      if (filters.family && !shelter['family']) {
        return false;
      }
      return true;
    });

    return results;
  };

  return (
    <>
      <Wrapper>
        <SearchBar>
          <input
            type='text'
            placeholder='Start typing'
            value={searchQuery}
            onChange={handleChange}
          />
          <SearchIcon className='icon' />
        </SearchBar>

        {/* FILTERS */}
        <Filter>
          <Checkbox>
            <input
              type='checkbox'
              id='femaleOnly'
              name='female'
              value='female_only'
              onChange={handleCheckboxChange}
            />
            <label htmlFor='femaleOnly'>Women</label>
          </Checkbox>

          <Checkbox>
            <input
              type='checkbox'
              id='maleOnly'
              name='male'
              value='male_only'
              onChange={handleCheckboxChange}
            />
            <label htmlFor='maleOnly'>Men</label>
          </Checkbox>

          <Checkbox>
            <input
              type='checkbox'
              id='couples'
              name='couples'
              value='couples'
              onChange={handleCheckboxChange}
            />
            <label htmlFor='couples'>Couples</label>
          </Checkbox>

          <Checkbox>
            <input
              type='checkbox'
              id='family'
              name='family'
              value='family'
              onChange={handleCheckboxChange}
            />
            <label htmlFor='family'>Families</label>
          </Checkbox>

          <Checkbox>
            <input
              type='checkbox'
              id='pets'
              name='pets'
              value='pets'
              onChange={handleCheckboxChange}
            />
            <label htmlFor='pets'>Pets</label>
          </Checkbox>
        </Filter>
      </Wrapper>

      {/* results container */}
      <Results startQuery={searchQuery.length > 2}>
        <SheltersItems shelters={filterResults(shelters)} />
      </Results>
    </>
  );
};

export default Search;
