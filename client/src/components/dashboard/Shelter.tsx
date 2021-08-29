import { useState } from 'react';
import '../../styles/dashboard/Main.scss';
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

const filters = boolean => boolean ? '/img/yes.svg' : '/img/no.svg';

const Shelter = (props: Props) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    console.log(showModal)
    setShowModal(prev => !prev)
  }

  const shelterView = (
    <div className="individual-shelter" onClick={toggleModal}>
      <div>
        <img src={props.thumbnail_url} alt='shelter' className='shelter-image' />
      </div>

      <div className="shelter-info">
        <h2>{props.name}</h2>
        <span>
          <img src={filters(props.couples)} alt="couples" />
          <h4>couples</h4>
          <img src={filters(props.female_only)} alt="female only" />
          <h4>female only</h4>
          <img src={filters(props.male_only)} alt="male only" />
          <h4>male only</h4>
          <img src={filters(props.family)} alt="family" />
          <h4>families</h4>
          <img src={filters(props.pets)} alt="pets" />
          <h4>pets</h4>
        </span>
        <span>
          <img src='/img/location.svg' alt="location" />
          <p>{props.street_address}, {props.city}/{props.province}, {props.postal_code}</p>
        </span>
        <span>
          <img src='/img/phone.svg' alt="phone" />
          <p>{props.phone}</p>
        </span>
        <span>
          <img src='/img/email.svg' alt="email" />
          <p>{props.email}</p>
        </span>
        <span>
          <img src='/img/website.svg' alt="website" />
          <p>{props.website_url}</p>
        </span>
        <span>
          <strong>3 km away from here!</strong>
        </span>
      </div>
      <div className='info-cards'>
        <div>
          <header>CAPACITY</header>
          <strong>{props.capacity}</strong>
          <header>QUEUE</header>
          <strong>3</strong>
        </div>
        <div>
          <header>BEDS FILLED</header>
          <strong>53</strong>
          <header>BEDS REMAINING</header>
          <strong>44</strong>
        </div>
      </div>
    </div >


  );

  return (showModal ? <ModalShelter toggleModal={toggleModal} showModal={showModal} /> : shelterView);
};

export default Shelter;