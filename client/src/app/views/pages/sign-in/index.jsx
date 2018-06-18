import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
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
        <Link href="/forgot-password">We are here for help.</Link>
      </Paragraph>
    </Container>
  </main>
)

export default connect(
  null,
  mapDispatch({
    signIn: credential => actions.createSession(credential),
    toSignUp: () => actions.requestLocation('/sign-up')
  })
)(SignIn)
