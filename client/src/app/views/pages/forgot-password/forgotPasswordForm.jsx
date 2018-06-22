import React from 'react'
import { TextBox  } from 'ui/redux-form'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'

const forgotPasswordForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Header> Forgot Password </Form.Header>
    <Form.Description> Enter your email address below and click on the 'Request reset password ' button </Form.Description>
    <Form.Line>
      <TextBox
        type="email"
        name="email"
        placeholder="Your email"
        autoFocus
      />
    </Form.Line>
    <Form.Line last>
      <Form.Align center>
        <Button type="submit">Request reset password</Button>
      </Form.Align>
    </Form.Line>
  </Form>
)

export default forgotPasswordForm
