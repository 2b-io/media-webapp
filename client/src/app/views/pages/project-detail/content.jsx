import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { reduxForm, reset } from 'redux-form'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { Panel, TitleBar } from 'ui/compounds'
import { Button, Card, ErrorBox, List, MenuMore, Paragraph } from 'ui/elements'
import { AddIcon, EditIcon, OwnerAddIcon, ReloadIcon } from 'ui/icons'
import { Heading, Text, TextLine } from 'ui/typo'
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

const LineWithButton = styled.div`
  display: grid;
  & > * {
    min-height: 0;
    min-width: 0;
  };
  grid-template-columns: 1fr 40px;
`

const ProjectForm = reduxForm({
  form: 'project',
  enableReinitialize: true
})(_ProjectForm)

const Project = ({
  presets,
  project,
  hideDeleteCollaboratorDialog,
  showDeleteCollaboratorDialog,
  hideDeleteProjectDialog,
  showDeleteProjectDialog,
  currentAccount,
  deleteProject,
  updateProject,
  toCacheInvalidator,
  toEditProject,
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
        <Container>
          { project &&
            <Fragment>
              <Card
                title={ () => <Heading mostLeft mostRight>General</Heading> }
                fab={ () => <EditIcon onClick={ () => toEditProject(project.identifier) } /> }
                content={ () => (
                  <TextLine mostLeft mostRight>
                    { project.name }<br />
                    { project.infrastructure.domain }<br />
                    { project.status }
                  </TextLine>
                ) }
              />
              <PresetList presets={ presets } />
            </Fragment>
          }
        </Container>
      </Layout>
      <Route path="/projects/:identifier/presets/new">
        <PresetModal
          width="wide"
          hideOnClickOutside={ true }
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
        presets: selectors.presets(state, identifier),
        currentAccount: selectors.currentAccount(state)
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
        toInviteModal: (identifier) => actions.requestLocation(`/projects/${ identifier }/invite`),
        toPresetDetail: (identifier, hash) => actions.requestLocation(`/projects/${ identifier }/presets/${ hash }`),
        toProfile: (id) => actions.requestLocation(`/@${ id }`),
        toProjectDetail: (identifier) => actions.requestLocation(`/projects/${ identifier }`),
        toProjectMedia: (identifier) => actions.requestLocation(`/projects/${ identifier }/media`),
        makeOwner: actions.makeOwner,
        deleteCollaborator: actions.deleteCollaborator,
        reset
      })
    )(Project)
  )
)
