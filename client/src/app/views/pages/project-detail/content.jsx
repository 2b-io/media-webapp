import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { withParams } from 'views/router'

import CollaboratorList from './collaborator-list'
import _ProjectForm from './form'
import PresetList from './preset-list'

const ProjectForm = reduxForm({
  form: 'project',
  enableReinitialize: true
})(_ProjectForm)

const Section = styled.section`
  padding-bottom: 30px;
`

const Project = ({ project, updateProject }) => (
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
          />
      }
    </Section>
  </main>
)
export default withParams(
  connect(
    (state, { params: { slug } }) => ({
      project: selectors.findProjectBySlug(state, slug),
    }),
    mapDispatch({
      updateProject: ({ name, slug, prettyOrigin, origins }) => actions.updateProject({ name, slug, prettyOrigin, origins })
    })
  )(Project)
)
