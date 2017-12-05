import Radium from 'radium'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

import Button from 'components/Button'
import TextBox from 'components/inputs/TextBox'
import PasswordBox from 'components/inputs/PasswordBox'

import { formRowStyle } from './style'

@reduxForm({ form: 'signIn' })
@Radium
class SignInForm extends React.Component {
  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <p style={formRowStyle}>
          Enter your <b>email address</b> and <b>password</b>
        </p>
        <div style={formRowStyle}>
          <Field component={TextBox}
            name="email"
            placeholder="you@example.com"
          />
        </div>
        <div style={formRowStyle}>
          <Field component={PasswordBox}
            name="password"
            placeholder="password"
          />
        </div>
        <div style={formRowStyle}>
          <Button type="submit">Sign in</Button>
        </div>
      </form>
    )
  }
}

export default SignInForm
