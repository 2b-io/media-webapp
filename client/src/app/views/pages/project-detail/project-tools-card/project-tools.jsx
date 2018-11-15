import React from 'react'
import { connect } from 'react-redux'

import { actions, selectors } from 'state/interface'
import { mapDispatch } from 'services/redux-helpers'
import { Card, List } from 'ui/elements'
import { Heading, TextLine } from 'ui/typo'

const ProjectTools = ({
  identifier,
  toCacheInvalidator
}) => (
  <Card
    title={ () => <Heading mostLeft mostRight>Tools</Heading> }
    content={ () => (
      <List
        interactable={ true }
        items={ [
          {
            content: () => <TextLine mostLeft>Cache Invalidator</TextLine>,
            onClick: () => toCacheInvalidator(identifier)
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
    toCacheInvalidator: (identifier) => actions.requestLocation(`/projects/${ identifier }/cache-invalidator`)
  })
)(ProjectTools)
