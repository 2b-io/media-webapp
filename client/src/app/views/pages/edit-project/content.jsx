import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { Container, Dialog, Button } from 'ui/elements'
import { DialogContent } from 'ui/compounds'
import { stateful } from 'views/common/decorators'
import { Redirect } from 'views/router'
import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'

import _ProjectForm from './form'

const REMOVE_PROJECT = 'REMOVE_PROJECT'

const ProjectForm = reduxForm({
  form: 'project',
  enableReinitialize: true
})(_ProjectForm)

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
      <Dialog
        isActive={ isRemoveProjectDialogActive }
        onOverlayClick={ hideRemoveProjectDialog }
        content={ () => (
          <DialogContent>
            <DialogContent.Content>
              {
                removeProjectError ?
                  removeProjectError.message :
                  <p>You are about to permanently delete project<b> "Media Network LP" </b>and all its media. This operation cannot be undone.</p>
              }
            </DialogContent.Content>
            <DialogContent.Choices>
              <Button.Group>
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
            </DialogContent.Choices>
          </DialogContent>
        ) }
      />
    </Container>
  ) }

export default stateful({
  component: 'EditProject'
})(
  connect(
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
)
