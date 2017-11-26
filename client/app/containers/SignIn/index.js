import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import { signInRequest } from 'actions/session'

import SignInForm from './SignInForm'

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
        <div>
          <SignInForm onSubmit={this._processSignIn} />
        </div>
      </div>
    )
  }

  _processSignIn({ username, password }) {
    let { dispatch } = this.props

    dispatch(signInRequest({
      username,
      password
    }))
  }
}

export default SignIn
