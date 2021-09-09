import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';

import { Search } from '../Search';
import { Wrapper, Card, H2, BookReservationBtn, Container } from './styles';
import SimpleModal from '../Modal';

interface Props {
  capacity: any;
  confirmedReservations: any;
  unconfirmedReservations: any;
  setDashboardState: any;
  dashboardState: any;
  id: any;
}

export const Overview = (props: Props) => {
  const [liveBedAvailability, setLiveBedAvailability] = useState(
    Number(props.capacity) - Number(props.confirmedReservations)
  );
  const [liveQueue, setLiveQueue] = useState(
    Number(props.unconfirmedReservations)
  );
  const loggedInUser: any = localStorage.getItem('user');
  const parsedLoggedInUser = JSON.parse(loggedInUser);
  const loggedInShelterID = Number(parsedLoggedInUser.shelter_id);

  // props.capacity will initially be null on the first app render
  // to fix the local state not ever being updated, useEffect hook will watch for changes to the props.capacity
  // this pattern is equivalent to the former componentWillReceiveProps that would allow local state to be updated when props have changed due to an async update (network call) in parent component
  useEffect(() => {
    setLiveBedAvailability(
      (prev) => Number(props.capacity) - Number(props.confirmedReservations)
    );
  }, [props.confirmedReservations]);

  useEffect(() => {
    setLiveQueue((prev) => props.unconfirmedReservations);
  }, [props.unconfirmedReservations]);

  useEffect(() => {
    const socket = io('http://localhost:8080', {
      reconnectionAttempts: 10,
      path: '/socket/',
    });

    // overview listens for "updateBedAvailability" socket event emitted from backend
    socket.on('updateBedAvailability', (data) => {
      const updatedReservation = data[0];
      if (updatedReservation.shelter_id === loggedInShelterID) {
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
    <>
      <Wrapper>
        <Card>
          <header>
            <h5>CAPACITY</h5>
            <img src="/img/bed.svg" alt="capacity" />
          </header>
          <strong>{props.capacity}</strong>
        </Card>
        <Card>
          <header>
            <h5>QUEUE</h5>
            <img src="/img/queue.svg" alt="queue" />
          </header>
          <strong>{liveQueue}</strong>
        </Card>
        <Card>
          <header>
            <h5>BEDS FILLED</h5>
            <img src="/img/reserved.svg" alt="reserved" />
          </header>
          <strong>
            {props.capacity && props.capacity - liveBedAvailability}
          </strong>
        </Card>
        <Card>
          <header>
            <h5>BEDS LEFT</h5>
            <img src="/img/available.svg" alt="available" />
          </header>
          <strong>{!isNaN(liveBedAvailability) && liveBedAvailability}</strong>
        </Card>
      </Wrapper>
      <BookReservationBtn>
        {
          <SimpleModal
            shelterId={props.id}
            buttonText='BOOK IN A GUEST RESERVATION'
            setDashboardState={props.setDashboardState}
          />
        }
      </BookReservationBtn>
      <Container>
        <H2>Other Shelters Near By</H2>
        <Search
          setDashboardState={props.setDashboardState}
          dashboardState={props.dashboardState}
        />
      </Container>
    </>
  );
};
