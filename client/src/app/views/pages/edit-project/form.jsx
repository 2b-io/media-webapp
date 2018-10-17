import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Form } from 'ui/compounds'
import { Button, TextButton, Break } from 'ui/elements'
import { CopyIcon } from 'ui/icons'
import { TextLine } from 'ui/typo'

import { CheckBox, TextBox } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const ProjectForm = ({
  copyDomainLink,
  domain,
  handleSubmit,
  idle,
  isActive,
  showRemoveProjectDialog,
  status
}) => (
  <Form handleSubmit={ handleSubmit } idle={ idle }>
    <TextBox
      disabled={ !idle }
      label="Project Name"
      name="name"
      readOnly={ status === 'UPDATING' || status === 'INITIALIZING' }
      placeholder="My Awesome Project"
      validate={ validateRequired }
      maxLength={ 50 }
    />
    <Break />
    <TextBox
      disabled={ !idle }
      label="Domain"
      name="domain"
      placeholder="Domain"
      readOnly
      validate={ validateRequired }
      trailing={ () => (
        <CopyToClipboard onCopy={ copyDomainLink } text={ domain }>
          <Button disabled={ !idle } plain >
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
            disabled={ !idle }
            name="isActive"
            label="Enable"
          />

          <Break double />
          <Button
            disabled={ !idle }
            type="submit"
          >
            Save
          </Button>
          {
            isActive ?
              null :
              <TextButton
                disabled={ !idle }
                onClick={ showRemoveProjectDialog }
              >
                Permanently delete
              </TextButton>
          }
        </React.Fragment>
    }
  </Form>
)

export default ProjectForm
