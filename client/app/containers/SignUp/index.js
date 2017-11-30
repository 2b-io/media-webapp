import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'
import { registerTenant } from 'actions/tenant'

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

  _processSignUp({ name, slug, email }) {
    const { dispatch } = this.props

    dispatch(registerTenant({
      name,
      slug,
      email
    }))
  }
}

export default SignUp
