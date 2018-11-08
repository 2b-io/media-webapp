import React from 'react'

import { Break, Button, Form } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { TextBox } from 'views/common/form'
import { validateEmail, validateRequired } from 'views/common/validate'

const forgotPasswordForm = ({
  idle,
  handleSubmit
}) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      disabled={ !idle }
      label="Email"
      type="email"
      name="email"
      validate={ [ validateEmail, validateRequired ] }
    />
    <DescriptionText mostLeft mostRight>
      We will send the procedure to reset your password to your inbox.
    </DescriptionText>
    <Break double />
    <Button
      disabled={ !idle }
      type="submit"
    >
      Reset my password
    </Button>
  </Form>
)

export default forgotPasswordForm
