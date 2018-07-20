
const validateNumber = values => {
  const errors = {}
  if (!values.number) {
    errors.number = 'Required'
  } else if (!/^[0-9]+$/.test(values.number)) {
    errors.number = 'Invalid number'
  }
  return errors
}

export default validateNumber
