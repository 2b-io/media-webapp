import React from 'react'

import { Form } from 'ui/compounds'
import { Button } from 'ui/elements'
import { TextBox } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const ChangePasswordForm = ({ handleSubmit, resetPassword, valid }) => (
  <Form handleSubmit={ handleSubmit }>
    { !resetPassword &&
      <Form.Line>
        <TextBox
          label="Current password"
          type="password"
          name="currentPassword"
          placeholder="Current password"
          validate={ validateRequired }
        />
      </Form.Line>
    }
    <Form.Line>
      <TextBox
        label="New password"
        type="password"
        name="password"
        placeholder="New password"
        validate={ validateRequired }
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        label="Retype password"
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
