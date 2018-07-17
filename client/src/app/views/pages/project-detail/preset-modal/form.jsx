import React from 'react'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextBox  } from 'views/common/form'

const PresetForm = ({
  handleSubmit,
  idle,
  isDefault,
  isEditing,
  onDelete
}) => (
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
        disabled={ !idle }
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        name="values.quality"
        placeholder="Quality"
        disabled={ !idle }
      />
    </Form.Line>
    <Form.Line last>
      <Button.Group>
        <Button type="submit" disabled={ !idle }>
          { isEditing ? 'Save' : 'Create' }
        </Button>
        { !isDefault && isEditing &&
          <Button onClick={ onDelete } disabled={ !idle }>
            Delete
          </Button>
        }
      </Button.Group>
    </Form.Line>
  </Form>
)

export default PresetForm
