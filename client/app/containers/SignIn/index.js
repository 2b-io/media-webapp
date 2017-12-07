import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import { ajaxClear } from 'actions/ajax'
import { signIn } from 'actions/session'
import { LinkButton } from 'components/Button'
import { InternalLink } from 'components/Link'
import Redirect from 'components/Redirect'
import Layout, { SYSTEM_MODE } from 'decorators/Layout'
import UnauthRequired from 'decorators/UnauthRequired'

import SignInForm from './SignInForm'
import { container, signInContainer, signUpPromotion } from './style'

const EMPTY = {}

@connect(state => ({
  signIn: state.ajax.signIn || EMPTY
}))
@UnauthRequired
@Layout(SYSTEM_MODE)
@Radium
class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this._processSignIn = this._processSignIn.bind(this)
  }

  // componentWillMount() {
  //   console.log('componentWillMount')

  //   const { dispatch } = this.props

  //   dispatch(ajaxClear('signIn'))
  // }

  render() {
    const { data, error } = (this.props.signIn || {})

    console.log('render', data, error)

    if (data) {
      // redirect to /dashboard if sign in success
      // TODO redirect to last page
      return null
    }

    return (
      <div style={container}>
        {error ? <h1>Error</h1> : null}
        <div style={signInContainer}>
          <h1>Sign in to MediaNetwork</h1>
          <SignInForm onSubmit={this._processSignIn} />
          <InternalLink link="/forgot">Forgot password?</InternalLink>
        </div>
        <div style={signUpPromotion}>
          <p><b>Don't have an account on MediaNetwork yet?</b></p>
          <InternalLink link="/sign-up"><b>Create a new account</b></InternalLink>
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
