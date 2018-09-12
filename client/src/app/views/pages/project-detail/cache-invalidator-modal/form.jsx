import React from 'react'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextArea  } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const CacheInvalidatorForm = ({ idle, handleSubmit, invalidateAllCache }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      {
        <TextArea
          disabled={ !idle }
          type="text"
          name="patterns"
          label="Patterns"
          placeholder="Patterns"
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
      <Button
        disabled={ !idle }
        variant="primary"
        onClick={ invalidateAllCache }
      >Invalid all</Button>
    </Form.Line>
  </Form>
)

export default CacheInvalidatorForm
