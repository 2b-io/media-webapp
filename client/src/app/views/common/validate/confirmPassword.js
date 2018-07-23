const confirmPassword = values => (
  values && values.password ? 'Required' :
    values.password !== values.rePassword ?
      'password and confirm password do not match' : 'confirm password success'
)

export default confirmPassword
