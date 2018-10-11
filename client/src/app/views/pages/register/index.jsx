import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Break, Container, Link } from 'ui/elements'
import { ErrorBox, SuccessBox } from 'ui/elements'
import { Text } from 'ui/typo'

import _RegisterForm from './form'

const RegisterForm = reduxForm({
  form: 'register',
  enableReinitialized: true,
})(_RegisterForm)

const Register = ({
  register,
  toSignIn,
  ui: { idle }
}) => (
  <main>
    <Container center size="small">
      <RegisterForm
        onSubmit={ register }
        idle={ idle }
      />
      <Break />
      <Text mostLeft mostRight>
        Have your account already?<br />
        <Link href="/sign-in" onClick={ toSignIn }>Sign in now!</Link>
      </Text>
    </Container>
  </main>
)

export default connect(
  null,
  mapDispatch({
    register: ({ email }) => actions.register(email),
    toSignIn: () => actions.requestLocation('/sign-in')
  })
)(Register)
