import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';

import {
  Container,
  Image,
  Info,
  Filters,
  Wrapper,
  Details,
  Card
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
  unconfirmedReservations: number;
}

const filters = (boolean) => (boolean ? '/img/yes.svg' : '/img/no.svg');

const Shelter = (props: Props) => {
  const [liveBedAvailability, setLiveBedAvailability] = useState(
    Number(props.capacity) - Number(props.confirmedReservations)
  );
  const [liveQueue, setLiveQueue] = useState(
    Number(props.unconfirmedReservations)
  );

  useEffect(() => {
    setLiveBedAvailability(
      (prev) => Number(props.capacity) - Number(props.confirmedReservations)
    );
  }, [props.confirmedReservations]);

  useEffect(() => {
    setLiveQueue((prev) => Number(props.unconfirmedReservations));
  }, [props.unconfirmedReservations]);

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
          setLiveQueue((prev) => (prev -= 1));
        } else {
          setLiveBedAvailability((prev) => (prev += 1));
          setLiveQueue((prev) => (prev += 1));
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
        </Details>
        <Wrapper>
          <Card>
            <header>
              <h5>BEDS LEFT</h5>
              <img src="/img/available.svg" alt="available" />
            </header>
            <strong>{liveBedAvailability}</strong>
          </Card>
          <Button>Directions</Button>
        </Wrapper>
      </Info>
    </Container>
  );
};

export default Shelter;
