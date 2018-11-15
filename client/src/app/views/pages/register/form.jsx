import React from 'react'

import { Break, Form, PrimaryButton } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { TextBox } from 'views/common/form'
import { validateEmail, validateRequired } from 'views/common/validate'

const RegisterForm = ({ handleSubmit, idle }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Email"
      type="email"
      name="email"
      disabled={ !idle }
      validate={ [ validateEmail, validateRequired ] }
    />
    <DescriptionText mostLeft mostRight>
      We will send our activation link to this email. Please make sure you can access your email.
    </DescriptionText>
    <Break double />
    <PrimaryButton
      disabled={ !idle }
      type="submit"
    >
      Send me the invitation
    </PrimaryButton>
  </Form>
)

export default RegisterForm
