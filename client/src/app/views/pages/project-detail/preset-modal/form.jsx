import React, { Fragment } from 'react'

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
      { isEditing && (
        <Fragment>
          <Form.Label>Hash</Form.Label>
          <TextBox
            name="hash"
            readOnly={ true }
          />
        </Fragment> )
      }
    </Form.Line>
    <Form.Line>
      <Form.Label>Preset Name</Form.Label>
      <TextBox
        name="name"
        placeholder="Default quality"
        disabled={ !idle }
      />
    </Form.Line>
    <Form.Line>
      <Form.Label>Image Quality</Form.Label>
      <TextBox
        name="values.quality"
        placeholder="75"
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
