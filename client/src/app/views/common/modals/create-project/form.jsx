import React from 'react'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextBox  } from 'views/common/form'

const projectForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Header>Create new project</Form.Header>
    <Form.Description>Enter info your project and click to 'Add project' button</Form.Description>
    <Form.Line>
      <TextBox
        type="TextBox"
        name="name"
        placeholder="Name project"
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        type="TextBox"
        name="slug"
        placeholder="Slug"
      />
    </Form.Line>
    <Form.Line last>
      <Form.Align center>
        <Button type="submit">Add project</Button>
      </Form.Align>
    </Form.Line>
  </Form>
)

export default projectForm
