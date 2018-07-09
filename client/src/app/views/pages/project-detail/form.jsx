import React from 'react'

import { Form } from 'ui/compounds'
import { Button } from 'ui/elements'
import { TextArea, TextBox } from 'views/common/form'

const ProjectForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      <TextBox
        type="text"
        name="name"
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        type="text"
        name="slug"
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        type="text"
        name="prettyOrigin"
      />
    </Form.Line>
    <Form.Line>
      <TextArea
        type="text"
        name="origins"
      />
    </Form.Line>
    <Form.Line>
      <Button type="submit">Save</Button>
    </Form.Line>
  </Form>
)

export default ProjectForm
