import React from 'react'

import { Form } from 'ui/compounds'
import { Break, Button } from 'ui/elements'
import { EmailIcon, KeyIcon } from 'ui/icons'
import { TextBox } from 'views/common/form'
import { validateRequired, validateEmail } from 'views/common/validate'

const SignInForm = ({ handleSubmit, idle }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Email"
      type="email"
      name="email"
      placeholder="name@example.com"
      disabled={ !idle }
      validate={ [ validateRequired, validateEmail ] }
      leading={ () => <EmailIcon /> }
    />
    <Break />
    <TextBox
      label="Password"
      type="password"
      name="password"
      placeholder="* * * * * *"
      disabled={ !idle }
      leading={ () => <KeyIcon /> }
    />
    <Break double />
    <Button type="submit" disabled={ !idle }>Sign in</Button>
  </Form>
)

export default SignInForm
