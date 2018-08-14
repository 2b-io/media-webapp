import React from 'react'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextBox } from 'views/common/form'
import { validateEmail } from 'views/common/validate'

const forgotPasswordForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      <TextBox
        label="Email"
        type="email"
        name="email"
        placeholder="name@example.com"
        validate={ validateEmail }
      />
    </Form.Line>
    <Form.Line last>
      <Button type="submit">Recover Password</Button>
    </Form.Line>
  </Form>
)

export default forgotPasswordForm
