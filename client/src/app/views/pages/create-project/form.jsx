import React from 'react'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextBox, RadioGroup } from 'views/common/form'
import { validateRequired } from 'views/common/validate'


const projectForm = ({ handleSubmit, idle, options }) => (
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
        label="Project Name"
        name="name1"
        placeholder="My Awesome Project"
        disabled={ !idle }
        validate={ validateRequired }
        multiline
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        label="Project Name"
        name="name2"
        placeholder="My Awesome Project"
        disabled={ !idle }
        validate={ validateRequired }
      />
    </Form.Line>

    <Form.Line>
      <RadioGroup
        name="cdn"
        options={ options }
      />
    </Form.Line>
    <Form.Line last>
      <Button
        type="submit"
        disabled={ !idle }
        variant="primary"
      >
        Create
      </Button>
    </Form.Line>
  </Form>
)

export default projectForm
