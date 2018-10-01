import React from 'react'

import { Form } from 'ui/compounds'
import { Button, Break } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { TextArea } from 'views/common/form'
import { validateRequired, validateEmail } from 'views/common/validate'

const InviteCollaboratorForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextArea
      label="Emails"
      type="emails"
      placeholder="Emails"
      name="emails"
      validate={ [ validateRequired, validateEmail ] }
    />
    <DescriptionText mostLeft mostRight>
      "We'll send the persons you invited an email with the invitation detail. If they don't have an account yet, we'll create one and send instructions for setting their password."
    </DescriptionText>
    <Break />
    <TextArea
      type="text"
      placeholder="Some text"
      name="messenge"
      label="Messenge"
    />
    <DescriptionText mostLeft mostRight>
      Optional. A personal note for the invitation email.
    </DescriptionText>
    <Break double />
    <Button type="submit" >Send the invitations</Button>
  </Form>
)

export default InviteCollaboratorForm
