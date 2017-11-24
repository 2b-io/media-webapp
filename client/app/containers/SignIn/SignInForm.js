import Radium from 'radium'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

import TextBox from 'components/inputs/TextBox'
import PasswordBox from 'components/inputs/PasswordBox'

@reduxForm({ form: 'signIn' })
@Radium
class SignInForm extends React.Component {
  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label><br />
          <Field name="username" component={TextBox} />
        </div>
        <div>
          <label>Password</label><br />
          <Field name="password" component={PasswordBox} />
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default SignInForm
