import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'

import _ProjectForm from './form'

const ProjectForm = reduxForm({
  form: 'project',
  enableReinitialize: true
})(_ProjectForm)

const CreateProject = ({ createProject }) => {
  return (
    <Container center>
      <ProjectForm onSubmit={ createProject } />
    </Container>
  )
}

export default connect(
  null,
  mapDispatch({
    createProject: actions.createProject
  })
)(CreateProject)
