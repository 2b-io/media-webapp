import React from 'react'

import { Form } from 'ui/compounds'
import { Button, Label } from 'ui/elements'
import { TextBox } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const ChangePasswordForm = ({ handleSubmit, resetPassword, valid }) => (
  <Form handleSubmit={ handleSubmit }>
    { !resetPassword &&
      <Form.Line>
        <TextBox
          type="password"
          name="currentPassword"
          placeholder="Current password"
          validate={ validateRequired }
        />
      </Form.Line>
    }
    <Form.Line>
      <Form.Label>New password</Form.Label>
      <TextBox
        type="password"
        name="password"
        placeholder="New password"
        validate={ validateRequired }
      />
    </Form.Line>
    <Form.Line>
      <Form.Label>Retype password</Form.Label>
      <TextBox
        type="password"
        name="rePassword"
        placeholder="Retype password"
        validate={ validateRequired }
      />
    </Form.Line>
    <Form.Line last>
      <Button
        type="submit"
        onClick={ (e) => {
          if (!valid) {
            e.preventDefault()
          }
        } }>
        Change password
      </Button>
    </Form.Line>
  </Form>
)

export default ChangePasswordForm
