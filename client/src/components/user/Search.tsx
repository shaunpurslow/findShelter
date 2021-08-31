import '../../styles/user/Search.scss';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useState } from 'react';

interface Props {
  setSearch: any;
}
const Search = (props: Props) => {
  const [values, setValues] = useState('')

  const handleChange = (e) => {
    interface IDic {
      value: string;
    }
    const { value }: IDic = e.target;
    setValues(value);
    console.log('value', value)
    console.log('values >>>', values)
    props.setSearch(prev => ({ ...prev, values }));
  }

  return (
    <main className='search__container'>
      <div className='container'>
        <div className='search__bar'>
          <SearchIcon className='search__icon' />
          <input
            type='text'
            placeholder='Enter your location'
            value={values}
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
      </div>
      {/* <button className='container__submit-btn'>Search</button> */}

    </main>
  );
};

export default Search;
