import React from 'react'

import { Form } from 'ui/compounds'
import { Button } from 'ui/elements'
import { TextBox  } from 'views/common/form'
import { validateRequired, validateEmail } from 'views/common/validate'

const SignInForm = ({ handleSubmit, idle }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      <Form.Label>Email</Form.Label>
      <TextBox
        type="email"
        name="email"
        placeholder="your email"
        disabled={ !idle }
        validate={ [ validateRequired, validateEmail ] }
      />
    </Form.Line>
    <Form.Line>
      <Form.Label>Password</Form.Label>
      <TextBox
        type="password"
        name="password"
        placeholder="your password"
        disabled={ !idle }
      />
    </Form.Line>
    <Form.Line last>
      <Button type="submit" disabled={ !idle }>Sign In</Button>
    </Form.Line>
  </Form>
)

export default SignInForm
