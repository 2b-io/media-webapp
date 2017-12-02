import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import { LinkButton } from 'components/Button'
import { signIn } from 'actions/session'

import SignInForm from './SignInForm'
import style from './style'

@connect()
@Radium
class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this._processSignIn = this._processSignIn.bind(this)
  }

  render() {
    return (
      <div id="sign-in-container"
        style={style.container}>
        <div>
          <SignInForm onSubmit={this._processSignIn} />
        </div>
        <LinkButton link="/sign-up">Sign Up</LinkButton>
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
