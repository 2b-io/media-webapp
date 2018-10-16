import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Container } from 'ui/elements'

import _ProjectForm from './form'

const ProjectForm = reduxForm({
  form: 'project',
  enableReinitialize: true
})(_ProjectForm)

const CreateProject = ({
  createProject,
  ui: { idle }
}) => (
  <Container>
    <ProjectForm
      idle={ idle }
      initialValues={ { provider: 'cloudfront' } }
      onSubmit={ createProject }
    />
  </Container>
)

export default connect(
  null,
  mapDispatch({
    createProject: actions.createProject
  })
)(CreateProject)
