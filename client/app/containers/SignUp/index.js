import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import { registerAccount } from 'actions/account'
import Layout, { FULLSCREEN_MODE } from 'decorators/Layout'

import SignUpForm from './SignUpForm'
import { container, signUpContainer } from './style'

@connect()
@Layout(FULLSCREEN_MODE)
@Radium
class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this._processSignUp = this._processSignUp.bind(this)
  }

  render() {
    return (
      <div style={container}>
        <div style={signUpContainer}>
          <h1>Create a new account</h1>
          <SignUpForm onSubmit={this._processSignUp} />
        </div>
      </div>
    )
  }

  _processSignUp({ email }) {
    const { dispatch } = this.props

    dispatch(registerAccount({
      email
    }))
  }
}

export default SignUp
