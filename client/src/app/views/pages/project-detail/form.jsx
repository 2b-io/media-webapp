import React from 'react'

import { Form } from 'ui/compounds'
import { Button } from 'ui/elements'
import { TextArea, TextBox } from 'views/common/form'

const ProjectForm = ({ handleSubmit, idle }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      <TextBox
        type="text"
        name="name"
        placeholder="Project Name"
        disabled={ !idle }
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        type="text"
        name="slug"
        readOnly
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        type="text"
        name="prettyOrigin"
        placeholder="Pretty Origins"
        disabled={ !idle }
      />
    </Form.Line>
    <Form.Line>
      <TextArea
        type="text"
        name="origins"
        placeholder="Origins"
        disabled={ !idle }
      />
    </Form.Line>
    <Form.Line last>
      <Button type="submit" disabled={ !idle }>Save</Button>
    </Form.Line>
  </Form>
)

export default ProjectForm
