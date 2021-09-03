import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';

// Modal test from Material UI
import SimpleModal from '../Modal';

import {
  Container,
  Image,
  Info,
  Actions,
  Filters,
  Numbers,
  Details,
  Card,
  Wrapper,
} from './styles';
import { Button } from '../StyledComponents/buttons';

interface Props {
  id: number;
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
  confirmedReservations: number;
}

const filters = (boolean) => (boolean ? '/img/yes.svg' : '/img/no.svg');

const Shelter = (props: Props) => {
  const [liveBedAvailability, setLiveBedAvailability] = useState(
    Number(props.capacity) - Number(props.confirmedReservations)
  );

  // https://www.valentinog.com/blog/socket-react/
  // on initial render, set a socket event listener listening for live bed availability events
  useEffect(() => {
    const socket = io('http://localhost:8080', {
      reconnectionAttempts: 10,
      path: '/socket/',
    });

    // each shelter card listens for "updateBedAvailability" socket event emitted from backend
    socket.on('updateBedAvailability', (data) => {
      const updatedReservation = data[0];
      if (updatedReservation.shelter_id === props.id) {
        if (updatedReservation.is_confirmed === true) {
          setLiveBedAvailability((prev) => (prev -= 1));
        } else {
          setLiveBedAvailability((prev) => (prev += 1));
        }
      }
    });

    // Close socket connection on component unmount
    return (): void => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container>
      <Image>
        <img src={props.thumbnail_url} alt='shelter' />
      </Image>

      <Info>
        <h2>{props.name}</h2>

        <Filters>
          <span>
            <h4>Women</h4>
            <img src={filters(props.female_only)} alt='female only' />
          </span>
          <span>
            <h4>Men</h4>
            <img src={filters(props.male_only)} alt='male only' />
          </span>
          <span>
            <h4>Couples</h4>
            <img src={filters(props.couples)} alt='couples' />
          </span>
          <span>
            <h4>Families</h4>
            <img src={filters(props.family)} alt='family' />
          </span>
          <span>
            <h4>Pets</h4>
            <img src={filters(props.pets)} alt='pets' />
          </span>
        </Filters>

        <Details>
          <span>
            <img src='/img/location.svg' alt='location' />
            <p>
              {props.street_address}, {props.city}/{props.province},{' '}
              {props.postal_code}
            </p>
          </span>
          <span>
            <img src='/img/phone.svg' alt='phone' />
            <p>{props.phone}</p>
          </span>
          <span>
            <img src='/img/email.svg' alt='email' />
            <p>{props.email}</p>
          </span>
          <span>
            <img src='/img/website.svg' alt='website' />
            <p>{props.website_url}</p>
          </span>
          <strong>3 km away from here!</strong>
        </Details>
      </Info>
      <Wrapper>
        <Numbers>
          <Card>
            <header>QUEUE</header>
            <strong>??</strong>
          </Card>
          <Card>
            <header>CONFIRMED</header>
            <strong>{props.confirmedReservations}</strong>
          </Card>
          <Card>
            <header>CAPACITY</header>
            <strong>{props.capacity}</strong>
          </Card>
          <Card>
            <header>BEDS LEFT</header>
            <strong>{liveBedAvailability}</strong>
          </Card>
        </Numbers>

        <Actions>
          <Button>Directions</Button>
          {<SimpleModal shelterId={props.id} buttonText='Reserve' />}
        </Actions>
      </Wrapper>
    </Container>
  );
};

export default Shelter;
