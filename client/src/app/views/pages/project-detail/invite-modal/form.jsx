import React from 'react'

import { Form } from 'ui/compounds'
import { TextBox } from 'views/common/form'

const InviteForm = ({ handleSubmit, searchAccount }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Header>Invite Collaborator</Form.Header>
    <Form.Description>Enter Email and click to &apos;Invite&apos; button</Form.Description>
    <Form.Line>
      <TextBox
        type="email"
        placeholder="Email"
        onChange={ e => { searchAccount(e.target.value) } }
        name="email"
        isValid={ true }
      />
    </Form.Line>
  </Form>
)

export default InviteForm
