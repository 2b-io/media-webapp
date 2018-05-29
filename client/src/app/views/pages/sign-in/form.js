import React from 'react'
import { TextBox  } from 'ui/redux-form'

const SignInForm = ({ handleSubmit }) => (
  <form onSubmit={ handleSubmit }>
    <div>
      <TextBox
        type="email"
        name="email"
        placeholder="you@example.com"
      />
    </div>
    <div>
      <button type="submit">Sign In</button>
    </div>
  </form>
)

export default SignInForm
