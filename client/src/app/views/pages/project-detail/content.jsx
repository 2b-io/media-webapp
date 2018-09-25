import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { reset } from 'redux-form'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { Card } from 'ui/elements'
import { EditIcon } from 'ui/icons'
import { Heading, Text, TextLine } from 'ui/typo'
import { stateful } from 'views/common/decorators'
import { Redirect, Route, withParams } from 'views/router'

import CacheInvalidatorModal from './cache-invalidator-modal'

import { ApiKeys } from './api-keys-card'
import { Collaborators } from './collaborator-card/'
import { ProjectTools } from './project-tools-card'
import { Presets } from './presets-card'
import { PullSettings } from './pull-settings-card/'

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
  project,
  toEditProject,
  toProjectDetail,
  ui: {
    // idle,
    notFound,
    // deleteError,
    deleteResult,
    // updateError
  }
}) => {
  if(!project){
    return null
  }
  if(notFound || deleteResult) {
    return <Redirect to="/projects" />
  }

  const { collaborators, identifier } = project

  return (
    <Fragment>
      <Layout>
        <Container>
          { project &&
            <Fragment>
              <Card
                title={ () => <Heading mostLeft mostRight>General</Heading> }
                fab={ () => <EditIcon onClick={ () => toEditProject(identifier) } /> }
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
              <Presets identifier={ identifier } />
              <PullSettings identifier={ identifier } />
              <ApiKeys identifier={ identifier } />
              <Collaborators collaborators={ collaborators } identifier={ identifier } />
              <ProjectTools identifier={ identifier } />
            </Fragment>
          }
        </Container>
      </Layout>
      <Route path="/projects/:identifier/cache-invalidator">
        <CacheInvalidatorModal
          width="wide"
          onHide={ () => toProjectDetail(identifier) }
          identifier={ project && identifier }
          title="Cache Invalidator"
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
        project: selectors.findProjectByIdentifier(state, identifier)
      }),
      mapDispatch({
        showDeleteProjectDialog: () => actions.showDialog({ dialog: 'ConfirmDeleteProjectDialog' }),
        hideDeleteProjectDialog: () => actions.hideDialog({ dialog: 'ConfirmDeleteProjectDialog' }),
        deleteProject: actions.deleteProject,
        updateProject: actions.updateProject,
        toEditProject: (identifier) => actions.requestLocation(`/projects/${ identifier }/edit`),
        toProjectDetail: (identifier) => actions.requestLocation(`/projects/${ identifier }`),

        toProjectMedia: (identifier) => actions.requestLocation(`/projects/${ identifier }/media`),
        reset
      })
    )(Project)
  )
)
