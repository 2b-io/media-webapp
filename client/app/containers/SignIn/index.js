import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import { signIn } from 'actions/session'
import { LinkButton } from 'components/Button'
import { InternalLink } from 'components/Link'
import Redirect from 'components/Redirect'
import Layout, { SYSTEM_MODE } from 'decorators/Layout'
import UIState from 'decorators/UIState'

import SignInForm from './SignInForm'
import style from './style'

@UIState('signIn', state => ({
  session: state.app.session
}))
@Layout(SYSTEM_MODE)
@Radium
class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this._processSignIn = this._processSignIn.bind(this)
  }

  render() {
    const { payload, error } = this.props['UI/signIn']

    if (payload) {
      // redirect to /dashboard if sign in success
      // TODO redirect to last page
      console.log('sign in success')
      return <Redirect path="/dashboard" />
    }

    const { verified } = this.props.session

    if (verified) {
      // redirect to /dashboard if sign in success
      // TODO redirect to last page
      console.log('session verified')
      return <Redirect path="/dashboard" />
    }

    return this._renderLayout(error)

    return (
      <div style={container}>
        {error ? <h1>Error</h1> : null}
        <div style={signInContainer}>
          <h1>Sign in to MediaNetwork</h1>
          <SignInForm onSubmit={this._processSignIn} />
          <InternalLink link="/forgot">Forgot password?</InternalLink>
        </div>
        <div style={signUpPromotion}>
          <p><b>Don't have an account on MediaOnDemand yet?</b></p>
          <InternalLink link="/sign-up">Create a new account</InternalLink>
        </div>
      </div>
    )
  }

  _renderLayout(error) {
    return (
      <div style={style.wrapper}>
        <div style={style.signIn}>
          <SignInForm onSubmit={this._processSignIn} />
        </div>
        <div style={style.promoteSignUp}>
          <p><b>Don't have an account on MediaNetwork yet?</b></p>
          <InternalLink link="/sign-up">Create a new account</InternalLink>
        </div>
      </div>
    )
  }

  _processSignIn({ email, password }) {
    const { dispatch } = this.props

    dispatch(signIn({
      email,
      password
    }))
  }
}

export default SignIn
