import React from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { Heading } from 'ui/typo'
import { Card, Nothing, PlainButton } from 'ui/elements'
import { EditIcon } from 'ui/icons'
import { Project } from 'views/common/compounds'

const ProjectInfoCard = ({
  project,
  toEditProject
}) => (
  project && (
    <Card
      title={ () => <Heading mostLeft mostRight>General</Heading> }
      fab={ () => (
        <PlainButton onClick={ () => toEditProject(project.identifier) }>
          <EditIcon />
        </PlainButton>
      ) }
      content={ () => <Project project={ project } /> }
    />
  ) || <Nothing />
)

export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)

    if (!identifier) {
      return {}
    }

    return {
      project: selectors.findProjectByIdentifier(state, identifier)
    }
  },
  mapDispatch({
    toEditProject: (identifier) => actions.requestLocation(`/projects/${ identifier }/edit`)
  })
)(ProjectInfoCard)
