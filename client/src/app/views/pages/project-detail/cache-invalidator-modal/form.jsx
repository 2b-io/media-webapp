import React from 'react'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextBox  } from 'views/common/form'

const CacheInvalidatorForm = (idle, handleSubmit) => (
  <Form handleSubmit={ idle, handleSubmit }>
    <Form.Line>
      {
        <TextBox
          multiline={ true }
          type="text"
          name="origins"
          label="Pattern"
        />
      }
    </Form.Line>
    <Form.Line last>
      <Button.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={ !idle }
        >Invalid</Button>
      </Button.Group>
    </Form.Line>
  </Form>
)

export default CacheInvalidatorForm
