import Radium from 'radium'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

import Button from 'components/Button'
import TextBox from 'components/inputs/TextBox'
import ResponsiveBox from 'components/ResponsiveBox'
import { InternalLink } from 'components/Link'

import { form as style } from './style'

@reduxForm({ form: 'signIn' })
@Radium
class SignInForm extends React.Component {
  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <p style={style.row}>
          <span>Enter your <b>email address</b> and <b>password</b></span>
        </p>
        <div style={style.row}>
          <Field component={TextBox}
            type="email"
            name="email"
            placeholder="you@example.com"
          />
        </div>
        <div style={style.row}>
          <Field component={TextBox}
            type="password"
            name="password"
            placeholder="password"
            autoComplete="password"
          />
        </div>
        <div style={style.row}>
          <ResponsiveBox>
            <Button style={style.signIn} type="submit">sign in</Button>
            <InternalLink style={style.forgot} link="/forgot">Forgot password?</InternalLink>
          </ResponsiveBox>
        </div>
      </form>
    )
  }
}

export default SignInForm
