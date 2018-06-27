import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'

import { mapDispatch, mapState } from 'services/redux-helpers'
import _ProjectForm from './projectForm'

const ProjectForm = reduxForm({
  form: 'fetchProject',
  enableReinitialize: true
})(_ProjectForm)

const CreateProject=({ createProject, project }) => {
  return (
    <main>
      <Container center size="small">
        <ProjectForm onSubmit={ createProject } />
        { project?
          <p>
           Create project success
          </p> :''
        }
      </Container>
    </main>
  ) }

export default connect(
  mapState({
    project: selectors.project
  }),
  mapDispatch({
    createProject: ({ name, slug, prettyOrigin, origins }) => actions.createProject(name, slug, prettyOrigin, origins),
  })
)(CreateProject)
