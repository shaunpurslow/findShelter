import { Row } from './styles';

interface Props {
  fullName: string;
  email: string;
  phone: string;
  emergency_contact: string;
  emergency_phone: string;
  status: string;
}

export const GuestItem = (props: Props) => {
  return (
    <Row>
      <td>{props.fullName}</td>
      <td>{props.email}</td>
      <td>{props.phone}</td>
      <td>{props.emergency_contact}</td>
      <td>{props.emergency_phone}</td>
      <td>{props.status}</td>
    </Row>
  );
};
