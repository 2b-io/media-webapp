import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { Button } from 'ui/elements'
import { AddIcon } from 'ui/icons'
import { withParams } from 'views/router'

import CollaboratorList from './collaborator-list'
import CreatePreset from 'views/common/modals/create-preset'
import UpdatePreset from 'views/common/modals/update-preset'
import _ProjectForm from './form'
import PresetList from './preset-list'

const ProjectForm = reduxForm({
  form: 'project',
  enableReinitialize: true
})(_ProjectForm)

const Section = styled.section`
  padding-bottom: ${ ({ theme }) => theme.spacing.big };
`

const Project = ({ project, updateProject, toProfile, showModal, showPresetDetail, getPreset }) => (
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
      <Button plain onClick={ () => showModal(project.slug, '_') }>
        <AddIcon size="medium" />
      </Button>
      {
        project &&
          <PresetList
            presets={ project.presets }
            toPresetDetail={ (hash) => {
              const preset = Object.values(project.presets).find((obj) => obj.hash === hash)
              getPreset(preset)
              showPresetDetail(preset)
            } }
          />
      }
    </Section>
    <Section>
      <h2>Collaborators</h2>
      {
        project &&
          <CollaboratorList
            collaborators={ project.collaborators }
            toProfile={ toProfile }
          />
      }
    </Section>
    <Route path="/projects/:slug/presets/:hash">
      <CreatePreset width="wide"
        hideOnClickOutside={ false }
      />
    </Route>
    <UpdatePreset width="wide" preset={ true } />
  </main>
)
export default withParams(
  connect(
    (state, { params: { slug } }) => ({
      project: selectors.findProjectBySlug(state, slug),
    }),
    mapDispatch({
      updateProject: actions.updateProject,
      toProfile: (id) => actions.requestLocation(`/@${ id }`),
      getPreset: actions.getPreset,
      showModal: (slug, hash) => actions.requestLocation(`/projects/${ slug }/presets/${ hash }`),
      showPresetDetail: (params) => ({
        type: '@@MODAL/SHOW',
        payload: { modal: 'UpdatePreset', params }
      })
    })
  )(Project)
)
