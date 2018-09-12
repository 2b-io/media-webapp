import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { Container } from 'ui/elements'
import { stateful } from 'views/common/decorators'

import _ProjectForm from './form'

const ProjectForm = reduxForm({
  form: 'project',
  enableReinitialize: true
})(_ProjectForm)

const EditProject = ({
  project
}) => {

  return (
    <Container>

      <ProjectForm
        onSubmit={ true }
        initialValues={ project }
        provider={ project.provider }
      />
    </Container>
  )
}

export default stateful({
  component: 'EditProject'
})(
  connect(
    () => ({
      project: dataTest,
    }),
    null
  )(EditProject)
)

const dataTest = {
  name: 'test Project',
  provider: 'd1wbceeoo5msfq.cloudfront.net',
  description: 'Ahihihihi',
  disabled: true
}
