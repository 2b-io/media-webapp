import React from 'react'

import { Form } from 'ui/compounds'
import { Break, Button } from 'ui/elements'
import { EmailIcon } from 'ui/icons'
import { DescriptionText } from 'ui/typo'
import { TextBox } from 'views/common/form'
import { validateEmail, validateRequired } from 'views/common/validate'

const forgotPasswordForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Email"
      type="email"
      name="email"
      placeholder="name@example.com"
      validate={ [ validateEmail, validateRequired ] }
      leading={ () => <EmailIcon /> }
    />
    <DescriptionText mostLeft mostRight>
      We will send the procedure to reset your password to your inbox.
    </DescriptionText>
    <Break double />
    <Button type="submit">Reset my password</Button>
  </Form>
)

export default forgotPasswordForm
