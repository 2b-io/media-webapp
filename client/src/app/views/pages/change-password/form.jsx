import React from 'react'

import { Break, Form, PrimaryButton } from 'ui/elements'
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
      label="Current password"
      validate={ validateRequired }
    />
    <DescriptionText mostLeft mostRight>
      Re-enter your current password for security reason
    </DescriptionText>
    <Break />
    <TextBox
      disabled={ !idle }
      type="password"
      label="New password"
      name="password"
      validate={ validateRequired }
    />
    <DescriptionText mostLeft mostRight>
      A strong password should consist of at least six characters and be a combination of letters, numbers and symbols
    </DescriptionText>
    <Break />
    <TextBox
      disabled={ !idle }
      type="password"
      label="Retype new password"
      name="rePassword"
      validate={ validateRequired }
    />
    <DescriptionText mostLeft mostRight>
      Re-type your password
    </DescriptionText>
    <Break double />
    <PrimaryButton
      disabled={ !idle }
      type="submit"
    >
      Change password
    </PrimaryButton>
  </Form>
)

export default ChangePasswordForm
