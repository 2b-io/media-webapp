import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Button, Break } from 'ui/elements'
import { CopyIcon } from 'ui/icons'
import { Form } from 'ui/compounds'
import { CheckBox, TextBox } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const ProjectForm = ({ handleSubmit, provider }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Project Name"
      name="name"
      placeholder="My Awesome Project"
      validate={ validateRequired }
    />
    <Break />
    <TextBox
      label="Provider"
      name="provider"
      placeholder="Provider"
      readOnly
      validate={ validateRequired }
      trailing={ () => (
        <CopyToClipboard text={ provider }>
          <Button plain >
            <CopyIcon />
          </Button>
        </CopyToClipboard>
      ) }
    />
    <Break />
    <CheckBox
      name="disabled"
      label="Enable"
    />
    <Break double />
    <Button
      type="submit"
    >
      Save
    </Button>
  </Form>
)

export default ProjectForm
