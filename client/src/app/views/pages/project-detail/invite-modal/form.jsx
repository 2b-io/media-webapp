import React from 'react'

import { Form } from 'ui/compounds'
import { Button } from 'ui/elements'
import { TextBox } from 'views/common/form'

const InviteForm = ({ handleSubmit, findCollaborator }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Header>Invite Collaborator</Form.Header>
    <Form.Description>Enter Email and click to {'Invite'} button</Form.Description>
    <Form.Line>
      <TextBox
        type="Email"
        name="email"
        placeholder="Email"
        onChange={ (e) => { findCollaborator(e.target.value) } }
      />
    </Form.Line>
    <Form.Line last>
      <Button type="submit">Invite</Button>
    </Form.Line>
  </Form>
)

export default InviteForm
