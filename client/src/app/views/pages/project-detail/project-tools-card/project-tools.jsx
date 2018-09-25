import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { actions } from 'state/interface'
import { Route } from 'views/router'
import { mapDispatch } from 'services/redux-helpers'
import { Heading, TextLine } from 'ui/typo'
import { Card, List } from 'ui/elements'
import { LaunchIcon } from 'ui/icons'

import CacheInvalidatorModal from '../cache-invalidator-modal'

const ProjectTools = ({
  identifier,
  toCacheInvalidator,
  toProjectDetail,
  toProjectMedia
}) => {

  return (
    <Fragment>
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
      <Route path="/projects/:identifier/cache-invalidator">
        <CacheInvalidatorModal
          width="wide"
          onHide={ () => toProjectDetail(identifier) }
          identifier={ identifier }
          title="Cache Invalidator"
        />
      </Route>
    </Fragment>
  )
}

export default connect(
  null,
  mapDispatch({
    toCacheInvalidator: (identifier) => actions.requestLocation(`/projects/${ identifier }/cache-invalidator`),
    toProjectMedia: (identifier) => actions.requestLocation(`/projects/${ identifier }/media`),
    toProjectDetail: (identifier) => actions.requestLocation(`/projects/${ identifier }`)
  })
)(ProjectTools)
