import { Container } from './styles';
import { GuestItem } from '../GuestItem';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface Props {
  shelter_id: string;
}

interface IGuests {
  first_name: string;
  last_name: string;
  emergency_number: string;
  emergency_name: string;
  phone: string;
  email: string;
  status: string;
}

export const Guests = (props: Props) => {
  const [guests, setGuests] = useState<IGuests[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/guests/${props.shelter_id}`)
      .then((res) => {
        const updatedGuests = res.data;
        setGuests((prev) => [...prev, ...updatedGuests]);
      })
      .catch((err) => console.log(err));
  }, []);

  const myGuests = guests.map((guest) => (
    <GuestItem
      fullName={guest.first_name + ' ' + guest.last_name}
      email={guest.email}
      phone={guest.phone}
      emergency_contact={guest.emergency_name}
      emergency_phone={guest.emergency_number}
      status={guest.status}
    />
  ));

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Emergency Contact</th>
            <th>Emergency Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{myGuests}</tbody>
      </table>
    </Container>
  );
};
