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
        placeholder="Project Name"
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        type="text"
        name="slug"
        disabled
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        type="text"
        name="prettyOrigin"
        placeholder="Pretty Origins"
      />
    </Form.Line>
    <Form.Line>
      <TextArea
        type="text"
        name="origins"
        placeholder="Origins"
      />
    </Form.Line>
    <Form.Line>
      <Button type="submit">Save</Button>
    </Form.Line>
  </Form>
)

export default ProjectForm
