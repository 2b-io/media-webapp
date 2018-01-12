import Radium from 'radium'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

import Button from 'components/Button'
import TextBox from 'components/inputs/TextBox'
import ResponsiveBox from 'components/ResponsiveBox'

import { form as style } from './style'

@reduxForm({ form: 'signUp' })
@Radium
class SignUpForm extends React.Component {
  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <p style={style.row}>
          <span>Enter your <b>email address</b></span>
        </p>
        <div style={style.row}>
          <Field component={TextBox}
            name="email"
            placeholder="you@example.com"
          />
        </div>
        <div style={style.row}>
          <label>
            <Field component="input"
              type="checkbox"
              name="subscribed"
            />
            <span>&nbsp;It's ok to send me (very occasional) emails about the MediaNetwork services.</span>
          </label>
        </div>
        <div style={style.row}>
          <ResponsiveBox>
            <Button type="submit">sign up</Button>
          </ResponsiveBox>
        </div>
      </form>
    )
  }
}

export default SignUpForm
