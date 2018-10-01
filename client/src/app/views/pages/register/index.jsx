import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Break, Container, Link } from 'ui/elements'
import { ErrorBox, SuccessBox } from 'ui/elements'
import { Text } from 'ui/typo'
import { stateful } from 'views/common/decorators'

import _RegisterForm from './form'

const RegisterForm = reduxForm({
  form: 'register',
  enableReinitialized: true,
})(_RegisterForm)

const Register = ({
  register,
  toSignIn,
  ui: { error, idle, result }
}) => (
  <main>
    <Container center size="small">
      { result &&
        <SuccessBox>Register accepted! Please check your inbox to finish the register process.</SuccessBox>
      }
      { error &&
        <ErrorBox>An error happens when registering.</ErrorBox>
      }
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
