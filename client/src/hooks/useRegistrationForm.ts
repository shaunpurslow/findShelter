import axios from 'axios';
import { useState } from 'react';
import validateInputs from '../helpers/validateInputs';

const useRegistrationForm = (setAppState): any => {
  const [formValues, setFormValues] = useState({
    shelterName: '',
    capacity: '',
    streetAddress: '',
    city: '',
    province: '',
    postalCode: '',
    country: '',
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleSubmit = (e): void => {
    e.preventDefault();
    const inputsNotCorrect = !validateInputs(formValues);
    if (inputsNotCorrect) {
      return;
    }

    const registrationData = {
      // shelter specific data
      name: formValues.shelterName,
      street_address: formValues.streetAddress,
      city: formValues.city,
      province: formValues.province,
      postal_code: formValues.postalCode,
      country: formValues.country,
      capacity: formValues.capacity,
      // staff specific data
      password: formValues.password,
      email: formValues.email,
    };

    axios
      .post('/register', registrationData)
      .then((resp) => {
        const { user, shelter } = resp.data;
        setAppState((prev) => ({ ...prev, user, shelter }));
      })
      .catch((e) => e.message);
  };

  const handleChange = (e: any): void => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  return [formValues, handleChange, handleSubmit];
};

export default useRegistrationForm;
