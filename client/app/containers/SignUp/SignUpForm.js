import Radium from 'radium'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

import Button from 'components/Button'
import TextBox from 'components/inputs/TextBox'

import { formRowStyle } from './style'

@reduxForm({ form: 'signUp' })
@Radium
class SignUpForm extends React.Component {
  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <p style={formRowStyle}>
          Enter your <b>email address</b>
        </p>
        <div style={formRowStyle}>
          <Field component={TextBox}
            name="email"
            placeholder="you@example.com"
          />
        </div>
        <div style={formRowStyle}>
          <Button type="submit">Next</Button>
        </div>
      </form>
    )
  }
}

export default SignUpForm
