import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import SignUpForm from './SignUpForm'

@connect()
@Radium
class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this._processSignUp = this._processSignUp.bind(this)
  }

  render() {
    return (
      <div id="sign-up-container">
        <SignUpForm onSubmit={this._processSignUp} />
      </div>
    )
  }

  _processSignUp({ tenantName, tenantSlug, administratorEmail }) {
  }
}

export default SignUp
