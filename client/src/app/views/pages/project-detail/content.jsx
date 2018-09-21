import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { reduxForm, reset } from 'redux-form'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { Layout, Panel, TitleBar } from 'ui/compounds'
import { Button, Container, ErrorBox, Paragraph } from 'ui/elements'
import { AddIcon, OwnerAddIcon, ReloadIcon } from 'ui/icons'
import { stateful } from 'views/common/decorators'
import { Redirect, Route, withParams } from 'views/router'

import ProjectTools from './project-tools'
import CacheInvalidatorModal from './cache-invalidator-modal'
import CollaboratorInviteEmail from './sent-email-invite-modal'
import CollaboratorList from './collaborator-list'
import _ProjectForm from './form'
import InviteModal from './invite-modal'
import PresetList from './preset-list'
import PresetModal from './preset-modal'
import { ConfirmDeleteCollaboratorDialog, ConfirmDeleteProjectDialog } from './dialog'

const ProjectForm = reduxForm({
  form: 'project',
  enableReinitialize: true
})(_ProjectForm)

const Project = ({
  project,
  hideDeleteCollaboratorDialog,
  showDeleteCollaboratorDialog,
  hideDeleteProjectDialog,
  showDeleteProjectDialog,
  currentAccount,
  deleteProject,
  updateProject,
  toCacheInvalidator,
  toInviteModal,
  toPresetDetail,
  toProfile,
  toProjectDetail,
  toProjectMedia,
  makeOwner,
  deleteCollaborator,
  reset,
  ui: {
    idle, notFound,
    deleteError, deleteResult,
    updateError
  }
}) => {
  if (notFound || deleteResult) {
    return <Redirect to="/projects" />
  }

  return (
    <Fragment>
      <Layout>
        <Layout.Fluid size="small">
          <Container>
            <Panel>
              <Panel.Header>
                <TitleBar>
                  <TitleBar.Title>
                    <h2>Project Info</h2>
                  </TitleBar.Title>
                  <TitleBar.Menu>
                    <Button plain onClick={ () => reset('project') }>
                      <ReloadIcon size="medium" />
                    </Button>
                  </TitleBar.Menu>
                </TitleBar>
              </Panel.Header>
              <Panel.Content>
                <Container>
                  { updateError &&
                    <ErrorBox>An error happens when updating the project.</ErrorBox>
                  }
                  { deleteError &&
                    <ErrorBox>An error happens when deleting the project.</ErrorBox>
                  }
                  <ProjectForm
                    showDeleteProjectDialog={ showDeleteProjectDialog }
                    idle={ idle }
                    initialValues={ project }
                    onSubmit={ updateProject }
                  />
                  <ConfirmDeleteProjectDialog
                    width="narrow"
                    content={ () => <Paragraph>Do you want delete this project?</Paragraph> }
                    choices={ () => (
                      <Button.Group>
                        <Button
                          variant="primary"
                          onClick={ () => deleteProject(project.identifier) }>
                          Delete
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={ hideDeleteProjectDialog }>
                          Cancel
                        </Button>
                      </Button.Group>
                    ) }
                  />
                </Container>
              </Panel.Content>
            </Panel>
          </Container>
        </Layout.Fluid>
        <Layout.Fixed size="small">
          <Container>
            <Panel>
              <Panel.Header>
                <TitleBar>
                  <TitleBar.Title>
                    <h2>Presets</h2>
                  </TitleBar.Title>

                  <TitleBar.Menu>
                    <Button plain onClick={ () => toPresetDetail(project.identifier, 'new') }>
                      <AddIcon size="medium" />
                    </Button>
                  </TitleBar.Menu>
                </TitleBar>
              </Panel.Header>
              <Panel.Content>
                { project &&
                  <PresetList
                    presets={ project.presets }
                    onPresetSelected={ hash => {
                      toPresetDetail(project.identifier, hash)
                    } }
                  />
                }
              </Panel.Content>
            </Panel>
          </Container>
          <Container>
            <Panel>
              <Panel.Header>
                <TitleBar>
                  <TitleBar.Title>
                    <h2>Collaborators</h2>
                  </TitleBar.Title>
                  <TitleBar.Menu>
                    <Button plain onClick={ () => toInviteModal(project.identifier) }>
                      <OwnerAddIcon size="medium" />
                    </Button>
                  </TitleBar.Menu>
                </TitleBar>
              </Panel.Header>
              <Panel.Content>
                {
                  project &&
                    <CollaboratorList
                      collaborators={ project.collaborators }
                      toProfile={ toProfile }
                      currentAccount={ currentAccount }
                      makeOwner={ (accountId) => { makeOwner(accountId, project.identifier) } }
                      showDeleteCollaboratorDialog={ showDeleteCollaboratorDialog }
                    />
                }
              </Panel.Content>
            </Panel>
            <ConfirmDeleteCollaboratorDialog
              width="narrow"
              content={ ({ params }) => (
                <Paragraph>
                  Do you want to remove the account { params.accountEmail } from the project?
                </Paragraph>
              ) }
              choices={ ({ params }) => (
                <Button.Group>
                  <Button
                    variant="primary"
                    onClick={ () => deleteCollaborator(project.identifier, params.accountId) }>
                    Remove
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={ hideDeleteCollaboratorDialog }>
                    Cancel
                  </Button>
                </Button.Group>
              ) }
            />
          </Container>
          <Container>
            <Panel>
              <Panel.Header>
                <TitleBar>
                  <TitleBar.Title>
                    <h2>Tools</h2>
                  </TitleBar.Title>
                </TitleBar>
              </Panel.Header>
              <Panel.Content>
                {
                  project &&
                    <ProjectTools
                      detail="Cache Invalidator"
                      identifier={ project.identifier }
                      toProjectMedia={ () => toProjectMedia(project.identifier) }
                      toCacheInvalidator={ () => toCacheInvalidator(project.identifier) }
                    />
                }
              </Panel.Content>
            </Panel>
          </Container>
        </Layout.Fixed>
      </Layout>
      <Route path="/projects/:identifier/presets/new">
        <PresetModal
          width="wide"
          hideOnClickOutside={ false }
          onHide={ () => toProjectDetail(project.identifier) }
        />
      </Route>
      <Route path="/projects/:identifier/invite">
        <InviteModal
          width="wide"
          identifier={ project && project.identifier }
          title="Invite collaborators"
          onHide={ () => toProjectDetail(project.identifier) }
          collaborators={ project && Object.values(project.collaborators) }
        />
      </Route>
      <Route path="/projects/:identifier/cache-invalidator">
        <CacheInvalidatorModal
          width="wide"
          onHide={ () => toProjectDetail(project.identifier) }
          identifier={ project && project.identifier }
          title="Cache Invalidator"
        />
      </Route>
      <Route path="/projects/:identifier/invite-by-email">
        <CollaboratorInviteEmail
          width="wide"
          title="Sent email invite collaborators"
          onHide={ () => toProjectDetail(project.identifier) }
        />
      </Route>
    </Fragment>
  )
}

