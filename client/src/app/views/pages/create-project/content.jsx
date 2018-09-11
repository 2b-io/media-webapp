import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Container, ErrorBox } from 'ui/elements'
import { stateful } from 'views/common/decorators'
import { Redirect } from 'views/router'

import _ProjectForm from './form'

const CDN_LIST = [
  {
    label: 'Amazon CloudFront',
    value: 'cloundFront',
  },
  {
    label: 'Key CDN',
    value: 'keyCDN',
  }
]

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
      <Redirect to={ `/projects/${ result.id }` } />
    )
  }
  return (
    <Container>
      { error &&
        <ErrorBox>An error happens when creating the new project.</ErrorBox>
      }
      <ProjectForm
        idle={ idle }
        initialValues={ { cdn: CDN_LIST[0].value } }
        onSubmit={ createProject }
        options={ CDN_LIST }
      />
    </Container>
  )
}

export default stateful({
  component: 'CreateProject'
})(
  connect(
    null,
    mapDispatch({
      createProject: actions.createProject
    })
  )(CreateProject)
)
