import React from 'react'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextBox  } from 'views/common/form'

const CacheInvalidatorForm = ({ idle, handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      {
        <TextBox
          multiline={ true }
          type="text"
          name="patterns"
          label="Patterns"
        />
      }
    </Form.Line>
    <Form.Line last>
      <Button
        variant="primary"
        type="submit"
        disabled={ !idle }
      >Invalid</Button>
    </Form.Line>
  </Form>
)

export default CacheInvalidatorForm
