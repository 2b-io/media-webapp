import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import { LinkButton } from 'components/Button'
import { signIn } from 'actions/session'

import SignInForm from './SignInForm'
import { containerStyle } from './style'

@connect()
@Radium
class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this._processSignIn = this._processSignIn.bind(this)
  }

  render() {
    return (
      <div id="sign-in-container">
        <div style={containerStyle}>
          <h1>Sign in to MediaOnDemand</h1>
          <SignInForm onSubmit={this._processSignIn} />
          <LinkButton link="/sign-up">Sign Up</LinkButton>
        </div>
      </div>
    )
  }

  _processSignIn({ email, password }) {
    let { dispatch } = this.props

    dispatch(signIn({
      email,
      password
    }))
  }
}

export default SignIn
