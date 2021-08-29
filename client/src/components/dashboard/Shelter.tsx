import { useState } from 'react';
import '../../styles/dashboard/Main.scss';
import ModalShelter from './ModalShelter';

const filters = boolean => boolean ? '/img/yes.svg' : '/img/no.svg';

const Shelter = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    console.log(showModal)
    setShowModal(prev => !prev)
  }

  const shelterView = (
    <div className="individual-shelter" onClick={toggleModal}>
      <div>
        <img src='/img/mock-shelter-1.jpg' alt='shelter' className='shelter-image' />
      </div>

      <div>
        <h2>Family And Friends Community Shelter</h2>
        <span>
          <img src={filters(true)} alt="couples" />
          <h4>couples</h4>
          <img src={filters(false)} alt="female only" />
          <h4>female only</h4>
          <img src={filters(false)} alt="male only" />
          <h4>male only</h4>
          <img src={filters(true)} alt="family" />
          <h4>families</h4>
          <img src={filters(true)} alt="pets" />
          <h4>pets</h4>
        </span>
        <span>
          <img src='/img/location.svg' alt="location" />
          <p>303 1st Street SW, Calgary/AB, T2P 0A5</p>
        </span>
        <span>
          <img src='/img/phone.svg' alt="phone" />
          <p>(403)296-8000</p>
        </span>
        <span>
          <img src='/img/email.svg' alt="email" />
          <p>info@familynfriends.com</p>
        </span>
        <span>
          <img src='/img/website.svg' alt="website" />
          <p>familynfriends.com</p>
        </span>
        <span>
          <strong>3 km away from here!</strong>
        </span>
      </div>
    </div >
  );

  return (showModal ? <ModalShelter toggleModal={toggleModal} showModal={showModal} /> : shelterView);
};

export default Shelter;