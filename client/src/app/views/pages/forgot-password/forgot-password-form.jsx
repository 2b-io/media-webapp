import React from 'react'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextBox } from 'views/common/form'
import { validateEmail } from 'views/common/validate'

const forgotPasswordForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      <TextBox
        type="email"
        name="email"
        placeholder="Your email"
        validate={ validateEmail }
      />
    </Form.Line>
    <Form.Line last>
      <Button type="submit">Request reset password</Button>
    </Form.Line>
  </Form>
)

export default forgotPasswordForm
