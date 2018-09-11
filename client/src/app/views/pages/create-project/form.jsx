import React from 'react'

import { Button, Break } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextBox, RadioGroup } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const projectForm = ({ handleSubmit, idle, options }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Project Name"
      name="name"
      placeholder="My Awesome Project"
      disabled={ !idle }
      validate={ validateRequired }
    />
    <Break />
    <RadioGroup
      name="cdn"
      options={ options }
    />
    <Break double />
    <Button
      type="submit"
      disabled={ !idle }
      variant="primary"
    >
      Create
    </Button>
  </Form>
)

export default projectForm
