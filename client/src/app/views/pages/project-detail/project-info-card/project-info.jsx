import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { Heading, Text, TextLine } from 'ui/typo'
import { Card, Nothing } from 'ui/elements'
import { EditIcon } from 'ui/icons'

const ProjectInfo = ({
  identifier,
  project,
  toEditProject
}) => (
  project && (
    <Card
      title={ () => <Heading mostLeft mostRight>General</Heading> }
      fab={ () => <EditIcon onClick={ () => toEditProject(identifier) } /> }
      content={ () => (
        <Fragment>
          <TextLine mostLeft mostRight>
            { project.name }
          </TextLine>
          <Text mostLeft mostRight>
            { project.infrastructure.domain }<br />
            { project.status }
          </Text>
        </Fragment>
      ) }
    />
  ) || <Nothing />
)

export default connect(
  (state, { identifier }) => ({
    project: selectors.findProjectByIdentifier(state, identifier)
  }),
  mapDispatch({
    toEditProject: (identifier) => actions.requestLocation(`/projects/${ identifier }/edit`)
  })
)(ProjectInfo)
