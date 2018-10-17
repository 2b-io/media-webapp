import React from 'react'

import { Form } from 'ui/compounds'
import { Button, Break } from 'ui/elements'
import { KeyIcon } from 'ui/icons'
import { DescriptionText } from 'ui/typo'
import { TextBox } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const ChangePasswordForm = ({
  handleSubmit,
  idle
}) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      disabled={ !idle }
      type="password"
      name="currentPassword"
      placeholder="Current password"
      validate={ validateRequired }
      leading={ () => <KeyIcon /> }
    />
    <DescriptionText mostLeft mostRight>
      Re-enter your current password for security reason
    </DescriptionText>
    <Break />
    <TextBox
      disabled={ !idle }
      type="password"
      name="password"
      placeholder="* * * * * *"
      validate={ validateRequired }
      leading={ () => <KeyIcon /> }
    />
    <DescriptionText mostLeft mostRight>
      A strong password should consist of at least six characters and be a combination of letters, numbers and symbols
    </DescriptionText>
    <TextBox
      disabled={ !idle }
      type="password"
      name="rePassword"
      placeholder="* * * * * *"
      validate={ validateRequired }
      leading={ () => <KeyIcon /> }
    />
    <DescriptionText mostLeft mostRight>
      Re-type your password
    </DescriptionText>
    <Break double />
    <Button disabled={ !idle } type="submit">
      Change password
    </Button>
  </Form>
)

export default ChangePasswordForm
