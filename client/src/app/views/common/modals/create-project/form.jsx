import React from 'react'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextBox  } from 'views/common/form'

const projectForm = ({ handleSubmit, idle }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      <TextBox
        name="name"
        placeholder="Name project"
        disabled={ !idle }
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        name="slug"
        placeholder="Slug"
        disabled={ !idle }
      />
    </Form.Line>
    <Form.Line last>
      <Button
        type="submit"
        disabled={ !idle }>
        Create
      </Button>
    </Form.Line>
  </Form>
)

export default projectForm
