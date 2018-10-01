import React from 'react'
import { connect } from 'react-redux'

import { actions } from 'state/interface'
import { mapDispatch } from 'services/redux-helpers'
import { Card, List } from 'ui/elements'
import { LaunchIcon } from 'ui/icons'
import { Heading, TextLine } from 'ui/typo'

const ProjectTools = ({
  identifier,
  toCacheInvalidator,
  toProjectMedia
}) => (
  <Card
    title={ () => <Heading mostLeft mostRight>Tools</Heading> }
    content={ () => (
      <List
        items={ [
          {
            content: () => <TextLine mostLeft>Cache Invalidator</TextLine>,
            trailing: () => (
              <LaunchIcon onClick={ () => toCacheInvalidator(identifier) } />
            )
          },
          {
            content: () => <TextLine mostLeft>Media Manager</TextLine>,
            trailing: () => (
              <LaunchIcon onClick={ () => toProjectMedia(identifier) } />
            )
          }
        ] }
      />
    ) }
  />
)

export default connect(
  null,
  mapDispatch({
    toCacheInvalidator: (identifier) => actions.requestLocation(`/projects/${ identifier }/cache-invalidator`),
    toProjectMedia: (identifier) => actions.requestLocation(`/projects/${ identifier }/media`)
  })
)(ProjectTools)
