import React from 'react'

import { Form } from 'ui/compounds'
import { Button } from 'ui/elements'
import { TextBox } from 'views/common/form'

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
          label="Hash"
          name="hash"
          readOnly={ true }
        />
      }
    </Form.Line>
    <Form.Line>
      <TextBox
        label="Preset Name"
        name="name"
        placeholder="Default quality"
        disabled={ !idle }
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        label="Image Quality"
        name="values.quality"
        placeholder="75"
        disabled={ !idle }
      />
    </Form.Line>
    <Form.Line last>
      <Button.Group>
        <Button
          type="submit"
          disabled={ !idle }
          variant="primary"
        >
          { isEditing ? 'Save' : 'Create' }
        </Button>
        { !isDefault && isEditing &&
          <Button
            onClick={ onDelete }
            disabled={ !idle }
            variant="secondary"
          >
            Delete
          </Button>
        }
      </Button.Group>
    </Form.Line>
  </Form>
)

export default PresetForm
