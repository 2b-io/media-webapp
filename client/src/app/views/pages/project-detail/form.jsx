import React from 'react'

import { Form } from 'ui/compounds'
import { Button } from 'ui/elements'
import { TextBox } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const ProjectForm = ({ handleSubmit, idle }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      <TextBox
        label="Project Name"
        type="text"
        name="name"
        placeholder="Project Name"
        disabled={ !idle }
        validate={ validateRequired }
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        label="Slug"
        type="text"
        name="slug"
        readOnly
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        label="Pretty Origin"
        type="text"
        name="prettyOrigin"
        placeholder="https://yourproject.com/assets"
        disabled={ !idle }
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        label="Allowed Origins"
        multiline={ true }
        type="text"
        name="origins"
        placeholder="*.yourproject.com"
        disabled={ !idle }
      />
    </Form.Line>
    <Form.Line last>
      <Button type="submit" disabled={ !idle }>Save</Button>
    </Form.Line>
  </Form>
)

export default ProjectForm
