import React, { Fragment } from 'react'

import { Form } from 'ui/compounds'
import { Button, Break } from 'ui/elements'
import { KeyIcon } from 'ui/icons'
import { DescriptionText } from 'ui/typo'
import { TextBox } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const ChangePasswordForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <Fragment>
      <TextBox
        type="password"
        name="currentPassword"
        placeholder="Current password"
        validate={ validateRequired }
        leading={ () => <KeyIcon /> }
      />
      <Break />
    </Fragment>
    <TextBox
      type="password"
      name="password"
      placeholder="* * * * * *"
      validate={ validateRequired }
      leading={ () => <KeyIcon /> }
    />
    <DescriptionText mostLeft mostRight>
      A strong password should consist of at least six characters and be a combination of letters, numbers and symbols
    </DescriptionText>
    <Break />
    <TextBox
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
    <Button type="submit">
      Change password
    </Button>
  </Form>
)

export default ChangePasswordForm
