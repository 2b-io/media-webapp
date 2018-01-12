import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import { registerAccount } from 'actions/account'
import { SystemLayout } from 'decorators/Layout'

import SignUpForm from './SignUpForm'
import style from './style'

@connect()
@SystemLayout
@Radium
class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this._processSignUp = this._processSignUp.bind(this)
  }

  render() {
    return (
      <div style={style.wrapper}>
        <div style={style.signUp}>
          <SignUpForm onSubmit={this._processSignUp} />
        </div>
      </div>
    )
  }

  _processSignUp(credential) {
    const { dispatch } = this.props

    dispatch(registerAccount(credential))
  }
}

export default SignUp
