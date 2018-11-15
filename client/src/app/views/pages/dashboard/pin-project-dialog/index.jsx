import React from 'react'
import { reduxForm } from 'redux-form'

import { Container } from 'ui/elements'
import _PinnedProjectForm from './form'

const PinnedProjectForm = reduxForm({
  form: 'PinnedProject',
  enableReinitialize: true
})(_PinnedProjectForm)

const UpdateProjectPinnedDialog = ({
  idle,
  updatePinnedProjects,
  allProjects,
  pinnedProjects
}) => {
  if (!allProjects || !pinnedProjects) {
    return
  }

  const pinnedState = pinnedProjects
    .reduce(
      (state, project) => ({
        ...state,
        [ project.identifier ]: true
      }), {}
    )

  return (
    <Container>
      <PinnedProjectForm
        idle={ idle }
        onSubmit={ updatePinnedProjects }
        allProjects={ allProjects }
        initialValues={ pinnedState }
      />
    </Container>
  )
}

export default UpdateProjectPinnedDialog
