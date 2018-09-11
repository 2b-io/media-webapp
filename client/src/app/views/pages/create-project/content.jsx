import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Container, ErrorBox, Link } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { stateful } from 'views/common/decorators'
import { Redirect } from 'views/router'

import _ProjectForm from './form'

const CDN_LIST = [
  {
    label: 'Amazon CloudFront',
    value: 'cloudFront',
    description: () => (
      <DescriptionText mostLeft mostRight>
        Amazon CloudFront is a global content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to your viewers with low latency and high transfer speeds.
        <Link href="#">Read more.</Link>
      </DescriptionText>
    )
  },
  {
    label: 'Key CDN',
    value: 'keyCDN',
    description: () => (
      <DescriptionText mostLeft mostRight>
        KeyCDN is a service of proinity LLC.
        <Link href="#">Read more.</Link>
      </DescriptionText>
    )
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
