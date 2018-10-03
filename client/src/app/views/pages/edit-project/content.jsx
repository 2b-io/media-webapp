import React, { Fragment } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { DialogContent } from 'ui/compounds'
import { Break, Button, Container, Dialog } from 'ui/elements'
import { Emphasize, Text } from 'ui/typo'
import { Redirect } from 'views/router'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'

import StatelessProjectForm from './form'

const REMOVE_PROJECT = 'REMOVE_PROJECT'

const ProjectForm = reduxForm({
  form: 'project',
  enableReinitialize: true
})(StatelessProjectForm)

const EditProject = ({
  project,
  updateProject,
  removeProject,
  isRemoveProjectDialogActive,
  hideRemoveProjectDialog,
  showRemoveProjectDialog,
  ui: {
    removeProjectError,
    removeProjectResult
  }
}) => {
  if (!project) {
    return null
  }
  if (removeProjectResult) {
    return <Redirect to="/projects" />
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
        isActive={ isRemoveProjectDialogActive }
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
                onClick={ () => removeProject(project.identifier) }
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

    return {
      project: selectors.findProjectByIdentifier(state, identifier),
      isRemoveProjectDialogActive: selectors.isDialogActive(state, REMOVE_PROJECT)
    }
  },
  mapDispatch({
    updateProject: (identifier, name, status, isActive) => actions.updateProject({ identifier, name, status: isActive ? 'DEPLOYED' : 'DISABLED', isActive }),
    removeProject: actions.removeProject,
    showRemoveProjectDialog: () => actions.showDialog(REMOVE_PROJECT),
    hideRemoveProjectDialog: () => actions.hideDialog(REMOVE_PROJECT)
  })
)(EditProject)
