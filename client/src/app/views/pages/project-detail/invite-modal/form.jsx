import React from 'react'

import { Form } from 'ui/compounds'
import { TextBox } from 'views/common/form'

const InviteForm = ({ handleSubmit, searchAccount }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      <TextBox
        label="Email"
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
