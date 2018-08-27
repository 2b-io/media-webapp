import React from 'react'

import { Form } from 'ui/compounds'
import { Button } from 'ui/elements'
import { TextBox } from 'views/common/form'
import { validateRequired, validateEmail } from 'views/common/validate'

const SentEmailInviteForm = ({
  handleSubmit,
  searchAccount
}) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      <TextBox
        label="Email"
        type="email"
        placeholder="Email"
        onChange={ e => { searchAccount(e.target.value) } }
        name="email"
        disabled={ true }
        validate={ [ validateRequired, validateEmail ] }
      />
    </Form.Line>
    <Form.Line>
      {
        <TextBox
          multiline={ true }
          type="text"
          placeholder="Some text"
          name="messenger"
          label="Messenger"
        />
      }
    </Form.Line>
    <Form.Line last>
      <Button
        variant="primary"
        type="submit"
      >
      Sent</Button>
    </Form.Line>
  </Form>
)
export default SentEmailInviteForm
