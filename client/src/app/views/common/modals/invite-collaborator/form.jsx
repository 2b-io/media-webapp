import React from 'react'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextBox  } from 'views/common/form'

const InviteCollaboratorForm = ({ handleSubmit, findCollaborator,  }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Header>Invite Collaborator</Form.Header>
    <Form.Description>Enter Email and click to {'Invite'} button</Form.Description>
    <Form.Line>
      <TextBox
        type="Email"
        name="email"
        placeholder="Email Invite"
        onChange={ (e) => { findCollaborator(e.target.value) } }
      />
    </Form.Line>
    <Form.Line last>
      <Form.Align center>
        <Button type="submit">Invite</Button>
      </Form.Align>
    </Form.Line>
  </Form>
)

export default InviteCollaboratorForm
