import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { actions } from 'state/interface'

import _SignInForm from './form'

const SignInForm = reduxForm({
  form: 'signIn',
  enableReinitialize: true
})(_SignInForm)

@connect(
  null,
  dispatch => ({
    signIn: credential => dispatch(actions.createSession(credential))
  })
)
export default class SignIn extends Component {
  render() {
    return (
      <div>
        <SignInForm onSubmit={ this.processSignIn() } />
      </div>
    )
  }

  processSignIn() {
    const { signIn } = this.props

    return signIn
  }
}
