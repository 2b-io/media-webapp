import React from 'react'

import { Break, Form, PrimaryButton } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { CheckBox  } from 'views/common/form'

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
    <DescriptionText mostLeft mostRight>
      Pin your favorite projects
    </DescriptionText>
    <Break double />
    <PrimaryButton
      type="submit"
      disabled={ !idle }
    >
      Pin
    </PrimaryButton>
  </Form>
)

export default PinnedProjectForm
