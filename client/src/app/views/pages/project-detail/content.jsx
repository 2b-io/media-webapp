import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { Button } from 'ui/elements'
import { AddIcon } from 'ui/icons'
import { withParams } from 'views/router'

import CollaboratorList from './collaborator-list'
import CreatePreset from 'views/common/modals/create-preset'
import _ProjectForm from './form'
import PresetList from './preset-list'

const ProjectForm = reduxForm({
  form: 'project',
  enableReinitialize: true
})(_ProjectForm)

const Section = styled.section`
  padding-bottom: 30px;
`

const Project = ({ project, updateProject, toProfile, showModal }) => (
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
      <Button plain onClick={ showModal }>
        <AddIcon size="medium" />
      </Button>
      {
        project &&
          <PresetList
            presets={ project.presets }
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
    <CreatePreset width="wide" />
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
      showModal: () => ({
        type: '@@MODAL/SHOW',
        payload: { modal: 'CreatePreset' }
      })
    })
  )(Project)
)
