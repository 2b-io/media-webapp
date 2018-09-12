import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Break, Container, ErrorBox, Link } from 'ui/elements'
import { stateful } from 'views/common/decorators'
import { Text } from 'ui/typo'

import _SignInForm from './form'

const SignInForm = reduxForm({
  form: 'signIn',
  enableReinitialize: true,
})(_SignInForm)

const SignIn = ({
  signIn,
  toForgotPassword,
  toRegister,
  ui: { error, idle }
}) => (
  <Container>
    { error &&
      <ErrorBox>Email and password do not match.</ErrorBox>
    }
    <SignInForm
      onSubmit={ signIn }
      idle={ idle }
    />
    <Break />
    <Text mostLeft mostRight>
      Don&apos;t have your account yet?<br />
      <Link href="/register" onClick={ toRegister }>Try it for free!</Link>
    </Text>
    <Text mostLeft mostRight>
      Trouble at signing in?<br />
      <Link href="/forgot-password" onClick={ toForgotPassword }>We are here for help.</Link>
    </Text>
  </Container>
)

export default stateful({
  component: 'SignIn'
})(
  connect(
    null,
    mapDispatch({
      signIn: credential => actions.createSession(credential),
      toForgotPassword: () => actions.requestLocation('/forgot-password'),
      toRegister: () => actions.requestLocation('/register')
    })
  )(SignIn)
)
