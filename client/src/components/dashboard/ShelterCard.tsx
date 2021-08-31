import { useState } from 'react';
import '../../styles/user/ShelterCard.scss';
import ModalShelter from './ModalShelter';

interface Props {
  key: number;
  name: string;
  street_address: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  phone: string;
  email: string;
  thumbnail_url: string;
  website_url: string;
  capacity: number;
  couples: boolean;
  female_only: boolean;
  male_only: boolean;
  family: boolean;
  pets: boolean;
}

const filters = (boolean) => (boolean ? '/img/yes.svg' : '/img/no.svg');

const ShelterCard = (props: Props) => {
  return (
    <main className='card__container'>
    <div className='individual__shelter'>
      <div>
        <img
          src={props.thumbnail_url}
          alt='shelter'
          className='shelter-image'
        />
      </div>

      <div className='shelter-info'>
        <h2>{props.name}</h2>
        <span className='shelter-info__filter'>
          <div>
            <h4>female</h4>
            <img src={filters(props.female_only)} alt='female only' />
          </div>
          <div>
            <h4>male</h4>
            <img src={filters(props.male_only)} alt='male only' />
          </div>
          <div>
            <h4>couples</h4>
            <img src={filters(props.couples)} alt='couples' />
          </div>
          <div>
            <h4>families</h4>
            <img src={filters(props.family)} alt='family' />
          </div>
          <div>
            <h4>pets</h4>
            <img src={filters(props.pets)} alt='pets' />
          </div>
        </span>

        <div>
          <span className='shelter-info__details'>
            <img src='/img/location.svg' alt='location' />
            <p>
              {props.street_address}, {props.city}/{props.province},{' '}
              {props.postal_code}
            </p>
          </span>
          <span className='shelter-info__details'>
            <img src='/img/phone.svg' alt='phone' />
            <p>{props.phone}</p>
          </span>
          <span className='shelter-info__details'>
            <img src='/img/email.svg' alt='email' />
            <p>{props.email}</p>
          </span>
          <span className='shelter-info__details'>
            <img src='/img/website.svg' alt='website' />
            <p>{props.website_url}</p>
          </span>
        </div>
        <div className='info-cards'>
          <div className='info-cards--queue'>
            <header>QUEUE</header>
            <strong>3</strong>
          </div>
          <div className='info-cards--beds'>
            <header>BEDS LEFT</header>
            <strong>44</strong>
          </div>
          <div className='info-cards--capacity'>
            <header>CAPACITY</header>
            <strong>{props.capacity}</strong>
          </div>
        </div>
      </div>
      <span className='shelter__km'>
        <strong>3 km away from here!</strong>
      </span>
      <div className='bottom__buttons'>
        <button>Directions</button>
        <button>Reserve Now</button>
      </div>
    </div>
    </main>
  );
};

export default ShelterCard;
