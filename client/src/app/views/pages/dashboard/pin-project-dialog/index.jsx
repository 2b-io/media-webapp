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
  pinnedProjectIdentifiers
}) => {
  const listPinnedProjects = allProjects.reduce((projects, project) => {
    const pinnedProject = pinnedProjectIdentifiers.some((pinnedProjectIdentifier) =>
      project.identifier === pinnedProjectIdentifier.identifier
    )
    return { ...projects, [ project.identifier ]: pinnedProject }
  }, {})

  return (
    <Container>
      <PinnedProjectForm
        idle={ idle }
        onSubmit={ updatePinnedProjects }
        allProjects={ allProjects }
        initialValues={ listPinnedProjects }
      />
    </Container>
  )
}

export default UpdateProjectPinnedDialog
