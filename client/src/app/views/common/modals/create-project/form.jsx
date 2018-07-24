import React from 'react'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextBox  } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const projectForm = ({ handleSubmit, idle }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      <TextBox
        label="Project Name"
        name="name"
        placeholder="My Awesome Project"
        disabled={ !idle }
        validate={ validateRequired }
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        label="Slug"
        name="slug"
        placeholder="my-awesome-project"
        disabled={ !idle }
        validate={ validateRequired }
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
