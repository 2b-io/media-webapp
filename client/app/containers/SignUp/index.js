import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

import { registerAccount } from 'actions/account'
import { ajaxClear } from 'actions/ajax'
import Redirect from 'components/Redirect'
import Layout, { FULLSCREEN_MODE } from 'decorators/Layout'

import SignUpForm from './SignUpForm'
import { container, signUpContainer } from './style'

@connect(state => ({ register: state.ajax.register }))
@Layout(FULLSCREEN_MODE)
@Radium
class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this._processSignUp = this._processSignUp.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(ajaxClear('register'))
  }

  render() {
    const { data, error } = (this.props.register || {})

    if (data) {
      // redirect to /sign-in if sign-up success
      return <Redirect path="/sign-in" />
    }

    return (
      <div style={container}>
        {error ? <h1>Error</h1> : null}
        <div style={signUpContainer}>
          <h1>Create a new account</h1>
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
