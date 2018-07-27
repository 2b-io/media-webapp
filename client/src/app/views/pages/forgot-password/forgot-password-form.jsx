import React from 'react'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextBox } from 'views/common/form'
import { validateEmail } from 'views/common/validate'

const forgotPasswordForm = ({ handleSubmit, result, toSignIn }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      <TextBox
        label="Your email"
        type="email"
        name="email"
        placeholder="Your email"
        validate={ validateEmail }
      />
    </Form.Line>
    <Form.Line last>
      {result && <Button
        onClick={ () => { toSignIn() } }>
        Back to login
      </Button> ||
      <Button
        type="submit">
        Request reset password
      </Button>
      }
    </Form.Line>
  </Form>
)

export default forgotPasswordForm
