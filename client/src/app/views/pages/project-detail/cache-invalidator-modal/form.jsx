import React from 'react'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextBox  } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const CacheInvalidatorForm = ({ idle, handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      {
        <TextBox
          multiline={ true }
          disabled={ !idle }
          type="text"
          name="patterns"
          label="Patterns"
          validate={ validateRequired }
        />
      }
    </Form.Line>
    <Form.Line last>
      <Button
        disabled={ !idle }
        variant="primary"
        type="submit"
      >Invalid</Button>
    </Form.Line>
  </Form>
)

export default CacheInvalidatorForm
