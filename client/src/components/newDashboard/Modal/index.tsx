import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { ReservationForm } from '../ReservationForm'
import { Container } from './styles'
import { Button } from '../StyledComponents/buttons';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

interface Props {
  shelterId: number;
  buttonText: string;
}

export default function SimpleModal(props: Props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Container style={modalStyle}>
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