import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import '../styles/user/NewSearch.scss';
import axios from 'axios';

const SEARCH_MODE = {
  MAP_SEARCH: 'MAP_SEARCH',
  LIST_SEARCH: 'LIST_SEARCH',
};

interface ICity {
  id: number;
  city: string;
  province: string;
}

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchMode, setSearchMode] = useState(SEARCH_MODE.LIST_SEARCH);
  const [cityOptions, setCityOptions] = useState<ICity[]>([]);

  // Load cities options on initial load
  useEffect(() => {
    axios
      .get(`http://localhost:8080/cities`)
      .then((res) => setCityOptions((prev) => res.data))
      .catch((err) => console.log(err));
  }, []);

  // watch search query and add city matches to the dropdown

  const mapSearchToggleStyle = classNames({
    selected: searchMode === SEARCH_MODE.MAP_SEARCH,
  });
  const listSearchToggleStyle = classNames({
    selected: searchMode === SEARCH_MODE.LIST_SEARCH,
  });

  const handleToggleClick = (e) => {
    if (e.target.closest('#map-search-toggle')) {
      setSearchMode(SEARCH_MODE.MAP_SEARCH);
    }

    if (e.target.closest('#list-search-toggle')) {
      setSearchMode(SEARCH_MODE.LIST_SEARCH);
    }
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmitClick = () => {
    // make GET request
    axios
      .get(`http://localhost:8080/shelters/search?value=${searchValue}`)
      .then((res) => {
        props.setUserSearchResults(res.data);
        if (searchMode === SEARCH_MODE.MAP_SEARCH) {
          props.changeToMapResultsView();
          return;
        }
        props.changeToListResultsView();
      })
      .catch((err) => console.log(err));
  };

  const handleDropDownItemClick = (e) => {
    const clickedCity = e.target.innerText.split(',')[0];
    setSearchValue((prev) => clickedCity);
  };

  // Filter cities for dropdown
  const filteredCityOptions = cityOptions
    .filter((cityOption) => {
      const lowerCasedCity = cityOption.city.toLowerCase();
      return lowerCasedCity.includes(searchValue.toLowerCase());
    })
    .map((filteredCity) => {
      return (
        <li
          key={filteredCity.id}
          className='dropdown-menu__item'
          onClick={handleDropDownItemClick}>
          {`${filteredCity.city}, ${filteredCity.province}`}
        </li>
      );
    });

  //typewriter effect to the second paragraph:
  const typewriter = classNames('typewriter-hidden', {
    selected: searchMode === SEARCH_MODE.MAP_SEARCH,
  });

  return (
    <div className='search-container'>
      <div className='search-container__description'>
        <h1>Find real time bed availability for shelters in your city</h1>
        <p className='typewriter-text'>
          Find shelter is a community focused application to help people of all
          walks
        </p>
        <p className='typewriter-text-finished'>
          of life find a place to spend the night.
        </p>
      </div>

      <div className='search-container__search-bar'>
        <div className='search-bar__mode-toggle' onClick={handleToggleClick}>
          <div className={listSearchToggleStyle} id='list-search-toggle'>
            List Search
          </div>
          <div className={mapSearchToggleStyle} id='map-search-toggle'>
            Map Search
          </div>
        </div>
        <div className='search-bar__input'>
          <input
            type='text'
            value={searchValue}
            onChange={handleInputChange}
            placeholder='Enter your city . . .'
          />
          <button type='submit' onClick={handleSubmitClick}>
            Search
          </button>
        </div>
      </div>
      {searchValue.length >= 2 && (
        <ul className='dropdown-menu'>{filteredCityOptions}</ul>
      )}
    </div>
  );
};

export default Search;
