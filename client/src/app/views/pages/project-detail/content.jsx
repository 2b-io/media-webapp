import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { reset } from 'redux-form'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { Card } from 'ui/elements'
import { EditIcon } from 'ui/icons'
import { Heading, TextLine } from 'ui/typo'
import { stateful } from 'views/common/decorators'
import { Redirect, Route, withParams } from 'views/router'

import CacheInvalidatorModal from './cache-invalidator-modal'
import CollaboratorInviteEmail from './sent-email-invite-modal'
import InviteModal from './invite-modal'
import PresetModal from './preset-modal'

import Presets from './preset-card'
import ApiKeys from './api-key-card'

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
  toCreateApiKey,
  presets,
  project,
  toEditProject,
  toEditPullSetting,
  toProjectDetail,
  toCreatePreset,
  secretKeys,
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
              <Presets
                presets={ presets }
                toCreatePreset={ () => toCreatePreset(project.identifier, 'new') }
              />
              <Card
                title={ () => <Heading mostLeft mostRight>Pull Settings</Heading> }
                fab={ () => <EditIcon onClick={ () => toEditPullSetting(project.identifier) } /> }
                content={ () => (
                  <div>Pull data</div>
                ) }
              />
              <ApiKeys
                secretKeys={ secretKeys }
                toCreateApiKey={ () => toCreateApiKey() }
              />
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
        currentAccount: selectors.currentAccount(state),
        secretKeys: [
          { key: '9LnCclsaU3fX6rgZBqB9TEGGMagC', isActive: true },
          { key: 'gJKglwcg2QuZd99bl0C2E2CNeaFn', isActive: false }
        ]
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
        toCreatePreset: (identifier, hash) => actions.requestLocation(`/projects/${ identifier }/presets/${ hash }`),
        toProfile: (id) => actions.requestLocation(`/@${ id }`),
        toProjectDetail: (identifier) => actions.requestLocation(`/projects/${ identifier }`),
        toProjectDetail: (identifier) => actions.requestLocation(`/projects/${ identifier }/pull-setting`),
        toProjectMedia: (identifier) => actions.requestLocation(`/projects/${ identifier }/media`),
        makeOwner: actions.makeOwner,
        deleteCollaborator: actions.deleteCollaborator,
        reset
      })
    )(Project)
  )
)
