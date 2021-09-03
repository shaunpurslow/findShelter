import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';

import { Wrapper, Card, H2 } from './styles';

interface Props {
  capacity: any;
  confirmedReservations: any;
}
export const Overview = (props: Props) => {
  const [liveBedAvailability, setLiveBedAvailability] = useState(
    Number(props.capacity) - Number(props.confirmedReservations)
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
  }, [props.capacity]);

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
    <>
      <Wrapper>
        <Card>
          <header>CAPACITY</header>
          <strong>{props.capacity}</strong>
        </Card>
        <Card>
          <header>QUEUE</header>
          <strong>??</strong>
        </Card>
        <Card>
          <header>BEDS FILLED</header>
          <strong>
            {props.capacity && props.capacity - liveBedAvailability}
          </strong>
        </Card>
        <Card>
          <header>BEDS LEFT</header>
          <strong>{!isNaN(liveBedAvailability) && liveBedAvailability}</strong>
        </Card>
      </Wrapper>
      <H2>Other Shelters Near By</H2>
    </>
  );
};
