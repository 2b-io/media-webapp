import React from 'react'

import { Form } from 'ui/compounds'
import { Button } from 'ui/elements'
import { TextBox  } from 'ui/redux-form'

const SignInForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      <TextBox
        type="email"
        name="email"
        placeholder="your email"
        autoFocus
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        type="password"
        name="password"
        placeholder="your password"
      />
    </Form.Line>
    <Form.Line last>
      <Button type="submit">Sign In</Button>
    </Form.Line>
  </Form>
)

export default SignInForm
