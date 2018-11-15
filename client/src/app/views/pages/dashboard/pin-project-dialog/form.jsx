import React from 'react'

import { Break, Button, Form } from 'ui/elements'
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
    <Button type="submit" disabled={ !idle }>Pin</Button>
  </Form>
)

export default PinnedProjectForm
