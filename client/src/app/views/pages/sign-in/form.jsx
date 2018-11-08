import React from 'react'

import { Break, Button, Form } from 'ui/elements'
import { TextBox } from 'views/common/form'
import { validateRequired, validateEmail } from 'views/common/validate'

const SignInForm = ({ handleSubmit, idle }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Email"
      type="email"
      name="email"
      disabled={ !idle }
      validate={ [ validateRequired, validateEmail ] }
    />
    <Break />
    <TextBox
      label="Password"
      type="password"
      name="password"
      disabled={ !idle }
    />
    <Break double />
    <Button type="submit" disabled={ !idle }>Sign in</Button>
  </Form>
)

export default SignInForm
