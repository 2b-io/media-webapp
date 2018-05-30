import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import preventDefault from 'services/prevent-default'
import { actions } from 'state/interface'

import _SignInForm from './form'

const SignInForm = reduxForm({
  form: 'signIn',
  enableReinitialize: true
})(_SignInForm)

const SignIn = ({ signIn, toSignUp }) => (
  <main>
    <SignInForm onSubmit={ signIn } />
    <a href="/sign-in" onClick={ toSignUp }>Sign Up</a>
  </main>
)

export default connect(
  null,
  dispatch => ({
    signIn: credential => dispatch(actions.createSession(credential)),
    toSignUp: preventDefault(
      () => dispatch(actions.requestLocation('/sign-up'))
    )
  })
)(SignIn)
