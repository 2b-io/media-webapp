import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import { signIn } from 'actions/session'
import { LinkButton } from 'components/Button'
import { InternalLink } from 'components/Link'
import Redirect from 'components/Redirect'
import Layout, { SYSTEM_MODE } from 'decorators/Layout'

import SignInForm from './SignInForm'
import style from './style'

@connect(state => ({
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
    const { verified } = this.props.session

    if (verified) {
      // redirect to /dashboard if sign in success
      // TODO redirect to last page
      return <Redirect path="/dashboard" />
    }

    return this._renderLayout()
  }

  _renderLayout() {
    return (
      <div style={style.wrapper}>
        <div style={style.signIn}>
          <SignInForm onSubmit={this._processSignIn} />
        </div>
        <div style={style.promoteSignUp}>
          <p style={style.signUpQuestion}>
            <b>Don't have an account on MediaNetwork yet?</b>
          </p>
          <LinkButton link="/sign-up">create a new account</LinkButton>
        </div>
      </div>
    )
  }

  _processSignIn(credential) {
    const { dispatch } = this.props

    dispatch(signIn(credential))
  }
}

export default SignIn
