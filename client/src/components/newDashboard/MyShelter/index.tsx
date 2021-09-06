import useRegistrationForm from '../../../hooks/useRegistrationForm';
import { Container, Actions, Form, Header } from './styles';
import { Button } from '../StyledComponents/buttons';
import { Logo } from '../StyledComponents/logo';

export const MyShelter = () => {
  const [formValues, handleChange, handleSubmit] =
    useRegistrationForm({});

  return (
    <>
    </>
  );
};