import React from 'react';
import Shelter from './newDashboard/Shelter';

import '../styles/user/SearchResults.scss';

interface ISearchResults {
  searchResults: any[];
  changeToSearchView: any;
}
const SearchResults = (props: ISearchResults) => {
  const searchResultsItems = props.searchResults.map((searchResult) => {
    return (
      <Shelter
        key={searchResult.id}
        id={searchResult.id}
        capacity={searchResult.capacity}
        city={searchResult.city}
        confirmedReservations={searchResult.confirmed_reservations}
        country={searchResult.country}
        couples={searchResult.couples}
        email={searchResult.email}
        family={searchResult.family}
        female_only={searchResult.female_only}
        male_only={searchResult.male_only}
        name={searchResult.name}
        unconfirmedReservations={searchResult.not_confirmed_reservations}
        pets={searchResult.pets}
        phone={searchResult.phone}
        postal_code={searchResult.postal_code}
        province={searchResult.province}
        street_address={searchResult.street_address}
        thumbnail_url={searchResult.thumbnail_url}
        website_url={searchResult.website_url}
      />
    );
  });
  return (
    <>
      <div
        className='search-results--back-btn'
        onClick={props.changeToSearchView}>
        BACK
      </div>
      <div className='search-results__container'>{searchResultsItems}</div>
    </>
  );
};

export default SearchResults;
