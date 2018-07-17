import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Container } from 'ui/elements'
import { modal } from 'views/common/decorators'
import { Redirect } from 'views/router'

import _ProjectForm from './form'

const ProjectForm = reduxForm({
  form: 'project',
  enableReinitialize: true,
})(_ProjectForm)

const CreateProject = ({
  createProject,
  ui: { idle, error, result }
}) => {
  if (result) {
    return (
      <Redirect to={ `/projects/${ result.slug }` } />
    )
  }

  return (
    <Container>
      <ProjectForm
        onSubmit={ createProject }
        idle={ idle }
      />
    </Container>
  )
}

export default modal({
  name: 'CreateProject'
})(
  connect(
    null,
    mapDispatch({
      createProject: actions.createProject
    })
  )(CreateProject)
)
