import React, { Fragment } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { Break, Button, Container, Dialog } from 'ui/elements'
import { Emphasize, Text } from 'ui/typo'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'

import StatelessProjectForm from './form'

const REMOVE_PROJECT = 'REMOVE_PROJECT'

const ProjectForm = reduxForm({
  form: 'project',
  enableReinitialize: true
})(StatelessProjectForm)

const EditProject = ({
  copyDomainLink,
  project,
  updateProject,
  removeProject,
  hideRemoveProjectDialog,
  showRemoveProjectDialog,
  ui: {
    isRemoveConfirmationDialogActive
  }
}) => {
  if (!project) {
    return null
  }

  const {
    name,
    status,
    isActive,
    identifier,
    infrastructure
  } = project

  return (
    <Fragment>
      <Container>
        <ProjectForm
          copyDomainLink={ copyDomainLink }
          onSubmit={ ( { name, status, isActive }) => updateProject(identifier, name, status, isActive) }
          initialValues={ {
            name,
            domain: infrastructure && infrastructure.domain,
            isActive
          } }
          domain={ infrastructure && infrastructure.domain }
          status={ status }
          isActive={ isActive }
          showRemoveProjectDialog={ showRemoveProjectDialog }
        />
      </Container>
      <Dialog
        isActive={ isRemoveConfirmationDialogActive }
        onOverlayClick={ hideRemoveProjectDialog }
        content={ () => (
          <Container>
            <Text mostLeft mostRight>
              You are about to permanently delete project <Emphasize>{ name }</Emphasize> and all its media. This operation cannot be undone.
            </Text>
            <Break double />
            <Button.Group align="right">
              <Button
                variant="secondary"
                mostRight
                onClick={ hideRemoveProjectDialog }
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={ () => removeProject(identifier) }
              >
                Delete
              </Button>
            </Button.Group>
          </Container>
        ) }
      />
    </Fragment>
  )
}

export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)

    if (!identifier) {
      return {}
    }

    return {
      project: selectors.findProjectByIdentifier(state, identifier)
    }
  },
  mapDispatch({
    copyDomainLink: actions.copyDomainLink,
    updateProject: (identifier, name, status, isActive) => actions.updateProject({ identifier, name, status: isActive ? 'DEPLOYED' : 'DISABLED', isActive }),
    removeProject: actions.removeProject,
    showRemoveProjectDialog: () => actions.showDialog(REMOVE_PROJECT),
    hideRemoveProjectDialog: () => actions.hideDialog(REMOVE_PROJECT)
  })
)(EditProject)
