import React from 'react'

import { Form } from 'ui/compounds'
import { Button } from 'ui/elements'
import { TextBox } from 'views/common/form'

const passwordForm = ({ handleSubmit, password, rePassword, header, resetPassword }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Header>{ header }</Form.Header>
    <Form.Description>Enter your new password below and click on the {'Change password'} button.</Form.Description>
    { !resetPassword? <Form.Line>
      <TextBox
        type="password"
        name="currentPassword"
        placeholder="Current password"
      />
    </Form.Line> :''
    }
    <Form.Line>
      <TextBox
        type="password"
        name="password"
        placeholder="New password"
        onChange={ (e) => { password = e.target.value } }
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        type="password"
        name="rePassword"
        placeholder="Retype password"
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

export default passwordForm
