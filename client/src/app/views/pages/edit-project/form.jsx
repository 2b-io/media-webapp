import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Form } from 'ui/compounds'
import { Button, ButtonText, Break } from 'ui/elements'
import { CopyIcon } from 'ui/icons'
import { TextLine } from 'ui/typo'

import { CheckBox, TextBox } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const ProjectForm = ({
  handleSubmit,
  domain,
  status,
  isActive,
  showRemoveProjectDialog
}) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Project Name"
      name="name"
      readOnly={ status === 'UPDATING' || status === 'INITIALIZING' }
      placeholder="My Awesome Project"
      validate={ validateRequired }
      maxLength={ 50 }
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
            name="isActive"
            label="Enable"
          />

          <Break double />
          <Button
            type="submit"
          >
            Save
          </Button>
          {
            isActive ?
              null :
              <ButtonText onClick={ showRemoveProjectDialog }>
                Permanently delete
              </ButtonText>
          }
        </React.Fragment>
    }
  </Form>
)

export default ProjectForm
