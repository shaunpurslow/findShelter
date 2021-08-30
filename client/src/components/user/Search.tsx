import '../../styles/user/Search.scss';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const Search = () => {
  return (
    <main className='search__container'>
      <div className='container'>
        <div className='search__bar'>
          <SearchIcon className='search__icon'/>
          <input type='text' placeholder='Enter your location' />
          <LocationOnIcon className='icon' />
        </div>
      </div>
      <button className='container__submit-btn'>Search</button>
    </main>
  );
};

export default Search;
