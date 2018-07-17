import React from 'react'

import { Form } from 'ui/compounds'
import { TextBox } from 'views/common/form'

const InviteForm = ({ handleSubmit, searchAccount }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Header>Invite Collaborator</Form.Header>
    <Form.Description>Enter Email and click to {'Invite'} button</Form.Description>
    <Form.Line>
      <TextBox
        type="Email"
        name="email"
        placeholder="Email"
        onChange={ (e) => { searchAccount(e.target.value) } }
      />
    </Form.Line>
  </Form>
)

export default InviteForm
