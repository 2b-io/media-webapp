import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Container, ErrorBox } from 'ui/elements'
import { Redirect } from 'views/router'

import _ProjectForm from './form'

const ProjectForm = reduxForm({
  form: 'project',
  enableReinitialize: true
})(_ProjectForm)

const CreateProject = ({
  createProject,
  ui: { idle, error, result }
}) => {
  if (result) {
    return (
      <Redirect to={ `/projects/${ result.identifier }` } />
    )
  }

  return (
    <Container>
      { error &&
        <ErrorBox>An error happens when creating the new project.</ErrorBox>
      }
      <ProjectForm
        idle={ idle }
        initialValues={ { provider: 'cloudfront' } }
        onSubmit={ createProject }
      />
    </Container>
  )
}

export default connect(
  null,
  mapDispatch({
    createProject: actions.createProject
  })
)(CreateProject)
