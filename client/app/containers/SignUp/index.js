import Radium from 'radium'
import React from 'react'

import { registerAccount } from 'actions/account'
import Redirect from 'components/Redirect'
import Layout, { FULLSCREEN_MODE } from 'decorators/Layout'
import UIState from 'decorators/UIState'

import SignUpForm from './SignUpForm'
import { container, signUpContainer } from './style'

@UIState('signUp')
@Layout(FULLSCREEN_MODE)
@Radium
class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this._processSignUp = this._processSignUp.bind(this)
  }

  render() {
    const { payload, error } = this.props.signUp

    if (payload) {
      // redirect to /sign-in if sign-up success
      return <Redirect path="/sign-in?create=success" />
    }

    return (
      <div style={container}>
        {error && <h1>Error</h1>}
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
