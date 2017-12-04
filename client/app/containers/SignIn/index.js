import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import Layout, { SYSTEM_MODE } from 'decorators/Layout'

import { LinkButton } from 'components/Button'
import { InternalLink } from 'components/Link'
import { signIn } from 'actions/session'

import SignInForm from './SignInForm'
import { container, signInContainer, signUpPromotion } from './style'

@connect()
@Layout(SYSTEM_MODE)
@Radium
class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this._processSignIn = this._processSignIn.bind(this)
  }

  render() {
    return (
      <div style={container}>
        <div style={signInContainer}>
          <h1>Sign in to MediaNetwork</h1>
          <SignInForm onSubmit={this._processSignIn} />

        </div>
        <div style={signUpPromotion}>
          <p><b>Don't have an account on MediaNetwork yet?</b></p>
          <InternalLink link="/sign-up"><b>Create a new account</b></InternalLink>
        </div>
      </div>
    )
  }

  _processSignIn({ email, password }) {
    const { dispatch } = this.props

    dispatch(signIn({
      email,
      password
    }))
  }
}

export default SignIn
