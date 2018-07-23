import React from 'react'

import { Form } from 'ui/compounds'
import { Button } from 'ui/elements'
import { TextBox } from 'views/common/form'
import { validateEmail } from 'views/common/validate'

const RegisterForm = ({ handleSubmit, idle }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      <Form.Label>Email</Form.Label>
      <TextBox
        type="email"
        name="email"
        placeholder="your email"
        disabled={ !idle }
        validate={ validateEmail }
      />
    </Form.Line>
    <Form.Line last>
      <Button type="submit" disabled={ !idle }>Register</Button>
    </Form.Line>
  </Form>
)

export default RegisterForm
