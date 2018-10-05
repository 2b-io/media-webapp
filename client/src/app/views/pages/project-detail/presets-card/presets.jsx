import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { actions, selectors } from 'state/interface'
import { mapDispatch } from 'services/redux-helpers'
import { Card, Dialog, ErrorBox, List, StatusIndicator } from 'ui/elements'
import { AddIcon } from 'ui/icons'
import { Heading, TextLine } from 'ui/typo'

import CreateDialog from './create-dialog'

const CREATE_PRESET = 'CREATE_PRESET'

const Presets = ({
  showCreateDialog,
  hideCreateDialog,
  identifier,
  presets = {},
  createPreset,
  toPreset,
  ui: {
    error,
    idle,
    isCreatePresetDialogActive
  }
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
        fab={ () => <AddIcon onClick={ showCreateDialog } /> }
        content={ () => (
          items.length &&
            <List items={ items } /> ||
            <TextLine mostLeft mostRight>No preset found</TextLine>
        ) }
      />
      <Dialog
        error={ error }
        idle={ idle }
        isActive={ isCreatePresetDialogActive }
        onOverlayClick={ hideCreateDialog }
        content={ () => (
          error ?
            <ErrorBox>An error happens when invalidate cache.</ErrorBox> :
            <CreateDialog
              identifier={ identifier }
              presets={ presets }
              createPreset={ createPreset }
            />
        ) }
      />
    </Fragment>
  )
}

export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)

    if (!identifier) {
      return {}
    }

    return {
      presets: selectors.presets(state, identifier),
      identifier
    }
  },
  mapDispatch({
    // dialog
    showCreateDialog: () => actions.showDialog(CREATE_PRESET),
    hideCreateDialog: () => actions.hideDialog(CREATE_PRESET),
    // preset
    createPreset: actions.createPreset,
    toPreset: (identifier, contentType) => actions.requestLocation(`/projects/${ identifier }/presets/${ contentType }`)
  })
)(Presets)
