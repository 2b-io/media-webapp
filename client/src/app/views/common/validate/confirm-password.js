const confirmPassword = (values) => {
  const error = {}
  if (values.password !== values.rePassword) {
    error.rePassword = 'Confirm Password not match Password'
  }
  return error
}

export default confirmPassword
