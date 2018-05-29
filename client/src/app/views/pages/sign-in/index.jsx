import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions } from 'state/interface'

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
        <button onClick={ this.processSignIn() }>Sign In</button>
      </div>
    )
  }

  processSignIn() {
    const { signIn } = this.props

    return () => {
      signIn({
        email: 'd@dapps.me'
      })
    }
  }
}
