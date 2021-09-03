import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { ReservationForm } from '../ReservationForm'
import { Container } from './styles'
import { Button } from '../StyledComponents/buttons';

interface Props {
  shelterId: number;
  buttonText: string;
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
      />
    </Container>
  );

  return (
    <>
      <Button type="button" onClick={handleOpen}>
        {props.buttonText}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </>
  );
};