import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { actions, selectors } from 'state/interface'
import { mapDispatch } from 'services/redux-helpers'
import { Heading, TextLine } from 'ui/typo'
import { Card, List, StatusIndicator } from 'ui/elements'
import { AddIcon } from 'ui/icons'

import PresetModal from '../preset-modal'

const Presets = ({
  identifier,
  presets = {},
  toPreset,
  toProjectDetail
}) => {
  const items = Object.values(presets).map(
    ({ contentType, isActive }) => ({
      key: contentType,
      onClick: () => toPreset(identifier, contentType.replace('/', '_')),
      content: () => <TextLine mostRight>{ contentType }</TextLine>,
      leading: () => <StatusIndicator isActive={ isActive } />
    })
  )

  return (
    <Fragment>
      <Card
        title={ () => <Heading mostLeft mostRight>Presets</Heading> }
        fab={ () => <AddIcon onClick={ () => toPreset(identifier, 'new') } /> }
        content={ () => (
          items.length &&
            <List items={ items } /> ||
            <TextLine mostLeft mostRight>No preset found</TextLine>
        ) }
      />
      <PresetModal
        identifier={ identifier }
        width="wide"
        hideOnClickOutside={ true }
        onHide={ () => toProjectDetail(identifier) }
      />
    </Fragment>
  )
}

export default connect(
  (state, { identifier }) => ({
    presets: selectors.presets(state, identifier)
  }),
  mapDispatch({
    toPreset: (identifier, hash) => actions.requestLocation(`/projects/${ identifier }/presets/${ hash }`),
    toProjectDetail: (identifier) => actions.requestLocation(`/projects/${ identifier }`)
  })
)(Presets)
