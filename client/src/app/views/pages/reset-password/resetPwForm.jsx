import React from 'react'

import { Button ,TextBox } from 'ui/elements'
import { Form } from 'ui/compounds'

const ResetPwForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Header> Reset Password </Form.Header>
    <Form.Description> Enter your new password below and click on the 'Change password' button </Form.Description>
    <Form.Line>
      <TextBox
        type="password"
        name="password"
        placeholder="New password"
        autoFocus
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        type="password"
        name="rePassword"
        placeholder="Retype password"
        autoFocus
      />
    </Form.Line>
    <Form.Line last>
      <Form.Align center>
        <Button type="submit">Change password</Button>
      </Form.Align>
    </Form.Line>
  </Form>
)

export default ResetPwForm
