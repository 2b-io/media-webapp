import React from 'react'
import { TextBox } from 'ui/redux-form'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'

const ResetPasswordForm = ({ handleSubmit, password, rePassword }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Header> Reset Password </Form.Header>
    <Form.Description> Enter your new password below and click on the 'Change password' button </Form.Description>
    <Form.Line>
      <TextBox
        type="password"
        name="password"
        placeholder="New password"
        autoFocus
        onChange={ (e) => { password = e.target.value } }
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        type="password"
        name="rePassword"
        placeholder="Retype password"
        autoFocus
        onChange={ (e) => { rePassword = e.target.value } }
      />
    </Form.Line>
    <Form.Line last>
      <Form.Align center>
        <Button
          type="submit"
          onClick={ (e)=>{
            if (password !== rePassword) {
              e.preventDefault()
            }
          } }>
          Change password
        </Button>
      </Form.Align>
    </Form.Line>
  </Form>
)

export default ResetPasswordForm
