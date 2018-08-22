import React from 'react'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextBox  } from 'views/common/form'
import { validateRequired, validateNumber } from 'views/common/validate'

const PresetForm = ({
  handleSubmit,
  idle,
  isDefault,
  isEditing,
  showDeletePresetDialog
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
        validate={ validateRequired }
      />
    </Form.Line>
    <Form.Line>
      <TextBox
        label="Image Quality"
        name="values.quality"
        placeholder="75"
        disabled={ !idle }
        validate={ [ validateRequired, validateNumber ] }
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
            onClick={ showDeletePresetDialog }
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
