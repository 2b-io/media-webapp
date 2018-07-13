import React from 'react'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextBox  } from 'views/common/form'

const PresetForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Header>Create new preset</Form.Header>
    <Form.Description>Enter info your preset and click to {'Add preset'} button</Form.Description>
    <Form.Line>
      <TextBox
        type="TextBox"
        name="name"
        placeholder="Name preset"
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        type="TextBox"
        name="values.quality"
        placeholder="Quality"
      />
    </Form.Line>
    <Form.Line last>
      <Form.Align center>
        <Button type="submit">Add preset</Button>
      </Form.Align>
    </Form.Line>
  </Form>
)

export default PresetForm
