import Shelter from "./Shelter";
import '../../styles/dashboard/Main.scss';

interface Props {
  toggleModal: (e: any) => void;
  showModal?: boolean;
}

const filters = boolean => boolean ? '/img/yes.svg' : '/img/no.svg';

const ModalShelter = (props: Props) => {
  return (
    <div className="modal-overlay" onClick={() => props.toggleModal}>
      <Shelter />
    </div>
  )
};

export default ModalShelter;