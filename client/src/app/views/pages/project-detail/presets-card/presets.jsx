import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { actions, selectors } from 'state/interface'
import { mapDispatch } from 'services/redux-helpers'
import { Heading, TextLine } from 'ui/typo'
import { Card, ContextMenu, List } from 'ui/elements'
import { AddIcon } from 'ui/icons'
import { Route } from 'views/router'

import PresetModal from '../preset-modal'

const Presets = ({
  identifier,
  presets = {},
  toPreset,
  toProjectDetail,
  removePreset
}) => {
  const items = Object.values(presets).map(
    ({ contentType }) => ({
      key: contentType,
      content: () => <TextLine mostLeft>{ contentType }</TextLine>,
      trailing: () => (
        <ContextMenu
          name={ `preset-${ contentType }` }
          content={ () => (
            <List
              items={ [
                {
                  content: () => <TextLine mostLeft mostRight>Edit</TextLine>,
                  onClick: () => { toPreset(identifier, contentType.replace('/', '_'))}
                },
                {
                  content: () => <TextLine mostLeft mostRight>Disable</TextLine>
                },
                {
                  content: () => <TextLine mostLeft mostRight>Remove</TextLine>,
                  onClick: () => removePreset({ contentType, identifier })
                }
              ] }
            />
          ) }
        />
      )
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
      <Route path="/projects/:identifier/presets/new">
        <PresetModal
          width="wide"
          hideOnClickOutside={ true }
          onHide={ () => toProjectDetail(identifier) }
        />
      </Route>
    </Fragment>
  )
}

export default connect(
  (state, { identifier }) => ({
    presets: selectors.presets(state, identifier)
  }),
  mapDispatch({
    toPreset: (identifier, hash) => actions.requestLocation(`/projects/${ identifier }/presets/${ hash }`),
    toProjectDetail: (identifier) => actions.requestLocation(`/projects/${ identifier }`),
    removePreset: actions.removePreset
  })
)(Presets)
