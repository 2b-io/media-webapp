import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { reset } from 'redux-form'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { Button, Card, Paragraph } from 'ui/elements'
import { EditIcon } from 'ui/icons'
import { Heading, Text, TextLine } from 'ui/typo'
import { stateful } from 'views/common/decorators'
import { Redirect, Route, withParams } from 'views/router'

import CacheInvalidatorModal from './cache-invalidator-modal'
import CollaboratorInviteEmail from './sent-email-invite-modal'
import InviteModal from './invite-modal'
import { ConfirmDeleteCollaboratorDialog } from './dialog'

import { ApiKeys } from './api-keys-card'
import Collaborators from './collaborator-card'
import { ProjectTools } from './project-tools-card'
import { Presets } from './presets-card'

const Layout = styled.section`
  padding: 16px;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
  background: #e6e6e6;
`

const Container = styled.div`
  display: grid;
  & > * {
    min-height: 0;
    min-width: 0;
  }

  grid-gap: 16px;
  grid-template-columns: 100%;
`

const Project = ({
  createApiKey,
  currentAccount,
  deleteCollaborator,
  makeOwner,
  project,
  pullSetting = {},
  toEditProject,
  toEditPullSetting,
  toInviteCollaboratorModal,
  toProjectDetail,
  toProfile,
  secretKeys,
  removeSecretKey,
  updateSecretKey,
  showDeleteCollaboratorDialog,
  hideDeleteCollaboratorDialog,
  ui: {
    // idle,
    notFound,
    // deleteError,
    deleteResult,
    // updateError
  }
}) => {
  if (notFound || deleteResult) {
    return <Redirect to="/projects" />
  }

  // copy from 'models/pull-setting'
  const delimiter = /\s*[,\n+]\s*/
  const allowedOrigins = (pullSetting.allowedOrigins || '').trim().split(delimiter).filter(Boolean)

  return (
    <Fragment>
      <Layout>
        <Container>
          { project &&
            <Fragment>
              <Card
                title={ () => <Heading mostLeft mostRight>General</Heading> }
                fab={ () => <EditIcon onClick={ () => toEditProject(project.identifier) } /> }
                content={ () => (
                  <Fragment>
                    <TextLine mostLeft mostRight>
                      { project.name }
                    </TextLine>
                    <Text mostLeft mostRight>
                      { project.infrastructure.domain }<br />
                      { project.status }
                    </Text>
                  </Fragment>
                ) }
              />
              <Presets identifier={ project.identifier } />
              <Card
                title={ () => <Heading mostLeft mostRight>Pull Settings</Heading> }
                fab={ () => <EditIcon onClick={ () => toEditPullSetting(project.identifier) } /> }
                content={ () => (
                  <Fragment>
                    <Text mostLeft mostRight>
                      Pull URL:<br />
                      &nbsp;&nbsp;{ pullSetting.pullURL || 'N/A' }<br />
                    </Text>
                    <Text mostLeft mostRight>
                      Allowed Origins:<br />
                      {
                        allowedOrigins.length &&
                          allowedOrigins.map(
                            (originn, index) => (
                              <Fragment key={ index }>- { origin }<br /></Fragment>
                            )
                          ) || ( <Fragment>&nbsp;&nbsp;N/A<br /></Fragment> )
                      }
                    </Text>
                    <Text mostLeft mostRight>
                      Headers:<br />
                      {
                        (pullSetting.headers || []).length &&
                          pullSetting.headers.map(
                            ({ name, value }, index) => (
                              <Fragment key={ index }>- { name }: { value }<br /></Fragment>
                            )
                          ) || ( <Fragment>&nbsp;&nbsp;N/A<br /></Fragment> )
                      }
                    </Text>
                  </Fragment>
                ) }
              />
              <ApiKeys
                secretKeys={ secretKeys }
                createApiKey={ () => createApiKey(project.identifier) }
                removeSecretKey={ (key) => removeSecretKey(project.identifier, key) }
                updateSecretKey={ (data) => updateSecretKey(project.identifier, data ) }
              />
              <Collaborators
                collaborators={ project.collaborators }
                currentAccount={ currentAccount }
                makeOwner={ (accountId) => { makeOwner(accountId, project.identifier) } }
                showDeleteCollaboratorDialog={ showDeleteCollaboratorDialog }
                toProfile={ toProfile }
                toInviteCollaboratorModal={ () => toInviteCollaboratorModal(project.identifier) }
              />
              <ProjectTools identifier={ project.identifier } />
            </Fragment>
          }
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
      </Layout>
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
        currentAccount: selectors.currentAccount(state),
        secretKeys: selectors.secretKeys(state, identifier),
        pullSetting: selectors.pullSetting(state, identifier)
      }),
      mapDispatch({
        showDeleteCollaboratorDialog: (accountId, accountEmail) => actions.showDialog({ dialog: 'ConfirmDeleteCollaboratorDialog', params: { accountId, accountEmail } }),
        hideDeleteCollaboratorDialog: () => actions.hideDialog({ dialog: 'ConfirmDeleteCollaboratorDialog' }),
        showDeleteProjectDialog: () => actions.showDialog({ dialog: 'ConfirmDeleteProjectDialog' }),
        hideDeleteProjectDialog: () => actions.hideDialog({ dialog: 'ConfirmDeleteProjectDialog' }),
        deleteProject: actions.deleteProject,
        updateProject: actions.updateProject,
        toCacheInvalidator: (identifier) => actions.requestLocation(`/projects/${ identifier }/cache-invalidator`),
        toEditProject: (identifier) => actions.requestLocation(`/projects/${ identifier }/edit`),
        toInviteCollaboratorModal: (identifier) => actions.requestLocation(`/projects/${ identifier }/invite`),
        toProfile: (id) => actions.requestLocation(`/@${ id }`),
        toProjectDetail: (identifier) => actions.requestLocation(`/projects/${ identifier }`),
        toEditPullSetting: (identifier) => actions.requestLocation(`/projects/${ identifier }/pull-setting`),
        toProjectMedia: (identifier) => actions.requestLocation(`/projects/${ identifier }/media`),
        makeOwner: actions.makeOwner,
        deleteCollaborator: actions.deleteCollaborator,
        reset,
        createApiKey: actions.createSecretKey,
        removeSecretKey: actions.removeSecretKey,
        updateSecretKey: actions.updateSecretKey
      })
    )(Project)
  )
)
