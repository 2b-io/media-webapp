import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { actions } from 'state/interface'
import { Container, Link, Paragraph } from 'ui/elements'

import _SignInForm from './form'

const SignInForm = reduxForm({
  form: 'signIn',
  enableReinitialize: true
})(_SignInForm)

const SignIn = ({ signIn, toSignUp }) => (
  <main>
    <Container center size="small">
      <SignInForm onSubmit={ signIn } />
      <Paragraph>
        Don't have your account yet?<br />
        <Link href="/sign-up" onClick={ toSignUp }>Try it for free!</Link>
      </Paragraph>
      <Paragraph>
        Trouble at signing in?<br />
        <Link href="/password-recover" onClick={ toSignUp }>We are here for help.</Link>
      </Paragraph>
    </Container>
  </main>
)

export default connect(
  null,
  dispatch => ({
    signIn: credential => dispatch(actions.createSession(credential)),
    toSignUp: () => dispatch(actions.requestLocation('/sign-up'))
  })
)(SignIn)
