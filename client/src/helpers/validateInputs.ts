const validateInputs = (formValues): boolean => {
  const errors: string[] = [];
  // validate inputs
  // password
  if (formValues.password !== formValues.passwordConfirmation) {
    errors.push("passwords don't match");
    //TODO: toggle error warning on the front end
  }

  // email
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const emailRegEx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegEx.test(formValues.email)) {
    errors.push("passwords doesn't match");
  }

  // postal code
  // only supports canadian postal codes
  // https://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function
  const postalCodeRegEx =
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
  if (!postalCodeRegEx.test(formValues.postalCode)) {
    errors.push('bad postal code');
  }

  if (errors.length !== 0) {
    return false;
  }
  return true;
};

export default validateInputs;
