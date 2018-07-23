import React from 'react'

import { Form } from 'ui/compounds'
import { Button } from 'ui/elements'
import { TextBox } from 'views/common/form'

const ChangePasswordForm = ({ handleSubmit, resetPassword }) => (
  <Form handleSubmit={ handleSubmit }>
    { !resetPassword &&
      <Form.Line>
        <TextBox
          type="password"
          name="currentPassword"
          placeholder="Current password"
        />
      </Form.Line>
    }
    <Form.Line>
      <TextBox
        type="password"
        name="password"
        placeholder="New password"
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        type="password"
        name="rePassword"
        placeholder="Retype password"
      />
    </Form.Line>
    <Form.Line last>
      <Button type="submit">
        Change password
      </Button>
    </Form.Line>
  </Form>
)

export default ChangePasswordForm
