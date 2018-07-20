
const validateRePassword = values => {

  const errors = {}
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password !== values.rePassword) {
    errors.email = 'password and rePassword do not match'
  }
  return errors
}

export default validateRePassword
