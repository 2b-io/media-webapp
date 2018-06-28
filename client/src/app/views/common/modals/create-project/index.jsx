import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Container } from 'ui/elements'
import { modal } from 'views/common/decorators'

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
