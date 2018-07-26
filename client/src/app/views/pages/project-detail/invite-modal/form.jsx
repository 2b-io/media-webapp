import React from 'react'

import { Form } from 'ui/compounds'
import { TextBox } from 'views/common/form'
import { validateRequired, validateEmail } from 'views/common/validate'

const InviteForm = ({ handleSubmit, searchAccount }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      <TextBox
        label="Email"
        type="email"
        placeholder="Email"
        onChange={ e => { searchAccount(e.target.value) } }
        name="email"
        validate={ [ validateRequired, validateEmail ] }
      />
    </Form.Line>
  </Form>
)

export default InviteForm
