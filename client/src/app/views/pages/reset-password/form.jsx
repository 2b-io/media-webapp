import React, { Fragment } from 'react'

import { Form } from 'ui/compounds'
import { Button, Break } from 'ui/elements'
import { EmailIcon, KeyIcon, PersonIcon } from 'ui/icons'
import { DescriptionText } from 'ui/typo'
import { TextBox } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const ResetPaswordForm = ({ handleSubmit, isFinalizeStep }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      readOnly
      name="email"
      leading={ () => <EmailIcon /> }
    />
    <Break />
    { isFinalizeStep && (
      <Fragment>
        <TextBox
          name="name"
          validate={ validateRequired }
          maxLength={ 20 }
          leading={ () => <PersonIcon /> }
        />
        <Break />
      </Fragment>
    ) }
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
      { isFinalizeStep ?
        'Finalize my account' :
        'Reset my password'
      }
    </Button>
  </Form>
)

export default ResetPaswordForm
