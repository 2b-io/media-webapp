import React from 'react'
import { connect } from 'react-redux'

import { reduxForm } from 'redux-form'
import styled from 'styled-components'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { Button } from 'ui/elements'
import { AddIcon } from 'ui/icons'
import { Route, withParams } from 'views/router'

import CollaboratorList from './collaborator-list'
import InviteCollaborator from 'views/common/modals/invite-collaborator'
import _ProjectForm from './form'
import PresetList from './preset-list'
import PresetModal from './preset-modal'

const ProjectForm = reduxForm({
  form: 'project',
  enableReinitialize: true
})(_ProjectForm)

const Section = styled.section`
  padding-bottom: ${ ({ theme }) => theme.spacing.big };
`

const Project = ({
  project,
  toPresetDetail,
  toProfile,
  toProjectDetail,
  showInviteCollaborator,
  updateProject
}) => (
  <main>
    <Section>
      <h2>Project Info</h2>
      <ProjectForm
        initialValues={ project }
        onSubmit={ updateProject }
      />
    </Section>
    <Section>
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
    </Section>
    <Section>
      <h2>Collaborators</h2>
      <Button plain onClick={ showInviteCollaborator }>
        <AddIcon size="medium" />
      </Button>
      {
        project &&
          <CollaboratorList
            collaborators={ project.collaborators }
            toProfile={ toProfile }
          />
      }
    </Section>
    <Route path="/projects/:slug/presets/:hash">
      <PresetModal
        width="wide"
        hideOnClickOutside={ false }
        onHide={ () => toProjectDetail(project.slug) }
      />
    </Route>
    <InviteCollaborator width="wide" />
  </main>
)
export default withParams(
  connect(
    (state, { params: { slug } }) => ({
      project: selectors.findProjectBySlug(state, slug),
    }),
    mapDispatch({
      toPresetDetail: (slug, hash) => actions.requestLocation(`/projects/${ slug }/presets/${ hash }`),
      toProfile: id => actions.requestLocation(`/@${ id }`),
      toProjectDetail: slug => actions.requestLocation(`/projects/${ slug }`),
      updateProject: actions.updateProject,
      toProfile: (id) => actions.requestLocation(`/@${ id }`),
      showInviteCollaborator: () => ({
        type: '@@MODAL/SHOW',
        payload: { modal: 'InviteCollaborator' }
      })
    })
  )(Project)
)
