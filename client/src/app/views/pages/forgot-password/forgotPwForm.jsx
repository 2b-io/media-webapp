import React from 'react'
import styled from 'styled-components'

import { Form } from 'ui/compounds'
import { Button ,TextBox } from 'ui/elements'

const forgotPwForm = ({ handleSubmit }) => (
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

export default forgotPwForm
