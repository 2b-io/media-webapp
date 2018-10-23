import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Break, Container, Link, TextButton } from 'ui/elements'
import { Text } from 'ui/typo'

import StatelessSignInForm from './form'

const SignInForm = reduxForm({
  form: 'signIn',
  enableReinitialize: true,
})(StatelessSignInForm)

const SignIn = ({
  signIn,
  toForgotPassword,
  toRegister,
  ui: { idle }
}) => (
  <Container>
    <SignInForm
      onSubmit={ signIn }
      idle={ idle }
    />
    <TextButton onClick={ toForgotPassword }>
      Can&apos;t sign in?
    </TextButton>
    <Break double />
    <Text mostLeft mostRight>
      Don&apos;t have your account yet?<br />
      <Link href="/register" onClick={ toRegister }>Try it for free!</Link>
    </Text>
  </Container>
)

export default connect(
  null,
  mapDispatch({
    signIn: actions.createSession,
    toForgotPassword: () => actions.requestLocation('/forgot-password'),
    toRegister: () => actions.requestLocation('/register')
  })
)(SignIn)