export default withParams(
  stateful({
    component: 'ProjectDetail'
  })(
    connect(
      (state, { params: { identifier } }) => ({
        project: selectors.findProjectByIdentifier(state, identifier),
        currentAccount: selectors.currentAccount(state)
      }),
      mapDispatch({
        showDeleteCollaboratorDialog: (accountId, accountEmail) => actions.showDialog({ dialog: 'ConfirmDeleteCollaboratorDialog', params: { accountId, accountEmail } }),
        hideDeleteCollaboratorDialog: () => actions.hideDialog({ dialog: 'ConfirmDeleteCollaboratorDialog' }),
        showDeleteProjectDialog: () => actions.showDialog({ dialog: 'ConfirmDeleteProjectDialog' }),
        hideDeleteProjectDialog: () => actions.hideDialog({ dialog: 'ConfirmDeleteProjectDialog' }),
        deleteProject: actions.deleteProject,
        updateProject: actions.updateProject,
        toCacheInvalidator: identifier => actions.requestLocation(`/projects/${ identifier }/cache-invalidator`),
        toInviteModal: identifier => actions.requestLocation(`/projects/${ identifier }/invite`),
        toPresetDetail: (identifier, hash) => actions.requestLocation(`/projects/${ identifier }/presets/${ hash }`),
        toProfile: id => actions.requestLocation(`/@${ id }`),
        toProjectDetail: identifier => actions.requestLocation(`/projects/${ identifier }`),
        toProjectMedia: identifier => actions.requestLocation(`/projects/${ identifier }/media`),
        makeOwner: actions.makeOwner,
        deleteCollaborator: actions.deleteCollaborator,
        reset
      })
    )(Project)
  )
)
