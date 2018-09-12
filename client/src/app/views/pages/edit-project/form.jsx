import React from 'react'

import { Button, Break } from 'ui/elements'
import { CopyIcon } from 'ui/icons'
import { Form } from 'ui/compounds'
import { CheckBox, TextBox, RadioGroup } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const ProjectForm = ({ handleSubmit, data }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Project Name"
      name="name"
      placeholder="My Awesome Project"
      validate={ validateRequired }
    />
    <TextBox
      label="Provider"
      name="provider"
      placeholder="Provider"
      readOnly
      validate={ validateRequired }
      trailing={ () =>
        <Button
          plain
          onClick={ () => {console.log(1); return true } }
        >
          <CopyIcon />
        </Button>
      }
    />
    <CheckBox
      name="disabled"
      label="Project Status"
      checkedText="Disabled"
      uncheckedText="Enabled"
    />
    <Button
      type="submit"
      variant="primary"
    >
      Save
    </Button>
  </Form>
)

export default ProjectForm
