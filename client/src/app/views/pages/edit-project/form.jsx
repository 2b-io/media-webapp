import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Form } from 'ui/compounds'
import { Button, Break } from 'ui/elements'
import { CopyIcon } from 'ui/icons'
import { TextLine } from 'ui/typo'

import { CheckBox, TextBox } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const ProjectForm = ({ handleSubmit, domain, status }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Project Name"
      name="name"
      readOnly={ (status === 'UPDATING' || status === 'INITIALIZING')
        ? true : false
      }
      placeholder="My Awesome Project"
      validate={ validateRequired }
    />
    <Break />
    <TextBox
      label="Domain"
      name="domain"
      placeholder="Domain"
      readOnly
      validate={ validateRequired }
      trailing={ () => (
        <CopyToClipboard text={ domain }>
          <Button plain >
            <CopyIcon />
          </Button>
        </CopyToClipboard>
      ) }
    />
    <Break />
    {
      (status === 'UPDATING' || status === 'INITIALIZING')
        ? <TextLine>{ status }</TextLine>
        : <React.Fragment>
          <CheckBox
            name="status"
            label="Enable"
          />

          <Break double />
          <Button
            type="submit"
          >
            Save
          </Button>
        </React.Fragment>
      }
  </Form>
)

export default ProjectForm
