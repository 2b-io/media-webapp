import Radium from 'radium'
import React from 'react'
import { Field, reduxForm } from 'redux-form'

@reduxForm({ form: 'signIn' })
@Radium
class SignInForm extends React.Component {
  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label><br />
          <Field name="username" component="input" type="text" />
        </div>
        <div>
          <label>Password</label><br />
          <Field name="password" component="input" type="password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default SignInForm
