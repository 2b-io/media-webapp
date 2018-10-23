import React from 'react'

import { Break, Button, Form } from 'ui/elements'
import { EmailIcon, PersonIcon } from 'ui/icons'
import { DescriptionText } from 'ui/typo'
import { TextBox } from 'views/common/form'
import { validateEmail, validateRequired } from 'views/common/validate'

const EditProfileForm = ({
  handleSubmit,
  idle
}) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Profile Name"
      name="name"
      placeholder="Name"
      disabled={ !idle }
      validate={ validateRequired }
      maxLength={ 20 }
      leading={ () => <PersonIcon /> }
    />
    <DescriptionText mostLeft mostRight>
      Display names are what other users see in their collaborator list. Display names can be changed at any time and can include a variety of letters, numbers and characters.
    </DescriptionText>
    <Break />
    <TextBox
      label="Email"
      type="email"
      name="email"
      placeholder="name@example.com"
      disabled={ !idle }
      readOnly
      validate={ [ validateRequired, validateEmail ] }
      leading={ () => <EmailIcon /> }
    />
    <Break double />
    <Button type="submit" disabled={ !idle }>Save</Button>
  </Form>
)

export default EditProfileForm
