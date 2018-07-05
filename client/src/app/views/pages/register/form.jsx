import React from 'react'

import { Form } from 'ui/compounds'
import { Button } from 'ui/elements'
import { TextBox } from 'views/common/form'

const RegisterForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      <TextBox
        type="email"
        name="email"
        placeholder="your email"
      />
    </Form.Line>
    <Form.Line last>
      <Button type="submit">Register</Button>
    </Form.Line>
  </Form>
)

export default RegisterForm
