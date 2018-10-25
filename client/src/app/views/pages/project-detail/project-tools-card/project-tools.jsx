import React from 'react'
import { connect } from 'react-redux'

import { actions, selectors } from 'state/interface'
import { mapDispatch } from 'services/redux-helpers'
import { Card, List } from 'ui/elements'
import { LaunchIcon } from 'ui/icons'
import { Heading, TextLine } from 'ui/typo'

const ProjectTools = ({
  identifier,
  toBanwidthReport,
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
          },
          {
            content: () => <TextLine mostLeft>Bandwidth Report</TextLine>,
            trailing: () => (
              <LaunchIcon onClick={ () => toBanwidthReport(identifier) } />
            )
          }
        ] }
      />
    ) }
  />
)

export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)

    return {
      identifier
    }
  },
  mapDispatch({
    toBanwidthReport: (identifier) => actions.requestLocation(`/projects/${ identifier }/bandwidth-report`),
    toCacheInvalidator: (identifier) => actions.requestLocation(`/projects/${ identifier }/cache-invalidator`),
    toProjectMedia: (identifier) => actions.requestLocation(`/projects/${ identifier }/media`)
  })
)(ProjectTools)
