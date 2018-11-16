import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import {
  Break,
  Form,
  LinkButton, PlainButton, PrimaryButton
} from 'ui/elements'
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
      validate={ validateRequired }
      maxLength={ 50 }
    />
    <Break />
    <TextBox
      disabled={ !idle }
      label="Domain"
      name="domain"
      readOnly
      validate={ validateRequired }
      trailing={ () => (
        <CopyToClipboard onCopy={ copyDomainLink } text={ domain }>
          <PlainButton disabled={ !idle }>
            <CopyIcon />
          </PlainButton>
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
          <PrimaryButton
            disabled={ !idle }
            type="submit"
          >
            Save
          </PrimaryButton>
          {
            isActive ?
              null :
              <LinkButton
                disabled={ !idle }
                onClick={ showRemoveProjectDialog }
              >
                Permanently delete
              </LinkButton>
          }
        </React.Fragment>
    }
  </Form>
)

export default ProjectForm
