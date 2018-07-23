import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { reduxForm } from 'redux-form'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { Layout } from 'ui/compounds'
import { Button, Container, ErrorBox } from 'ui/elements'
import { AddIcon } from 'ui/icons'
import { stateful } from 'views/common/decorators'
import { Route, Switch, withParams } from 'views/router'

import CollaboratorList from './collaborator-list'
import _ProjectForm from './form'
import InviteModal from './invite-modal'
import PresetList from './preset-list'
import PresetModal from './preset-modal'

const ProjectForm = reduxForm({
  form: 'project',
  enableReinitialize: true
})(_ProjectForm)

const Project = ({
  project,
  toInviteModal,
  toPresetDetail,
  toProfile,
  toProjectDetail,
  updateProject,
  ui: { error, idle }
}) => (
  <Fragment>
    <Layout>
      <Layout.Fluid size="small">
        <Container>
          <h2>Project Info</h2>
          { error &&
            <ErrorBox>An error happens when updating the project.</ErrorBox>
          }
          <ProjectForm
            idle={ idle }
            initialValues={ project }
            onSubmit={ updateProject }
          />
        </Container>
      </Layout.Fluid>
      <Layout.Fixed size="small">
        <Container>
          <h2>Presets</h2>
          <Button plain onClick={ () => toPresetDetail(project.slug, 'new') }>
            <AddIcon size="medium" />
          </Button>
          {
            project &&
              <PresetList
                presets={ project.presets }
                onPresetSelected={ hash => {
                  toPresetDetail(project.slug, hash)
                } }
              />
          }
        </Container>
        <Container>
          <h2>Collaborators</h2>
          <Button plain onClick={ () => toInviteModal(project.slug) }>
            <AddIcon size="medium" />
          </Button>
          {
            project &&
              <CollaboratorList
                collaborators={ project.collaborators }
                toProfile={ toProfile }
              />
          }
        </Container>
      </Layout.Fixed>
    </Layout>
    <Switch>
      <Route path="/projects/:slug/presets/new">
        <PresetModal
          width="wide"
          hideOnClickOutside={ false }
          title="Create new preset"
          onHide={ () => toProjectDetail(project.slug) }
        />
      </Route>
      <Route path="/projects/:slug/presets/:hash">
        <PresetModal
          width="wide"
          hideOnClickOutside={ false }
          title="Edit preset"
          onHide={ () => toProjectDetail(project.slug) }
        />
      </Route>
    </Switch>
    <Route path="/projects/:slug/invite">
      <InviteModal
        width="wide"
        title="Invite collaborators"
        onHide={ () => toProjectDetail(project.slug) }
      />
    </Route>
  </Fragment>
)
export default withParams(
  stateful({
    component: 'ProjectDetail'
  })(
    connect(
      (state, { params: { slug } }) => ({
        project: selectors.findProjectBySlug(state, slug),
      }),
      mapDispatch({
        toInviteModal: slug => actions.requestLocation(`/projects/${ slug }/invite`),
        toPresetDetail: (slug, hash) => actions.requestLocation(`/projects/${ slug }/presets/${ hash }`),
        toProfile: id => actions.requestLocation(`/@${ id }`),
        toProjectDetail: slug => actions.requestLocation(`/projects/${ slug }`),
        updateProject: actions.updateProject
      })
    )(Project)
  )
)
