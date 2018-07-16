import React from 'react'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextBox  } from 'views/common/form'

const PresetForm = ({ handleSubmit, isEditing }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      { isEditing &&
        <TextBox
          name="hash"
          readOnly={ true }
        />
      }
    </Form.Line>
    <Form.Line>
      <TextBox
        name="name"
        placeholder="Preset name"
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        name="values.quality"
        placeholder="Quality"
      />
    </Form.Line>
    <Form.Line last>
      <Button type="submit">{ isEditing ? 'Save' : 'Create' }</Button>
    </Form.Line>
  </Form>
)

export default PresetForm
