import React, { Fragment } from 'react'

import { Form } from 'ui/compounds'
import { Button, Break } from 'ui/elements'
import { EmailIcon, KeyIcon, PersonIcon } from 'ui/icons'
import { DescriptionText } from 'ui/typo'
import { TextBox } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const ResetPaswordForm = ({
  handleSubmit,
  idle,
  isFinalizeStep
}) => (
  <Form handleSubmit={ handleSubmit } idle={ idle }>
    <TextBox
      disabled={ !idle }
      readOnly
      name="email"
      leading={ () => <EmailIcon /> }
    />
    <Break />
    { isFinalizeStep && (
      <Fragment>
        <TextBox
          disabled={ !idle }
          name="name"
          validate={ validateRequired }
          maxLength={ 20 }
          leading={ () => <PersonIcon /> }
        />
        <Break />
        <DescriptionText mostLeft mostRight>
          Display names are what other users see in their collaborator list. Display names can be changed at any time and can include a variety of letters, numbers and characters.
        </DescriptionText>
        <Break />
      </Fragment>
    ) }
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
      { isFinalizeStep ?
        'Finalize my account' :
        'Change password'
      }
    </Button>
  </Form>
)

export default ResetPaswordForm
