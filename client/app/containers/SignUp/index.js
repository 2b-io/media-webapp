import Radium from 'radium'
import React from 'react'

import { registerAccount } from 'actions/account'
import Redirect from 'components/Redirect'
import Layout, { SYSTEM_MODE } from 'decorators/Layout'
import UIState from 'decorators/UIState'

import SignUpForm from './SignUpForm'
import style from './style'

@UIState('signUp')
@Layout(SYSTEM_MODE)
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
      <div style={style.wrapper}>
        <div style={style.signUp}>
          {error && <h1>Error</h1>}
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
