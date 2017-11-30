import Radium from 'radium'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

import Button from 'components/Button'
import TextBox from 'components/inputs/TextBox'

@reduxForm({ form: 'signUp' })
@Radium
class SignUpForm extends React.Component {
  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tenant</label><br />
          <Field name="tenantName" component={TextBox} />
        </div>
        <div>
          <label>Slug</label><br />
          <Field name="tenantSlug" component={TextBox} />
          <span>.mn-cdn.com</span>
        </div>
        <div>
          <label>Email</label><br />
          <Field name="administratorEmail" component={TextBox} />
        </div>
        <Button type="submit">Register</Button>
      </form>
    )
  }
}

export default SignUpForm
