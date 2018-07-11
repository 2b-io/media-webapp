import React from 'react'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextBox  } from 'views/common/form'

const PresetForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Header>Change preset</Form.Header>
    <Form.Description>Enter info your preset and click to {'Save preset'} button</Form.Description>
    <Form.Line>
      <TextBox
        type="TextBox"
        name="hash"
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        type="TextBox"
        name="name"
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        type="TextBox"
        name="values.quality"
      />
    </Form.Line>
    <Form.Line last>
      <Form.Align center>
        <Button type="submit">Save preset</Button>
      </Form.Align>
    </Form.Line>
  </Form>
)

export default PresetForm
