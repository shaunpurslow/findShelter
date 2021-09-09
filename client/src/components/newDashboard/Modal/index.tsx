import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { ReservationForm } from '../ReservationForm';
import { Container, Button } from './styles';
// import { Button } from '../StyledComponents/buttons';

interface Props {
  shelterId: number;
  buttonText: string;
  setDashboardState: any;
}

export default function SimpleModal(props: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Container>
      <ReservationForm
        shelterId={props.shelterId}
        handleClose={handleClose}
        setDashboardState={props.setDashboardState} />
    </Container>
  );

  return (
    <>
      <Button type='button' onClick={handleOpen}>
        {props.buttonText}
      </Button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </>
  );
}
