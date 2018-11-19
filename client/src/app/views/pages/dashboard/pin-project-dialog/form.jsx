import React from 'react'

import { Break, Form, PrimaryButton } from 'ui/elements'
import { CheckBox } from 'views/common/form'

const PinnedProjectForm = ({
  handleSubmit,
  idle,
  allProjects
}) => (
  <Form handleSubmit={ handleSubmit }>
    {
      allProjects &&
        allProjects.map(({ identifier, name }) => (
          <CheckBox
            key={ identifier }
            disabled={ !idle }
            name={ identifier }
            label={ `${ name } (${ identifier })` }
          />
        ))
    }
    <Break double />
    <PrimaryButton
      type="submit"
      disabled={ !idle }
    >
      Save pinned projects
    </PrimaryButton>
  </Form>
)

export default PinnedProjectForm
