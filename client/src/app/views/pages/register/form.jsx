import React from 'react'

import { Form } from 'ui/compounds'
import { Break, Button } from 'ui/elements'
import { EmailIcon } from 'ui/icons'
import { DescriptionText } from 'ui/typo'
import { TextBox } from 'views/common/form'
import { validateEmail, validateRequired } from 'views/common/validate'

const RegisterForm = ({ handleSubmit, idle }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Email"
      type="email"
      name="email"
      placeholder="name@example.com"
      disabled={ !idle }
      validate={ [ validateEmail, validateRequired ] }
      leading={ () => <EmailIcon /> }
    />
    <DescriptionText mostLeft mostRight>
      We will send our activation link to this email. Please make sure you can access your email.
    </DescriptionText>
    <Break double />
    <Button type="submit" disabled={ !idle }>Send me the invitation</Button>
  </Form>
)

export default RegisterForm
