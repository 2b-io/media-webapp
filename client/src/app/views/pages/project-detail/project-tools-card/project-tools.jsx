import React from 'react'
import { connect } from 'react-redux'

import { actions } from 'state/interface'
import { mapDispatch } from 'services/redux-helpers'
import { Heading, TextLine } from 'ui/typo'
import { Card, List } from 'ui/elements'
import { LaunchIcon } from 'ui/icons'

const ProjectTools = ({
  identifier,
  toCacheInvalidator,
  toProjectMedia
}) => {

  return (
    <Card
      title={ () => <Heading mostLeft mostRight>Tools</Heading> }
      content={ () => (
        <List
          items={ [
            {
              content: () => <TextLine mostLeft mostRight>Cache Invalidator</TextLine>,
              trailing: () => (
                <LaunchIcon onClick={ () => toCacheInvalidator(identifier) } />
              )
            },
            {
              content: () => <TextLine mostLeft mostRight>Media Manager</TextLine>,
              trailing: () => (
                <LaunchIcon onClick={ () => toProjectMedia(identifier) } />
              )
            }
          ] }
        />
      ) }
    />
  )
}

export default connect(
  null,
  mapDispatch({
    toCacheInvalidator: identifier => actions.requestLocation(`/projects/${ identifier }/cache-invalidator`),
    toProjectMedia: identifier => actions.requestLocation(`/projects/${ identifier }/media`),
  })
)(ProjectTools)
