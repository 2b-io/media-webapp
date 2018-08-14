import React from 'react'

import { Form } from 'ui/compounds'
import { Button } from 'ui/elements'
import { TextBox } from 'views/common/form'
import { validateEmail, validateRequired } from 'views/common/validate'

const RegisterForm = ({ handleSubmit, idle }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      <TextBox
        label="Email"
        type="email"
        name="email"
        placeholder="your email"
        disabled={ !idle }
        validate={ [ validateEmail, validateRequired ] }
      />
    </Form.Line>
    <Form.Line last>
      <Button type="submit" disabled={ !idle }>Register</Button>
    </Form.Line>
  </Form>
)

export default RegisterForm
