import React from 'react'

import { Break, Form, PrimaryButton } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { TextArea } from 'views/common/form'
import { validateRequired, validateMultiEmail } from 'views/common/validate'

const InviteCollaboratorForm = ({
  handleSubmit,
  idle
}) => (
  <Form handleSubmit={ handleSubmit }>
    <TextArea
      disabled={ !idle }
      label="Emails"
      name="emails"
      validate={ [ validateRequired, validateMultiEmail ] }
    />
    <DescriptionText mostLeft mostRight>
      We&#39;ll send the person(s) you invited an email with the invitation detail. If they haven&#39;t got an account yet, we&#39;ll create one for each and send instructions for setting their passwords.
    </DescriptionText>
    <Break />
    <TextArea
      disabled={ !idle }
      type="text"
      label="Message"
      name="message"
      maxLength={ 200 }
    />
    <DescriptionText mostLeft mostRight>
      (Optional) A personal note for the invitation email.
    </DescriptionText>
    <Break double />
    <PrimaryButton
      disabled={ !idle }
      type="submit"
    >
      Send the invitations
    </PrimaryButton>
  </Form>
)

export default InviteCollaboratorForm
